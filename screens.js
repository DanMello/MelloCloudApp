import { Navigation } from 'react-native-navigation'

export function registerScreens() {

  //Verification Screens
  Navigation.registerComponent('verification.Login', () => require('./app/screens/verificationIOS/login').default)
  Navigation.registerComponent('verification.Signup', () => require('./app/screens/verificationIOS/signup').default)
  Navigation.registerComponent('verification.Password', () => require('./app/screens/verificationIOS/password').default)
  Navigation.registerComponent('verification.CreateUser', () => require('./app/screens/verificationIOS/createUser').default)
  
}