import React, { useEffect, useState } from 'react';
import {
  AlertTriangle,
  ArrowLeftRight,
  ArrowRight,
  Building2,
  CheckCircle2,
  Globe2,
  Lock,
  Pause,
  Play,
  RotateCcw,
  Search,
  ShieldAlert,
  ShieldCheck,
  SkipBack,
  SkipForward,
  Unlock,
  Users,
  Wallet,
} from 'lucide-react';
import type { CourseModule } from '../types/course';
import { GLOSSARY_ITEMS } from '../data/glossaryFaqQuizData';

interface DiagramProps {
  diagramId: CourseModule['diagramId'];
}

export const InteractiveDiagram: React.FC<DiagramProps> = ({ diagramId }) => {
  switch (diagramId) {
    case 'traditional-vs-p2p':
      return <TraditionalVsP2PDiagram />;
    case 'p2p-practice-flow':
      return <PracticeFlowDiagram />;
    case 'p2p-sectors':
      return <SectorsExplorerDiagram />;
    case 'crypto-orderbook-escrow':
      return <OrderBookEscrowDiagram />;
    case 'six-step-trade':
      return <SixStepTradeSimulator />;
    case 'advantages-matrix':
      return <AdvantagesExplorer />;
    case 'scam-detector':
      return <ScamDetectorSimulator />;
    case 'glossary-explorer':
      return <GlossaryExplorer />;
    case 'safety-checklist':
      return <SafetyChecklistInteractive />;
    default:
      return null;
  }
};

