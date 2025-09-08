import type { LandingData } from "../lib/types";

export const landingData: LandingData = {
  hero_title: "Mídia em Elevadores em Salvador",
  hero_subtitle:
    "Alcance seu público-alvo no momento certo, no lugar certo. Publicidade estratégica em elevadores residenciais e comerciais.",
  hero_cta_primary_label: "Falar com especialista",
  hero_cta_secondary_label: "Baixar mídia kit",

  stats: [
    { label: "Elevadores ativos", value: "500+" },
    { label: "Impressões mensais", value: "2M+" },
    { label: "Taxa de atenção", value: "95%" },
  ],

  benefits: [
    {
      title: "Hiperlocal",
      text: "Atinja moradores e trabalhadores específicos de cada região de Salvador com precisão geográfica.",
    },
    {
      title: "Atenção Cativa",
      text: "Seu público não pode escapar da sua mensagem durante os 30-60 segundos no elevador.",
    },
    {
      title: "Alta Frequência",
      text: "Múltiplas exposições diárias garantem que sua marca seja lembrada.",
    },
    {
      title: "Checking Online",
      text: "Acompanhe em tempo real o desempenho da sua campanha com relatórios detalhados.",
    },
  ],

  environments: [
    {
      type: "residencial",
      title: "Elevadores Residenciais",
      text: "Alcance famílias em condomínios de alto padrão. Ideal para serviços locais, educação e lifestyle.",
      image: "/elevadores-residenciais.webp",
    },
    {
      type: "comercial",
      title: "Elevadores Comerciais",
      text: "Impacte profissionais em prédios corporativos. Perfeito para B2B, tecnologia e serviços empresariais.",
      image: "/elevadores-comerciais.webp",
    },
  ],

  howitworks: [
    {
      title: "Planejamento",
      text: "Definimos juntos o público-alvo, localizações estratégicas e objetivos da campanha.",
    },
    {
      title: "Criação",
      text: "Nossa equipe desenvolve o conteúdo visual otimizado para o formato vertical dos elevadores.",
    },
    {
      title: "Veiculação & Checking",
      text: "Instalamos e monitoramos sua campanha com relatórios em tempo real de performance.",
    },
  ],

  proofs: {
    clients: [
      "/clients/client-01.png",
      "/clients/client-02.png",
      "/clients/client-03.png",
      "/clients/client-04.png",
      "/clients/client-05.png",
      "/clients/client-06.png",
    ],
    testimonials: [
      {
        author: "Maria Silva",
        role: "Diretora de Marketing - Escola Premium",
        text: "Aumentamos as matrículas em 40% após a campanha nos elevadores residenciais. O ROI foi excepcional!",
      },
      {
        author: "João Santos",
        role: "CEO - TechSalvador",
        text: "A visibilidade nos prédios comerciais trouxe leads qualificados que não conseguíamos com outras mídias.",
      },
      {
        author: "Ana Costa",
        role: "Proprietária - Clínica Estética",
        text: "Mídia em elevador foi o investimento mais certeiro. Nossos agendamentos triplicaram!",
      },
    ],
    cases: [
      {
        title: "Escola de Idiomas",
        metric_label: "Aumento em matrículas",
        metric_value: "+65%",
      },
      {
        title: "Clínica Médica",
        metric_label: "Novos pacientes",
        metric_value: "+120%",
      },
    ],
  },

  media_kit_file: "#",

  faq: [
    {
      q: "Qual o tempo mínimo de campanha?",
      a: "Recomendamos campanhas de no mínimo 30 dias para garantir frequência adequada e resultados mensuráveis.",
    },
    {
      q: "Como funciona a segmentação geográfica?",
      a: "Selecionamos elevadores em bairros específicos baseado no perfil do seu público-alvo e objetivos da campanha.",
    },
    {
      q: "Vocês criam o material publicitário?",
      a: "Sim! Nossa equipe de design desenvolve todo o material otimizado para o formato vertical dos elevadores.",
    },
    {
      q: "Como acompanho os resultados?",
      a: "Fornecemos relatórios semanais com métricas de exposição, além de acesso a dashboard online em tempo real.",
    },
    {
      q: "Qual o formato das telas?",
      a: "Trabalhamos com telas verticais Full HD (1080x1920) com alta qualidade de imagem e som opcional.",
    },
    {
      q: "Posso alterar o conteúdo durante a campanha?",
      a: "Sim! Oferecemos flexibilidade para ajustes de conteúdo sem custos adicionais durante o período contratado.",
    },
  ],

  contact: {
    address: "Salvador, Bahia - Brasil",
    email: "contato@netlessa.com.br",
    phone: "(71) 99999-9999",
  },
};
