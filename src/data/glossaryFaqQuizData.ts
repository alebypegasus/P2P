import type { FaqItem, GlossaryItem, QuizQuestion } from '../types/course';

export const GLOSSARY_ITEMS: GlossaryItem[] = [
  {
    term: 'P2P',
    category: 'Fundamentos',
    simpleDefinition:
      'Sigla para Peer-to-Peer. Modelo em que duas pessoas ou computadores interagem e negociam diretamente entre si, sem um intermediário central controlando toda a troca.',
    practicalExample:
      'Você vende um livro diretamente para um colega de faculdade sem passar por uma livraria.',
  },
  {
    term: 'Peer-to-Peer',
    category: 'Fundamentos',
    simpleDefinition:
      'Expressão em inglês que significa "de par para par" ou "de igual para igual", indicando participantes com o mesmo nível hierárquico na rede ou negociação.',
    practicalExample:
      'Dois celulares trocando arquivos diretamente entre si atuam como pares (peers).',
  },
  {
    term: 'Exchange',
    category: 'Negociação',
    simpleDefinition:
      'Palavra em inglês usada para designar plataformas digitais onde usuários compram, vendem ou trocam moedas digitais.',
    practicalExample:
      'Uma exchange funciona como um mercado online especializado em ativos digitais.',
  },
  {
    term: 'Corretora',
    category: 'Negociação',
    simpleDefinition:
      'Empresa intermediária que recebe depósitos dos clientes e executa ordens de compra e venda a partir do próprio sistema centralizado.',
    practicalExample:
      'Quando você deposita reais em uma corretora e clica em "Comprar", a empresa faz o encontro automático no livro dela.',
  },
  {
    term: 'Blockchain',
    category: 'Tecnologia',
    simpleDefinition:
      'Registro digital público, compartilhado e encadeado em blocos. Funciona como um livro-caixa transparente copiado em vários computadores ao mesmo tempo.',
    practicalExample:
      'Cada transferência de Bitcoin é anotada em um bloco da blockchain para que ninguém possa gastá-la duas vezes.',
  },
  {
    term: 'Bitcoin',
    category: 'Tecnologia',
    simpleDefinition:
      'A primeira criptomoeda descentralizada do mundo, criada em 2009 para permitir transferências digitais diretas entre pessoas pela internet.',
    practicalExample:
      'Enviar uma fração de Bitcoin para um familiar em outro país diretamente da sua carteira.',
  },
  {
    term: 'Criptomoeda',
    category: 'Tecnologia',
    simpleDefinition:
      'Moeda ou ativo puramente digital protegido por criptografia (matemática de segurança), que geralmente funciona em redes descentralizadas sem banco emissor único.',
    practicalExample:
      'Bitcoin, Ethereum e stablecoins digitais são exemplos de criptomoedas.',
  },
  {
    term: 'Wallet',
    category: 'Tecnologia',
    simpleDefinition:
      'Termo em inglês para carteira digital: aplicativo ou dispositivo usado para guardar, enviar e receber criptomoedas com chaves criptográficas próprias.',
    practicalExample:
      'Instalar uma wallet no celular para receber as moedas compradas em uma negociação P2P.',
  },
  {
    term: 'Carteira digital',
    category: 'Tecnologia',
    simpleDefinition:
      'Nome em português para Wallet. Ela guarda as chaves secretas que provam que determinados ativos digitais pertencem a você na blockchain.',
    practicalExample:
      'Assim como um aplicativo de banco mostra seu saldo em reais, a carteira digital mostra seu saldo na blockchain.',
  },
  {
    term: 'Escrow',
    category: 'Segurança',
    simpleDefinition:
      'Mecanismo de custódia temporária onde um sistema neutro bloqueia o ativo do vendedor durante a negociação até que o pagamento seja confirmado.',
    practicalExample:
      'Ao abrir uma ordem de compra P2P, a plataforma trava os bitcoins do vendedor no escrow enquanto você faz o Pix.',
  },
  {
    term: 'Custódia',
    category: 'Segurança',
    simpleDefinition:
      'Ato de guardar e proteger um ativo em segurança. Pode ser feita por você mesmo (autocustódia) ou temporariamente por uma plataforma durante uma troca (escrow).',
    practicalExample:
      'Deixar o ativo sob custódia da plataforma durante os 15 minutos da operação para evitar que o vendedor fuja após receber o Pix.',
  },
  {
    term: 'Ordem de compra',
    category: 'Negociação',
    simpleDefinition:
      'Solicitação formal criada por quem deseja adquirir um ativo, informando a quantidade, o preço aceito e o prazo para pagamento.',
    practicalExample:
      'Você seleciona uma oferta e cria uma ordem de compra de R$ 200 em criptomoedas.',
  },
  {
    term: 'Ordem de venda',
    category: 'Negociação',
    simpleDefinition:
      'Solicitação ou compromisso formal criado por quem está entregando um ativo digital em troca de dinheiro ou outro valor combinado.',
    practicalExample:
      'Um usuário abre uma ordem de venda oferecendo 0,005 BTC para receber via transferência bancária.',
  },
  {
    term: 'Liquidez',
    category: 'Negociação',
    simpleDefinition:
      'Facilidade e velocidade com que um ativo pode ser comprado ou vendido sem provocar grandes saltos no preço.',
    practicalExample:
      'Um mercado P2P com muita liquidez tem dezenas de compradores e vendedores ativos a qualquer hora.',
  },
  {
    term: 'Spread',
    category: 'Negociação',
    simpleDefinition:
      'Diferença entre o preço de compra e o preço de venda (ou entre a cotação de referência do mercado e o preço pedido em uma oferta P2P).',
    practicalExample:
      'Se a cotação média de uma moeda é R$ 5,00 e um vendedor anuncia a R$ 5,15 para cobrir seu trabalho, o spread é de R$ 0,15.',
  },
  {
    term: 'Taxa',
    category: 'Negociação',
    simpleDefinition:
      'Valor cobrado por uma plataforma pelo serviço de intermediação/escrow ou pela própria rede blockchain para processar uma transferência.',
    practicalExample:
      'Algumas plataformas cobram 0% de taxa para quem aceita uma oferta e 0,5% para quem cria o anúncio.',
  },
  {
    term: 'TXID',
    category: 'Tecnologia',
    simpleDefinition:
      'Abreviação de Transaction ID (Identificador da Transação). Código único formado por letras e números que serve como recibo público na blockchain.',
    practicalExample:
      'Depois de enviar criptomoedas para sua carteira, você pode consultar o TXID em um explorador público para acompanhar o envio.',
  },
  {
    term: 'Rede',
    category: 'Tecnologia',
    simpleDefinition:
      'Conjunto de computadores e regras que transportam e validam transações de um ativo digital. Enviar pela rede errada pode causar perda dos fundos.',
    practicalExample:
      'Antes de receber uma transferência, você confere se tanto quem envia quanto quem recebe escolheram exatamente a mesma rede.',
  },
  {
    term: 'Confirmação de transação',
    category: 'Segurança',
    simpleDefinition:
      'Processo pelo qual os computadores (nós) da blockchain validam e gravam uma transferência de forma permanente no histórico.',
    practicalExample:
      'Quando uma transação atinge o número necessário de confirmações, ela aparece como concluída na carteira do destinatário.',
  },
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'faq-1',
    category: 'Conceito',
    question: 'O que significa P2P?',
    answer:
      'P2P é a abreviação de Peer-to-Peer, que significa "de par para par" ou "de pessoa para pessoa". Na prática, descreve qualquer troca, comunicação ou negociação feita diretamente entre participantes sem depender de um intermediário central controlando tudo.',
  },
  {
    id: 'faq-2',
    category: 'Conceito',
    question: 'P2P é a mesma coisa que criptomoeda?',
    answer:
      'Não. P2P é um modelo de conexão ou negociação direta; criptomoeda é um tipo de ativo digital. O P2P existe em compartilhamento de arquivos, redes de computadores, marketplaces e também pode ser usado para negociar criptomoedas.',
  },
  {
    id: 'faq-3',
    category: 'Conceito',
    question: 'Preciso ter conhecimento técnico avançado para utilizar P2P?',
    answer:
      'Não. As plataformas modernas apresentam telas simples de compra, venda e chat, parecidas com aplicativos comuns de comércio eletrônico. O mais importante não é ser programador, mas entender os cuidados básicos de segurança e nunca pular etapas de conferência.',
  },
  {
    id: 'faq-4',
    category: 'Segurança',
    question: 'É possível perder dinheiro em uma negociação P2P?',
    answer:
      'Sim, existem riscos se o usuário não tomar cuidado. É possível sofrer prejuízo por golpes com comprovantes falsos, pagamentos de terceiros, negociação fora de plataformas com custódia, erro ao informar endereço/rede de carteira ou oscilações normais de preço dos ativos negociados.',
  },
  {
    id: 'faq-5',
    category: 'Segurança',
    question: 'Como saber se uma pessoa é confiável em uma plataforma P2P?',
    answer:
      'Analise sempre o histórico público dentro da plataforma: número total de operações concluídas, porcentagem de conclusão (prefira taxas altas, como acima de 95%), tempo médio de resposta/liberação, verificações concluídas e avaliações deixadas por outros usuários.',
  },
  {
    id: 'faq-6',
    category: 'Funcionamento',
    question: 'O que acontece se o comprador pagar e o vendedor não liberar os ativos?',
    answer:
      'Em plataformas que contam com serviço de Escrow (custódia), os ativos ficam travados e o vendedor não consegue sacá-los. O comprador pode abrir uma disputa dentro do prazo da ordem, enviando o comprovante oficial no chat de mediação para que a plataforma analise e libere caso o pagamento seja comprovado.',
  },
  {
    id: 'faq-7',
    category: 'Funcionamento',
    question: 'O que é custódia (Escrow) e ela existe em todo P2P?',
    answer:
      'Custódia (ou Escrow) é um cofre neutro temporário operado pela plataforma para segurar os ativos digitais do vendedor até o fim da negociação. Porém, ela não existe em todo P2P: negociações feitas diretamente via conversa particular sem plataforma não têm escrow, exigindo confiança total ou encontro presencial.',
  },
  {
    id: 'faq-8',
    category: 'Funcionamento',
    question: 'O que acontece quando uma negociação é cancelada?',
    answer:
      'Se o prazo acabar antes do pagamento ou o comprador desistir antes de pagar e clicar em "Cancelar", a ordem é encerrada e os ativos que estavam bloqueados em custódia voltam para o saldo disponível do vendedor. Atenção: se você já pagou, nunca clique em cancelar antes de resolver com o suporte.',
  },
  {
    id: 'faq-9',
    category: 'Funcionamento',
    question: 'Posso negociar com pessoas de outros países pelo P2P?',
    answer:
      'Sim, em muitas plataformas globais é possível encontrar ofertas em diferentes moedas locais e meios de pagamento internacionais. Contudo, verifique sempre as regras da plataforma, taxas de conversão cambial, exigências bancárias e leis fiscais aplicáveis ao seu país.',
  },
  {
    id: 'faq-10',
    category: 'Segurança',
    question: 'Quais são os principais riscos do P2P para iniciantes?',
    answer:
      'Os principais riscos são: aceitar comprovantes ou prints falsos sem checar o extrato do banco; receber transferências feitas por terceiros desconhecidos; aceitar convites para negociar fora da plataforma oficial; cair em falsos intermediários; e enviar criptomoedas para a rede errada.',
  },
  {
    id: 'faq-11',
    category: 'Segurança',
    question: 'Como identificar rapidamente uma tentativa de golpe?',
    answer:
      'Desconfie imediatamente quando a outra parte cria urgência artificial, pede para continuar a conversa no WhatsApp/Telegram, oferece preço muito fora da realidade de mercado, envia apenas prints sem o dinheiro aparecer no seu banco ou tenta pagar usando a conta bancária de outra pessoa.',
  },
  {
    id: 'faq-12',
    category: 'Regras e Brasil',
    question: 'O P2P é legal no Brasil?',
    answer:
      'Sim. A negociação direta de bens ou ativos digitais entre pessoas (P2P) é uma prática lícita no Brasil, desde que os recursos tenham origem lícita e sejam respeitadas as obrigações legais, regulatórias (como a Lei nº 14.478/2022) e tributárias vigentes.',
  },
  {
    id: 'faq-13',
    category: 'Regras e Brasil',
    question: 'Preciso declarar minhas operações P2P no Brasil?',
    answer:
      'Depende dos valores movimentados e do saldo mantido, conforme as normas da Receita Federal. Pela IN RFB nº 1.888/2019, operações realizadas fora de corretoras brasileiras (como P2P direto ou plataformas estrangeiras) devem ser reportadas mensalmente pelo próprio usuário se ultrapassarem o limite mensal vigente (R$ 30.000). Além disso, posse e eventuais lucros seguem as regras anuais do Imposto de Renda (IRPF). Consulte sempre a Receita Federal ou um contador.',
  },
  {
    id: 'faq-14',
    category: 'Conceito',
    question: 'Qual é a diferença entre P2P e uma corretora tradicional?',
    answer:
      'Na corretora tradicional você deposita dinheiro na conta da empresa e compra pelo livro automático dela, aceitando os métodos e taxas da empresa. No P2P você escolhe diretamente outro usuário, combina pagamento direto para a conta dele (como Pix) e pode escolher entre dezenas de ofertas com preços e limites variados.',
  },
  {
    id: 'faq-15',
    category: 'Funcionamento',
    question: 'Por que o preço de uma oferta P2P às vezes é diferente da cotação do Google?',
    answer:
      'Porque cada anunciante define livremente seu preço somando uma margem (spread) para cobrir custos bancários, risco operacional, tempo de atendimento e conveniência do meio de pagamento. Comparar várias ofertas ajuda a encontrar valores mais competitivos.',
  },
  {
    id: 'faq-16',
    category: 'Segurança',
    question: 'Por que não devo aceitar Pix enviado pela conta de um terceiro?',
    answer:
      'Porque essa é a técnica usada no "golpe da triangulação": um golpista engana uma terceira pessoa inocente para que ela faça o Pix para você. Quando ela descobre e contesta o Pix no banco via MED (Mecanismo Especial de Devolução), seu dinheiro é bloqueado e você já terá perdido os ativos liberados.',
  },
  {
    id: 'faq-17',
    category: 'Funcionamento',
    question: 'Qual é o valor mínimo para começar a aprender na prática?',
    answer:
      'Os limites variam conforme cada plataforma e cada anunciante, mas existem ofertas que aceitam valores pequenos (como R$ 20, R$ 50 ou R$ 100), permitindo conhecer o processo gradualmente sem comprometer quantias elevadas.',
  },
  {
    id: 'faq-18',
    category: 'Funcionamento',
    question: 'O que significa "liberar os ativos" em uma venda P2P?',
    answer:
      'É o clique final que o vendedor dá dentro da plataforma após conferir no próprio aplicativo do banco que o dinheiro realmente caiu na conta. Esse comando autoriza o sistema de custódia a transferir as criptomoedas para o comprador.',
  },
  {
    id: 'faq-19',
    category: 'Conceito',
    question: 'P2P garante algum lucro ou rendimento automático?',
    answer:
      'Não! P2P é apenas um meio de compra, venda ou troca direta entre participantes. Não existe garantia de lucro, rendimento fixo nem ausência de risco. Desconfie de qualquer pessoa ou anúncio que prometa retorno garantido usando P2P.',
  },
  {
    id: 'faq-20',
    category: 'Segurança',
    question: 'O que fazer se o vendedor ou comprador pedir para falar fora da plataforma?',
    answer:
      'Recuse educadamente e mantenha todo o diálogo no chat oficial onde a ordem foi aberta. Se a outra pessoa insistir ou tentar pressionar você, cancele a ordem (caso não tenha pago) ou acione o suporte da plataforma.',
  },
  {
    id: 'faq-21',
    category: 'Funcionamento',
    question: 'Depois que compro no P2P, minhas moedas ficam seguras na plataforma ou devo usar uma carteira?',
    answer:
      'Plataformas oferecem praticidade para negociar, mas se você pretende guardar ativos digitais por mais tempo, muitas pessoas optam por transferi-los para uma carteira digital própria (wallet), onde somente o dono controla as chaves de acesso.',
  },
  {
    id: 'faq-22',
    category: 'Regras e Brasil',
    question: 'Todas as plataformas P2P cobram as mesmas taxas e seguem as mesmas regras?',
    answer:
      'Não. Taxas de anúncio, tempo limite de pagamento, exigência de verificação de identidade (KYC) e funcionamento de disputas variam bastante de uma plataforma para outra e conforme a legislação de cada jurisdição.',
  },
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  // NÍVEL FÁCIL (1 - 6)
  {
    id: 1,
    difficulty: 'Fácil',
    moduleRef: 1,
    question: 'O que significa a sigla P2P?',
    options: [
      'Peer-to-Peer, ou negociação direta de pessoa para pessoa',
      'Pagamento em 2 Parcelas bancárias obrigatórias',
      'Protocolo Privado de Bancos Centrais',
      'Plataforma Exclusiva de Poupança',
    ],
    correctIndex: 0,
    explanation:
      'P2P vem de Peer-to-Peer ("de par para par"), indicando conexão ou negociação direta entre participantes sem um controlador central no meio.',
  },
  {
    id: 2,
    difficulty: 'Fácil',
    moduleRef: 1,
    question: 'Qual é a principal diferença entre o modelo tradicional e o modelo P2P?',
    options: [
      'No P2P os preços são sempre iguais ao do banco central.',
      'No modelo tradicional há uma instituição central no meio da operação; no P2P os participantes negociam diretamente entre si.',
      'No modelo tradicional é proibido usar a internet.',
      'O P2P só funciona em agências bancárias físicas.',
    ],
    correctIndex: 1,
    explanation:
      'Enquanto o modelo tradicional coloca uma empresa ou banco no centro comprando, vendendo ou autorizando tudo, o P2P conecta diretamente os participantes.',
  },
  {
    id: 3,
    difficulty: 'Fácil',
    moduleRef: 3,
    question: 'Sobre os lugares onde o P2P é utilizado, qual afirmação está correta?',
    options: [
      'O P2P só existe para comprar e vender Bitcoin.',
      'O P2P não funciona para troca de arquivos digitais.',
      'O P2P também é usado em compartilhamento de arquivos, redes de computadores e marketplaces entre pessoas.',
      'O P2P foi inventado exclusivamente para cartões de crédito.',
    ],
    correctIndex: 2,
    explanation:
      'O conceito P2P vai muito além das criptomoedas, sendo amplamente usado em compartilhamento de arquivos, redes distribuídas e marketplaces.',
  },
  {
    id: 4,
    difficulty: 'Fácil',
    moduleRef: 4,
    question: 'O que é uma carteira digital (wallet) no contexto de criptomoedas?',
    options: [
      'Um aplicativo ou dispositivo usado para guardar chaves e gerenciar o envio e recebimento de criptomoedas.',
      'Um cartão físico emitido apenas por supermercados.',
      'Um documento em papel assinado em cartório.',
      'Uma senha temporária que expira a cada cinco minutos.',
    ],
    correctIndex: 0,
    explanation:
      'Wallet (carteira digital) é a ferramenta que armazena suas chaves de acesso e permite receber, guardar e enviar criptomoedas na rede.',
  },
  {
    id: 5,
    difficulty: 'Fácil',
    moduleRef: 6,
    question: 'Qual destas opções representa uma vantagem prática real das negociações P2P?',
    options: [
      'Garantia de lucro fixo todo mês.',
      'Impossibilidade total de erros humanos.',
      'Diversidade de meios de pagamento e flexibilidade para escolher ofertas.',
      'Dispensa de qualquer cuidado com segurança.',
    ],
    correctIndex: 2,
    explanation:
      'O P2P oferece diversidade de pagamentos, flexibilidade de limites e escolha direta de ofertas, mas nunca garante lucros nem elimina a necessidade de cuidados.',
  },
  {
    id: 6,
    difficulty: 'Fácil',
    moduleRef: 8,
    question: 'O que é a Blockchain em termos simples?',
    options: [
      'Uma marca específica de celular para negociações.',
      'Um registro digital compartilhado e encadeado em blocos que armazena transações de forma pública e transparente.',
      'Um imposto cobrado sobre compras internacionais.',
      'Um aplicativo de mensagens instantâneas.',
    ],
    correctIndex: 1,
    explanation:
      'Blockchain é o livro-razão distribuído em blocos mantido por vários computadores da rede para registrar transações com transparência e segurança.',
  },

  // NÍVEL INTERMEDIÁRIO (7 - 12)
  {
    id: 7,
    difficulty: 'Intermediário',
    moduleRef: 4,
    question: 'Qual é a função do mecanismo de Escrow (custódia) em uma plataforma P2P?',
    options: [
      'Aumentar automaticamente o valor das moedas durante a conversa.',
      'Bloquear temporariamente os ativos do vendedor enquanto o comprador realiza o pagamento e o vendedor confere o recebimento.',
      'Converter qualquer print em dinheiro vivo imediatamente.',
      'Substituir a necessidade de conferir a conta bancária.',
    ],
    correctIndex: 1,
    explanation:
      'O Escrow atua como um cofre neutro temporário: retém os ativos do vendedor durante a negociação para proteger comprador e vendedor até a confirmação.',
  },
  {
    id: 8,
    difficulty: 'Intermediário',
    moduleRef: 5,
    question: 'Qual é a sequência lógica correta de uma negociação P2P padrão com custódia?',
    options: [
      'Liberação dos ativos -> Pagamento -> Escolha da oferta -> Bloqueio em custódia.',
      'Escolha da oferta -> Bloqueio em custódia -> Pagamento -> Confirmação real no banco -> Liberação dos ativos.',
      'Pagamento fora da plataforma -> Envio de print -> Criação da oferta.',
      'Cancelamento da ordem -> Pagamento -> Recebimento automático.',
    ],
    correctIndex: 1,
    explanation:
      'Primeiro escolhe-se a oferta e bloqueia-se o ativo em custódia; depois o comprador paga, o vendedor confirma no próprio extrato bancário e, só então, libera os ativos.',
  },
  {
    id: 9,
    difficulty: 'Intermediário',
    moduleRef: 8,
    question: 'Em uma tela de ofertas P2P, o que significa o termo "Spread"?',
    options: [
      'A senha secreta da carteira digital do vendedor.',
      'A diferença entre o preço de compra e de venda (ou entre a cotação média de mercado e o valor da oferta).',
      'O tempo máximo que o chat pode ficar aberto.',
      'O nome da equipe de suporte da corretora.',
    ],
    correctIndex: 1,
    explanation:
      'Spread é a diferença de preço entre compra e venda ou em relação ao valor de referência, refletindo margem e condições da oferta.',
  },
  {
    id: 10,
    difficulty: 'Intermediário',
    moduleRef: 4,
    question: 'Qual é a verdadeira função da plataforma intermediadora em um marketplace P2P com custódia?',
    options: [
      'Comprar todas as moedas para si mesma e revendê-las com preço único obrigatório.',
      'Conectar compradores e vendedores, exibir reputação, gerenciar o escrow e mediar eventuais disputas.',
      'Assumir responsabilidade pelo lucro futuro de quem comprou criptomoedas.',
      'Compartilhar as senhas bancárias dos usuários entre si.',
    ],
    correctIndex: 1,
    explanation:
      'A plataforma P2P organiza anúncios e reputação, protege a operação com custódia temporária (quando disponível) e oferece canal de mediação em caso de conflito.',
  },
  {
    id: 11,
    difficulty: 'Intermediário',
    moduleRef: 8,
    question: 'Para que serve o código TXID após uma transferência na rede blockchain?',
    options: [
      'Para rastrear e comprovar de forma pública o envio e as confirmações da transação.',
      'Para cancelar uma transferência em blockchain depois de já confirmada.',
      'Para alterar o saldo de outra pessoa sem autorização.',
      'Para reduzir a zero o valor de qualquer imposto devido.',
    ],
    correctIndex: 0,
    explanation:
      'O TXID identifica exclusivamente uma transação na blockchain, permitindo acompanhar seu status e confirmações de forma transparente.',
  },
  {
    id: 12,
    difficulty: 'Intermediário',
    moduleRef: 5,
    question: 'Sobre os procedimentos e prazos de negociação entre diferentes plataformas P2P, é correto afirmar:',
    options: [
      'Todas as plataformas do mundo usam exatamente as mesmas taxas e o mesmo cronômetro de 15 minutos.',
      'Regras, taxas, exigências de verificação e prazos podem variar bastante de acordo com a plataforma e a jurisdição.',
      'Nenhuma plataforma permite abrir disputa em caso de problema.',
      'As plataformas são obrigadas por lei a liberar ativos antes do pagamento.',
    ],
    correctIndex: 1,
    explanation:
      'Cada plataforma define suas regras de prazo, verificação de identidade (KYC), taxas e disputas. Por isso é essencial ler as condições antes de operar.',
  },

  // NÍVEL AVANÇADO (13 - 18)
  {
    id: 13,
    difficulty: 'Avançado',
    moduleRef: 7,
    question:
      'Você está vendendo ativos em uma plataforma P2P. O comprador envia um PDF muito bem-feito mostrando um Pix concluído e diz que precisa da liberação em 1 minuto por emergência médica. No aplicativo do seu banco, o saldo não mudou. O que fazer?',
    options: [
      'Liberar os ativos imediatamente para ajudar na emergência e cobrar depois se houver erro.',
      'Liberar metade do valor como gesto de boa fé.',
      'Não liberar nada, explicar no chat oficial que a liberação depende do crédito confirmado diretamente no extrato bancário e aguardar ou abrir mediação.',
      'Pedir para o comprador mandar a senha do banco dele no WhatsApp para você conferir.',
    ],
    correctIndex: 2,
    explanation:
      'Comprovantes em PDF/print podem ser adulterados e a pressa é um clássico gatilho de engenharia social. Só se libera após conferir o dinheiro real na própria conta bancária.',
  },
  {
    id: 14,
    difficulty: 'Avançado',
    moduleRef: 7,
    question:
      'Um comprador diz que o aplicativo bancário dele deu erro e envia um Pix usando a conta da "esposa" ou de um "cliente" desconhecido. Por que essa prática representa um risco grave?',
    options: [
      'Porque caracteriza risco de fraude por pagamento de terceiros (triangulação), podendo gerar contestação bancária (MED) e bloqueio da sua conta.',
      'Porque bancos não aceitam transferências acima de R$ 10 feitas por mulheres.',
      'Porque o dinheiro enviado por terceiros muda o código da blockchain.',
      'Não há risco algum, desde que o valor caia na conta.',
    ],
    correctIndex: 0,
    explanation:
      'No golpe da triangulação, uma vítima terceira é induzida a fazer o Pix para você. Depois que você libera as moedas ao golpista, a vítima contesta o Pix no banco e você fica com o prejuízo.',
  },
  {
    id: 15,
    difficulty: 'Avançado',
    moduleRef: 7,
    question:
      'Um anunciante com preço muito atrativo escreve no chat da plataforma: "Me chama no Telegram que te dou mais 3% de desconto se fecharmos direto sem abrir ordem aqui". Qual é o risco oculto?',
    options: [
      'Nenhum, pois o Telegram possui serviço oficial de custódia bancária brasileira.',
      'Ao sair da plataforma, você perde a proteção do Escrow, o histórico oficial de evidências e o suporte de disputa, ficando exposto a falsos intermediários.',
      'O risco é apenas o celular descarregar mais rápido.',
      'A plataforma aumenta seus impostos automaticamente em 50%.',
    ],
    correctIndex: 1,
    explanation:
      'Retirar a negociação do ambiente oficial da plataforma elimina a custódia (Escrow) e as provas registradas, sendo uma das armadilhas mais frequentes contra iniciantes.',
  },
  {
    id: 16,
    difficulty: 'Avançado',
    moduleRef: 7,
    question:
      'Alguém entra em contato por mensagem privada se apresentando como "Moderador Oficial" de um grupo de troca e pede que você transfira suas criptomoedas para a carteira dele "para garantir a custódia" de uma troca. Como classificar essa situação?',
    options: [
      'Um procedimento padrão e obrigatório de todas as blockchains.',
      'Golpe de falso intermediário e engenharia social; nunca envie ativos para terceiros em conversas privadas.',
      'Uma exigência fiscal da Receita Federal.',
      'Um recurso automático do protocolo TXID.',
    ],
    correctIndex: 1,
    explanation:
      'Custódia legítima (Escrow) é executada automaticamente pelo sistema oficial da plataforma dentro da ordem, jamais por pessoas pedindo transferências em mensagens privadas.',
  },
  {
    id: 17,
    difficulty: 'Avançado',
    moduleRef: 9,
    question:
      'Qual combinação de cuidados representa a postura mais completa de segurança e responsabilidade para um usuário brasileiro no P2P?',
    options: [
      'Operar fora da plataforma, usar senhas simples para não esquecer e nunca anotar o histórico.',
      'Checar reputação, nunca sair da plataforma, conferir o extrato bancário antes de liberar, proteger senhas/2FA, guardar registros e observar normas como a IN 1.888 e o IRPF.',
      'Confiar apenas em prints de comprovantes enviados por clientes antigos.',
      'Compartilhar o código 2FA apenas quando o suporte chamar pelo WhatsApp.',
    ],
    correctIndex: 1,
    explanation:
      'Segurança real une prevenção técnica (2FA, plataforma oficial, conferência direta no banco) com organização documental e respeito às obrigações legais/tributárias vigentes no Brasil.',
  },
  {
    id: 18,
    difficulty: 'Avançado',
    moduleRef: 9,
    question:
      'Você terminou de pagar via Pix uma ordem de compra P2P dentro do prazo e enviou a confirmação no chat oficial. O vendedor pede para você clicar em "Cancelar Ordem" alegando que "assim libera mais rápido pelo suporte". O que você deve fazer?',
    options: [
      'Cancelar a ordem imediatamente para ajudar o vendedor.',
      'Jamais clicar em "Cancelar Ordem" após ter pago; manter a ordem aberta e, se necessário, abrir disputa no ambiente oficial anexando o comprovante bancário real.',
      'Fazer um segundo Pix para garantir que ele receba em dobro.',
      'Apagar sua conta na plataforma na mesma hora.',
    ],
    correctIndex: 1,
    explanation:
      'Se o comprador cancelar a ordem depois de pagar, o Escrow devolve os ativos ao vendedor, que ficará com o dinheiro e com as moedas. Após pagar, mantenha a ordem ativa ou acione a mediação oficial.',
  },
];
