let url 

if (__DEV__) {

  if (global.location) {

	url = location.protocol + '//' + location.hostname + ':3001'

  } else {

  	url = 'http://10.0.0.16:3001' //manually type it in when not debugging remotely
  }

} else {

  url = 'http://mellocloud.com'
}

export { url }