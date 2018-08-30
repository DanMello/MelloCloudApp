import { Navigation } from 'react-native-navigation'
import { AsyncStorage } from 'react-native'
import { app, verification } from './rootComponents'
import { url } from './url'

export let userProfile

export async function login (token) {

  let profile = await getProfile(token)

  if (profile.error === false) {

    component = await app()

  } else {

    component = verification(profile.errorMessage)
  }

  Navigation.setRoot(component)
}

export async function signOut () {

  try {

    await AsyncStorage.removeItem('userToken').then(() => {

      Navigation.setRoot(verification())

    }).catch(err => {

      throw err
    })

  } catch (err) {

    console.log(err)

    // log user out anyway and tell them token is invalid
  }
}

export function createToken(name, token) {

  return new Promise(async (resolve, reject) => {

    try {

      await AsyncStorage.setItem(name, token).then(() => {

        resolve()

      }).catch(err => {

        throw err
      })

    } catch (err) {

      reject(err)
    }
  })
}

export async function getToken(name) {

  let tokenObj = {}

  try {

    await AsyncStorage.getItem(name).then(async (userToken) => {

      if (userToken) {

        const profile = await getProfile(userToken)

        if (profile.error === false) {

          tokenObj.token = userToken
          tokenObj.isValid = true

        } else {

          throw new Error(profile.errorMessage)
        }

      } else {

        tokenObj.isValid = false
      } 

    }).catch(err => {

      throw err
    })

  } catch (err) {

    tokenObj.error = true
    tokenObj.message = err.message
  }

  return tokenObj
}

export async function getProfile (token) {
  
  let profileObj = {}

  try {

    await fetch(url + '/account/profile/' + token).then(response => {

      return response.json()

    }).then(user => {

      if (user.error === true) throw new Error(user.message)

      userProfile = user
      
      profileObj.error = false
      profileObj.user = user

    }).catch(err => {

      throw err
    })
    
  } catch (err) {

    profileObj.error = true
    profileObj.errorMessage = err.message
  }

  return profileObj
}
