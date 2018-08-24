let url 

if (__DEV__) {

  //global.location.protocol 
  //global.location.hostname
  //global.location.protocol + '//' + global.location.hostname + ':3001'

  url = 'http://10.0.0.189:3001' //Port of local web server

} else {

  url = 'http://mellocloud.com'
}

export { url }