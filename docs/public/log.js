const weblog = async () => {
  try {
    await fetch(`http://authz.omisheep.cn/web/website-log${document.referrer? `?referrer=${document.referrer}` : ''}`)
  } catch (err) {
    // pass
  }
}

weblog().then(r => {})
