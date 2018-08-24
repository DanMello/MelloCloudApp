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

export function getToken(name) {

  return new Promise(async (resolve, reject) => {

    try {

      await AsyncStorage.getItem(name).then(token => {

        if (token) {

          resolve({
            token: token
          })
          
        } else {

          resolve({
            oops: 'no token'
          })
        } 

      }).catch(err => {

        throw err
      })

    } catch (err) {

      reject(err)
    }
  })
}