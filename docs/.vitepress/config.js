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
    socialLinks: [
      { icon: 'github', link: 'https://github.com/iozxc/authz-spring-boot-starter' }
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
        text: 'Authz-1.2.7',
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
            { text: '权限管理的开始 - PermLibrary', link: '/guide/basics/perm-library'},
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
