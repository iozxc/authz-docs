import { defineConfig } from 'vitepress'

export default {
  lang: 'zh-CN',
  title: 'Authz',
  description: '简洁 & 好用 & 快速 的 权限安全、设备管理 框架',
  ignoreDeadLinks: true,
  markdown: {
    theme: 'material-palenight'
  },
  lastUpdated: true,
  head: [
    ['link', { rel: 'icon', href: '/logo.png'} ],
    ['script', { src: '/log.js'} ]
  ],
  themeConfig: {
    outlineTitle: 'On this page',
    // algolia: {
    //   apiKey: 'daf1aefe35a887c9eb6a9d52d30a64b8',
    //   indexName: 'docs',
    //   appId: 'HPJRQCQH6S',
    //   translations: {
    //     button: {
    //       buttonText: "搜索",
    //       buttonAriaLabel: "搜索"
    //     }
    //   }
    // },
    socialLinks: [
      { icon: {
          svg: "<svg role=\"img\" viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\"><title>Github</title><path d=\"M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12\" fill=\"#000\"></path></svg>"
        },
        link: 'https://github.com/iozxc/authz-spring-boot-starter'
      },
      {
        icon: {
          svg: "<svg role=\"img\" viewBox=\"0 0 1024 1024\" xmlns=\"http://www.w3.org/2000/svg\"><title>Gitee</title><path d=\"M512 1024C229.222 1024 0 794.778 0 512S229.222 0 512 0s512 229.222 512 512-229.222 512-512 512z m259.149-568.883h-290.74a25.293 25.293 0 0 0-25.292 25.293l-0.026 63.206c0 13.952 11.315 25.293 25.267 25.293h177.024c13.978 0 25.293 11.315 25.293 25.267v12.646a75.853 75.853 0 0 1-75.853 75.853h-240.23a25.293 25.293 0 0 1-25.267-25.293V417.203a75.853 75.853 0 0 1 75.827-75.853h353.946a25.293 25.293 0 0 0 25.267-25.292l0.077-63.207a25.293 25.293 0 0 0-25.268-25.293H417.152a189.62 189.62 0 0 0-189.62 189.645V771.15c0 13.977 11.316 25.293 25.294 25.293h372.94a170.65 170.65 0 0 0 170.65-170.65V480.384a25.293 25.293 0 0 0-25.293-25.267z\" fill=\"#C71D23\"></path></svg>"
        },
        link: 'https://gitee.com/iozxc/authz-spring-boot-starter'
      }
    ],
    footer: {
      message: 'qq群: 115222346',
      copyright: 'Copyright © 2021-present Zhou Xin Chen'
    },
    logo: '/logo.png',
    editLink: {
      pattern: 'https://github.com/iozxc/authz-docs/edit/main/docs/:path',
      text: 'Edit this page on GitHub'
    },
    nav: [
      { text: '首页', link: '/' },
      { text: '文档', link: '/guide/introduction' },
      { text: '关于', link: '/team' },
      {
        text: 'Authz-1.2.10',
        items: [
          { text: 'Changelog', link: 'https://github.com/iozxc/authz-spring-boot-starter/blob/master/CHANGELOG.md' },
        ]
      }
    ],
    sidebar:{
      '/guide/':[
        {
          text: '开始',
          collapsible: true,
          collapsed: false,
          items: [
            { text: '介绍 & 起步', link: '/guide/introduction' },
            { text: '所有配置项⚙️', link: '/guide/settings' },
            { text: '简单示例', link: '/guide/example' },
          ]
        },
        {
          text: '基础',
          collapsible: true,
          collapsed: false,
          items: [
            { text: '所有注解⚙️', link: '/guide/basics/start'},
            { text: '登录&登出🌟', link: '/guide/basics/login'},
            { text: '登录验证 & 登录拦截', link: '/guide/basics/validate-login'},
            { text: '设备管理🌟', link: '/guide/basics/device-control'},
            { text: 'RBAC权限的开始 - PermLibrary', link: '/guide/basics/perm-library'},
            { text: 'API权限🌟', link: '/guide/basics/api-permission'},
            { text: '参数权限', link: '/guide/basics/param-permission'},
            { text: '数据权限', link: '/guide/basics/data-permission'},
            { text: '字段权限', link: '/guide/basics/field-permission'},
            { text: '方法权限', link: '/guide/basics/method-permission'},
            { text: 'RateLimit⚡️', link: '/guide/basics/ratelimit'},
            { text: '黑名单🫵', link: '/guide/basics/blacklist'},
            { text: '在线用户', link: '/guide/basics/active-user'},
            { text: '动态权限 & Dashboard🌸', link: '/guide/basics/dashboard'},
          ]
        },
        {
          text: '进阶',
          collapsible: true,
          collapsed: false,
          items: [
            { text: 'OpenAuth2.0', link: '/guide/advanced/oauth2.0'},
            { text: 'OpenAuth2 的初始化、资源库、回调函数', link: '/guide/advanced/oauth-init-callback' },
            { text: '请求参数的数据解密和自定义解码器', link: '/guide/advanced/data-decrypt' },
            { text: '自定义错误拦截器', link: '/guide/advanced/error-handler' },
          ]
        }
      ]
    }
  }
}
