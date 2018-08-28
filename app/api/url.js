let url 

if (__DEV__) {

  url = location.protocol + '//' + location.hostname + ':3001'

} else {

  url = 'http://mellocloud.com'
}

export { url }