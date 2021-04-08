const { description } = require('../../package')

module.exports = {
  theme: 'yuu',
  globalUIComponents: [
    'BuyMeACoffee'
  ],
  plugins: [
    {
      'seo': {
        siteTitle: (_, $site) => $site.title,
        title: $page => $page.title,
        description: $page => $page.frontmatter.description,
        author: (_, $site) => $site.themeConfig.author,
      }
    },
    { 'vuepress-plugin-smooth-scroll': true },
    [
      'google-gtag',
      {
        'ga': 'G-EJ40M7NQN3'
      }
    ],
    ['@vuepress/back-to-top'],
    ['mathjax', {
      macros: {
        '\\Z': '\\mathbb{Z}',
      },
    }],
  ], extraWatchFiles: [
    '.vuepress/nav/en.js',
    '.vuepress/nav/pt.js'
  ],
  locales: {
    '/': {
      lang: 'pt-PT',
      title: 'E-Sebenta',
      description: 'Caderno de exercícios e apontamentos de conteúdos Académicos.'
    },
    // '/en/': {
    //   lang: 'en-US',
    //   title: 'E-Sebenta',
    //   description: 'Exercise book and notes of academic content.'
    // }
  },
  head: [
    ['link', { rel: 'icon', href: `images/logo.png` }],
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
    [
      "script",
      {
        "data-ad-client":"ca-pub-9883537577031298",
        async: true,
        src: "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js",
      },
    ],
  ],
  themeConfig: {
    repo: 'https://github.com/Sebenta/e-sebenta',
    author: "Eduardo Queirós",
    editLinks: false,
    docsDir: '',
    editLinkText: '',
    lastUpdated: true,
    smoothScroll: true,
    locales: {
      '/': {
        label: 'Portuguese',
        selectText: 'Idiomas',
        ariaLabel: 'Selecione o idioma',
        editLinkText: 'Edit this page on GitHub',
        lastUpdated: 'Last Updated',
        nav: require('./nav/pt'),
        sidebar: {
          '/pt/communication_systems/': getCommunicationSystemsSidebar(
            ['Fundamentos de Telecomunicações', 'Introdução'],
            'Exercícios',
            'Projetos'
          ),
          '/pt/power_electronics/': getPowerElectronicSidebar(
            ['Eletrónica de Potência', 'Introdução'],
            'Exercícios'),
          '/pt/data_communication_and_computer_network/': getCommunicationAndComputerNetwork(
            ['DCN', 'Introdução'],
            'Exercícios',
            'Trabalhos Práticos'),
          '/pt/programming/': getProgramming(
            ['Ciências da Computação', 'Introdução'],
            'Cheat Sheet',
            'Hacker Rank - 30 Days Of Code Challenges',
          ),
        }
      }
    }
  }
}

function getCommunicationSystemsSidebar(groupA, groupB, groupC) {
  return [
    {
      title: groupA[0],
      collapsable: false,
      children: [
        ['', groupA[1]],
      ]
    },
    {
      title: groupB,
      collapsable: false,
      children: [
        'problems_solved/development_questions',
      ]
    }, {
      title: groupC,
      sidebarDepth: 3,
      collapsable: false,
      children: [
        'projects/pam-pwm-ppm',
      ]
    }
  ]
}

function getPowerElectronicSidebar(groupA, groupB) {
  return [
    {
      title: groupA[0],
      collapsable: false,
      children: [
        ['', groupA[1]],
      ]
    },
    {
      title: groupB,
      collapsable: false,
      children: [
        'problems_solved/true_or_false',
        'problems_solved/multiple_choice',
        'problems_solved/development_questions',
      ]
    }
  ]
}

function getCommunicationAndComputerNetwork(groupA, groupB, groupC) {
  return [
    {
      title: groupA[0],
      sidebarDepth: 2,
      collapsable: false,
      children: [
        ['', groupA[1]],
        'summaries/ospf',
        'summaries/icmp',
        'summaries/sockets',
        'summaries/rpc',
        'summaries/transport_layer_protocols',
        'summaries/util',
      ]
    },
    {
      title: groupB,
      sidebarDepth: 0,
      collapsable: false,
      children: [
        'problems_solved/true_or_false',
        'problems_solved/multiple_choice',
        'problems_solved/development_questions',
      ]
    },
    {
      title: groupC,
      sidebarDepth: 1,
      collapsable: false,
      children: [
        'practical_work/work1',
        'practical_work/work2',
        'practical_work/work3',
        'practical_work/work4',
        'practical_work/work5',
        'practical_work/work6',
        'practical_work/work7',
        'practical_work/work8',
      ]
    }
  ]
}

function getProgramming(groupA, groupB, groupC) {
  return [
    {
      title: groupA[0],
      collapsable: false,
      children: [
        ['', groupA[1]],
      ]
    },
    {
      title: groupB,
      collapsable: false,
      children: [
        'cheat_sheet/css',
      ]
    },
    {
      title: groupC,
      collapsable: false,
      children: [
        'hacker_rank/30DaysOfCodeChallenges/',
        'hacker_rank/30DaysOfCodeChallenges/HelloWorld',
        'hacker_rank/30DaysOfCodeChallenges/DataTypes',
        'hacker_rank/30DaysOfCodeChallenges/Operators',
        'hacker_rank/30DaysOfCodeChallenges/IntroToConditionalStatements',
        'hacker_rank/30DaysOfCodeChallenges/ClassVsInstance',
      ]
    }
  ]

}