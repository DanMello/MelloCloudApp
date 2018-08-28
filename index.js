import { Navigation } from 'react-native-navigation'
import { registerScreens } from './screens'
import { verification, app, getToken } from './app/api/apiLoader'

(async function startApp() {

  registerScreens()

  const token = await getToken('userToken')

  let component

  if (token) {

    component = await app()

  } else if (token === false) {

    component = verification

  } else if (token === Error) {

    console.log(token)
  }

  Navigation.events().registerAppLaunchedListener(() => {

    Navigation.setRoot(component)
  })

})()