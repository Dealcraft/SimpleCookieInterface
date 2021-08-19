class SimpleCookieInterface {
    cookies = []
    defaultOptions = {
        expires: null,
        sameSite: 'Lax',
        secure: false,
        domain: `${window.location.hostname}`,
        path: '/',
    }

    constructor(defaultOptions) {
        var _cookies = document.cookie.split(';')
        _cookies.forEach((cookie) => {
            cookie = cookie.split('=')[0].replace(' ', '') + '=' + cookie.split('=')[1]
            var _obj = {
                key: cookie.split('=')[0],
                value: cookie.split('=')[1]
            }
            this.cookies.push(_obj)
        })
        this.defaultOptions = {...defaultOptions, ...this.defaultOptions}
    }

    setCookie(key, value, options) {
        options = {...this.defaultOptions, ...options}
        var _cookie = `${key}=${value};`
        if (options.expires !== undefined || options.expires !== null) {
            _cookie += `expires=${options.expires};`
        }
        _cookie += `SameSite=${options.sameSite};`
        _cookie += options.secure ? 'Secure;' : ''
        _cookie += `domain=${options.domain};`
        _cookie += `path=${options.path};`

        document.cookie = _cookie
        _cookie = {key: key, value: value, ...options}
        var _exists = false

        this.cookies.forEach((cookie, index)=>{
            if(cookie.key === key && !_exists){
                _exists = true
                this.cookies[index] = {
                    key: key,
                    value: value,
                    ...options
                }
            }
        })
        
        if(!_exists)this.cookies.push(_cookie)
    }
}