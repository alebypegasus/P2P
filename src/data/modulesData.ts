import type { CourseModule } from '../types/course';

export const COURSE_MODULES: CourseModule[] = [
  {
    id: 1,
    slug: 'o-que-e-p2p',
    title: 'Módulo 1 · O que é P2P?',
    shortTitle: '1. O que é P2P?',
    estimatedMinutes: 4,
    introduction:
      'Você já comprou um livro usado diretamente de um amigo ou trocou figurinhas sem passar por nenhuma loja? Parabéns: sem perceber, você já praticou o conceito de P2P no mundo físico.',
    imageUrl: '/src/assets/images/module_direct_exchange_1794850223950.jpg',
    imageAlt:
      'Ilustração didática de duas pessoas trocando ativos digitais diretamente sobre uma mesa de feira, sem intermediário bancário.',
    diagramId: 'traditional-vs-p2p',
    blocks: [
      {
        heading: 'O significado da sigla Peer-to-Peer',
        paragraphs: [
          'A sigla P2P vem do inglês "Peer-to-Peer", que em português significa "de par para par" ou, de forma ainda mais simples, "de pessoa para pessoa".',
          'Na internet e nas finanças, um "peer" (par) é qualquer participante comum — você, um amigo ou outro usuário conectado à rede — que possui os mesmos direitos básicos para trocar informações, arquivos ou valores diretamente com outra pessoa.',
        ],
      },
      {
        heading: 'Conexão direta vs. negociação tradicional',
        paragraphs: [
          'No modelo tradicional (chamado de centralizado), você depende de uma instituição no meio do caminho para quase tudo: um banco para autorizar uma transferência, uma loja para revender um produto ou uma grande empresa para guardar seus arquivos.',
          'No modelo P2P, os participantes se conectam diretamente entre si. Não existe um balcão central decidindo sozinho o preço, o horário ou quem pode participar daquela troca.',
        ],
        bulletPoints: [
          'Modelo tradicional: Você -> Instituição Central (banco, loja, servidor) -> Outra Pessoa.',
          'Modelo P2P: Você <-> Outra Pessoa (troca direta, com regras combinadas entre as partes).',
        ],
      },
      {
        heading: 'Por que isso importa para quem está começando?',
        paragraphs: [
          'Entender o P2P ajuda você a perceber como a internet funciona quando pessoas colaboram diretamente. Em algumas plataformas modernas, existe um aplicativo apenas para aproximar comprador e vendedor (como um mural de anúncios organizado), mas o acordo acontece entre os dois participantes.',
        ],
        callout: {
          type: 'info',
          title: 'Ideia principal para guardar',
          text: 'P2P não é um produto específico nem um tipo de moeda. É um formato de relação direta entre duas ou mais pessoas sem depender de um intermediário central controlando toda a operação.',
        },
      },
    ],
    examples: [
      {
        title: 'Feira de bairro ou bazar entre vizinhos',
        scenario:
          'Joana tem uma bicicleta parada e Pedro quer comprar uma. Eles conversam pelo grupo do prédio, combinam o valor de R$ 400, encontram-se na portaria e fazem a troca na hora.',
        takeaway:
          'Não houve loja revendedora nem empresa cobrando comissão pela vitrine. Foi uma negociação direta de pessoa para pessoa.',
      },
      {
        title: 'Empréstimo de arquivo entre dois celulares',
        scenario:
          'Quando você envia uma foto diretamente do seu celular para o celular de um amigo via conexão direta local (sem subir para a nuvem antes), os dois aparelhos estão operando em rede par-a-par.',
        takeaway:
          'Os dois participantes são iguais na comunicação: um envia e o outro recebe diretamente.',
      },
    ],
    summaryPoints: [
      'P2P significa Peer-to-Peer ("de pessoa para pessoa").',
      'No modelo tradicional há um controlador central no meio; no P2P os participantes se conectam diretamente.',
      'O conceito já existe no nosso dia a dia há séculos, muito antes da internet.',
    ],
    reflection: {
      prompt:
        'Qual destas situações representa melhor uma negociação no formato P2P (pessoa para pessoa)?',
      options: [
        'Comprar um tênis no site oficial de uma grande rede varejista.',
        'Combinar diretamente com um colega a compra do violão dele e pagar via transferência na entrega.',
        'Pedir um empréstimo no guichê de um banco tradicional.',
        'Pagar a fatura de energia elétrica pelo caixa automático.',
      ],
      correctIndex: 1,
      explanation:
        'Quando você combina preço, entrega e pagamento diretamente com outra pessoa física, sem uma loja ou instituição comprando e revendendo o item no meio, isso segue a lógica direta do P2P.',
    },
  },
  {
    id: 2,
    slug: 'como-funciona-na-pratica',
    title: 'Módulo 2 · Como funciona o P2P na prática?',
    shortTitle: '2. Na prática',
    estimatedMinutes: 5,
    introduction:
      'Agora que você já sabe o que a sigla significa, vamos olhar por dentro de uma troca direta: quem participa, o que cada lado faz e como as duas partes se entendem do início ao fim.',
    diagramId: 'p2p-practice-flow',
    blocks: [
      {
        heading: 'O papel de cada participante',
        paragraphs: [
          'Em uma negociação P2P simples existem dois papéis principais, que podem até mudar de operação para operação:',
        ],
        bulletPoints: [
          'Ofertante (quem anuncia): É quem publica uma proposta dizendo o que tem para oferecer ou o que deseja adquirir, com preço, limites e forma de pagamento aceita.',
          'Tomador (quem aceita): É quem procura entre as propostas disponíveis, escolhe a que mais faz sentido e inicia o contato para fechar o acordo.',
        ],
      },
      {
        heading: 'As 4 etapas naturais de qualquer operação direta',
        paragraphs: [
          'Independentemente de você estar trocando um serviço, um arquivo ou um ativo digital, toda interação P2P bem organizada segue uma sequência lógica de quatro momentos:',
        ],
        bulletPoints: [
          '1. Encontro: As duas partes se localizam (por indicação, grupo ou plataforma de anúncios).',
          '2. Acordo: Ambas confirmam exatamente o que será entregue, o valor, o prazo e o meio de pagamento.',
          '3. Execução: Cada parte cumpre sua obrigação (pagamento de um lado, entrega do item ou ativo do outro).',
          '4. Confirmação: Os dois lados verificam que receberam corretamente o que foi combinado e encerram a operação.',
        ],
      },
      {
        heading: 'Como funciona a comunicação entre as partes',
        paragraphs: [
          'A clareza na conversa é o coração do P2P. Como não há um gerente de loja padronizando tudo, comprador e vendedor usam um chat para tirar dúvidas rápidas: "Você aceita Pix?", "Qual o prazo para envio?", "Está disponível agora?".',
          'Em ambientes digitais organizados, todo esse diálogo fica registrado por escrito dentro da própria plataforma, servindo como histórico caso haja qualquer dúvida ou desacordo.',
        ],
      },
    ],
    examples: [
      {
        title: 'Do anúncio até o aperto de mãos digital',
        scenario:
          'Lucas anuncia que quer vender um monitor usado por R$ 650 via Pix. Marina vê o anúncio, pergunta pelo chat se o cabo HDMI acompanha, Lucas confirma, ela faz o Pix na presença dele após testar o aparelho, e Lucas confirma o valor no extrato do banco antes de entregar a caixa.',
        takeaway:
          'Observe a ordem segura: diálogo claro -> teste/garantia -> pagamento -> conferência no extrato -> entrega final.',
      },
    ],
    summaryPoints: [
      'No P2P há sempre duas pontas ativas: quem anuncia/oferece e quem aceita/negocia.',
      'Toda operação organizada passa por Encontro, Acordo, Execução e Confirmação.',
      'Registrar tudo por escrito em um único canal evita mal-entendidos.',
    ],
    reflection: {
      prompt:
        'Em uma operação P2P prática, por que é importante confirmar os detalhes pelo chat antes de enviar qualquer pagamento?',
      options: [
        'Para deixar registrado o preço, o prazo e o meio de pagamento combinados antes da execução.',
        'Porque o chat transforma automaticamente a operação em um investimento sem risco.',
        'Para que terceiros desconhecidos possam participar do pagamento sem avisar.',
        'Porque sem conversar por pelo menos duas horas o sistema bloqueia o Pix.',
      ],
      correctIndex: 0,
      explanation:
        'Confirmar todas as condições por escrito garante que comprador e vendedor estejam falando exatamente da mesma oferta, evitando erros de valor, prazo ou meio de pagamento.',
    },
  },
  {
    id: 3,
    slug: 'onde-o-p2p-e-utilizado',
    title: 'Módulo 3 · Onde o P2P é utilizado?',
    shortTitle: '3. Onde se usa P2P',
    estimatedMinutes: 5,
    introduction:
      'Muita gente escuta "P2P" e pensa imediatamente em criptomoedas. Mas a verdade é que a arquitetura Peer-to-Peer está presente em várias áreas da tecnologia e da economia que você provavelmente já usa.',
    diagramId: 'p2p-sectors',
    blocks: [
      {
        heading: 'Muito além das moedas digitais',
        paragraphs: [
          'Sempre que um sistema é desenhado para que os próprios usuários compartilhem recursos diretamente entre si — em vez de depender de um único servidor gigante — temos uma aplicação P2P.',
        ],
      },
      {
        heading: 'Os 5 principais ambientes de uso do P2P',
        paragraphs: [
          'Explore no diagrama interativo abaixo cada setor onde o conceito P2P trabalha nos bastidores:',
        ],
        bulletPoints: [
          'Compartilhamento de arquivos: Programas como o BitTorrent dividem um arquivo grande (como uma distribuição gratuita do Linux) em pedacinhos. Cada usuário baixa trechos de outros usuários e também ajuda a enviar os trechos que já possui.',
          'Redes de computadores e chamadas: Aplicativos de chamada de vídeo ou jogos em rede local muitas vezes conectam dois computadores diretamente para reduzir atrasos na voz e na imagem.',
          'Transferências e pagamentos digitais: Envio direto de recursos de uma conta ou carteira digital para outra, sem passar por um caixa intermediário definindo horários comerciais.',
          'Marketplaces e plataformas de troca P2P: Ambientes que apenas conectam pessoas que querem comprar e vender itens, serviços ou moedas digitais, oferecendo reputação e regras de mediação.',
          'Mercado de criptomoedas: Redes como Bitcoin funcionam graças a milhares de computadores independentes (nós) espalhados pelo mundo que trocam e validam transações diretamente entre si.',
        ],
        callout: {
          type: 'tip',
          title: 'Atenção à diferença fundamental',
          text: 'P2P é a tecnologia ou modelo de conexão direta; criptomoeda é um tipo de ativo digital. Você pode usar redes P2P sem nunca tocar em criptomoedas!',
        },
      },
    ],
    examples: [
      {
        title: 'Baixando um sistema gratuito sem congestionar um único site',
        scenario:
          'Quando milhões de pessoas baixam uma atualização de software ao mesmo tempo de um único servidor, o site pode cair. Em uma rede P2P de arquivos, cada pessoa que baixa também repassa pequenos blocos para quem chegou depois.',
        takeaway:
          'Quanto mais participantes conectados em uma rede P2P saudável, mais distribuída e resiliente ela fica.',
      },
      {
        title: 'Classificados online vs. loja tradicional',
        scenario:
          'Em um marketplace P2P, você vê o anúncio de outro cidadão, conversa com ele e negocia diretamente, ao contrário de uma loja que compra o estoque e revende por conta própria.',
        takeaway:
          'A plataforma aproxima e organiza; quem negocia de verdade são os usuários.',
      },
    ],
    summaryPoints: [
      'O conceito P2P nasceu na computação e nas redes antes mesmo das criptomoedas.',
      'Ele é usado em compartilhamento de arquivos, redes diretas, pagamentos, marketplaces e blockchain.',
      'Saber separar o modelo P2P (forma de conexão) do objeto negociado (arquivo, produto ou criptoativo) evita confusões.',
    ],
    reflection: {
      prompt: 'A afirmação "P2P existe exclusivamente no mercado de criptomoedas" é:',
      options: [
        'Verdadeira, pois só o Bitcoin usa conexões diretas.',
        'Falsa, pois P2P também é usado em compartilhamento de arquivos, redes de computadores e marketplaces.',
        'Verdadeira, porque bancos tradicionais proíbem conexões diretas.',
        'Falsa apenas no Brasil, mas verdadeira no restante do mundo.',
      ],
      correctIndex: 1,
      explanation:
        'O modelo Peer-to-Peer é amplo e abrange compartilhamento de arquivos, redes distribuídas, marketplaces de pessoas e, claro, o universo de criptomoedas.',
    },
  },
  {
    id: 4,
    slug: 'p2p-no-mercado-de-criptomoedas',
    title: 'Módulo 4 · P2P no mercado de criptomoedas',
    shortTitle: '4. P2P em cripto',
    estimatedMinutes: 6,
    introduction:
      'No mercado de moedas digitais, o P2P ganhou enorme destaque porque permite que pessoas comprem e vendam criptoativos diretamente entre si. Vamos traduzir cada palavra desse universo para o português claro.',
    diagramId: 'crypto-orderbook-escrow',
    blocks: [
      {
        heading: 'O que são criptomoedas e o Bitcoin?',
        paragraphs: [
          'Criptomoedas são moedas digitais protegidas por matemática avançada (criptografia) que funcionam pela internet sem pertencer a um único banco ou governo. O Bitcoin, criado em 2009, foi a primeira e é a mais conhecida delas, mas existem milhares de outras (como Ethereum ou moedas pareadas ao dólar, chamadas stablecoins).',
          'As transações ficam registradas em um livro-razão público e compartilhado chamado blockchain — imagine um caderno digital copiado em milhares de computadores ao mesmo tempo, onde ninguém consegue apagar uma linha já confirmada.',
        ],
      },
      {
        heading: 'Corretora tradicional vs. negociação P2P',
        paragraphs: [
          'Em uma corretora tradicional (também chamada de exchange centralizada), você deposita reais na conta da empresa e compra diretamente do livro automático da corretora, que guarda seus dados, cobra taxas fixas e segue seus próprios horários ou regras bancárias.',
          'Já na negociação P2P de criptomoedas, você escolhe diretamente outra pessoa que quer vender (ou comprar) aquele ativo, combina o pagamento em reais (como Pix ou TED) diretamente para a conta dela e recebe as criptomoedas diretamente após a confirmação.',
        ],
      },
      {
        heading: 'Entendendo ofertas, ordens, pagamento e Escrow (Custódia)',
        paragraphs: [
          'Para não se perder nas telas de plataformas P2P, basta dominar quatro termos essenciais:',
        ],
        bulletPoints: [
          'Compradores e Vendedores: Quem quer adquirir criptomoedas com dinheiro comum é o comprador; quem entrega as criptomoedas em troca de dinheiro é o vendedor.',
          'Ofertas (Anúncios): São as propostas publicadas por vendedores ou compradores informando preço unitário, valor mínimo/máximo por operação e meios de pagamento aceitos.',
          'Ordens de compra e venda: Quando você clica em uma oferta e informa quanto quer negociar (ex.: R$ 200), nasce uma ordem — um pedido formal com prazo definido para ser concluído.',
          'Escrow (Serviço de Custódia): É o "cofre neutro temporário" da plataforma intermediadora. Antes de você enviar o dinheiro ao vendedor, a plataforma trava as criptomoedas dele nesse cofre. Ele não consegue fugir com as moedas nem você consegue recebê-las sem pagar.',
          'Função da plataforma intermediadora: Ela não é dona das moedas negociadas; atua como vitrine organizada, exibe a reputação dos usuários, mantém o cofre de custódia (escrow) ativo e oferece suporte de mediação (disputa) se houver problema.',
        ],
        callout: {
          type: 'warning',
          title: 'Importante sobre o Escrow',
          text: 'Nem toda negociação P2P usa plataforma com custódia (há trocas diretas sem intermediário algum, baseadas apenas em confiança). Para iniciantes, operar dentro de plataformas com escrow claro reduz bastante o risco de uma parte sumir com o ativo.',
        },
      },
    ],
    examples: [
      {
        title: 'Comprando R$ 150 em Bitcoin via oferta P2P',
        scenario:
          'Você entra em uma plataforma P2P, filtra por vendedores com mais de 98% de avaliações positivas que aceitam Pix e escolhe uma oferta com limite de R$ 50 a R$ 1.000. Você abre uma ordem de compra de R$ 150. Na mesma hora, a plataforma trava o equivalente a R$ 150 em Bitcoin do vendedor dentro do Escrow.',
        takeaway:
          'Você tem tranquilidade para enviar o Pix porque sabe que as moedas já estão reservadas na custódia aguardando a confirmação do pagamento.',
      },
    ],
    summaryPoints: [
      'Criptomoedas são ativos digitais que funcionam em redes descentralizadas como a blockchain.',
      'No P2P de cripto, pessoas criam ofertas e abrem ordens de compra ou venda diretamente entre si.',
      'O Escrow (custódia) trava temporariamente os ativos do vendedor até que o pagamento seja confirmado.',
    ],
    reflection: {
      prompt: 'Qual é o papel principal do mecanismo de Escrow (custódia) em uma plataforma P2P?',
      options: [
        'Garantir lucro financeiro automático ao comprador após 30 dias.',
        'Reter temporariamente os ativos digitais do vendedor enquanto o pagamento é feito e conferido.',
        'Substituir a necessidade de conferir o extrato bancário antes de liberar moedas.',
        'Transformar qualquer comprovante em dinheiro instantâneo.',
      ],
      correctIndex: 1,
      explanation:
        'O Escrow funciona como um cofre neutro temporário que bloqueia as criptomoedas do vendedor durante a negociação, protegendo as duas partes até a confirmação real do pagamento.',
    },
  },
  {
    id: 5,
    slug: 'passo-a-passo-negociacao-p2p',
    title: 'Módulo 5 · Como acontece uma negociação P2P?',
    shortTitle: '5. Passo a passo',
    estimatedMinutes: 6,
    introduction:
      'Veja em câmera lenta, etapa por etapa, o caminho completo de uma negociação P2P segura. Use o simulador animado abaixo para acompanhar cada movimento entre comprador, vendedor e custódia.',
    diagramId: 'six-step-trade',
    blocks: [
      {
        heading: 'As 6 etapas de uma operação P2P completa',
        paragraphs: [
          'Embora detalhes de tela, prazos e regras variem conforme a plataforma escolhida, a espinha dorsal de uma operação assistida por custódia segue seis passos claros:',
        ],
        bulletPoints: [
          'Etapa 1 · O comprador escolhe uma oferta: Ele compara preço, limites mínimo/máximo, reputação, número de operações concluídas e forma de pagamento.',
          'Etapa 2 · O vendedor aceita a negociação (ou a ordem é aberta): As condições ficam congeladas no preço combinado, com um cronômetro de prazo para pagamento.',
          'Etapa 3 · Bloqueio em custódia (Escrow): Quando esse recurso está disponível na plataforma, os ativos do vendedor são travados automaticamente e não podem ser movidos para outro lugar durante a ordem.',
          'Etapa 4 · Pagamento pelo meio combinado: O comprador transfere exatamente o valor combinado (ex.: via Pix da própria titularidade) para os dados bancários exibidos na ordem e marca como "Pago".',
          'Etapa 5 · O vendedor confirma o recebimento: Responsabilidade crítica! O vendedor abre o aplicativo do seu próprio banco e confere no extrato se o dinheiro realmente entrou na conta.',
          'Etapa 6 · Liberação dos ativos: Após confirmar o dinheiro em conta, o vendedor clica em "Liberar" e a plataforma entrega as criptomoedas ao comprador conforme as regras vigentes.',
        ],
      },
      {
        heading: 'Responsabilidades e variações entre plataformas',
        paragraphs: [
          'Cada plataforma define suas próprias regras: o tempo limite de uma ordem pode ser de 15 a 30 minutos; algumas exigem verificação de identidade prévia (KYC); outras permitem abertura imediata de disputa caso uma parte não responda.',
          'Lembre-se sempre: o comprador é responsável por pagar no valor exato, dentro do prazo e usando uma conta no próprio nome. O vendedor é responsável por conferir o saldo real no banco antes de liberar qualquer ativo.',
        ],
        callout: {
          type: 'info',
          title: 'Procedimentos variam por plataforma',
          text: 'Nunca presuma que todas as plataformas funcionam igual. Antes de negociar valores reais, leia atentamente os termos, prazos de disputa e eventuais taxas do ambiente escolhido.',
        },
      },
    ],
    examples: [
      {
        title: 'Se algo atrasar no meio do caminho',
        scenario:
          'Imagine que o comprador marcou "Pago", mas o Pix caiu em análise do banco e ainda não apareceu no extrato do vendedor. O vendedor NÃO libera as moedas; ambos aguardam dentro do prazo ou acionam a equipe de mediação (disputa) enviando evidências oficiais.',
        takeaway:
          'A custódia segura os ativos protegidos até que a situação seja esclarecida com segurança.',
      },
    ],
    summaryPoints: [
      'A jornada padrão envolve 6 passos: Oferta -> Aceite -> Custódia -> Pagamento -> Conferência no extrato -> Liberação.',
      'O comprador deve pagar do próprio banco no prazo; o vendedor só libera após ver o saldo real.',
      'Regras, prazos e taxas mudam de uma plataforma para outra.',
    ],
    reflection: {
      prompt:
        'Na Etapa 5 de uma negociação P2P, o que o vendedor deve fazer antes de clicar no botão de liberar os ativos?',
      options: [
        'Confiar na foto do comprovante enviada pelo comprador no chat e liberar rápido.',
        'Acessar diretamente a própria conta bancária e confirmar que o valor foi creditado no extrato.',
        'Pedir para o comprador enviar os dados por aplicativo de mensagens externo.',
        'Cancelar a ordem para economizar tempo.',
      ],
      correctIndex: 1,
      explanation:
        'Comprovantes em imagem ou PDF podem ser falsificados facilmente. A única confirmação válida é ver o dinheiro efetivamente creditado no extrato oficial do seu banco.',
    },
  },
  {
    id: 6,
    slug: 'vantagens-do-p2p',
    title: 'Módulo 6 · Vantagens do P2P',
    shortTitle: '6. Vantagens',
    estimatedMinutes: 4,
    introduction:
      'Por que milhões de pessoas ao redor do mundo escolhem negociar diretamente com outros participantes em vez de usar apenas canais tradicionais? Conheça os cinco benefícios práticos do modelo.',
    diagramId: 'advantages-matrix',
    blocks: [
      {
        heading: 'Cinco vantagens reais da negociação direta',
        paragraphs: [
          'Quando você entende como o P2P opera, fica fácil enxergar por que ele complementa — e às vezes substitui — os caminhos tradicionais:',
        ],
        bulletPoints: [
          'Negociação direta entre participantes: Você conversa e fecha negócio com outra pessoa real, sabendo exatamente quem está do outro lado e observando o histórico de reputação dela.',
          'Diversidade de meios de pagamento: Enquanto corretoras tradicionais aceitam poucos métodos bancários, no P2P as ofertas podem incluir Pix, transferência bancária, carteiras digitais e dezenas de outros meios aceitos localmente.',
          'Flexibilidade de negociação: É possível escolher limites pequenos ou grandes, horários variados (inclusive fins de semana e madrugadas) e condições alinhadas à sua necessidade.',
          'Possibilidade de encontrar diferentes ofertas: Como vários vendedores competem pela atenção no mesmo mural, você pode comparar preços, prazos médios de liberação e avaliações antes de decidir.',
          'Acesso a mercados e participantes de diferentes regiões: O modelo P2P conecta pessoas em locais onde serviços financeiros convencionais são caros, lentos ou limitados, facilitando trocas entre moedas e regiões.',
        ],
      },
      {
        heading: 'Equilíbrio e realismo',
        paragraphs: [
          'Ter mais liberdade e opções não significa "ganho fácil" ou "ausência de custos". Algumas ofertas P2P têm preço um pouco acima ou abaixo da cotação média de mercado (o chamado spread) justamente pela conveniência, rapidez ou meio de pagamento oferecido.',
        ],
        callout: {
          type: 'tip',
          title: 'Comparar sempre vale a pena',
          text: 'Nem sempre a oferta mais barata é a melhor. Avalie o conjunto: preço justo, reputação sólida, histórico de conclusões rápidas e regras claras.',
        },
      },
    ],
    examples: [
      {
        title: 'Precisando negociar no domingo à noite',
        scenario:
          'Um usuário precisa adquirir uma pequena fração de moeda digital em um feriado usando uma carteira digital específica que a corretora tradicional não aceita. No mural P2P, ele encontra vendedores online aceitando exatamente aquele meio de pagamento.',
        takeaway:
          'A flexibilidade de horários e meios de pagamento é uma das forças mais práticas do P2P.',
      },
    ],
    summaryPoints: [
      'O P2P entrega contato direto, variedade de pagamentos e flexibilidade de valores e horários.',
      'A concorrência entre ofertas permite escolher melhor reputação e condição.',
      'Mais liberdade exige também mais atenção do usuário para comparar taxas, preços e riscos.',
    ],
    reflection: {
      prompt: 'Qual combinação resume melhor as vantagens do modelo P2P para um iniciante?',
      options: [
        'Lucro garantido todo mês e ausência total de riscos.',
        'Negociação direta, variedade de meios de pagamento, flexibilidade e acesso a diversas ofertas.',
        'Dispensa de conferência bancária e senhas compartilhadas.',
        'Funcionamento apenas em horário comercial bancário de segunda a sexta.',
      ],
      correctIndex: 1,
      explanation:
        'O P2P se destaca pela flexibilidade, diversidade de meios de pagamento, contato direto entre pares e acesso a múltiplas ofertas e regiões — sem jamais prometer lucros garantidos.',
    },
  },
  {
    id: 7,
    slug: 'riscos-e-cuidados-necessarios',
    title: 'Módulo 7 · Riscos e cuidados necessários',
    shortTitle: '7. Riscos e golpes',
    estimatedMinutes: 7,
    introduction:
      'Este é o módulo mais importante de todo o curso. No P2P, você tem mais autonomia — e com autonomia vem a responsabilidade de reconhecer truques usados por golpistas antes que aconteçam.',
    imageUrl: '/src/assets/images/module_escrow_security_1794850224458.jpg',
    imageAlt:
      'Ilustração de um cofre transparente protegendo blocos dourados entre duas balanças equilibradas, representando custódia segura e prevenção a fraudes.',
    diagramId: 'scam-detector',
    blocks: [
      {
        heading: 'Os golpes mais comuns no P2P e como funcionam',
        paragraphs: [
          'Golpistas raramente "invadem sistemas" por magia; na maioria das vezes eles usam pressa, emoção ou falta de atenção da vítima. Conheça cada tática:',
        ],
        bulletPoints: [
          'Comprovantes falsos ou adulterados: O comprador envia um print ou PDF perfeito de um Pix ou TED editado em programas de imagem, ou um comprovante de "agendamento" que ele cancela segundos depois.',
          'Pagamentos realizados por terceiros (Golpe da Triangulação): A pessoa que conversa com você pede para outra vítima inocente fazer o Pix para a sua conta. Depois que você libera as moedas ao golpista, a vítima real contesta o Pix no banco por fraude (MED) e sua conta pode ser bloqueada.',
          'Fraudes envolvendo contas bancárias: Uso de contas laranjas, contas invadidas ou depósitos por envelope vazio em caixa eletrônico para simular saldo "a compensar".',
          'Tentativas de negociação fora da plataforma: O participante pede seu WhatsApp ou Telegram dizendo "lá fazemos sem taxa". Assim que você sai da plataforma, perde a proteção do Escrow (custódia) e do histórico oficial.',
          'Falsos intermediários: Alguém se passa pelo suporte oficial ou por um "avaliador neutro" em grupos de mensagens, pedindo que você transfira moedas ou dinheiro para ele guardar.',
          'Engenharia social: Pressão psicológica ("libera logo, estou com emergência médica", "meu aplicativo travou, mas já foi, confia em mim") para fazer você pular a conferência no banco.',
          'Liberar ativos antes de confirmar o recebimento: O erro fatal! Uma vez que uma transação de criptomoeda é confirmada na blockchain ou liberada ao golpista, ela é irreversível.',
        ],
      },
      {
        heading: 'A regra de ouro que protege contra a maioria dos golpes',
        paragraphs: [
          'NUNCA libere ativos com base apenas em prints, fotos, áudios ou PDFs enviados pelo comprador no chat. Abra você mesmo o aplicativo oficial do seu banco, atualize o extrato e confirme que o dinheiro líquido já está disponível na sua conta — e verifique se o nome/CPF do pagador bate com o titular da ordem.',
          'Verifique sempre a identidade e a reputação do participante antes de iniciar: quantidade de negociações concluídas, tempo de conta, taxa de conclusão e avaliações de outros usuários.',
        ],
        callout: {
          type: 'warning',
          title: 'Regra inegociável de segurança',
          text: 'Print não é dinheiro na conta. Agendamento não é pagamento concluído. Pagamento de terceiro desconhecido deve ser recusado e devolvido pelos canais oficiais do banco antes de qualquer liberação.',
        },
      },
    ],
    examples: [
      {
        title: 'Cenário fictício 1: O Pix agendado com pressa',
        scenario:
          'Rafael vende cripto. O comprador envia um PDF com logo do banco dizendo "Pix enviado - R$ 500" e manda mensagem: "Estou no hospital, libera rápido por favor!". Ao olhar com calma no próprio app do banco, Rafael vê R$ 0,00 creditado e nota que no PDF está escrito bem pequeno "Agendado para amanhã".',
        takeaway:
          'Rafael não libera, avisa no chat da plataforma e cancela/abre disputa conforme a regra. A pressa era engenharia social.',
      },
      {
        title: 'Cenário fictício 2: O convite para o Telegram',
        scenario:
          'Na tela da plataforma, um anúncio oferece um preço ótimo, mas na descrição pede para chamar no Telegram para "fechar mais rápido sem burocracia".',
        takeaway:
          'Fora da plataforma não existe custódia (Escrow) nem histórico para disputa. Recuse sempre propostas para negociar por fora.',
      },
    ],
    summaryPoints: [
      'Jamais libere ativos olhando apenas comprovantes/prints no chat; confira sempre o extrato real do seu banco.',
      'Recuse pagamentos de contas de terceiros que não correspondem ao titular cadastrado na negociação.',
      'Nunca saia do ambiente oficial da plataforma e desconfie de qualquer urgência exagerada.',
    ],
    reflection: {
      prompt:
        'Um comprador envia um print nítido de Pix no valor exato e pede liberação urgente porque está atrasado. Você abre seu banco e o saldo ainda não caiu. Qual é a atitude correta?',
      options: [
        'Liberar metade agora e esperar o resto cair depois.',
        'Não liberar nada, explicar pelo chat oficial que só libera após o crédito aparecer no extrato bancário e aguardar ou abrir mediação.',
        'Passar seu WhatsApp pessoal para ele enviar o comprovante em melhor qualidade.',
        'Pedir para ele enviar um Pix usando o CPF de um primo dele.',
      ],
      correctIndex: 1,
      explanation:
        'Sem o valor efetivamente creditado no seu extrato bancário, não há pagamento confirmado. Nunca libere por print e mantenha toda a comunicação dentro da plataforma.',
    },
  },
  {
    id: 8,
    slug: 'termos-e-expressoes-importantes',
    title: 'Módulo 8 · Termos e expressões importantes',
    shortTitle: '8. Glossário P2P',
    estimatedMinutes: 6,
    introduction:
      'O universo P2P e digital usa várias palavras em inglês ou termos técnicos que assustam quem está começando. Aqui está o seu dicionário traduzido para a vida real — com definição simples e exemplo prático para cada um dos 19 termos essenciais.',
    diagramId: 'glossary-explorer',
    blocks: [
      {
        heading: 'Como usar este glossário no dia a dia',
        paragraphs: [
          'Você não precisa decorar tudo de uma vez. Use a barra de busca e os filtros de categoria no glossário interativo abaixo sempre que encontrar uma palavra nova em uma plataforma, notícia ou conversa.',
        ],
      },
    ],
    examples: [
      {
        title: 'Traduzindo uma frase comum na prática',
        scenario:
          'Imagine ler: "Abri uma ordem de compra na rede, o vendedor deixou em escrow e enviou o TXID após a confirmação na blockchain para minha wallet."',
        takeaway:
          'Em bom português simples: "Pedi para comprar, a plataforma segurou as moedas no cofre temporário e, depois do pagamento, o sistema registrou o código de recibo público enviando as moedas para a minha carteira digital."',
      },
    ],
    summaryPoints: [
      'Dominar os 19 termos básicos remove a barreira de linguagem e ajuda a identificar telas falsas.',
      'Spread e Taxa são custos diferentes que impactam o preço final da operação.',
      'TXID e Confirmação permitem rastrear transferências na blockchain de forma transparente.',
    ],
    reflection: {
      prompt: 'O que representa o termo TXID em uma transferência de criptomoeda na rede?',
      options: [
        'A senha secreta que nunca pode ser mostrada a ninguém.',
        'O código identificador único daquela transação, funcionando como um número de protocolo ou recibo público.',
        'Uma taxa extra cobrada pelo banco central.',
        'O nome da empresa que fabricou o celular.',
      ],
      correctIndex: 1,
      explanation:
        'TXID (Transaction ID) é o código único de rastreamento da transação na blockchain, permitindo confirmar que ela foi enviada e quantas confirmações já recebeu.',
    },
  },
  {
    id: 9,
    slug: 'boas-praticas-seguranca',
    title: 'Módulo 9 · Boas práticas para operar com segurança',
    shortTitle: '9. Boas práticas',
    estimatedMinutes: 5,
    introduction:
      'Fechamos a trilha teórica reunindo os hábitos que separam uma experiência tranquila de uma dor de cabeça. Revise e marque cada item do checklist interativo abaixo antes de realizar qualquer operação real.',
    diagramId: 'safety-checklist',
    blocks: [
      {
        heading: 'Os 9 hábitos fundamentais de segurança',
        paragraphs: [
          'Segurança no P2P é um processo contínuo feito de pequenas verificações antes, durante e depois de cada negociação:',
        ],
        bulletPoints: [
          '1. Utilizar plataformas confiáveis: Pesquise histórico, reputação, clareza das regras de custódia (Escrow) e canais reais de suporte.',
          '2. Verificar a reputação dos participantes: Analise taxa de conclusão, quantidade de ordens passadas, comentários e tempo de atividade da conta.',
          '3. Conferir os dados da negociação: Leia valor unitário, quantidade total, prazo limite e titularidade da conta bancária antes de confirmar.',
          '4. Não aceitar comprovantes como única confirmação: Confirme o crédito diretamente no aplicativo oficial do seu banco ou carteira.',
          '5. Não sair do ambiente oficial da plataforma: Todo chat e envio de evidências devem permanecer dentro do sistema onde a ordem foi aberta.',
          '6. Não compartilhar senhas ou códigos de autenticação: Suporte verdadeiro jamais pede sua senha, palavras-semente da carteira (seed phrase) ou código de 2 fatores (2FA).',
          '7. Conhecer as regras da plataforma: Entenda quando cancelar, como abrir disputa, quais meios de pagamento são permitidos e quais taxas existem.',
          '8. Guardar registros das operações: Salve datas, valores, nomes das contrapartes, comprovantes bancários e códigos TXID para controle pessoal e fiscal.',
          '9. Respeitar exigências legais e tributárias aplicáveis: No Brasil, criptoativos são regulados pelo Marco Legal (Lei nº 14.478/2022) e possuem obrigações junto à Receita Federal.',
        ],
      },
      {
        heading: 'Responsabilidade legal e tributária no Brasil',
        paragraphs: [
          'Operar em P2P não significa "invisibilidade fiscal". No Brasil, a Receita Federal estabelece regras específicas que todo cidadão deve observar conforme as normas vigentes:',
        ],
        bulletPoints: [
          'Declaração de Informações (IN RFB nº 1.888/2019): Quando você realiza operações em exchanges no exterior ou negociações P2P diretas (fora de corretora nacional) cuja soma mensal ultrapassar o limite previsto pela Receita Federal (atualmente R$ 30.000 no mês), o próprio contribuinte deve informar as movimentações via e-CAC no mês seguinte.',
          'Imposto de Renda (IRPF) e Ganho de Capital: A posse de criptoativos acima dos valores mínimos definidos anualmente nas regras do IRPF deve constar na ficha de Bens e Direitos, e eventuais lucros em vendas acima dos limites mensais vigentes podem estar sujeitos à apuração de ganho de capital.',
          'Consulte sempre fontes oficiais: Regras tributárias e limites podem ser atualizados pela Receita Federal ou variar em outros países. Em caso de dúvida, consulte o portal oficial da Receita Federal ou um contador habilitado.',
        ],
        callout: {
          type: 'info',
          title: 'Transparência e responsabilidade',
          text: 'Este curso tem caráter exclusivamente educacional. Nenhuma estratégia P2P garante ganhos financeiros, isenção automática ou ausência de riscos.',
        },
      },
    ],
    examples: [
      {
        title: 'Organizando um caderno ou planilha simples',
        scenario:
          'A cada negociação concluída, Ana anota em uma planilha simples: data, ativo negociado, valor em reais, plataforma usada e código TXID. No fim do ano, ela tem tudo pronto para conferir se precisa declarar.',
        takeaway:
          'Guardar registros leva 30 segundos por operação e evita dores de cabeça futuras com suporte, banco ou declarações fiscais.',
      },
    ],
    summaryPoints: [
      'Use plataformas com reputação verificada e mantenha 100% da conversa dentro delas.',
      'Jamais compartilhe senhas, códigos 2FA ou palavras de recuperação da sua carteira.',
      'Guarde registros e cumpra as normas legais e tributárias vigentes no seu país (como a IN 1.888 e o IRPF no Brasil).',
    ],
    reflection: {
      prompt:
        'No Brasil, qual atitude está alinhada às boas práticas legais e tributárias ao operar em P2P de criptoativos?',
      options: [
        'Achar que operações P2P nunca precisam ser registradas nem declaradas.',
        'Guardar registros das operações e verificar as regras vigentes da Receita Federal (como IN 1.888 e IRPF) conforme os limites aplicáveis.',
        'Compartilhar sua senha do banco com o comprador para agilizar a conferência.',
        'Apagar todo histórico assim que a transferência for concluída.',
      ],
      correctIndex: 1,
      explanation:
        'Manter registros organizados e observar as obrigações da Receita Federal (como a IN RFB nº 1.888/2019 e as regras de IRPF vigentes) é parte essencial do uso responsável.',
    },
  },
];
