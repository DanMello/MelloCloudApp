import { Navigation } from 'react-native-navigation'

export function registerScreens() {

  //Verification Screens
  Navigation.registerComponent('verification.Login', () => require('./app/screens/verificationIOS/login').default)
  Navigation.registerComponent('verification.Name', () => require('./app/screens/verificationIOS/name').default)
  Navigation.registerComponent('verification.Email', () => require('./app/screens/verificationIOS/email').default)
  Navigation.registerComponent('verification.Password', () => require('./app/screens/verificationIOS/password').default)
  Navigation.registerComponent('verification.CreateUser', () => require('./app/screens/verificationIOS/createUser').default)
  
  //Root Screens
  Navigation.registerComponent('root.Account', () => require('./app/screens/root/account').default)
  Navigation.registerComponent('root.Create', () => require('./app/screens/root/create').default)
  Navigation.registerComponent('root.Customers', () => require('./app/screens/root/customers').default)
  Navigation.registerComponent('root.Feed', () => require('./app/screens/root/feed').default)
  Navigation.registerComponent('root.Money', () => require('./app/screens/root/money').default)

  //Account Screens
  Navigation.registerComponent('account.editPersonalInfo', () => require('./app/screens/root/account/editPersonalInfo').default)
}