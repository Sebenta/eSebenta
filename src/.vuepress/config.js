const { description } = require('../../package')

module.exports = {
  theme: 'yuu',
  globalUIComponents: [
    'BuyMeACoffee'
  ],
  plugins: [
    {'seo': { 
      siteTitle: (_, $site) => $site.title,
      title: $page => $page.title,
      description: $page => $page.frontmatter.description,
      author: (_, $site) => $site.themeConfig.author,
    }},
    {'vuepress-plugin-smooth-scroll': true },
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
  ],extraWatchFiles: [
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
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }]
  ],
  themeConfig: {
    repo: 'https://github.com/Sebenta/e-sebenta',
    author: "Eduardo Queirós",
    editLinks: false,
    docsDir: '',
    editLinkText: '',
    lastUpdated: true,
    smoothScroll: true, //ver 
    locales: {
      '/': {
        label: 'Portuguese',
        selectText: 'Idiomas',
        ariaLabel: 'Selecione o idioma',
        editLinkText: 'Edit this page on GitHub',
        lastUpdated: 'Last Updated',
        nav: require('./nav/pt'),
        sidebar: {
          '/pt/communication_systems/' : getCommunicationSystemsSidebar(
            ['Fundamentos de Telecomunicações', 'Introdução'],
            'Exercícios',
          ),
          '/pt/power_electronics/': getPowerElectronicSidebar(
            ['Eletrónica de Potência', 'Introdução'],
             'Exercícios'),
          '/pt/data_communication_and_computer_network/': dataCommunicationAndComputerNetwork(
            ['DCN', 'Introdução'],
            'Exercícios',
            'Trabalhos Práticos'),
        }
      }
    }
  }
}

function getCommunicationSystemsSidebar(groupA, groupB) {
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
        // 'problems_solved/true_or_false',
        // 'problems_solved/multiple_choice',
        'problems_solved/development_questions',
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

function dataCommunicationAndComputerNetwork(groupA, groupB, groupC) {
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