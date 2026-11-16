import React, { useCallback, useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import {
  ArrowLeft,
  Link2,
  Pause,
  Play,
  RotateCcw,
  ShieldBan,
  Volume2,
  VolumeX,
} from 'lucide-react';
import {
  BLOCKCHAIN_STAGES,
  attemptConnectNodes,
  quarantineCorruptNode,
  type NetworkEdgeData,
  type NetworkNodeData,
} from '../game/blockchainRules';
import { soundSynth } from '../game/soundSynth';

type GamePhase = 'title' | 'playing' | 'paused' | 'victory' | 'gameover';
type ToolMode = 'connect' | 'quarantine';

interface BlockchainGame3DProps {
  initialAutoStart?: boolean;
  onExitToCourse: () => void;
}

interface NodeVisual {
  id: number;
  group: THREE.Group;
  hitbox: THREE.Mesh;
  crystal: THREE.Mesh;
  collar: THREE.Mesh;
  selectRing: THREE.Mesh;
  quarantineCage: THREE.Mesh;
  baseY: number;
  springScale: number;
  springVelocity: number;
  flashTimer: number;
}

interface EdgeVisual {
  from: number;
  to: number;
  mesh: THREE.Mesh;
  pulseSphere: THREE.Mesh;
  curve: THREE.CatmullRomCurve3;
  pulseT: number;
}

interface ParticleItem {
  active: boolean;
  pos: THREE.Vector3;
  vel: THREE.Vector3;
  life: number;
  maxLife: number;
  color: THREE.Color;
}

// Pre-allocated scratch objects for zero-GC render loop
const _vec3A = new THREE.Vector3();
const _vec3B = new THREE.Vector3();
const _mat4 = new THREE.Matrix4();
const _quat = new THREE.Quaternion();
const _scaleVec = new THREE.Vector3();
const _raycaster = new THREE.Raycaster();
const _pointer = new THREE.Vector2();

function createFloorGridTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;
  ctx.fillStyle = '#E8EEF5';
  ctx.fillRect(0, 0, 512, 512);

  ctx.strokeStyle = 'rgba(15, 23, 42, 0.08)';
  ctx.lineWidth = 2;
  const step = 64;
  for (let i = 0; i <= 512; i += step) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i, 512);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0, i);
    ctx.lineTo(512, i);
    ctx.stroke();
  }

  ctx.fillStyle = 'rgba(2, 132, 199, 0.16)';
  for (let x = 0; x <= 512; x += step) {
    for (let y = 0; y <= 512; y += step) {
      ctx.beginPath();
      ctx.arc(x, y, 2.5, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(8, 8);
  return tex;
}

function createContactShadowTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext('2d')!;
  const grad = ctx.createRadialGradient(64, 64, 8, 64, 64, 60);
  grad.addColorStop(0, 'rgba(15, 23, 42, 0.32)');
  grad.addColorStop(0.55, 'rgba(15, 23, 42, 0.12)');
  grad.addColorStop(1, 'rgba(15, 23, 42, 0)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 128, 128);
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

export const BlockchainGame3D: React.FC<BlockchainGame3DProps> = ({
  initialAutoStart = false,
  onExitToCourse,
}) => {
  const mountRef = useRef<HTMLDivElement | null>(null);

  const [phase, setPhase] = useState<GamePhase>(
    initialAutoStart ? 'playing' : 'title'
  );
  const [stageIndex, setStageIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(BLOCKCHAIN_STAGES[0].timeLimitSeconds);
  const [nodesState, setNodesState] = useState<NetworkNodeData[]>(() =>
    BLOCKCHAIN_STAGES[0].nodes.map((n) => ({ ...n }))
  );
  const [selectedNodeId, setSelectedNodeId] = useState<number | null>(null);
  const [toolMode, setToolMode] = useState<ToolMode>('connect');
  const [muted, setMuted] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState<string>(
    'Selecione um nó e clique em outro para criar uma conexão P2P.'
  );
  const [hoveredNodeId, setHoveredNodeId] = useState<number | null>(null);

  // Refs synced with Three.js loop (prevents canvas teardown on React re-render)
  const phaseRef = useRef<GamePhase>(phase);
  const stageIndexRef = useRef<number>(stageIndex);
  const nodesRef = useRef<NetworkNodeData[]>(nodesState);
  const edgesRef = useRef<NetworkEdgeData[]>([]);
  const selectedIdRef = useRef<number | null>(null);
  const toolModeRef = useRef<ToolMode>('connect');
  const scoreRef = useRef<number>(0);
  const timeLeftRef = useRef<number>(BLOCKCHAIN_STAGES[0].timeLimitSeconds);
  const traumaRef = useRef<number>(0);

  // Scene imperative bridge populated inside useEffect([], [])
  const sceneApiRef = useRef<{
    rebuildStage: (idx: number) => void;
    syncNodeVisuals: (nodes: NetworkNodeData[], selectedId: number | null) => void;
    addEdgeVisual: (fromNode: NetworkNodeData, toNode: NetworkNodeData) => void;
    triggerNodePulse: (nodeId: number, burstColorHex: number, heavy?: boolean) => void;
    resetCamera: () => void;
  } | null>(null);

  useEffect(() => {
    phaseRef.current = phase;
    document.body.dataset.state =
      phase === 'victory' ? 'gameover' : phase;
  }, [phase]);

  useEffect(() => {
    return () => {
      delete document.body.dataset.state;
    };
  }, []);

  useEffect(() => {
    toolModeRef.current = toolMode;
  }, [toolMode]);

  useEffect(() => {
    selectedIdRef.current = selectedNodeId;
    sceneApiRef.current?.syncNodeVisuals(nodesRef.current, selectedNodeId);
  }, [selectedNodeId]);

  const loadStage = useCallback((idx: number, resetScore: boolean) => {
    const cfg = BLOCKCHAIN_STAGES[idx];
    const freshNodes = cfg.nodes.map((n) => ({ ...n }));
    nodesRef.current = freshNodes;
    edgesRef.current = [];
    selectedIdRef.current = null;
    stageIndexRef.current = idx;
    timeLeftRef.current = cfg.timeLimitSeconds;

    if (resetScore) {
      scoreRef.current = 0;
      setScore(0);
    }

    setStageIndex(idx);
    setNodesState(freshNodes);
    setSelectedNodeId(null);
    setToolMode('connect');
    setTimeLeft(cfg.timeLimitSeconds);
    setFeedbackMsg(cfg.subtitle);
    sceneApiRef.current?.rebuildStage(idx);
    sceneApiRef.current?.resetCamera();
  }, []);

  const handleStartGame = useCallback(() => {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
    loadStage(0, true);
    phaseRef.current = 'playing';
    document.body.dataset.state = 'playing';
    setPhase('playing');
    soundSynth.playNodeSelect(2);
  }, [loadStage]);

  const handleToggleMute = useCallback(() => {
    setMuted((prev) => {
      const next = !prev;
      soundSynth.setMuted(next);
      return next;
    });
  }, []);

  const handleTogglePause = useCallback(() => {
    setPhase((prev) => {
      if (prev === 'playing') return 'paused';
      if (prev === 'paused') return 'playing';
      return prev;
    });
  }, []);

  const handleNodeInteraction = useCallback(
    (nodeId: number, forceQuarantine = false) => {
      if (phaseRef.current !== 'playing') return;

      const currentNodes = nodesRef.current;
      const targetNode = currentNodes.find((n) => n.id === nodeId);
      if (!targetNode) return;

      const shouldQuarantine =
        forceQuarantine || toolModeRef.current === 'quarantine';

      if (shouldQuarantine) {
        const res = quarantineCorruptNode(currentNodes, nodeId);
        if (res.accepted) {
          nodesRef.current = res.nodes;
          scoreRef.current += res.scoreDelta;
          setScore(scoreRef.current);
          setNodesState(res.nodes);
          setSelectedNodeId(null);
          soundSynth.playQuarantineZap();
          navigator.vibrate?.([25, 20, 40]);
          traumaRef.current = Math.min(1, traumaRef.current + 0.45);
          sceneApiRef.current?.triggerNodePulse(nodeId, 0x059669, true);
          sceneApiRef.current?.syncNodeVisuals(res.nodes, null);
          setFeedbackMsg(
            `${targetNode.label} isolado com sucesso! (+${res.scoreDelta} pts)`
          );

          if (res.consensusReached) {
            soundSynth.playConsensusFanfare();
            traumaRef.current = 0.7;
            if (stageIndexRef.current < BLOCKCHAIN_STAGES.length - 1) {
              const nextIdx = stageIndexRef.current + 1;
              setFeedbackMsg(
                'Consenso atingido! Avançando para o próximo bloco...'
              );
              window.setTimeout(() => {
                if (phaseRef.current === 'playing') {
                  loadStage(nextIdx, false);
                }
              }, 950);
            } else {
              setBestScore((b) => Math.max(b, scoreRef.current));
              setPhase('victory');
            }
          }
        } else {
          if (res.scoreDelta < 0) {
            scoreRef.current = Math.max(0, scoreRef.current + res.scoreDelta);
            setScore(scoreRef.current);
          }
          soundSynth.playErrorBuzz();
          sceneApiRef.current?.triggerNodePulse(nodeId, 0xdc2626, false);
          setFeedbackMsg(
            `${targetNode.label} é um par honesto — conecte-o em vez de isolar.`
          );
        }
        return;
      }

      // Connect mode
      if (selectedIdRef.current === null) {
        if (targetNode.status === 'quarantined') {
          soundSynth.playErrorBuzz();
          setFeedbackMsg('Este nó está isolado em quarentena.');
          return;
        }
        if (targetNode.role === 'corrupt') {
          soundSynth.playErrorBuzz();
          sceneApiRef.current?.triggerNodePulse(nodeId, 0xdc2626, false);
          setFeedbackMsg(
            `${targetNode.label} envia dados adulterados! Use Isolar [2] ou clique direito para neutralizá-lo.`
          );
          return;
        }
        selectedIdRef.current = nodeId;
        setSelectedNodeId(nodeId);
        soundSynth.playNodeSelect(nodeId);
        navigator.vibrate?.(15);
        sceneApiRef.current?.triggerNodePulse(nodeId, 0x0284c7, false);
        setFeedbackMsg(
          `${targetNode.label} selecionado. Clique em outro nó para criar a ligação.`
        );
        return;
      }

      const sourceId = selectedIdRef.current;
      if (sourceId === nodeId) {
        selectedIdRef.current = null;
        setSelectedNodeId(null);
        setFeedbackMsg('Seleção cancelada.');
        return;
      }

      const attempt = attemptConnectNodes(
        currentNodes,
        edgesRef.current,
        sourceId,
        nodeId
      );

      if (!attempt.outcome.accepted) {
        if (attempt.outcome.scoreDelta < 0) {
          scoreRef.current = Math.max(
            0,
            scoreRef.current + attempt.outcome.scoreDelta
          );
          setScore(scoreRef.current);
        }
        soundSynth.playErrorBuzz();
        sceneApiRef.current?.triggerNodePulse(nodeId, 0xdc2626, false);
        if (attempt.outcome.reason === 'corrupt-link-blocked') {
          traumaRef.current = Math.min(1, traumaRef.current + 0.3);
          setFeedbackMsg(
            'Conexão rejeitada! Nó adulterado detectado — use Isolar [2] ou clique direito nele.'
          );
        } else if (attempt.outcome.reason === 'duplicate') {
          setFeedbackMsg('Esses dois nós já estão conectados.');
        }
        selectedIdRef.current = null;
        setSelectedNodeId(null);
        return;
      }

      nodesRef.current = attempt.nodes;
      edgesRef.current = attempt.edges;
      selectedIdRef.current = null;
      scoreRef.current += attempt.outcome.scoreDelta;
      setScore(scoreRef.current);
      setNodesState(attempt.nodes);
      setSelectedNodeId(null);

      const fromNode = attempt.nodes.find((n) => n.id === sourceId)!;
      const toNode = attempt.nodes.find((n) => n.id === nodeId)!;
      sceneApiRef.current?.addEdgeVisual(fromNode, toNode);
      sceneApiRef.current?.syncNodeVisuals(attempt.nodes, null);
      sceneApiRef.current?.triggerNodePulse(
        nodeId,
        attempt.outcome.newlySyncedIds.length > 0 ? 0x059669 : 0x0284c7,
        attempt.outcome.newlySyncedIds.length > 0
      );
      soundSynth.playLinkValidated(attempt.outcome.newlySyncedIds.length);
      navigator.vibrate?.(attempt.outcome.newlySyncedIds.length > 0 ? [20, 15, 30] : 20);

      if (attempt.outcome.consensusReached) {
        soundSynth.playConsensusFanfare();
        navigator.vibrate?.([30, 25, 45, 25, 60]);
        traumaRef.current = 0.7;
        if (stageIndexRef.current < BLOCKCHAIN_STAGES.length - 1) {
          const nextIdx = stageIndexRef.current + 1;
          setFeedbackMsg(
            'Bloco validado em consenso! Preparando próxima rede...'
          );
          window.setTimeout(() => {
            if (phaseRef.current === 'playing') {
              loadStage(nextIdx, false);
            }
          }, 950);
        } else {
          setBestScore((b) => Math.max(b, scoreRef.current));
          setPhase('victory');
        }
      } else if (attempt.outcome.newlySyncedIds.length > 0) {
        setFeedbackMsg(
          `Conexão validada! +${attempt.outcome.newlySyncedIds.length} nó(s) sincronizado(s).`
        );
      } else {
        setFeedbackMsg(
          'Ligação criada entre pares! Conecte este grupo ao Nó Gênesis para validar.'
        );
      }
    },
    [loadStage]
  );

  const interactionRef = useRef(handleNodeInteraction);
  useEffect(() => {
    interactionRef.current = handleNodeInteraction;
  }, [handleNodeInteraction]);

  // Countdown timer in playing state
  useEffect(() => {
    if (phase !== 'playing') return;
    const interval = window.setInterval(() => {
      timeLeftRef.current = Math.max(0, timeLeftRef.current - 1);
      setTimeLeft(timeLeftRef.current);
      if (timeLeftRef.current <= 0) {
        soundSynth.playErrorBuzz();
        setBestScore((b) => Math.max(b, scoreRef.current));
        setPhase('gameover');
      }
    }, 1000);
    return () => window.clearInterval(interval);
  }, [phase]);

  // Keyboard shortcuts
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (phaseRef.current === 'title') {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleStartGame();
        }
        return;
      }
      if (e.key === 'Escape' || e.key.toLowerCase() === 'p') {
        if (phaseRef.current === 'playing' || phaseRef.current === 'paused') {
          e.preventDefault();
          handleTogglePause();
        }
      } else if (e.key.toLowerCase() === 'm') {
        e.preventDefault();
        handleToggleMute();
      } else if (e.key.toLowerCase() === 'r' && phaseRef.current === 'playing') {
        e.preventDefault();
        loadStage(stageIndexRef.current, false);
      } else if (e.key === '1') {
        setToolMode('connect');
      } else if (e.key === '2' || e.key.toLowerCase() === 'q') {
        setToolMode('quarantine');
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [handleStartGame, handleToggleMute, handleTogglePause, loadStage]);

  // Mount Three.js Scene ONCE
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const isSoftwareGl = (() => {
      const probe = document.createElement('canvas').getContext('webgl2');
      if (!probe) return true;
      const ext = probe.getExtension('WEBGL_debug_renderer_info');
      const param = ext ? ext.UNMASKED_RENDERER_WEBGL : probe.RENDERER;
      const gpu = String(probe.getParameter(param));
      probe.getExtension('WEBGL_lose_context')?.loseContext();
      return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
    })();

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xe8eef5);
    scene.fog = new THREE.FogExp2(0xe8eef5, 0.022);

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 7.6, 10.6);

    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      powerPreference: 'high-performance',
    });
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    renderer.setPixelRatio(
      isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2)
    );
    renderer.setSize(width, height);
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    scene.environment = pmremGenerator.fromScene(
      new RoomEnvironment(),
      0.04
    ).texture;
    pmremGenerator.dispose();

    // Lighting rig: warm key + cool hemisphere fill + subtle rim
    const hemiLight = new THREE.HemisphereLight(0xcbe4ff, 0x94a3b8, 0.85);
    scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight(0xfff4e2, 1.5);
    keyLight.position.set(7, 13, 6);
    keyLight.castShadow = !isSoftwareGl;
    keyLight.shadow.mapSize.set(1024, 1024);
    keyLight.shadow.camera.left = -9;
    keyLight.shadow.camera.right = 9;
    keyLight.shadow.camera.top = 9;
    keyLight.shadow.camera.bottom = -9;
    keyLight.shadow.camera.near = 1;
    keyLight.shadow.camera.far = 30;
    keyLight.shadow.bias = -0.0005;
    keyLight.shadow.normalBias = 0.02;
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x7dd3fc, 0.55);
    rimLight.position.set(-8, 6, -7);
    scene.add(rimLight);

    // Architectural studio ground plane
    const gridTex = createFloorGridTexture();
    gridTex.anisotropy = renderer.capabilities.getMaxAnisotropy();
    const floorGeo = new THREE.PlaneGeometry(50, 50);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      map: gridTex,
      roughness: 0.88,
      metalness: 0.04,
    });
    const floorMesh = new THREE.Mesh(floorGeo, floorMat);
    floorMesh.rotation.x = -Math.PI / 2;
    floorMesh.position.y = -0.45;
    floorMesh.receiveShadow = true;
    scene.add(floorMesh);

    const shadowTex = createContactShadowTexture();

    // OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = !isSoftwareGl;
    controls.dampingFactor = 0.06;
    controls.minDistance = 5.5;
    controls.maxDistance = 18;
    controls.maxPolarAngle = Math.PI / 2.25;
    controls.minPolarAngle = Math.PI / 6;
    controls.target.set(0, 0.4, 0);

    // Shared geometries & materials for composite nodes
    const pedestalGeo = new THREE.CylinderGeometry(0.62, 0.74, 0.24, 8);
    const lathePoints = [
      new THREE.Vector2(0.0, 0),
      new THREE.Vector2(0.46, 0),
      new THREE.Vector2(0.4, 0.22),
      new THREE.Vector2(0.28, 0.54),
      new THREE.Vector2(0.38, 0.72),
      new THREE.Vector2(0.0, 0.76),
    ];
    const bodyGeo = new THREE.LatheGeometry(lathePoints, 12);
    const collarGeo = new THREE.TorusGeometry(0.42, 0.055, 10, 24);
    const crystalGeo = new THREE.OctahedronGeometry(0.26, 0);
    const ringGeo = new THREE.RingGeometry(0.76, 0.88, 32);
    const cageGeo = new THREE.IcosahedronGeometry(0.72, 0);
    const hitboxGeo = new THREE.CylinderGeometry(0.82, 0.82, 1.8, 12);
    const shadowDiscGeo = new THREE.CircleGeometry(0.95, 24);
    const pulseSphereGeo = new THREE.SphereGeometry(0.11, 10, 10);

    const pedestalMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      roughness: 0.72,
      metalness: 0.2,
    });
    const ceramicMat = new THREE.MeshStandardMaterial({
      color: 0xf8fafc,
      roughness: 0.48,
      metalness: 0.05,
    });
    const collarMat = new THREE.MeshStandardMaterial({
      color: 0xcbd5e1,
      roughness: 0.2,
      metalness: 0.88,
    });
    const shadowDiscMat = new THREE.MeshBasicMaterial({
      map: shadowTex,
      transparent: true,
      depthWrite: false,
    });
    const hitboxMat = new THREE.MeshBasicMaterial({ visible: false });

    // Pooled InstancedMesh particle ring buffer
    const MAX_PARTICLES = 60;
    const particleGeo = new THREE.OctahedronGeometry(0.075, 0);
    const particleMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const particleInstanced = new THREE.InstancedMesh(
      particleGeo,
      particleMat,
      MAX_PARTICLES
    );
    particleInstanced.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    particleInstanced.frustumCulled = false;
    scene.add(particleInstanced);

    const particles: ParticleItem[] = Array.from({ length: MAX_PARTICLES }, () => ({
      active: false,
      pos: new THREE.Vector3(),
      vel: new THREE.Vector3(),
      life: 0,
      maxLife: 0.6,
      color: new THREE.Color(0x0284c7),
    }));
    let particleCursor = 0;

    for (let i = 0; i < MAX_PARTICLES; i++) {
      _mat4.makeScale(0, 0, 0);
      particleInstanced.setMatrixAt(i, _mat4);
      particleInstanced.setColorAt(i, particles[i].color);
    }

    const spawnBurst = (origin: THREE.Vector3, hexColor: number, count: number) => {
      for (let i = 0; i < count; i++) {
        const p = particles[particleCursor];
        particleCursor = (particleCursor + 1) % MAX_PARTICLES;
        p.active = true;
        p.life = 0;
        p.maxLife = 0.45 + Math.random() * 0.25;
        p.pos.copy(origin);
        p.pos.y += 0.9;
        const angle = (i / count) * Math.PI * 2 + Math.random() * 0.4;
        const speed = 1.6 + Math.random() * 2.2;
        p.vel.set(
          Math.cos(angle) * speed,
          1.4 + Math.random() * 1.8,
          Math.sin(angle) * speed
        );
        p.color.setHex(hexColor);
      }
    };

    const stageGroup = new THREE.Group();
    scene.add(stageGroup);

    const nodeVisuals = new Map<number, NodeVisual>();
    const edgeVisuals: EdgeVisual[] = [];
    let interactableHitboxes: THREE.Mesh[] = [];

    const clearStageGroup = () => {
      nodeVisuals.forEach((nv) => {
        (nv.crystal.material as THREE.Material).dispose();
        (nv.selectRing.material as THREE.Material).dispose();
        (nv.quarantineCage.material as THREE.Material).dispose();
      });
      nodeVisuals.clear();
      edgeVisuals.forEach((ev) => {
        ev.mesh.geometry.dispose();
        (ev.mesh.material as THREE.Material).dispose();
        (ev.pulseSphere.material as THREE.Material).dispose();
      });
      edgeVisuals.length = 0;
      interactableHitboxes = [];
      while (stageGroup.children.length > 0) {
        stageGroup.remove(stageGroup.children[0]);
      }
    };

    const getCrystalColors = (node: NetworkNodeData) => {
      if (node.role === 'genesis') {
        return { color: 0x0284c7, emissive: 0x0369a1 };
      }
      if (node.role === 'corrupt') {
        if (node.status === 'quarantined') {
          return { color: 0x64748b, emissive: 0x0f172a };
        }
        return { color: 0xdc2626, emissive: 0x7f1d1d };
      }
      if (node.status === 'synced') {
        return { color: 0x059669, emissive: 0x047857 };
      }
      return { color: 0xd97706, emissive: 0x78350f };
    };

    const rebuildStage = (idx: number) => {
      clearStageGroup();
      const cfg = BLOCKCHAIN_STAGES[idx];
      for (const node of cfg.nodes) {
        const group = new THREE.Group();
        const baseY = -0.43 + node.y * 0.3;
        group.position.set(node.x, baseY, node.z);

        const shadowDisc = new THREE.Mesh(shadowDiscGeo, shadowDiscMat);
        shadowDisc.rotation.x = -Math.PI / 2;
        shadowDisc.position.y = 0.015;
        group.add(shadowDisc);

        const pedestal = new THREE.Mesh(pedestalGeo, pedestalMat);
        pedestal.position.y = 0.12;
        pedestal.castShadow = true;
        pedestal.receiveShadow = true;
        group.add(pedestal);

        const body = new THREE.Mesh(bodyGeo, ceramicMat);
        body.position.y = 0.24;
        body.castShadow = true;
        body.receiveShadow = true;
        group.add(body);

        const collar = new THREE.Mesh(collarGeo, collarMat);
        collar.rotation.x = Math.PI / 2;
        collar.position.y = 0.72;
        collar.castShadow = true;
        group.add(collar);

        const cColors = getCrystalColors(node);
        const crystalMat = new THREE.MeshStandardMaterial({
          color: cColors.color,
          emissive: cColors.emissive,
          emissiveIntensity: 0.45,
          roughness: 0.18,
          metalness: 0.25,
        });
        const crystal = new THREE.Mesh(crystalGeo, crystalMat);
        crystal.position.y = 1.24;
        crystal.castShadow = true;
        group.add(crystal);

        const ringMat = new THREE.MeshBasicMaterial({
          color: 0x0284c7,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0,
        });
        const selectRing = new THREE.Mesh(ringGeo, ringMat);
        selectRing.rotation.x = -Math.PI / 2;
        selectRing.position.y = 0.035;
        group.add(selectRing);

        const cageMat = new THREE.MeshBasicMaterial({
          color: 0x059669,
          wireframe: true,
          transparent: true,
          opacity: 0.65,
        });
        const quarantineCage = new THREE.Mesh(cageGeo, cageMat);
        quarantineCage.position.y = 1.15;
        quarantineCage.visible = false;
        group.add(quarantineCage);

        const hitbox = new THREE.Mesh(hitboxGeo, hitboxMat);
        hitbox.position.y = 0.9;
        hitbox.userData.nodeId = node.id;
        group.add(hitbox);

        stageGroup.add(group);
        interactableHitboxes.push(hitbox);
        nodeVisuals.set(node.id, {
          id: node.id,
          group,
          hitbox,
          crystal,
          collar,
          selectRing,
          quarantineCage,
          baseY,
          springScale: 1,
          springVelocity: 0,
          flashTimer: 0,
        });
      }
    };

    const syncNodeVisuals = (
      nodes: NetworkNodeData[],
      selId: number | null
    ) => {
      for (const node of nodes) {
        const nv = nodeVisuals.get(node.id);
        if (!nv) continue;
        const cColors = getCrystalColors(node);
        const mat = nv.crystal.material as THREE.MeshStandardMaterial;
        mat.color.setHex(cColors.color);
        mat.emissive.setHex(cColors.emissive);

        const ringMat = nv.selectRing.material as THREE.MeshBasicMaterial;
        ringMat.opacity = selId === node.id ? 0.9 : 0;

        nv.quarantineCage.visible = node.status === 'quarantined';
      }
    };

    const addEdgeVisual = (
      fromNode: NetworkNodeData,
      toNode: NetworkNodeData
    ) => {
      const fromV = nodeVisuals.get(fromNode.id);
      const toV = nodeVisuals.get(toNode.id);
      if (!fromV || !toV) return;

      const p1 = new THREE.Vector3(fromNode.x, fromV.baseY + 0.95, fromNode.z);
      const p3 = new THREE.Vector3(toNode.x, toV.baseY + 0.95, toNode.z);
      const mid = new THREE.Vector3()
        .addVectors(p1, p3)
        .multiplyScalar(0.5);
      mid.y += 0.6;

      const curve = new THREE.CatmullRomCurve3([p1, mid, p3]);
      const tubeGeo = new THREE.TubeGeometry(curve, 24, 0.055, 8, false);
      const tubeMat = new THREE.MeshStandardMaterial({
        color: 0x0284c7,
        emissive: 0x0369a1,
        emissiveIntensity: 0.45,
        roughness: 0.25,
        metalness: 0.4,
      });
      const mesh = new THREE.Mesh(tubeGeo, tubeMat);
      stageGroup.add(mesh);

      const pulseMat = new THREE.MeshBasicMaterial({ color: 0x10b981 });
      const pulseSphere = new THREE.Mesh(pulseSphereGeo, pulseMat);
      stageGroup.add(pulseSphere);

      edgeVisuals.push({
        from: fromNode.id,
        to: toNode.id,
        mesh,
        pulseSphere,
        curve,
        pulseT: 0,
      });
    };

    const triggerNodePulse = (
      nodeId: number,
      burstColorHex: number,
      heavy = false
    ) => {
      const nv = nodeVisuals.get(nodeId);
      if (!nv) return;
      nv.springVelocity = heavy ? 5.8 : 3.8;
      nv.flashTimer = 0.14;
      spawnBurst(nv.group.position, burstColorHex, heavy ? 18 : 9);
    };

    const resetCamera = () => {
      camera.position.set(0, 7.6, 10.6);
      controls.target.set(0, 0.4, 0);
      controls.update();
    };

    sceneApiRef.current = {
      rebuildStage,
      syncNodeVisuals,
      addEdgeVisual,
      triggerNodePulse,
      resetCamera,
    };

    rebuildStage(stageIndexRef.current);

    if (!isSoftwareGl) {
      renderer.compile(scene, camera);
    }

    // Pointer interaction (distinguish drag orbit vs crisp tap/click)
    let downX = 0;
    let downY = 0;
    let lastHoverCheck = 0;

    const updatePointerNdc = (clientX: number, clientY: number) => {
      const rect = renderer.domElement.getBoundingClientRect();
      _pointer.x = ((clientX - rect.left) / rect.width) * 2 - 1;
      _pointer.y = -((clientY - rect.top) / rect.height) * 2 + 1;
    };

    const onPointerDown = (e: PointerEvent) => {
      downX = e.clientX;
      downY = e.clientY;
    };

    const onPointerUp = (e: PointerEvent) => {
      if (phaseRef.current !== 'playing') return;
      const dist = Math.hypot(e.clientX - downX, e.clientY - downY);
      if (dist > 8) return; // User orbited camera

      updatePointerNdc(e.clientX, e.clientY);
      _raycaster.setFromCamera(_pointer, camera);
      const hits = _raycaster.intersectObjects(interactableHitboxes, false);
      if (hits.length > 0) {
        const nodeId = hits[0].object.userData.nodeId as number;
        interactionRef.current(nodeId, e.button === 2);
      }
    };

    const onContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    const onPointerMove = (e: PointerEvent) => {
      const now = performance.now();
      if (now - lastHoverCheck < 45) return;
      lastHoverCheck = now;

      if (phaseRef.current !== 'playing') {
        renderer.domElement.style.cursor = 'default';
        return;
      }

      updatePointerNdc(e.clientX, e.clientY);
      _raycaster.setFromCamera(_pointer, camera);
      const hits = _raycaster.intersectObjects(interactableHitboxes, false);
      if (hits.length > 0) {
        const nodeId = hits[0].object.userData.nodeId as number;
        renderer.domElement.style.cursor = 'pointer';
        setHoveredNodeId(nodeId);
      } else {
        renderer.domElement.style.cursor = 'grab';
        setHoveredNodeId(null);
      }
    };

    renderer.domElement.addEventListener('pointerdown', onPointerDown);
    renderer.domElement.addEventListener('pointerup', onPointerUp);
    renderer.domElement.addEventListener('pointermove', onPointerMove);
    renderer.domElement.addEventListener('contextmenu', onContextMenu);

    const onResize = () => {
      if (!container) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    // Loop with software WebGL pacing
    let disposed = false;
    let frameId = 0;
    let lastTime = performance.now();
    let elapsed = 0;

    function afterDraw(cb: () => void) {
      const gl = renderer.getContext() as WebGL2RenderingContext;
      const sync = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
      gl.flush();
      const poll = () => {
        if (disposed) {
          if (sync) gl.deleteSync(sync);
          return;
        }
        const state = sync && gl.getSyncParameter(sync, gl.SYNC_STATUS);
        if (state === gl.UNSIGNALED) {
          frameId = window.setTimeout(poll, 5);
        } else {
          if (sync) gl.deleteSync(sync);
          frameId = window.setTimeout(cb, 80);
        }
      };
      frameId = window.setTimeout(poll, 5);
    }

    const tick = () => {
      if (disposed) return;
      const now = performance.now();
      const rawDt = (now - lastTime) / 1000;
      lastTime = now;
      const dt = Math.min(rawDt, 0.05);
      elapsed += dt;

      if (phaseRef.current === 'title') {
        // Cinematic orbital showcase on Title Screen
        const orbitAngle = elapsed * 0.22;
        _vec3A.set(
          Math.sin(orbitAngle) * 10.5,
          6.8 + Math.sin(elapsed * 0.5) * 0.35,
          Math.cos(orbitAngle) * 10.5
        );
        camera.position.lerp(_vec3A, 1 - Math.exp(-3 * dt));
        camera.lookAt(0, 0.5, 0);
      } else {
        controls.update();
      }

      // Trauma shake
      if (traumaRef.current > 0.001) {
        const shake = traumaRef.current * traumaRef.current * 0.18;
        camera.position.x += (Math.random() * 2 - 1) * shake;
        camera.position.y += (Math.random() * 2 - 1) * shake;
        traumaRef.current = Math.max(0, traumaRef.current - dt * 2.4);
      }

      // Animate nodes (floating crystal, spring squash-and-stretch, hit flash)
      nodeVisuals.forEach((nv) => {
        nv.crystal.rotation.y += dt * 1.1;
        nv.crystal.position.y = 1.24 + Math.sin(elapsed * 2.2 + nv.id) * 0.06;

        // Second-order spring on scale
        const stiffness = 180;
        const damping = 14;
        const accel =
          -stiffness * (nv.springScale - 1) - damping * nv.springVelocity;
        nv.springVelocity += accel * dt;
        nv.springScale += nv.springVelocity * dt;
        const sy = nv.springScale;
        const sxz = 1 / Math.sqrt(Math.max(0.5, sy));
        nv.group.scale.set(sxz, sy, sxz);

        if (nv.flashTimer > 0) {
          nv.flashTimer = Math.max(0, nv.flashTimer - dt);
          (nv.crystal.material as THREE.MeshStandardMaterial).emissiveIntensity =
            1.4;
        } else {
          (nv.crystal.material as THREE.MeshStandardMaterial).emissiveIntensity =
            0.45;
        }
      });

      // Animate data packet spheres along validated curves
      for (const ev of edgeVisuals) {
        ev.pulseT = (ev.pulseT + dt * 0.65) % 1;
        ev.curve.getPointAt(ev.pulseT, _vec3B);
        ev.pulseSphere.position.copy(_vec3B);
      }

      // Update pooled particles
      let dirtyParticles = false;
      for (let i = 0; i < MAX_PARTICLES; i++) {
        const p = particles[i];
        if (!p.active) continue;
        dirtyParticles = true;
        p.life += dt;
        if (p.life >= p.maxLife) {
          p.active = false;
          _mat4.makeScale(0, 0, 0);
          particleInstanced.setMatrixAt(i, _mat4);
        } else {
          p.vel.y -= 5.2 * dt;
          p.pos.addScaledVector(p.vel, dt);
          const s = 1 - p.life / p.maxLife;
          _scaleVec.set(s, s, s);
          _quat.identity();
          _mat4.compose(p.pos, _quat, _scaleVec);
          particleInstanced.setMatrixAt(i, _mat4);
          particleInstanced.setColorAt(i, p.color);
        }
      }
      if (dirtyParticles) {
        particleInstanced.instanceMatrix.needsUpdate = true;
        if (particleInstanced.instanceColor) {
          particleInstanced.instanceColor.needsUpdate = true;
        }
      }

      renderer.render(scene, camera);
      if (isSoftwareGl) {
        afterDraw(tick);
      } else {
        frameId = requestAnimationFrame(tick);
      }
    };

    if (isSoftwareGl) {
      renderer.render(scene, camera);
      afterDraw(tick);
    } else {
      frameId = requestAnimationFrame(tick);
    }

    return () => {
      disposed = true;
      cancelAnimationFrame(frameId);
      clearTimeout(frameId);
      window.removeEventListener('resize', onResize);
      renderer.domElement.removeEventListener('pointerdown', onPointerDown);
      renderer.domElement.removeEventListener('pointerup', onPointerUp);
      renderer.domElement.removeEventListener('pointermove', onPointerMove);
      renderer.domElement.removeEventListener('contextmenu', onContextMenu);
      clearStageGroup();
      pedestalGeo.dispose();
      bodyGeo.dispose();
      collarGeo.dispose();
      crystalGeo.dispose();
      ringGeo.dispose();
      cageGeo.dispose();
      hitboxGeo.dispose();
      shadowDiscGeo.dispose();
      pulseSphereGeo.dispose();
      floorGeo.dispose();
      particleGeo.dispose();
      pedestalMat.dispose();
      ceramicMat.dispose();
      collarMat.dispose();
      shadowDiscMat.dispose();
      hitboxMat.dispose();
      floorMat.dispose();
      particleMat.dispose();
      gridTex.dispose();
      shadowTex.dispose();
      controls.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  const currentStage = BLOCKCHAIN_STAGES[stageIndex];
  const honestNodes = nodesState.filter((n) => n.role !== 'corrupt');
  const syncedHonest = honestNodes.filter((n) => n.status === 'synced').length;
  const corruptNodes = nodesState.filter((n) => n.role === 'corrupt');
  const quarantinedCount = corruptNodes.filter(
    (n) => n.status === 'quarantined'
  ).length;

  const hoveredNode =
    hoveredNodeId !== null
      ? nodesState.find((n) => n.id === hoveredNodeId) ?? null
      : null;
  const hoveredLabel = hoveredNode
    ? `${hoveredNode.label} · ${
        hoveredNode.role === 'genesis'
          ? 'Origem Gênesis'
          : hoveredNode.role === 'corrupt'
            ? hoveredNode.status === 'quarantined'
              ? 'Isolado'
              : 'Nó Adulterado'
            : hoveredNode.status === 'synced'
              ? 'Validado'
              : 'Pendente'
      }`
    : null;

  return (
    <div
      className="fixed inset-0 z-50 overflow-hidden bg-[#E8EEF5] select-none"
      data-testid="minigame-shell"
    >
      {/* Isolated WebGL canvas container */}
      <div
        ref={mountRef}
        data-testid="minigame-canvas-mount"
        className="h-full w-full"
      />

      {/* TITLE SCREEN OVERLAY */}
      {phase === 'title' && (
        <div className="pointer-events-none fixed inset-0 flex flex-col justify-between p-6 sm:p-10">
          <div className="pointer-events-auto max-w-md rounded-xl border border-slate-900/10 bg-[#F8FAFC]/95 p-6 shadow-lg">
            <svg
              viewBox="0 0 320 68"
              className="w-full max-w-[290px]"
              role="img"
              aria-label="Consenso 3D — Validador de Rede P2P"
            >
              <polygon
                points="28,8 48,19 48,43 28,54 8,43 8,19"
                fill="#0284C7"
                stroke="#0F172A"
                strokeWidth="2.5"
              />
              <circle cx="28" cy="31" r="6" fill="#F8FAFC" />
              <text
                x="62"
                y="32"
                fontFamily="Plus Jakarta Sans, sans-serif"
                fontWeight="800"
                fontSize="24"
                fill="#0F172A"
              >
                CONSENSO 3D
              </text>
              <text
                x="62"
                y="51"
                fontFamily="IBM Plex Mono, monospace"
                fontWeight="500"
                fontSize="11.5"
                fill="#0369A1"
              >
                VALIDADOR DE NÓS P2P
              </text>
            </svg>

            <p className="mt-3 text-sm leading-relaxed text-slate-700">
              Conecte os pares honestos ao Nó Gênesis para validar cada bloco da
              rede sem mediador central e isole os nós adulterados antes que o tempo termine.
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-3">
              <button
                type="button"
                data-start="true"
                onClick={handleStartGame}
                className="inline-flex items-center gap-2 rounded-lg bg-sky-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-sky-700 whitespace-nowrap shrink-0"
              >
                <Play className="h-4 w-4" />
                <span>Iniciar Validação</span>
              </button>
              <button
                type="button"
                onClick={onExitToCourse}
                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 whitespace-nowrap shrink-0"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Voltar ao Curso</span>
              </button>
            </div>
          </div>

          <div className="text-center font-mono text-xs font-medium text-slate-700">
            Clique nos nós para conectar · Clique direito ou [2] para isolar nó
            malicioso · Arraste para girar câmera · Enter Iniciar
          </div>
        </div>
      )}

      {/* PLAYING HUD (>= 85% unobstructed viewport, no backdrop-filter) */}
      {phase !== 'title' && (
        <div className="pointer-events-none fixed inset-0 flex flex-col justify-between p-4 sm:p-6">
          {/* Top Perimeter Row */}
          <div className="flex items-start justify-between gap-4">
            {/* Top-left Status Cluster */}
            <div className="pointer-events-auto rounded-xl border border-slate-900/12 bg-[#0F172A]/92 px-4 py-3 text-white shadow-md">
              <div className="text-[11px] font-medium text-sky-300">
                {currentStage.title}
              </div>
              <div className="mt-1.5 flex items-center gap-5 tabular-nums">
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-slate-400">
                    Nós Sincronizados
                  </div>
                  <div
                    data-testid="hud-nodes"
                    className="font-mono text-xl font-bold leading-tight text-white"
                  >
                    {syncedHonest}/{honestNodes.length}
                  </div>
                </div>
                {corruptNodes.length > 0 && (
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-slate-400">
                      Isolados
                    </div>
                    <div className="font-mono text-xl font-bold leading-tight text-amber-300">
                      {quarantinedCount}/{corruptNodes.length}
                    </div>
                  </div>
                )}
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-slate-400">
                    Tempo
                  </div>
                  <div
                    data-testid="hud-timer"
                    className={`font-mono text-xl font-bold leading-tight ${
                      timeLeft <= 15 ? 'text-red-400' : 'text-emerald-300'
                    }`}
                  >
                    {timeLeft}s
                  </div>
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-slate-400">
                    Pontos
                  </div>
                  <div
                    data-testid="hud-score"
                    className="font-mono text-xl font-bold leading-tight text-white"
                  >
                    {Math.round(score)}
                  </div>
                </div>
              </div>
              <div className="mt-2 flex flex-wrap items-center gap-3 border-t border-slate-800 pt-1.5 text-[10px] text-slate-300">
                <span className="inline-flex items-center gap-1">
                  <span className="h-2 w-2 rounded-sm bg-sky-500" /> Gênesis
                </span>
                <span className="inline-flex items-center gap-1">
                  <span className="h-2 w-2 rounded-sm bg-amber-500" /> Pendente
                </span>
                <span className="inline-flex items-center gap-1">
                  <span className="h-2 w-2 rounded-sm bg-emerald-500" /> Validado
                </span>
                {corruptNodes.length > 0 && (
                  <span className="inline-flex items-center gap-1">
                    <span className="h-2 w-2 rounded-sm bg-red-500" /> Adulterado
                  </span>
                )}
              </div>
            </div>

            {/* Top-right Utility Controls */}
            <div className="pointer-events-auto flex items-center gap-2">
              <button
                type="button"
                tabIndex={-1}
                onClick={(e) => {
                  e.currentTarget.blur();
                  handleToggleMute();
                }}
                aria-label={muted ? 'Ativar som [M]' : 'Silenciar som [M]'}
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-900/15 bg-[#0F172A]/90 text-white hover:bg-slate-800"
              >
                {muted ? (
                  <VolumeX className="h-4 w-4" />
                ) : (
                  <Volume2 className="h-4 w-4" />
                )}
              </button>
              <button
                type="button"
                tabIndex={-1}
                onClick={(e) => {
                  e.currentTarget.blur();
                  handleTogglePause();
                }}
                aria-label="Pausar [P]"
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-900/15 bg-[#0F172A]/90 text-white hover:bg-slate-800"
              >
                <Pause className="h-4 w-4" />
              </button>
              <button
                type="button"
                tabIndex={-1}
                onClick={(e) => {
                  e.currentTarget.blur();
                  loadStage(stageIndex, false);
                }}
                aria-label="Reiniciar bloco [R]"
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-900/15 bg-[#0F172A]/90 text-white hover:bg-slate-800"
              >
                <RotateCcw className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={onExitToCourse}
                className="h-10 rounded-lg border border-slate-300 bg-white px-3 text-xs font-semibold text-slate-800 hover:bg-slate-50 whitespace-nowrap shrink-0"
              >
                Sair do Jogo
              </button>
            </div>
          </div>

          {/* Bottom Unified Tool Dock */}
          <div className="flex flex-col items-center gap-2">
            {hoveredLabel && (
              <div className="rounded-md bg-[#0F172A]/90 px-3 py-1 font-mono text-xs text-white">
                {hoveredLabel}
              </div>
            )}
            <div className="pointer-events-auto flex flex-wrap items-center justify-center gap-3 rounded-xl border border-slate-900/15 bg-[#0F172A]/92 px-4 py-2.5 text-white shadow-md">
              <div className="flex items-center gap-1 rounded-lg bg-slate-800 p-1">
                <button
                  type="button"
                  onClick={() => setToolMode('connect')}
                  className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                    toolMode === 'connect'
                      ? 'bg-sky-600 text-white'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  <Link2 className="h-3.5 w-3.5" />
                  <span>Conectar [1]</span>
                </button>
                <button
                  type="button"
                  onClick={() => setToolMode('quarantine')}
                  className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                    toolMode === 'quarantine'
                      ? 'bg-amber-600 text-white'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  <ShieldBan className="h-3.5 w-3.5" />
                  <span>Isolar Nó [2]</span>
                </button>
              </div>
              <span className="text-xs text-slate-200 max-w-md text-center">
                {feedbackMsg}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* PAUSED / VICTORY / GAMEOVER MODAL */}
      {(phase === 'paused' || phase === 'victory' || phase === 'gameover') && (
        <div className="fixed inset-0 z-10 flex items-center justify-center bg-slate-950/60 p-4">
          <div className="w-full max-w-md rounded-xl border border-slate-200 bg-white p-6 text-slate-900 shadow-xl">
            <p className="text-xs font-semibold text-sky-700">
              {phase === 'paused'
                ? 'Simulação Pausada'
                : phase === 'victory'
                  ? 'Rede Validada com Sucesso'
                  : 'Tempo Esgotado'}
            </p>
            <h3 className="mt-1 font-display text-2xl font-bold text-slate-900">
              {phase === 'paused'
                ? 'Pausa na Validação'
                : phase === 'victory'
                  ? 'Consenso Completo Atingido!'
                  : 'A Rede Perdeu Sincronia'}
            </h3>
            <p className="mt-2 text-sm text-slate-600">
              {phase === 'paused'
                ? 'Você pode retomar a validação, reiniciar o bloco atual ou voltar para as aulas.'
                : phase === 'victory'
                  ? 'Você conectou todos os pares honestos ao Nó Gênesis e isolou os nós adulterados sem depender de autoridade central.'
                  : 'O tempo de validação deste bloco terminou antes que todos os nós entrassem em consenso.'}
            </p>

            <div className="mt-5 grid grid-cols-3 gap-2.5 rounded-lg border border-slate-200 bg-slate-50 p-3 text-center tabular-nums">
              <div>
                <div className="text-[11px] text-slate-500">Bloco</div>
                <div className="font-mono text-base font-bold text-slate-900">
                  {stageIndex + 1}/{BLOCKCHAIN_STAGES.length}
                </div>
              </div>
              <div>
                <div className="text-[11px] text-slate-500">Pontuação</div>
                <div className="font-mono text-base font-bold text-slate-900">
                  {Math.round(score)}
                </div>
              </div>
              <div>
                <div className="text-[11px] text-slate-500">Recorde</div>
                <div className="font-mono text-base font-bold text-emerald-700">
                  {Math.round(Math.max(bestScore, score))}
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-2.5">
              {phase === 'paused' ? (
                <button
                  type="button"
                  onClick={handleTogglePause}
                  className="flex-1 rounded-lg bg-sky-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-sky-700"
                >
                  Retomar
                </button>
              ) : (
                <button
                  type="button"
                  data-start="true"
                  onClick={handleStartGame}
                  className="flex-1 rounded-lg bg-sky-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-sky-700"
                >
                  Jogar Novamente
                </button>
              )}
              <button
                type="button"
                onClick={onExitToCourse}
                className="rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                Voltar ao Curso
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
