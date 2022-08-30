var _ok
var _refer
var _href

var weblog
if (!weblog) {
    _href = window.location.pathname
    _refer = null
    weblog = async () => {
        try {
            await fetch('http://authz.omisheep.cn/web/website-log', {
                method: 'GET',
                headers: {
                    'path-src': _href,
                    'path-refer': _refer
                }
            })
        } catch (err) {
            // pass
        }
    }
    weblog().then(r => {
    })
} else {
    weblog().then(r => {
    })
}

if (!_ok) {
    window.addEventListener('popstate', function (event) {
        _refer = _href
        _href = window.location.pathname
        weblog().then(r => {
        })
    })

    const _historyWrap = function (type) {
        const orig = history[type];
        const e = new Event(type);
        return function () {
            const rv = orig.apply(this, arguments);
            e.arguments = arguments;
            window.dispatchEvent(e);
            return rv;
        };
    };
    history.pushState = _historyWrap('pushState');
    history.replaceState = _historyWrap('replaceState');

    window.addEventListener('pushState', function (e) {
        _href = window.location.pathname
        weblog().then(r => {
        })
    });
    window.addEventListener('replaceState', function (e) {
        _refer = window.location.pathname
    });
    _ok = true
}
