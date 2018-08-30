import { Navigation } from 'react-native-navigation'
import { registerScreens } from './screens'
import { verification, app, getToken } from './app/api/apiLoader'

(async function startApp() {

  registerScreens()

  const tokenObj = await getToken('userToken')

  let component

  if (tokenObj.isValid === true) {

    component = await app()

  } else if (tokenObj.isValid === false) {

    component = verification()

  } else if (tokenObj.error === true) {

    component = verification(tokenObj.message)
  }

  Navigation.events().registerAppLaunchedListener(() => {

    Navigation.setRoot(component)
  })

})()