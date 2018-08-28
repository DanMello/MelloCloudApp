import React, { Component } from 'react'
import { StyleSheet, View, Text, Button, AsyncStorage } from 'react-native'
import { Navigation } from 'react-native-navigation'
import { verification } from '../../../api/apiLoader'

export default class Account extends Component<{}> {

  constructor() {

    super()

    this.signOut = this.signOut.bind(this)
    
  }

  async signOut () {

    try {

      await AsyncStorage.removeItem('userToken').then(() => {

        Navigation.setRoot(verification)

      }).catch(err => {

        throw err
      })

    } catch (err) {

      console.log(err)
    }
  }

  render() {
    return (
      <View>   
        <Button
          title="Sign out"
          onPress={this.signOut}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({

})