/* 1. Módulo 1: Modelo Tradicional vs P2P */
const TraditionalVsP2PDiagram: React.FC = () => {
  const [mode, setMode] = useState<'traditional' | 'p2p'>('p2p');

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div>
          <p className="text-xs font-medium text-slate-500">
            Diagrama comparativo interativo
          </p>
          <h4 className="text-base font-semibold text-slate-900">
            Como o caminho muda entre os dois modelos
          </h4>
        </div>
        <div
          role="group"
          aria-label="Selecionar modelo de negociação"
          className="inline-flex rounded-lg bg-slate-100 p-1"
        >
          <button
            type="button"
            onClick={() => setMode('traditional')}
            className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
              mode === 'traditional'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Modelo Tradicional
          </button>
          <button
            type="button"
            onClick={() => setMode('p2p')}
            className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
              mode === 'p2p'
                ? 'bg-white text-sky-700 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Modelo P2P (Direto)
          </button>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-6 lg:grid-cols-5 lg:items-center">
        <div className="lg:col-span-3 rounded-lg border border-slate-100 bg-slate-50 p-4">
          <svg
            viewBox="0 0 560 200"
            className="w-full h-auto"
            role="img"
            aria-label={
              mode === 'traditional'
                ? 'Diagrama mostrando que no modelo tradicional tudo passa por uma instituição central.'
                : 'Diagrama mostrando que no modelo P2P os participantes se conectam diretamente.'
            }
          >
            {/* Linhas de conexão */}
            {mode === 'traditional' ? (
              <>
                <line
                  x1="120"
                  y1="100"
                  x2="235"
                  y2="100"
                  stroke="#94A3B8"
                  strokeWidth="3"
                  strokeDasharray="6 4"
                />
                <line
                  x1="325"
                  y1="100"
                  x2="440"
                  y2="100"
                  stroke="#94A3B8"
                  strokeWidth="3"
                  strokeDasharray="6 4"
                />
                <circle cx="178" cy="100" r="5" fill="#D97706">
                  <animate
                    attributeName="cx"
                    values="125;230"
                    dur="1.6s"
                    repeatCount="indefinite"
                  />
                </circle>
                <circle cx="382" cy="100" r="5" fill="#D97706">
                  <animate
                    attributeName="cx"
                    values="330;435"
                    dur="1.6s"
                    repeatCount="indefinite"
                  />
                </circle>
              </>
            ) : (
              <>
                <path
                  d="M 122 88 Q 280 28 438 88"
                  fill="none"
                  stroke="#0284C7"
                  strokeWidth="3.5"
                />
                <path
                  d="M 438 112 Q 280 172 122 112"
                  fill="none"
                  stroke="#059669"
                  strokeWidth="3.5"
                />
                <circle r="6" fill="#0284C7">
                  <animateMotion
                    dur="1.8s"
                    repeatCount="indefinite"
                    path="M 122 88 Q 280 28 438 88"
                  />
                </circle>
                <circle r="6" fill="#059669">
                  <animateMotion
                    dur="1.8s"
                    repeatCount="indefinite"
                    path="M 438 112 Q 280 172 122 112"
                  />
                </circle>
              </>
            )}

            {/* Participante A */}
            <g transform="translate(80, 100)">
              <circle r="38" fill="#FFFFFF" stroke="#0F172A" strokeWidth="2" />
              <text
                y="-4"
                textAnchor="middle"
                className="fill-slate-900 text-[12px] font-semibold"
              >
                Pessoa A
              </text>
              <text
                y="14"
                textAnchor="middle"
                className="fill-slate-500 text-[10px]"
              >
                Comprador
              </text>
            </g>

            {/* Centro (Instituição ou Troca Direta) */}
            {mode === 'traditional' ? (
              <g transform="translate(280, 100)">
                <rect
                  x="-46"
                  y="-42"
                  width="92"
                  height="84"
                  rx="10"
                  fill="#FEF3C7"
                  stroke="#D97706"
                  strokeWidth="2"
                />
                <text
                  y="-6"
                  textAnchor="middle"
                  className="fill-amber-900 text-[11px] font-semibold"
                >
                  Instituição
                </text>
                <text
                  y="10"
                  textAnchor="middle"
                  className="fill-amber-800 text-[10px]"
                >
                  Central
                </text>
                <text
                  y="26"
                  textAnchor="middle"
                  className="fill-amber-700 text-[9px]"
                >
                  (define regras)
                </text>
              </g>
            ) : (
              <g transform="translate(280, 100)">
                <rect
                  x="-64"
                  y="-16"
                  width="128"
                  height="32"
                  rx="6"
                  fill="#E0F2FE"
                  stroke="#0284C7"
                  strokeWidth="1.5"
                />
                <text
                  y="4"
                  textAnchor="middle"
                  className="fill-sky-900 text-[11px] font-semibold"
                >
                  Acordo direto P2P
                </text>
              </g>
            )}

            {/* Participante B */}
            <g transform="translate(480, 100)">
              <circle r="38" fill="#FFFFFF" stroke="#0F172A" strokeWidth="2" />
              <text
                y="-4"
                textAnchor="middle"
                className="fill-slate-900 text-[12px] font-semibold"
              >
                Pessoa B
              </text>
              <text
                y="14"
                textAnchor="middle"
                className="fill-slate-500 text-[10px]"
              >
                Vendedor
              </text>
            </g>
          </svg>
        </div>

        <div className="lg:col-span-2 space-y-3">
          {mode === 'traditional' ? (
            <div className="space-y-3 text-sm text-slate-700">
              <div className="flex items-start gap-2.5">
                <Building2 className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
                <p>
                  <strong className="text-slate-900">Controle centralizado:</strong>{' '}
                  Uma empresa ou banco fica no centro autorizando cada passo, definindo taxas e horários.
                </p>
              </div>
              <div className="flex items-start gap-2.5">
                <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
                <p>
                  <strong className="text-slate-900">Menor flexibilidade:</strong>{' '}
                  Você aceita apenas os meios de pagamento e preços da instituição.
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-3 text-sm text-slate-700">
              <div className="flex items-start gap-2.5">
                <Users className="mt-0.5 h-4 w-4 shrink-0 text-sky-600" />
                <p>
                  <strong className="text-slate-900">Conexão direta:</strong>{' '}
                  Pessoa A e Pessoa B combinam o negócio diretamente, com igualdade de papéis.
                </p>
              </div>
              <div className="flex items-start gap-2.5">
                <ArrowLeftRight className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                <p>
                  <strong className="text-slate-900">Mais autonomia:</strong>{' '}
                  As partes escolhem oferta, valor, prazo e forma de pagamento combinada.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

/* 2. Módulo 2: Como funciona na prática */
const PracticeFlowDiagram: React.FC = () => {
  const [step, setStep] = useState(0);
  const [usePlatform, setUsePlatform] = useState(true);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);

  const steps = [
    {
      label: '1. Encontro',
      actor: 'Comprador e Vendedor se localizam',
      detail:
        'Quem quer vender publica uma proposta com valor e regras. Quem quer comprar encontra essa oferta diretamente ou dentro de uma plataforma.',
      chat: 'Comprador: "Olá! Vi sua oferta. Ainda está disponível para negociarmos agora?"',
      packetMode: 'none' as const,
    },
    {
      label: '2. Acordo',
      actor: 'Regras combinadas e reserva',
      detail: usePlatform
        ? 'Ambas as partes confirmam preço, prazo e pagamento no chat. A plataforma intermediadora trava o ativo em custódia.'
        : 'As duas partes combinam preço, prazo e meio de pagamento diretamente por escrito, sem plataforma intermediadora.',
      chat: 'Vendedor: "Sim! Valor fechado via Pix em conta própria. Prazo de 15 minutos."',
      packetMode: 'lock' as const,
    },
    {
      label: '3. Pagamento',
      actor: 'Comprador envia o dinheiro',
      detail:
        'O comprador transfere o valor combinado diretamente para a conta do vendedor usando o meio combinado (como Pix ou transferência).',
      chat: 'Comprador: "Pagamento de R$ 200 enviado da minha conta para a sua!"',
      packetMode: 'payment' as const,
    },
    {
      label: '4. Liberação',
      actor: 'Conferência e entrega dos ativos',
      detail:
        'O vendedor confirma o saldo real no próprio banco e libera o ativo ou item ao comprador, concluindo a troca.',
      chat: 'Vendedor: "Valor confirmado no extrato do meu banco! Ativo liberado com sucesso."',
      packetMode: 'asset' as const,
    },
  ];

  useEffect(() => {
    if (!isAutoPlaying) return;
    const t = window.setInterval(() => {
      setStep((s) => {
        if (s >= 3) {
          setIsAutoPlaying(false);
          return 3;
        }
        return s + 1;
      });
    }, 2200);
    return () => window.clearInterval(t);
  }, [isAutoPlaying]);

  const current = steps[step];

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <p className="text-xs font-medium text-slate-500">
            Simulação visual animada · Como funciona na prática
          </p>
          <h4 className="text-base font-semibold text-slate-900">
            Acompanhe uma troca direta com ou sem plataforma intermediadora
          </h4>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div
            role="group"
            aria-label="Tipo de ambiente P2P"
            className="inline-flex rounded-lg bg-slate-100 p-1"
          >
            <button
              type="button"
              onClick={() => setUsePlatform(true)}
              className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                usePlatform
                  ? 'bg-white text-sky-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Com Plataforma
            </button>
            <button
              type="button"
              onClick={() => setUsePlatform(false)}
              className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                !usePlatform
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Direto (Sem Plataforma)
            </button>
          </div>

          <button
            type="button"
            onClick={() => {
              if (step === 3) setStep(0);
              setIsAutoPlaying((p) => !p);
            }}
            className="inline-flex items-center gap-1.5 rounded-lg bg-sky-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-sky-700 whitespace-nowrap shrink-0"
          >
            {isAutoPlaying ? (
              <>
                <Pause className="h-3.5 w-3.5" />
                <span>Pausar</span>
              </>
            ) : (
              <>
                <Play className="h-3.5 w-3.5" />
                <span>Animar</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Diagrama SVG animado mostrando Comprador, Plataforma (se aplicável), Vendedor, Pagamento e Liberação */}
      <div className="mb-4 rounded-lg border border-slate-100 bg-slate-50 p-3 sm:p-4">
        <svg
          viewBox="0 0 640 210"
          className="w-full h-auto"
          role="img"
          aria-label="Diagrama animado mostrando comprador, plataforma intermediadora opcional, vendedor, pagamento e liberação dos ativos"
        >
          {/* Plataforma intermediadora opcional no topo */}
          <g
            transform="translate(320, 44)"
            opacity={usePlatform ? 1 : 0.35}
          >
            <rect
              x="-105"
              y="-26"
              width="210"
              height="52"
              rx="10"
              fill={usePlatform ? '#EFF6FF' : '#F1F5F9'}
              stroke={
                usePlatform
                  ? step >= 1
                    ? '#0284C7'
                    : '#93C5FD'
                  : '#CBD5E1'
              }
              strokeWidth="2"
              strokeDasharray={usePlatform ? undefined : '5 4'}
            />
            <text
              y="-4"
              textAnchor="middle"
              className="fill-slate-900 text-[11px] font-bold"
            >
              {usePlatform
                ? 'Plataforma Intermediadora'
                : 'Sem Intermediador (Direto)'}
            </text>
            <text
              y="13"
              textAnchor="middle"
              className="fill-slate-600 text-[10px]"
            >
              {usePlatform
                ? step >= 1 && step < 3
                  ? 'Custódia travada · Chat ativo'
                  : step === 3
                    ? 'Custódia liberada!'
                    : 'Mural de ofertas e mediação'
                : 'Comunicação direta entre pares'}
            </text>
          </g>

          {/* Linha de pagamento (Comprador -> Vendedor) */}
          <path
            d="M 135 142 Q 320 185 505 142"
            fill="none"
            stroke={step >= 2 ? '#059669' : '#CBD5E1'}
            strokeWidth={step === 2 ? '3.5' : '2'}
            strokeDasharray={step >= 2 ? undefined : '5 4'}
          />
          <text
            x="320"
            y="178"
            textAnchor="middle"
            className={`text-[10.5px] font-semibold ${
              step >= 2 ? 'fill-emerald-700' : 'fill-slate-400'
            }`}
          >
            Processo de Pagamento (ex.: Pix direto)
          </text>

          {/* Bolinha animada de pagamento na etapa 3 */}
          {step === 2 && (
            <circle r="7" fill="#059669">
              <animateMotion
                dur="1.4s"
                repeatCount="indefinite"
                path="M 135 142 Q 320 185 505 142"
              />
            </circle>
          )}

          {/* Linha de liberação de ativos (Vendedor/Plataforma -> Comprador) */}
          <path
            d={
              usePlatform
                ? 'M 505 112 Q 415 55 320 70 Q 225 55 135 112'
                : 'M 505 118 Q 320 76 135 118'
            }
            fill="none"
            stroke={step >= 3 ? '#0284C7' : '#CBD5E1'}
            strokeWidth={step === 3 ? '3.5' : '2'}
            strokeDasharray={step >= 3 ? undefined : '5 4'}
          />
          <text
            x="320"
            y="96"
            textAnchor="middle"
            className={`text-[10.5px] font-semibold ${
              step >= 3 ? 'fill-sky-700' : 'fill-slate-400'
            }`}
          >
            {step >= 3
              ? 'Ativos liberados ao Comprador!'
              : 'Entrega / Liberação dos Ativos'}
          </text>

          {/* Bolinha animada de liberação de ativos na etapa 4 */}
          {step === 3 && (
            <circle r="7" fill="#0284C7">
              <animateMotion
                dur="1.4s"
                repeatCount="indefinite"
                path={
                  usePlatform
                    ? 'M 505 112 Q 415 55 320 70 Q 225 55 135 112'
                    : 'M 505 118 Q 320 76 135 118'
                }
              />
            </circle>
          )}

          {/* Comprador */}
          <g transform="translate(88, 130)">
            <rect
              x="-58"
              y="-34"
              width="116"
              height="68"
              rx="12"
              fill={step === 0 || step === 2 || step === 3 ? '#E0F2FE' : '#FFFFFF'}
              stroke={step === 0 || step === 2 || step === 3 ? '#0284C7' : '#0F172A'}
              strokeWidth="2"
            />
            <text
              y="-6"
              textAnchor="middle"
              className="fill-slate-900 text-[12px] font-bold"
            >
              Comprador
            </text>
            <text
              y="12"
              textAnchor="middle"
              className="fill-slate-600 text-[10px]"
            >
              {step === 0
                ? 'Escolhe proposta'
                : step === 1
                  ? 'Confirma acordo'
                  : step === 2
                    ? 'Envia pagamento'
                    : 'Recebe os ativos'}
            </text>
          </g>

          {/* Vendedor */}
          <g transform="translate(552, 130)">
            <rect
              x="-58"
              y="-34"
              width="116"
              height="68"
              rx="12"
              fill={step === 1 || step === 3 ? '#ECFDF5' : '#FFFFFF'}
              stroke={step === 1 || step === 3 ? '#059669' : '#0F172A'}
              strokeWidth="2"
            />
            <text
              y="-6"
              textAnchor="middle"
              className="fill-slate-900 text-[12px] font-bold"
            >
              Vendedor
            </text>
            <text
              y="12"
              textAnchor="middle"
              className="fill-slate-600 text-[10px]"
            >
              {step === 0
                ? 'Publica oferta'
                : step === 1
                  ? 'Reserva ativo'
                  : step === 2
                    ? 'Confere no banco'
                    : 'Libera os ativos'}
            </text>
          </g>
        </svg>
      </div>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {steps.map((item, idx) => (
          <button
            key={item.label}
            type="button"
            onClick={() => {
              setIsAutoPlaying(false);
              setStep(idx);
            }}
            className={`rounded-lg border px-3 py-2.5 text-left text-xs font-medium transition-colors ${
              step === idx
                ? 'border-sky-600 bg-sky-50 text-sky-900'
                : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
            }`}
          >
            <div className="font-semibold">{item.label}</div>
            <div className="mt-0.5 text-[11px] opacity-80">{item.actor}</div>
          </button>
        ))}
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="rounded-lg border border-slate-100 bg-slate-50 p-4">
          <div className="text-xs font-medium text-sky-700">{current.label}</div>
          <p className="mt-1.5 text-sm leading-relaxed text-slate-700">
            {current.detail}
          </p>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-4">
          <div className="text-xs font-medium text-slate-500">
            Exemplo de comunicação entre as partes
          </div>
          <p className="mt-2 font-mono text-xs leading-relaxed text-slate-800">
            {current.chat}
          </p>
        </div>
      </div>
    </div>
  );
};

/* 3. Módulo 3: Onde o P2P é utilizado */
const SectorsExplorerDiagram: React.FC = () => {
  const sectors = [
    {
      id: 'files',
      title: 'Compartilhamento de arquivos',
      example: 'BitTorrent e distribuição de software livre',
      desc: 'Em vez de milhões de pessoas baixarem um arquivo de um único servidor lento, cada usuário baixa pequenos pedaços de outros usuários e ajuda a distribuir.',
      benefit: 'Menos congestionamento e maior velocidade coletiva.',
    },
    {
      id: 'networks',
      title: 'Redes de computadores',
      example: 'Chamadas de áudio/vídeo e jogos em rede direta',
      desc: 'Dois aparelhos se comunicam diretamente ponto a ponto pela internet para diminuir o caminho que os dados precisam percorrer.',
      benefit: 'Menor atraso (latência) na comunicação direta.',
    },
    {
      id: 'transfers',
      title: 'Transferências digitais',
      example: 'Envios de pessoa para pessoa entre carteiras',
      desc: 'Permite enviar valor digital diretamente de uma conta ou carteira para outra a qualquer hora do dia.',
      benefit: 'Agilidade sem depender do expediente bancário tradicional.',
    },
    {
      id: 'marketplaces',
      title: 'Marketplaces P2P',
      example: 'Plataformas de classificados, caronas e serviços',
      desc: 'Aplicativos que apenas conectam quem oferece um produto, quarto ou serviço com quem precisa, sem que a plataforma seja a dona do produto.',
      benefit: 'Variedade de preços e negociação flexível.',
    },
    {
      id: 'crypto',
      title: 'Mercado de criptomoedas',
      example: 'Redes blockchain e compra/venda direta',
      desc: 'As próprias blockchains são redes P2P de computadores validadores, e usuários também negociam criptomoedas diretamente entre si.',
      benefit: 'Autonomia financeira e verificação descentralizada.',
    },
  ];

  const [activeId, setActiveId] = useState(sectors[0].id);
  const current = sectors.find((s) => s.id === activeId) ?? sectors[0];

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6">
      <div className="mb-4">
        <p className="text-xs font-medium text-slate-500">
          Explorador multissetorial
        </p>
        <h4 className="text-base font-semibold text-slate-900">
          Selecione um setor para ver como o P2P funciona fora e dentro de cripto
        </h4>
      </div>

      <div className="flex flex-wrap gap-2">
        {sectors.map((sector) => (
          <button
            key={sector.id}
            type="button"
            onClick={() => setActiveId(sector.id)}
            className={`rounded-lg border px-3 py-2 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
              activeId === sector.id
                ? 'border-sky-600 bg-sky-600 text-white'
                : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
            }`}
          >
            {sector.title}
          </button>
        ))}
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 rounded-lg border border-slate-100 bg-slate-50 p-4 md:grid-cols-3">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
            <Globe2 className="h-4 w-4 text-sky-600" />
            <span>{current.title}</span>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-slate-700">
            {current.desc}
          </p>
        </div>
        <div className="space-y-2 border-t border-slate-200 pt-3 md:border-l md:border-t-0 md:pl-4 md:pt-0">
          <div>
            <div className="text-[11px] font-medium text-slate-500">
              Exemplo cotidiano
            </div>
            <div className="text-xs font-medium text-slate-900">
              {current.example}
            </div>
          </div>
          <div>
            <div className="text-[11px] font-medium text-slate-500">
              Ganho principal
            </div>
            <div className="text-xs font-medium text-emerald-700">
              {current.benefit}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* 4. Módulo 4: Simulador de Ofertas & Escrow */
const OrderBookEscrowDiagram: React.FC = () => {
  const offers = [
    {
      id: 'o1',
      seller: 'Vendedor Alfa',
      reputation: '99,2% positivas · 840 ordens',
      price: 'R$ 5,42 / unidade',
      limits: 'R$ 50 a R$ 2.000',
      method: 'Pix (mesma titularidade)',
      note: 'Ótima reputação, tempo médio de liberação: 4 min.',
      trustLevel: 'Alta confiança',
    },
    {
      id: 'o2',
      seller: 'Vendedor Beta',
      reputation: '96,5% positivas · 115 ordens',
      price: 'R$ 5,39 / unidade',
      limits: 'R$ 200 a R$ 5.000',
      method: 'Pix ou TED bancária',
      note: 'Preço ligeiramente menor, mas exige valor mínimo maior.',
      trustLevel: 'Boa confiança',
    },
    {
      id: 'o3',
      seller: 'Anúncio suspeito (exemplo didático)',
      reputation: '68,0% positivas · 3 ordens',
      price: 'R$ 4,50 / unidade (muito abaixo)',
      limits: 'Sem limite · "Chamar no WhatsApp"',
      method: 'Fora da plataforma',
      note: 'Sinal de alerta: preço irreal + pedido para sair da plataforma sem Escrow.',
      trustLevel: 'Risco elevado',
    },
  ];

  const [selectedId, setSelectedId] = useState('o1');
  const [escrowLocked, setEscrowLocked] = useState(true);
  const selected = offers.find((o) => o.id === selectedId) ?? offers[0];

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-medium text-slate-500">
            Simulador de livro de ofertas P2P
          </p>
          <h4 className="text-base font-semibold text-slate-900">
            Compare ofertas fictícias e teste o efeito da custódia (Escrow)
          </h4>
        </div>
        <button
          type="button"
          onClick={() => setEscrowLocked((prev) => !prev)}
          className={`inline-flex items-center gap-2 rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
            escrowLocked
              ? 'border-emerald-200 bg-emerald-50 text-emerald-800'
              : 'border-amber-200 bg-amber-50 text-amber-800'
          }`}
        >
          {escrowLocked ? (
            <>
              <Lock className="h-3.5 w-3.5" />
              <span>Escrow Ativo (Protegido)</span>
            </>
          ) : (
            <>
              <Unlock className="h-3.5 w-3.5" />
              <span>Sem Escrow (Troca por fora)</span>
            </>
          )}
        </button>
      </div>

      <div className="space-y-2.5">
        {offers.map((offer) => {
          const isSelected = offer.id === selectedId;
          const isRisk = offer.id === 'o3';
          return (
            <button
              key={offer.id}
              type="button"
              onClick={() => setSelectedId(offer.id)}
              className={`w-full rounded-lg border p-3.5 text-left transition-colors ${
                isSelected
                  ? isRisk
                    ? 'border-red-300 bg-red-50/70'
                    : 'border-sky-500 bg-sky-50/60'
                  : 'border-slate-200 bg-white hover:bg-slate-50'
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <div className="text-sm font-semibold text-slate-900">
                    {offer.seller}
                  </div>
                  <div className="text-xs text-slate-500">
                    {offer.reputation}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-mono text-sm font-semibold text-slate-900 tabular-nums">
                    {offer.price}
                  </div>
                  <div className="text-xs text-slate-500">{offer.limits}</div>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <div className="mt-4 rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="font-semibold text-slate-900">
            Análise da oferta selecionada: {selected.seller}
          </span>
          <span
            className={`text-xs font-semibold ${
              selected.id === 'o3' ? 'text-red-700' : 'text-emerald-700'
            }`}
          >
            {selected.trustLevel}
          </span>
        </div>
        <p className="mt-1.5 text-slate-700">{selected.note}</p>
        <p className="mt-2 text-xs text-slate-600">
          <strong>Status da Custódia:</strong>{' '}
          {escrowLocked && selected.id !== 'o3'
            ? 'As moedas do vendedor estão bloqueadas no cofre temporário da plataforma até você pagar e ele confirmar.'
            : 'Sem Escrow ativo! Se você transferir dinheiro por fora, não existe trava automática protegendo as moedas.'}
        </p>
      </div>
    </div>
  );
};

/* 5. Módulo 5: Passo a passo animado de 6 etapas com Diagrama Visual de Fluxo */
const SixStepTradeSimulator: React.FC = () => {
  const [step, setStep] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);

  const stages = [
    {
      num: 1,
      title: 'Comprador escolhe uma oferta',
      who: 'Responsabilidade: Comprador',
      desc: 'O comprador analisa preço, reputação, limites e seleciona a oferta desejada na vitrine.',
      buyerState: 'Escolhendo oferta',
      escrowState: 'Cofre vazio',
      sellerState: 'Anúncio publicado',
    },
    {
      num: 2,
      title: 'Vendedor aceita a negociação',
      who: 'Responsabilidade: Vendedor / Plataforma',
      desc: 'A ordem é aberta com cotação congelada e prazo limite definido para concluir.',
      buyerState: 'Ordem aberta (15 min)',
      escrowState: 'Preparando custódia',
      sellerState: 'Aceitou o pedido',
    },
    {
      num: 3,
      title: 'Ativos bloqueados em custódia (Escrow)',
      who: 'Responsabilidade: Plataforma intermediadora',
      desc: 'Quando disponível, a plataforma trava os ativos digitais do vendedor no cofre temporário para proteger a troca.',
      buyerState: 'Pronto para pagar',
      escrowState: 'Ativos TRAVADOS',
      sellerState: 'Ativos reservados',
    },
    {
      num: 4,
      title: 'Comprador realiza o pagamento',
      who: 'Responsabilidade: Comprador',
      desc: 'O comprador envia o valor exato (ex.: Pix da própria conta) direto para o vendedor e marca como pago.',
      buyerState: 'Pagou valor exato',
      escrowState: 'Ativos TRAVADOS',
      sellerState: 'Recebendo no banco',
    },
    {
      num: 5,
      title: 'Vendedor confirma o recebimento no banco',
      who: 'Responsabilidade: Vendedor (crítica)',
      desc: 'O vendedor abre o próprio aplicativo bancário e confirma o crédito real no extrato — nunca só por print.',
      buyerState: 'Aguardando liberação',
      escrowState: 'Autorizando saída',
      sellerState: 'Saldo confirmado!',
    },
    {
      num: 6,
      title: 'Ativos liberados ao comprador',
      who: 'Responsabilidade: Vendedor / Plataforma',
      desc: 'O vendedor autoriza a liberação e o Escrow entrega os ativos digitais na carteira ou conta do comprador.',
      buyerState: 'Ativos RECEBIDOS',
      escrowState: 'Concluído e vazio',
      sellerState: 'Dinheiro na conta',
    },
  ];

  useEffect(() => {
    if (!isPlaying) return;
    const timer = window.setInterval(() => {
      setStep((prev) => {
        if (prev >= 6) {
          setIsPlaying(false);
          return 6;
        }
        return prev + 1;
      });
    }, 2200);
    return () => window.clearInterval(timer);
  }, [isPlaying]);

  const current = stages[step - 1];

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <p className="text-xs font-medium text-slate-500">
            Simulador animado · Etapa {step} de 6
          </p>
          <h4 className="text-base font-semibold text-slate-900">
            {current.title}
          </h4>
        </div>
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => {
              setIsPlaying(false);
              setStep((s) => Math.max(1, s - 1));
            }}
            disabled={step <= 1}
            aria-label="Etapa anterior da simulação"
            className="rounded-lg border border-slate-200 p-2 text-slate-700 hover:bg-slate-50 disabled:opacity-40"
          >
            <SkipBack className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => {
              if (step === 6) setStep(1);
              setIsPlaying((p) => !p);
            }}
            className="inline-flex items-center gap-1.5 rounded-lg bg-sky-600 px-3 py-2 text-xs font-medium text-white hover:bg-sky-700 whitespace-nowrap shrink-0"
          >
            {isPlaying ? (
              <>
                <Pause className="h-3.5 w-3.5" />
                <span>Pausar</span>
              </>
            ) : (
              <>
                <Play className="h-3.5 w-3.5" />
                <span>{step === 6 ? 'Reproduzir de novo' : 'Reproduzir'}</span>
              </>
            )}
          </button>
          <button
            type="button"
            onClick={() => {
              setIsPlaying(false);
              setStep((s) => Math.min(6, s + 1));
            }}
            disabled={step >= 6}
            aria-label="Próxima etapa da simulação"
            className="rounded-lg border border-slate-200 p-2 text-slate-700 hover:bg-slate-50 disabled:opacity-40"
          >
            <SkipForward className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => {
              setIsPlaying(false);
              setStep(1);
            }}
            aria-label="Reiniciar simulação"
            className="rounded-lg border border-slate-200 p-2 text-slate-700 hover:bg-slate-50"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Diagrama SVG animado do fluxo completo de 6 etapas */}
      <div className="mt-4 rounded-lg border border-slate-100 bg-slate-50 p-3 sm:p-4">
        <svg
          viewBox="0 0 640 220"
          className="w-full h-auto"
          role="img"
          aria-label={`Diagrama animado da etapa ${step}: ${current.title}`}
        >
          {/* Seta 1: Vendedor -> Escrow (Bloqueio na etapa 3) */}
          <path
            d="M 495 102 Q 420 55 380 58"
            fill="none"
            stroke={step >= 3 ? '#D97706' : '#CBD5E1'}
            strokeWidth={step === 3 ? '3.5' : '2'}
            strokeDasharray={step >= 3 ? undefined : '5 4'}
          />
          {step === 3 && (
            <circle r="6" fill="#D97706">
              <animateMotion
                dur="1.3s"
                repeatCount="indefinite"
                path="M 495 102 Q 420 55 380 58"
              />
            </circle>
          )}

          {/* Seta 2: Comprador -> Vendedor (Pagamento na etapa 4) */}
          <path
            d="M 148 156 Q 320 202 492 156"
            fill="none"
            stroke={step >= 4 ? '#059669' : '#CBD5E1'}
            strokeWidth={step === 4 ? '3.5' : '2'}
            strokeDasharray={step >= 4 ? undefined : '5 4'}
          />
          <text
            x="320"
            y="196"
            textAnchor="middle"
            className={`text-[10.5px] font-semibold ${
              step >= 4 ? 'fill-emerald-700' : 'fill-slate-400'
            }`}
          >
            {step >= 5
              ? 'Pagamento confirmado no extrato bancário'
              : 'Pagamento direto (ex.: Pix) para a conta do vendedor'}
          </text>
          {step === 4 && (
            <circle r="7" fill="#059669">
              <animateMotion
                dur="1.3s"
                repeatCount="indefinite"
                path="M 148 156 Q 320 202 492 156"
              />
            </circle>
          )}

          {/* Seta 3: Escrow -> Comprador (Liberação na etapa 6) */}
          <path
            d="M 260 58 Q 200 58 145 102"
            fill="none"
            stroke={step >= 6 ? '#0284C7' : '#CBD5E1'}
            strokeWidth={step === 6 ? '3.5' : '2'}
            strokeDasharray={step >= 6 ? undefined : '5 4'}
          />
          {step === 6 && (
            <circle r="7" fill="#0284C7">
              <animateMotion
                dur="1.3s"
                repeatCount="indefinite"
                path="M 260 58 Q 200 58 145 102"
              />
            </circle>
          )}

          {/* Caixa Central: Plataforma / Custódia (Escrow) */}
          <g transform="translate(320, 56)">
            <rect
              x="-96"
              y="-32"
              width="192"
              height="64"
              rx="10"
              fill={
                step >= 3 && step <= 5
                  ? '#FEF3C7'
                  : step === 6
                    ? '#ECFDF5'
                    : '#FFFFFF'
              }
              stroke={
                step >= 3 && step <= 5
                  ? '#D97706'
                  : step === 6
                    ? '#059669'
                    : '#94A3B8'
              }
              strokeWidth="2"
            />
            <text
              y="-6"
              textAnchor="middle"
              className="fill-slate-900 text-[11px] font-bold"
            >
              Plataforma · Custódia (Escrow)
            </text>
            <text
              y="13"
              textAnchor="middle"
              className="fill-slate-700 text-[10.5px] font-medium"
            >
              {current.escrowState}
            </text>
          </g>

          {/* Comprador */}
          <g transform="translate(92, 134)">
            <rect
              x="-64"
              y="-34"
              width="128"
              height="68"
              rx="12"
              fill={
                step === 1 || step === 4 || step === 6 ? '#E0F2FE' : '#FFFFFF'
              }
              stroke={
                step === 1 || step === 4 || step === 6 ? '#0284C7' : '#0F172A'
              }
              strokeWidth="2"
            />
            <text
              y="-6"
              textAnchor="middle"
              className="fill-slate-900 text-[12px] font-bold"
            >
              Comprador
            </text>
            <text
              y="12"
              textAnchor="middle"
              className="fill-slate-600 text-[10px]"
            >
              {current.buyerState}
            </text>
          </g>

          {/* Vendedor */}
          <g transform="translate(548, 134)">
            <rect
              x="-64"
              y="-34"
              width="128"
              height="68"
              rx="12"
              fill={
                step === 2 || step === 5 || step === 6 ? '#ECFDF5' : '#FFFFFF'
              }
              stroke={
                step === 2 || step === 5 || step === 6 ? '#059669' : '#0F172A'
              }
              strokeWidth="2"
            />
            <text
              y="-6"
              textAnchor="middle"
              className="fill-slate-900 text-[12px] font-bold"
            >
              Vendedor
            </text>
            <text
              y="12"
              textAnchor="middle"
              className="fill-slate-600 text-[10px]"
            >
              {current.sellerState}
            </text>
          </g>
        </svg>
      </div>

      {/* Três colunas de status */}
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div
          className={`rounded-lg border p-3.5 transition-colors ${
            step === 1 || step === 4 || step === 6
              ? 'border-sky-300 bg-sky-50/70'
              : 'border-slate-200 bg-slate-50/60'
          }`}
        >
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-900">
            <Wallet className="h-4 w-4 text-sky-600" />
            <span>Comprador</span>
          </div>
          <div className="mt-1.5 text-sm font-medium text-slate-800">
            {current.buyerState}
          </div>
        </div>

        <div
          className={`rounded-lg border p-3.5 transition-colors ${
            step >= 3 && step <= 5
              ? 'border-amber-300 bg-amber-50/70'
              : step === 6
                ? 'border-emerald-300 bg-emerald-50/70'
                : 'border-slate-200 bg-slate-50/60'
          }`}
        >
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-900">
            <Lock className="h-4 w-4 text-amber-600" />
            <span>Custódia (Escrow)</span>
          </div>
          <div className="mt-1.5 text-sm font-medium text-slate-800">
            {current.escrowState}
          </div>
        </div>

        <div
          className={`rounded-lg border p-3.5 transition-colors ${
            step === 2 || step === 5 || step === 6
              ? 'border-emerald-300 bg-emerald-50/70'
              : 'border-slate-200 bg-slate-50/60'
          }`}
        >
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-900">
            <Users className="h-4 w-4 text-emerald-600" />
            <span>Vendedor</span>
          </div>
          <div className="mt-1.5 text-sm font-medium text-slate-800">
            {current.sellerState}
          </div>
        </div>
      </div>

      {/* Barra visual das 6 etapas */}
      <div className="mt-4 flex items-center gap-1.5">
        {stages.map((st) => (
          <button
            key={st.num}
            type="button"
            onClick={() => {
              setIsPlaying(false);
              setStep(st.num);
            }}
            aria-label={`Ir para etapa ${st.num}: ${st.title}`}
            className={`h-2 flex-1 rounded-full transition-colors ${
              st.num <= step ? 'bg-sky-600' : 'bg-slate-200'
            }`}
          />
        ))}
      </div>

      <div className="mt-4 rounded-lg bg-slate-50 p-4 text-sm">
        <div className="text-xs font-medium text-sky-700">{current.who}</div>
        <p className="mt-1 text-slate-700">{current.desc}</p>
      </div>
    </div>
  );
};

/* 6. Módulo 6: Vantagens do P2P */
const AdvantagesExplorer: React.FC = () => {
  const items = [
    {
      title: 'Negociação direta',
      traditional: 'Você interage apenas com menus automáticos de uma empresa.',
      p2p: 'Você negocia diretamente com outro participante real e escolhe a reputação dele.',
    },
    {
      title: 'Diversidade de pagamentos',
      traditional: 'Aceita apenas os poucos bancos ou meios integrados à empresa.',
      p2p: 'Ofertas com Pix, TED, carteiras digitais e dezenas de métodos locais.',
    },
    {
      title: 'Flexibilidade',
      traditional: 'Regras rígidas de depósito mínimo, horário de compensação e limites.',
      p2p: 'Opções de pequenos a grandes valores funcionando 24 horas por dia.',
    },
    {
      title: 'Variedade de ofertas',
      traditional: 'Um único preço definido pela plataforma.',
      p2p: 'Diversos anunciantes competindo com preços, limites e velocidades diferentes.',
    },
    {
      title: 'Acesso global',
      traditional: 'Barreiras bancárias entre países dificultam transferências rápidas.',
      p2p: 'Conecta participantes de diferentes regiões respeitando regras locais.',
    },
  ];
  const [idx, setIdx] = useState(0);
  const current = items[idx];

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6">
      <div className="mb-3">
        <p className="text-xs font-medium text-slate-500">
          Comparador de vantagens
        </p>
        <h4 className="text-base font-semibold text-slate-900">
          Toque em um benefício para comparar o canal tradicional com o P2P
        </h4>
      </div>
      <div className="flex flex-wrap gap-2">
        {items.map((it, i) => (
          <button
            key={it.title}
            type="button"
            onClick={() => setIdx(i)}
            className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
              idx === i
                ? 'border-sky-600 bg-sky-50 text-sky-900'
                : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
            }`}
          >
            {it.title}
          </button>
        ))}
      </div>
      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
          <div className="text-xs font-medium text-slate-500">
            Canal tradicional
          </div>
          <p className="mt-1.5 text-sm text-slate-700">{current.traditional}</p>
        </div>
        <div className="rounded-lg border border-sky-200 bg-sky-50/70 p-4">
          <div className="text-xs font-medium text-sky-800">
            No modelo P2P
          </div>
          <p className="mt-1.5 text-sm text-slate-800">{current.p2p}</p>
        </div>
      </div>
    </div>
  );
};

/* 7. Módulo 7: Simulador interativo "Detector de Golpes" */
const ScamDetectorSimulator: React.FC = () => {
  const scenarios = [
    {
      id: 'scam-1',
      title: 'Cenário 1 · O comprovante perfeito com pressa',
      message:
        'Comprador no chat: "Acabei de enviar o Pix de R$ 800! Olha o PDF do comprovante aqui em anexo. Por favor libera rápido que estou na fila do hospital!"',
      clue: 'Você abre o app do seu banco e o saldo NÃO aumentou; no rodapé do PDF está escrito "Agendado".',
      question: 'Qual atitude protege você desse golpe?',
      choices: [
        'Liberar imediatamente porque o PDF tem a logo oficial do banco.',
        'Recusar a liberação enquanto o dinheiro não aparecer de verdade no extrato bancário oficial.',
        'Pedir para ele enviar outro print pelo WhatsApp.',
      ],
      safeIndex: 1,
      feedback:
        'Comprovantes em PDF ou imagem são facilmente editados e agendamentos podem ser cancelados em segundos. Sempre confira o crédito efetivo no seu extrato bancário.',
    },
    {
      id: 'scam-2',
      title: 'Cenário 2 · Pagamento feito por outra pessoa',
      message:
        'Comprador no chat: "Meu banco travou, então pedi para um cliente meu chamado Carlos fazer o Pix para você. Já caiu aí, pode liberar!"',
      clue: 'O titular cadastrado na ordem se chama Marcos, mas o Pix veio do CPF de um terceiro desconhecido.',
      question: 'Por que você não deve aceitar e liberar?',
      choices: [
        'Risco de golpe de triangulação: o terceiro verdadeiro pode contestar o Pix por fraude (MED) e bloquear sua conta.',
        'Porque o banco cobra multa automática por nomes diferentes.',
        'Porque o Pix de terceiros reduz o valor do Bitcoin na blockchain.',
      ],
      safeIndex: 0,
      feedback:
        'Pagamentos de terceiros são o coração do golpe da triangulação. Devolva o valor pela ferramenta oficial de devolução do banco e exija pagamento apenas do próprio titular da ordem.',
    },
    {
      id: 'scam-3',
      title: 'Cenário 3 · Desconto para negociar fora da plataforma',
      message:
        'Anunciante: "Aqui na plataforma tem muita regra. Me chama no Telegram @NegocioRapido que te vendo 5% mais barato sem precisar abrir ordem!"',
      clue: 'O usuário tenta tirar você do chat oficial e do sistema de Escrow.',
      question: 'O que acontece se você aceitar ir para o Telegram?',
      choices: [
        'Você economiza 5% com a mesma garantia de custódia.',
        'Você perde o Escrow, o histórico oficial e fica vulnerável a falsos intermediários sem direito a disputa.',
        'A plataforma transfere automaticamente suas senhas para o Telegram.',
      ],
      safeIndex: 1,
      feedback:
        'Nunca saia da plataforma oficial. É dentro dela que existem a trava de custódia (Escrow) e o registro de conversa necessário para abrir disputa.',
    },
    {
      id: 'scam-4',
      title: 'Cenário 4 · O "Suporte Oficial" no privado',
      message:
        'Mensagem privada: "Olá, sou moderador da plataforma. Para destravar sua venda, envie as moedas para nossa carteira de verificação e informe seu código 2FA."',
      clue: 'Alguém pedindo transferência manual e código de autenticação em conversa privada.',
      question: 'Como reagir a essa abordagem?',
      choices: [
        'Enviar o código 2FA para acelerar a verificação.',
        'Bloquear e denunciar: é um falso intermediário aplicando engenharia social; suporte real nunca pede senhas, 2FA ou envios manuais.',
        'Transferir apenas metade das moedas para testar.',
      ],
      safeIndex: 1,
      feedback:
        'Suporte verdadeiro nunca pede senha, código 2FA nem transferência manual para carteiras externas. O Escrow real funciona de forma automatizada dentro da ordem.',
    },
  ];

  const [activeIdx, setActiveIdx] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState<Record<string, number>>({});

  const scenario = scenarios[activeIdx];
  const chosen = selectedChoice[scenario.id];
  const isAnswered = typeof chosen === 'number';
  const isCorrect = chosen === scenario.safeIndex;

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <div>
          <p className="text-xs font-medium text-red-700">
            Treinamento prático · Detector de Golpes
          </p>
          <h4 className="text-base font-semibold text-slate-900">
            Analise 4 situações reais de risco e escolha a reação segura
          </h4>
        </div>
        <div className="flex gap-1.5">
          {scenarios.map((sc, i) => {
            const done = typeof selectedChoice[sc.id] === 'number';
            return (
              <button
                key={sc.id}
                type="button"
                onClick={() => setActiveIdx(i)}
                className={`rounded-md border px-2.5 py-1 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                  activeIdx === i
                    ? 'border-slate-900 bg-slate-900 text-white'
                    : done
                      ? 'border-emerald-300 bg-emerald-50 text-emerald-800'
                      : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                }`}
              >
                Caso {i + 1}
              </button>
            );
          })}
        </div>
      </div>

      <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 space-y-3">
        <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
          <ShieldAlert className="h-4 w-4 text-amber-600" />
          <span>{scenario.title}</span>
        </div>
        <div className="rounded-md border border-slate-200 bg-white p-3 font-mono text-xs leading-relaxed text-slate-800">
          {scenario.message}
        </div>
        <div className="text-xs text-slate-600">
          <strong className="text-slate-900">O que você observa:</strong>{' '}
          {scenario.clue}
        </div>
      </div>

      <div className="mt-4">
        <p className="text-sm font-semibold text-slate-900">
          {scenario.question}
        </p>
        <div className="mt-2.5 space-y-2">
          {scenario.choices.map((choice, idx) => {
            const picked = chosen === idx;
            const right = idx === scenario.safeIndex;
            let style =
              'border-slate-200 bg-white text-slate-700 hover:bg-slate-50';
            if (isAnswered) {
              if (right) {
                style = 'border-emerald-500 bg-emerald-50 text-emerald-900';
              } else if (picked) {
                style = 'border-red-400 bg-red-50 text-red-900';
              } else {
                style = 'border-slate-200 bg-slate-50 text-slate-500';
              }
            }
            return (
              <button
                key={choice}
                type="button"
                onClick={() =>
                  setSelectedChoice((prev) => ({ ...prev, [scenario.id]: idx }))
                }
                className={`w-full rounded-lg border px-3.5 py-2.5 text-left text-sm transition-colors ${style}`}
              >
                {choice}
              </button>
            );
          })}
        </div>

        {isAnswered && (
          <div
            className={`mt-3 flex items-start gap-2.5 rounded-lg border p-3.5 text-sm ${
              isCorrect
                ? 'border-emerald-200 bg-emerald-50 text-emerald-900'
                : 'border-amber-200 bg-amber-50 text-amber-900'
            }`}
          >
            {isCorrect ? (
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700" />
            ) : (
              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-700" />
            )}
            <div>
              <strong>
                {isCorrect ? 'Decisão segura!' : 'Atenção ao risco:'}
              </strong>{' '}
              {scenario.feedback}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

/* 8. Módulo 8: Glossário Pesquisável */
const GlossaryExplorer: React.FC = () => {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<string>('Todos');
  const categories = [
    'Todos',
    'Fundamentos',
    'Negociação',
    'Segurança',
    'Tecnologia',
  ];

  const filtered = GLOSSARY_ITEMS.filter((item) => {
    const matchCategory = category === 'Todos' || item.category === category;
    const q = query.trim().toLowerCase();
    const matchQuery =
      !q ||
      item.term.toLowerCase().includes(q) ||
      item.simpleDefinition.toLowerCase().includes(q);
    return matchCategory && matchQuery;
  });

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-slate-100 pb-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <label htmlFor="glossary-search" className="sr-only">
            Buscar termo no glossário
          </label>
          <input
            id="glossary-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar termo (ex.: Escrow, TXID, Spread)..."
            className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-sky-500 focus:bg-white focus:outline-none"
          />
        </div>
        <div className="flex flex-wrap gap-1.5">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategory(cat)}
              className={`rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                category === cat
                  ? 'bg-sky-600 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4 text-xs text-slate-500 tabular-nums">
        Exibindo {filtered.length} de {GLOSSARY_ITEMS.length} termos essenciais
      </div>

      {filtered.length === 0 ? (
        <p className="mt-4 rounded-lg bg-slate-50 p-4 text-sm text-slate-600">
          Nenhum termo encontrado para "{query}". Tente outra palavra ou limpe o filtro.
        </p>
      ) : (
        <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-2">
          {filtered.map((item) => (
            <div
              key={item.term}
              className="rounded-lg border border-slate-200 bg-slate-50/70 p-4"
            >
              <div className="flex items-baseline justify-between gap-2">
                <h5 className="font-display text-sm font-bold text-slate-900">
                  {item.term}
                </h5>
                <span className="text-[11px] font-medium text-slate-500">
                  {item.category}
                </span>
              </div>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-700">
                {item.simpleDefinition}
              </p>
              <p className="mt-2 border-t border-slate-200 pt-2 text-xs text-slate-600">
                <strong className="text-slate-800">Exemplo prático:</strong>{' '}
                {item.practicalExample}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

/* 9. Módulo 9: Checklist Interativo de Boas Práticas */
const SafetyChecklistInteractive: React.FC = () => {
  const habits = [
    'Escolhi uma plataforma confiável com regras claras e histórico verificável.',
    'Verifiquei a reputação, taxa de conclusão e tempo de conta da contraparte.',
    'Conferi preço, quantidade, prazo e titularidade bancária antes de prosseguir.',
    'Não aceito prints/comprovantes isolados: só libero após conferir meu extrato bancário.',
    'Mantenho 100% da negociação e das mensagens dentro do ambiente oficial da plataforma.',
    'Nunca compartilho senhas, códigos 2FA ou palavras de recuperação da carteira.',
    'Li as regras de cancelamento, disputa e taxas da plataforma antes de abrir ordem.',
    'Guardo registros com data, valor, contraparte, comprovante real e TXID.',
    'Estou atento às obrigações legais e tributárias aplicáveis no Brasil (IN 1.888 e IRPF).',
  ];

  const [checked, setChecked] = useState<number[]>([]);

  const toggle = (idx: number) => {
    setChecked((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-4">
        <div>
          <p className="text-xs font-medium text-slate-500">
            Checklist interativo antes de operar
          </p>
          <h4 className="text-base font-semibold text-slate-900">
            Marque cada hábito de segurança conforme você revisar
          </h4>
        </div>
        <div className="font-mono text-xs font-semibold text-sky-700 tabular-nums">
          {checked.length}/{habits.length} revisados
        </div>
      </div>

      <div className="mt-4 space-y-2">
        {habits.map((habit, idx) => {
          const isChecked = checked.includes(idx);
          return (
            <label
              key={habit}
              className={`flex cursor-pointer items-start gap-3 rounded-lg border p-3 text-sm transition-colors ${
                isChecked
                  ? 'border-emerald-300 bg-emerald-50/70 text-emerald-950'
                  : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
              }`}
            >
              <input
                type="checkbox"
                checked={isChecked}
                onChange={() => toggle(idx)}
                className="mt-0.5 h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-sky-500"
              />
              <span className="flex-1">{habit}</span>
              {isChecked && (
                <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
              )}
            </label>
          );
        })}
      </div>
    </div>
  );
};
