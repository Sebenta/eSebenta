const { description } = require('../../package')

module.exports = {
  plugins: [
    {'vuepress-plugin-smooth-scroll': true},
    ['@vuepress/back-to-top'],
  ],
  locales: {
    '/': {
      lang: 'pt-PT',
      title: 'E-Sebenta',
      description: 'Caderno de exercícios e apontamentos de conteúdos Académicos.'
    },
    '/en/': {
      lang: 'en-US',
      title: 'E-Sebenta',
      description: 'Exercise book and notes of academic content.'
    }
  },

  head: [
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }]
  ],
  themeConfig: {
    repo: '',
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
          '/pt/power_electronics/': getPowerElectronicSidebar('Eletrônica de Potência', 'Exercícios'),
          '/pt/data_communication_and_computer_network/': dataCommunicationAndComputerNetwork('DCN', 'Exercícios'),
        }
      }, '/en/': {
        label: 'English',
        selectText: 'Languages',
        ariaLabel: 'Select language',
        editLinkText: 'Edit this page on GitHub',
        lastUpdated: 'Last Updated',
        nav: require('./nav/en'),
        sidebar: {
          '/en/power_electronics/': getPowerElectronicSidebar('Power electronics', 'Exercises'),
        }
      },

    }
  }
}

function getPowerElectronicSidebar(groupA, groupB) {
  return [
    {
      title: groupA,
      collapsable: false,
      children: [
        '',
      ]
    },
    {
      title: groupB,
      collapsable: false,
      children: [
        'multiple_choice',
      ]
    }
  ]
}

function dataCommunicationAndComputerNetwork(groupA, groupB) {
  return [
    {
      title: groupA,
      collapsable: false,
      children: [
        '',
        'summaries/ospf',
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
    }
  ]
}