import React, { Component } from 'react'
import { StyleSheet, View, Text, ActivityIndicator, TouchableOpacity, AsyncStorage } from 'react-native'
import { url, createToken } from '../../api/apiLoader'

export default class CreateUser extends Component<{}> {

  constructor(props) {

    super(props)

    this.state = {
      loading: true,
      error: null,
      errorMessage: null
    }
  }

  componentWillMount () {

    fetch(url + '/account/signup', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: this.props.email,
        password: this.props.password
      })

    }).then(res => {

      return res.json()

    }).then(resJson => {

      if (resJson.error) {
      
        this.setState({
          loading: false,
          error: true,
          errorMessage: resJson.message 
        })

      } else {

        createToken('userToken', resJson.token)
          .then(() => {

            Navigation.setStackRoot(this.props.componentId, {
              component: {
                name: 'example.NewRootScreen',
                passProps: {
                  text: 'Root screen'
                },
                options: {
                  animated: true // Will animate root change same as push
                }
              }
            });

          }).catch(err => {

            this.setState({
              loading: false,
              error: true,
              errorMessage: 'There was an error trying to create a token to keep you logged in. Please try to login, your account has been created.'
            })
          })
      }

    }).catch(err => {

      this.setState({
        loading: false,
        error: true,
        errorMessage: 'Something went wrong trying to create your account this most likely means the server is down. Please try again later'
      })
    })
  }

  render () {

    if (this.state.loading) {
      return (
        <View style={styles.container}>
          <View style={styles.loadingContainer}>
            <ActivityIndicator
             size="large"
            />
            <Text style={styles.loadingText}>Creating Account</Text>
          </View>
        </View>
      )
    }

    if (this.state.error) {

      return (
        <View style={styles.errorContainer}>
          <View style={styles.errorBox}>
            <Text style={styles.errorHeading}>Error:</Text>
            <Text style={styles.errorText}>{this.state.errorMessage}</Text>
            <TouchableOpacity
              style={styles.buttonContainer}>
              <Text style={styles.buttonText}>Return to login page</Text>
            </TouchableOpacity>
          </View>
        </View>
      )
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: 'center'
  },
  errorContainer: {
    padding: 10,
  },
  loadingContainer: {
    alignItems: 'center'
  },
  loadingText: {
    fontSize: 22,
  },
  errorBox: {
    backgroundColor: 'white',
    padding: 10,
    marginTop: 20,
    borderRadius: 5
  },
  errorHeading: {
    fontSize: 27,
    fontWeight: 'bold'
  },
  errorText: {
    fontSize: 18
  },
  buttonContainer: {
    marginTop: 10
  },
  buttonText: {
    color: 'rgb(0, 122, 255)',
    fontSize: 18
  }
})

