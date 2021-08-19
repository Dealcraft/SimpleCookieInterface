class CookieInterface {
    cookies = []
    defaultOptions = {
        expires: null,
        sameSite: 'Lax',
        secure: false,
        domain: `${window.location.hostname}`,
        path: '/',
    }

    constructor(defaultOptions) {
        var _cookies = document.cookie.split(';').sort()
        _cookies.forEach((cookie) => {
            var _obj = {
                key: cookie.split('=')[0],
                value: cookie.split('=')[1]
            }
            this.cookies.append(_obj)
        })
        this.defaultOptions = {...defaultOptions, ...this.defaultOptions}
    }
}