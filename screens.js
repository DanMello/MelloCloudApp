import { Navigation } from 'react-native-navigation'

export function registerScreens() {

  //Verification Screens
  Navigation.registerComponent('root.Login', () => require('./app/screens/verificationIOS/login').default)
  Navigation.registerComponent('root.Signup', () => require('./app/screens/verificationIOS/signup').default)
  Navigation.registerComponent('root.Password', () => require('./app/screens/verificationIOS/password').default)
  Navigation.registerComponent('root.CreateUser', () => require('./app/screens/verificationIOS/createUser').default)
  
}