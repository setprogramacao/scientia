/*
  Scientia: configuração do site.

  1. Troca o número de WhatsApp da marca (só dígitos, com indicativo do país).
     Moçambique = 258. Exemplo: "258841234567"
  2. Os serviços e os campos de cada formulário estão em "servicos".
     A lista de serviços da página inicial (index.html) está escrita à mão:
     se mudares o nome de um serviço aqui, muda também lá.
*/
window.SCIENTIA = {
  whatsapp: "258863658235",

  textoGeral: "Olá, Scientia! Gostaria de pedir uma proposta.",

  // Campos que aparecem em todos os formulários, antes dos campos do serviço.
  comuns: [
    { name: "nome", label: "Nome completo", type: "text", required: true, autocomplete: "name" },
    { name: "curso", label: "Curso", type: "text", required: true, placeholder: "Ex.: Engenharia Electrónica" },
    { name: "nivel", label: "Nível", type: "select", required: true, options: ["Licenciatura", "Mestrado", "Doutoramento", "Outro"] },
    { name: "instituicao", label: "Instituição", type: "text", required: true, placeholder: "Ex.: Universidade Zambeze" },
    { name: "prazo", label: "Prazo desejado", type: "text", placeholder: "Ex.: 30 de Novembro, ou sem prazo definido" }
  ],

  // Campo que aparece em todos os formulários, depois dos campos do serviço.
  finais: [
    { name: "observacoes", label: "Mais alguma coisa que devamos saber?", type: "textarea" }
  ],

  servicos: {
    diagnostico: {
      titulo: "Diagnóstico gratuito",
      etapa: "Qualquer etapa",
      descricao: "Conta-nos onde estás e onde sentes dificuldade. Dizemos-te que serviço faz sentido, ou se nem precisas de nenhum.",
      campos: [
        { name: "situacao", label: "Em que etapa do trabalho estás?", type: "select", required: true,
          options: ["Ainda não tenho tema", "Tenho tema, falta o projecto", "Estou a recolher dados", "Estou a escrever", "Estou a rever e a formatar", "Vou defender em breve", "Quero publicar um artigo", "Não sei"] },
        { name: "dificuldade", label: "Qual é a tua maior dificuldade neste momento?", type: "textarea", required: true }
      ]
    },

    tema: {
      titulo: "Escolha e delimitação do tema",
      etapa: "Início",
      descricao: "Ajudamos-te a transformar uma área de interesse num tema viável, que cabe no teu prazo e tem um problema de pesquisa claro.",
      campos: [
        { name: "area", label: "Área de interesse", type: "text", required: true, placeholder: "Ex.: automação industrial" },
        { name: "ideias", label: "Ideias de tema, se já tiveres", type: "textarea" },
        { name: "dificuldade", label: "Onde sentes mais dificuldade?", type: "textarea" }
      ]
    },

    projecto: {
      titulo: "Projecto de pesquisa e metodologia",
      etapa: "Planeamento",
      descricao: "Construímos ou revemos contigo o projecto de pesquisa: problema, objectivos, hipóteses e escolha da metodologia.",
      campos: [
        { name: "tema", label: "Tema", type: "text", required: true },
        { name: "objectivo", label: "Objectivo do trabalho", type: "textarea" },
        { name: "tipo", label: "Tipo de pesquisa", type: "select", options: ["Não sei", "Qualitativa", "Quantitativa", "Mista"] },
        { name: "estado", label: "Em que ponto está o projecto?", type: "select", required: true, options: ["Ainda não comecei", "Tenho um rascunho", "Tenho o projecto escrito"] }
      ]
    },

    dados: {
      titulo: "Análise de dados e estatística",
      etapa: "Execução",
      descricao: "Orientamos o desenho de questionários e a análise estatística, e explicamos os resultados para que os saibas defender.",
      campos: [
        { name: "tipoDados", label: "Que tipo de dados tens?", type: "select", required: true, options: ["Questionário ou inquérito", "Medições ou experiências", "Dados de outras fontes", "Ainda não recolhi dados"] },
        { name: "software", label: "Software", type: "select", options: ["SPSS", "Excel", "R", "Python", "Outro", "Não sei"] },
        { name: "amostra", label: "Tamanho da amostra e número de variáveis", type: "text", placeholder: "Ex.: 120 participantes, 15 variáveis" },
        { name: "duvida", label: "Qual é a tua dúvida principal?", type: "textarea", required: true }
      ]
    },

    escrita: {
      titulo: "Mentoria de escrita",
      etapa: "Escrita",
      descricao: "Acompanhamos a escrita capítulo a capítulo, com feedback sobre estrutura, argumentação e clareza. Tu escreves, nós orientamos.",
      campos: [
        { name: "etapa", label: "Em que parte estás?", type: "select", required: true, options: ["Introdução", "Revisão da literatura", "Metodologia", "Resultados", "Discussão e conclusão", "O trabalho todo"] },
        { name: "concluido", label: "O que já tens escrito?", type: "textarea" },
        { name: "norma", label: "Norma exigida", type: "select", options: ["APA", "ABNT", "Vancouver", "Norma da minha instituição", "Não sei"] }
      ],
      nota: "Podes enviar o que já escreveste na conversa do WhatsApp, depois de enviares este pedido."
    },

    revisao: {
      titulo: "Revisão e formatação",
      etapa: "Finalização",
      descricao: "Revemos linguagem, normas e formatação, e verificamos a similaridade para que corrijas o que for preciso.",
      campos: [
        { name: "tipo", label: "O que precisas?", type: "select", required: true, options: ["Revisão linguística", "Normas e formatação", "Verificação de similaridade", "Tudo isto"] },
        { name: "norma", label: "Norma exigida", type: "select", options: ["APA", "ABNT", "Vancouver", "Norma da minha instituição", "Não sei"] },
        { name: "paginas", label: "Número de páginas", type: "number", min: 1 }
      ],
      nota: "O ficheiro envias-nos na conversa do WhatsApp, depois de enviares este pedido."
    },

    defesa: {
      titulo: "Preparação da defesa",
      etapa: "Defesa",
      descricao: "Preparamos a apresentação e simulamos a defesa, incluindo as perguntas mais prováveis da banca.",
      campos: [
        { name: "data", label: "Data da defesa", type: "text", required: true, placeholder: "Ex.: 15 de Dezembro" },
        { name: "tema", label: "Tema do trabalho", type: "text" },
        { name: "preparacao", label: "O que já tens?", type: "select", options: ["Ainda nada", "Tenho os slides", "Tenho os slides e quero simular a defesa"] }
      ]
    },

    artigo: {
      titulo: "Publicação de artigos",
      etapa: "Publicação",
      descricao: "Ajudamos-te a transformar o teu trabalho num artigo, a escolher a revista e a responder aos revisores.",
      campos: [
        { name: "area", label: "Área do trabalho", type: "text", required: true },
        { name: "estado", label: "Em que estado está o trabalho?", type: "select", required: true, options: ["Monografia ou tese concluída", "Artigo em escrita", "Artigo já submetido", "Só tenho a ideia"] },
        { name: "revista", label: "Revista que tens em mente", type: "text" }
      ]
    },

    acompanhamento: {
      titulo: "Acompanhamento completo",
      etapa: "Percurso completo",
      descricao: "Orientação do tema à defesa, com marcos, feedback regular e um mentor da tua área.",
      campos: [
        { name: "tema", label: "Tema, se já tiveres", type: "text" },
        { name: "etapa", label: "Em que etapa estás?", type: "select", required: true, options: ["Ainda sem tema", "Tema definido", "A escrever", "Quase concluído"] },
        { name: "dificuldade", label: "O que mais te preocupa?", type: "textarea" }
      ]
    }
  }
};
