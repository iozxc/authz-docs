let param = document.referrer? `?referrer=${document.referrer}` : ''
let url = `http://authz.omisheep.cn/web/website-log${param}`

const weblog = async () => {
  try {
    await fetch(url)
  } catch (err) {
    // pass
  }
}

weblog()
