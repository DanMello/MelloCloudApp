import { AsyncStorage } from 'react-native'

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

  let token

  try {

    await AsyncStorage.getItem(name).then(userToken => {

      if (userToken) {

        token = userToken
        
      } else {

        token = false
      } 

    }).catch(err => {

      throw err
    })

  } catch (err) {

    token = new Error(err)
  }

  return token
}