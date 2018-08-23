import React, { Component } from 'react'
import { StyleSheet, View, Text, ActivityIndicator, TouchableOpacity, AsyncStorage} from 'react-native'
import { url, createToken } from '../../api/url'

export default class CreateUser extends Component<{}> {

  constructor(props) {

    super(props)

    this.state = {
      animating: true,
      loadingText: 'Creating your account',
      error: null,
      gobackText: null,
      errorHeading: null
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
      
        this.setState({ error: resJson.message })

      } else {

        createToken('userToken', resJson.token)
      }

    }).catch(err => {

      console.log(err)

      this.setState({
        animating: false,
        loadingText: '',
        errorHeading: 'Error:',
        gobackText: 'Go back to log in screen',
        error: err.message
      })
    })
  }

  render () {
    return (
      <View style={[styles.container, this.state.error && styles.errorContainer]}>
        <Text style={styles.errorHeading}>{this.state.errorHeading}</Text> 
        <Text style={styles.errorText}>{this.state.error}</Text>
        <TouchableOpacity onPress={() => { this.props.navigator.popToTop() }}>
          <Text style={styles.goBackLink}>{this.state.gobackText}</Text>
        </TouchableOpacity>
        <ActivityIndicator
         animating={this.state.animating}
         size="large"
        />
        <Text style={styles.loadingText}>{this.state.loadingText}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'center'
  },
  errorContainer: {
    justifyContent: 'flex-start',
    marginTop: 70,
    padding: 10
  },
  goBackLink: {
    color: '#007AFF',
    fontSize: 16,
    marginTop: 10
  },
  loadingText: {
    textAlign: 'center',
    color: 'grey',
    fontSize: 18
  },
  errorHeading: {
    fontSize: 25,
    fontWeight: 'bold'
  },
  errorText: {
    marginTop: 10,
    color: 'red',
    fontSize: 17,
    alignSelf: 'flex-start'
  }
})

