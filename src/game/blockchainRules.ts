export type NodeRole = 'genesis' | 'peer' | 'corrupt';
export type NodeStatus = 'synced' | 'pending' | 'quarantined';

export interface NetworkNodeData {
  id: number;
  label: string;
  role: NodeRole;
  status: NodeStatus;
  x: number;
  y: number;
  z: number;
}

export interface NetworkEdgeData {
  from: number;
  to: number;
  validated: boolean;
}

export interface StageConfig {
  stage: number;
  title: string;
  subtitle: string;
  timeLimitSeconds: number;
  nodes: NetworkNodeData[];
}

export interface LinkAttemptOutcome {
  accepted: boolean;
  reason:
    | 'connected'
    | 'same-node'
    | 'duplicate'
    | 'corrupt-link-blocked'
    | 'quarantined-node';
  newlySyncedIds: number[];
  scoreDelta: number;
  consensusReached: boolean;
}

export const BLOCKCHAIN_STAGES: StageConfig[] = [
  {
    stage: 1,
    title: 'Bloco 1 · Malha Inicial',
    subtitle: 'Conecte todos os nós pendentes ao Nó Gênesis para validar o bloco.',
    timeLimitSeconds: 60,
    nodes: [
      { id: 0, label: 'Nó Gênesis', role: 'genesis', status: 'synced', x: 0, y: 0, z: 0 },
      { id: 1, label: 'Par A', role: 'peer', status: 'pending', x: -3.2, y: 0.3, z: -1.8 },
      { id: 2, label: 'Par B', role: 'peer', status: 'pending', x: 3.2, y: 0.2, z: -1.8 },
      { id: 3, label: 'Par C', role: 'peer', status: 'pending', x: -2.8, y: 0.1, z: 2.5 },
      { id: 4, label: 'Par D', role: 'peer', status: 'pending', x: 2.9, y: 0.4, z: 2.4 },
    ],
  },
  {
    stage: 2,
    title: 'Bloco 2 · Detecção Bizantina',
    subtitle: 'Conecte os pares honestos e clique duas vezes no nó corrompido para isolá-lo.',
    timeLimitSeconds: 75,
    nodes: [
      { id: 0, label: 'Nó Gênesis', role: 'genesis', status: 'synced', x: 0, y: 0.2, z: 0 },
      { id: 1, label: 'Par A', role: 'peer', status: 'pending', x: -3.8, y: 0.5, z: -2.2 },
      { id: 2, label: 'Par B', role: 'peer', status: 'pending', x: 0.2, y: 0.7, z: -3.6 },
      { id: 3, label: 'Par C', role: 'peer', status: 'pending', x: 3.9, y: 0.4, z: -1.6 },
      { id: 4, label: 'Par D', role: 'peer', status: 'pending', x: -3.3, y: 0.1, z: 2.6 },
      { id: 5, label: 'Par E', role: 'peer', status: 'pending', x: 3.1, y: 0.3, z: 2.8 },
      { id: 6, label: 'Nó Adulterado', role: 'corrupt', status: 'pending', x: 0, y: 0.9, z: 3.5 },
    ],
  },
  {
    stage: 3,
    title: 'Bloco 3 · Consenso Distribuído',
    subtitle: 'Valide a rede completa isolando dois nós maliciosos antes do tempo acabar.',
    timeLimitSeconds: 90,
    nodes: [
      { id: 0, label: 'Nó Gênesis', role: 'genesis', status: 'synced', x: 0, y: 0.3, z: 0 },
      { id: 1, label: 'Par A', role: 'peer', status: 'pending', x: -4.4, y: 0.2, z: -2.8 },
      { id: 2, label: 'Par B', role: 'peer', status: 'pending', x: -1.4, y: 0.8, z: -4.1 },
      { id: 3, label: 'Par C', role: 'peer', status: 'pending', x: 2.2, y: 0.6, z: -3.8 },
      { id: 4, label: 'Par D', role: 'peer', status: 'pending', x: 4.6, y: 0.3, z: -0.9 },
      { id: 5, label: 'Par E', role: 'peer', status: 'pending', x: 3.8, y: 0.2, z: 3.1 },
      { id: 6, label: 'Par F', role: 'peer', status: 'pending', x: -3.9, y: 0.4, z: 2.9 },
      { id: 7, label: 'Nó Falso X', role: 'corrupt', status: 'pending', x: -2.6, y: 1.0, z: 0.1 },
      { id: 8, label: 'Nó Falso Y', role: 'corrupt', status: 'pending', x: 1.4, y: 1.0, z: 3.8 },
    ],
  },
];

export function hasEdge(edges: NetworkEdgeData[], a: number, b: number): boolean {
  return edges.some(
    (e) => (e.from === a && e.to === b) || (e.from === b && e.to === a)
  );
}

/**
 * Recomputes which honest peer nodes are reachable from any 'genesis' node
 * through validated edges.
 */
