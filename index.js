import { AsyncStorage } from 'react-native'
import { Navigation } from 'react-native-navigation'
import { registerScreens } from './screens'
import { login } from './app/api/rootComponents'

registerScreens()

Navigation.events().registerAppLaunchedListener(() => {

  Navigation.setRoot(login)
})

// (async function () {

//   let component

//   try {

//     await AsyncStorage.getItem('userToken').then(token => {

//       if (token) {

        
        
//       } else {

//         component = {
//           root: {
//             component: {
//               name: 'root.Login'
//             }
//           }
//         }
//       }

//     }).catch(err => {

//       throw err
//     })

//   } catch (err) {

//     console.log(err)
//   }

//   Navigation.events().registerAppLaunchedListener(() => {

//     console.log('ran')

//     Navigation.setRoot(component)
//   })

// })()