import { AsyncStorage } from 'react-native'
import { Navigation } from 'react-native-navigation'
import { registerScreens } from './screens'

registerScreens()

Navigation.events().registerAppLaunchedListener(() => {

  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: 'root.Login',
            }
          }
        ],
        options: {
          topBar: {
            background: {
              color: 'rgb(58, 61, 80)'
            },
            transparent: true,
          },
          layout: {
            backgroundColor: 'rgb(58, 61, 80)'
          }
        }
      }
    }
  })
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