export function recomputeSyncedNodes(
  nodes: NetworkNodeData[],
  edges: NetworkEdgeData[]
): NetworkNodeData[] {
  const adj = new Map<number, number[]>();
  for (const node of nodes) {
    adj.set(node.id, []);
  }
  for (const edge of edges) {
    adj.get(edge.from)?.push(edge.to);
    adj.get(edge.to)?.push(edge.from);
  }

  const visited = new Set<number>();
  const queue: number[] = [];

  for (const node of nodes) {
    if (node.role === 'genesis') {
      visited.add(node.id);
      queue.push(node.id);
    }
  }

  while (queue.length > 0) {
    const current = queue.shift()!;
    const neighbors = adj.get(current) ?? [];
    for (const nextId of neighbors) {
      if (visited.has(nextId)) continue;
      const target = nodes.find((n) => n.id === nextId);
      if (!target || target.role === 'corrupt' || target.status === 'quarantined') {
        continue;
      }
      visited.add(nextId);
      queue.push(nextId);
    }
  }

  return nodes.map((node) => {
    if (node.role === 'corrupt') {
      return node;
    }
    return {
      ...node,
      status: visited.has(node.id) ? 'synced' : 'pending',
    };
  });
}

export function isStageComplete(nodes: NetworkNodeData[]): boolean {
  return nodes.every((node) => {
    if (node.role === 'corrupt') {
      return node.status === 'quarantined';
    }
    return node.status === 'synced';
  });
}

export function attemptConnectNodes(
  nodes: NetworkNodeData[],
  edges: NetworkEdgeData[],
  sourceId: number,
  targetId: number
): {
  nodes: NetworkNodeData[];
  edges: NetworkEdgeData[];
  outcome: LinkAttemptOutcome;
} {
  if (sourceId === targetId) {
    return {
      nodes,
      edges,
      outcome: {
        accepted: false,
        reason: 'same-node',
        newlySyncedIds: [],
        scoreDelta: 0,
        consensusReached: false,
      },
    };
  }

  const source = nodes.find((n) => n.id === sourceId);
  const target = nodes.find((n) => n.id === targetId);
  if (!source || !target) {
    return {
      nodes,
      edges,
      outcome: {
        accepted: false,
        reason: 'same-node',
        newlySyncedIds: [],
        scoreDelta: 0,
        consensusReached: false,
      },
    };
  }

  if (source.status === 'quarantined' || target.status === 'quarantined') {
    return {
      nodes,
      edges,
      outcome: {
        accepted: false,
        reason: 'quarantined-node',
        newlySyncedIds: [],
        scoreDelta: 0,
        consensusReached: false,
      },
    };
  }

  if (source.role === 'corrupt' || target.role === 'corrupt') {
    return {
      nodes,
      edges,
      outcome: {
        accepted: false,
        reason: 'corrupt-link-blocked',
        newlySyncedIds: [],
        scoreDelta: -25,
        consensusReached: false,
      },
    };
  }

  if (hasEdge(edges, sourceId, targetId)) {
    return {
      nodes,
      edges,
      outcome: {
        accepted: false,
        reason: 'duplicate',
        newlySyncedIds: [],
        scoreDelta: 0,
        consensusReached: false,
      },
    };
  }

  const nextEdges: NetworkEdgeData[] = [
    ...edges,
    { from: sourceId, to: targetId, validated: true },
  ];

  const prevSynced = new Set(
    nodes.filter((n) => n.status === 'synced').map((n) => n.id)
  );
  const updatedNodes = recomputeSyncedNodes(nodes, nextEdges);
  const newlySyncedIds = updatedNodes
    .filter((n) => n.status === 'synced' && !prevSynced.has(n.id))
    .map((n) => n.id);

  const consensusReached = isStageComplete(updatedNodes);
  const scoreDelta =
    50 + newlySyncedIds.length * 100 + (consensusReached ? 250 : 0);

  return {
    nodes: updatedNodes,
    edges: nextEdges,
    outcome: {
      accepted: true,
      reason: 'connected',
      newlySyncedIds,
      scoreDelta,
      consensusReached,
    },
  };
}

export function quarantineCorruptNode(
  nodes: NetworkNodeData[],
  nodeId: number
): {
  nodes: NetworkNodeData[];
  accepted: boolean;
  scoreDelta: number;
  consensusReached: boolean;
} {
  const target = nodes.find((n) => n.id === nodeId);
  if (!target || target.role !== 'corrupt' || target.status === 'quarantined') {
    return {
      nodes,
      accepted: false,
      scoreDelta: target && target.role !== 'corrupt' ? -20 : 0,
      consensusReached: false,
    };
  }

  const nextNodes = nodes.map((n) =>
    n.id === nodeId ? { ...n, status: 'quarantined' as const } : n
  );
  const consensusReached = isStageComplete(nextNodes);
  return {
    nodes: nextNodes,
    accepted: true,
    scoreDelta: 150 + (consensusReached ? 250 : 0),
    consensusReached,
  };
}
