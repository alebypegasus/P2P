import React, { useState } from 'react';
import {
  Award,
  BookOpen,
  CheckCircle2,
  Download,
  Gamepad2,
  Printer,
  RotateCcw,
} from 'lucide-react';
import { COURSE_MODULES } from '../data/modulesData';
import {
  sanitizeCertificateName,
  type QuizEvaluationResult,
} from '../utils/courseLogic';

interface CertificateViewProps {
  quizResult: QuizEvaluationResult | null;
  completedModuleIds: number[];
  onReviewModules: () => void;
  onRetakeQuiz: () => void;
  onOpenMiniGame: () => void;
}

export const CertificateView: React.FC<CertificateViewProps> = ({
  quizResult,
  completedModuleIds,
  onReviewModules,
  onRetakeQuiz,
  onOpenMiniGame,
}) => {
  const [studentName, setStudentName] = useState('');
  const displayName = sanitizeCertificateName(studentName);
  const percentage = quizResult ? quizResult.percentage : 0;
  const scoreText = quizResult
    ? `${quizResult.correctCount}/${quizResult.totalQuestions}`
    : 'Não realizado';
  const completionDate = new Date().toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  const handleDownloadPng = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 1200;
    canvas.height = 820;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = '#F8FAFC';
    ctx.fillRect(0, 0, 1200, 820);

    ctx.strokeStyle = '#0F172A';
    ctx.lineWidth = 6;
    ctx.strokeRect(36, 36, 1128, 748);

    ctx.strokeStyle = '#CBD5E1';
    ctx.lineWidth = 2;
    ctx.strokeRect(52, 52, 1096, 716);

    ctx.fillStyle = '#0284C7';
    ctx.font = '600 20px sans-serif';
    ctx.fillText('REDE DIRETA · CURSO INTRODUTÓRIO DE P2P', 96, 125);

    ctx.fillStyle = '#0F172A';
    ctx.font = '700 48px sans-serif';
    ctx.fillText('Certificado de Conclusão Educacional', 96, 195);

    ctx.fillStyle = '#475569';
    ctx.font = '400 22px sans-serif';
    ctx.fillText('Certificamos para fins educacionais e de estudo livre que', 96, 275);

    ctx.fillStyle = '#0F172A';
    ctx.font = '700 44px sans-serif';
    ctx.fillText(displayName, 96, 340);

    ctx.fillStyle = '#334155';
    ctx.font = '400 21px sans-serif';
    ctx.fillText(
      'concluiu o curso introdutório sobre P2P (Peer-to-Peer), abrangendo fundamentos,',
      96,
      415
    );
    ctx.fillText(
      'funcionamento prático, custódia (escrow), prevenção a fraudes, glossário e boas práticas.',
      96,
      448
    );

    ctx.fillStyle = '#0F172A';
    ctx.font = '600 22px sans-serif';
    ctx.fillText(
      `Aproveitamento no Quiz: ${percentage}% (${scoreText})  ·  Módulos revisados: ${completedModuleIds.length}/${COURSE_MODULES.length}`,
      96,
      535
    );

    ctx.fillStyle = '#475569';
    ctx.font = '400 18px sans-serif';
    ctx.fillText(`Emitido em ${completionDate}`, 96, 610);

    ctx.fillStyle = '#64748B';
    ctx.font = '400 15px sans-serif';
    ctx.fillText(
      'Aviso: Documento exclusivamente educacional de participação, sem validade de certificação profissional ou oficial.',
      96,
      710
    );

    const link = document.createElement('a');
    link.download = `certificado-p2p-${displayName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  return (
    <section className="w-full px-4 py-8 sm:px-6 lg:px-10">
      <div className="grid grid-cols-1 items-start gap-8 xl:grid-cols-12">
      {/* Mensagem de Parabéns e Ações */}
      <div className="no-print rounded-xl border border-slate-200 bg-white p-6 sm:p-8 xl:col-span-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs font-medium text-emerald-700">
              Jornada de Aprendizagem Concluída
            </p>
            <h2 className="mt-1 text-2xl font-bold text-slate-900 sm:text-3xl">
              Parabéns por concluir o curso introdutório de P2P!
            </h2>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-600">
              Você agora conhece a diferença entre modelos centralizados e diretos,
              como funciona a custódia (Escrow), os principais sinais de golpe e os
              cuidados essenciais no Brasil.
            </p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-slate-50 px-5 py-3.5 text-right">
            <div className="text-xs text-slate-500">Aproveitamento no Quiz</div>
            <div className="font-mono text-2xl font-bold text-slate-900 tabular-nums">
              {quizResult ? `${percentage}%` : 'Pendente'}
            </div>
            <div className="text-xs text-slate-600 tabular-nums">
              Pontuação: {scoreText}
            </div>
          </div>
        </div>

        {/* Resumo dos conteúdos estudados */}
        <div className="mt-6 border-t border-slate-100 pt-5">
          <h3 className="text-sm font-semibold text-slate-900">
            Resumo dos conteúdos estudados
          </h3>
          <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-3">
            {COURSE_MODULES.map((m) => (
              <div
                key={m.id}
                className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-700"
              >
                <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-emerald-600" />
                <span className="truncate">{m.shortTitle}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Nome para o certificado e botões */}
        <div className="mt-6 flex flex-col gap-4 border-t border-slate-100 pt-5 sm:flex-row sm:items-end sm:justify-between">
          <div className="w-full max-w-sm">
            <label
              htmlFor="certificate-name"
              className="block text-xs font-medium text-slate-700"
            >
              Personalizar nome no certificado
            </label>
            <input
              id="certificate-name"
              type="text"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              placeholder="Digite seu nome completo"
              className="mt-1.5 w-full rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2 text-sm text-slate-900 focus:border-sky-500 focus:bg-white focus:outline-none"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={handleDownloadPng}
              className="inline-flex items-center gap-1.5 rounded-lg bg-sky-600 px-4 py-2 text-xs font-medium text-white hover:bg-sky-700 whitespace-nowrap shrink-0"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Baixar Certificado (PNG)</span>
            </button>
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 whitespace-nowrap shrink-0"
            >
              <Printer className="h-3.5 w-3.5" />
              <span>Imprimir</span>
            </button>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-5">
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={onReviewModules}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 whitespace-nowrap shrink-0"
            >
              <BookOpen className="h-3.5 w-3.5" />
              <span>Revisar Módulos</span>
            </button>
            <button
              type="button"
              onClick={onRetakeQuiz}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 whitespace-nowrap shrink-0"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Refazer Avaliação</span>
            </button>
          </div>

          <button
            type="button"
            onClick={onOpenMiniGame}
            className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2 text-xs font-medium text-white hover:bg-slate-800 whitespace-nowrap shrink-0"
          >
            <Gamepad2 className="h-4 w-4" />
            <span>Praticar no Mini-Game 3D</span>
          </button>
        </div>
      </div>

      {/* Pré-visualização do Certificado */}
      <div className="print-only-certificate rounded-xl border-2 border-slate-900 bg-white p-6 sm:p-8 xl:col-span-6">
        <div className="border border-slate-200 p-6 sm:p-8">
          <div className="flex items-center justify-between gap-4">
            <span className="text-xs font-semibold tracking-wide text-sky-700">
              REDE DIRETA · EDUCAÇÃO P2P
            </span>
            <Award className="h-6 w-6 text-sky-600" />
          </div>

          <h3 className="mt-4 font-display text-2xl font-bold text-slate-900 sm:text-3xl">
            Certificado de Participação Educacional
          </h3>
          <p className="mt-4 text-sm text-slate-600">
            Declaramos para fins de registro pessoal e aprendizado livre que
          </p>
          <p className="mt-2 font-display text-2xl font-bold text-slate-900 sm:text-3xl">
            {displayName}
          </p>
          <p className="mt-3 text-sm leading-relaxed text-slate-700">
            concluiu a trilha introdutória <strong>Entendendo o P2P do Zero</strong>,
            abordando negociação direta, uso prático, criptoativos, custódia
            (escrow), prevenção contra golpes, glossário essencial e boas práticas de segurança.
          </p>

          <div className="mt-6 grid grid-cols-1 gap-3 border-t border-slate-200 pt-4 text-xs text-slate-600 sm:grid-cols-3">
            <div>
              <span className="block text-slate-400">Desempenho no Quiz</span>
              <strong className="font-mono text-sm text-slate-900 tabular-nums">
                {quizResult ? `${percentage}% (${scoreText})` : 'Avaliação livre'}
              </strong>
            </div>
            <div>
              <span className="block text-slate-400">Módulos revisados</span>
              <strong className="font-mono text-sm text-slate-900 tabular-nums">
                {completedModuleIds.length} de {COURSE_MODULES.length}
              </strong>
            </div>
            <div>
              <span className="block text-slate-400">Data de emissão</span>
              <strong className="text-sm text-slate-900">{completionDate}</strong>
            </div>
          </div>

          <p className="mt-6 border-t border-slate-100 pt-4 text-[11px] text-slate-500">
            Nota de transparência: este certificado tem caráter exclusivamente
            educacional e comemorativo pelo aprendizado concluído na plataforma,
            não conferindo habilitação técnica oficial ou certificação profissional regulada.
          </p>
        </div>
      </div>
      </div>
    </section>
  );
};
