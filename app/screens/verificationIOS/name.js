import React, { Component } from 'react'
import { StyleSheet, View, TextInput, Text, Button, Linking, KeyboardAvoidingView } from 'react-native'
import { Navigation } from 'react-native-navigation'
import { url } from '../../api/url'

export default class Name extends Component<{}> {

  constructor (props) {
    
    super(props)

    Navigation.events().bindComponent(this)

    this._next = this._next.bind(this)

    this.state = {
      error: null,
      email: null,
      alreadyTouched: null,
      keyboard: null,
      firstName: '',
      lastName: ''
    }
  }

  componentDidAppear() {

    if (this.state.keyboard === null) {

      this.refs._inputFirstName.focus()
    }

    this.setState({
      keyboard: true,
      alreadyTouched: false
    })
  }

  componentDidDisappear() {

    this.setState({
      keyboard: false,
      error: null
    })
  }

  _next () {

    let nameTest = /^[a-zA-Z\s]*$/

    if (!nameTest.test(this.state.firstName) || !nameTest.test(this.state.lastName)) {

      this.setState({error: 'Name can only only contain letters'})

      return
    }

    if (!this.state.firstName || !this.state.lastName) {
      
      this.setState({error: 'Fields cannot be empty'})

      return
    }

    this.setState({
      alreadyTouched: true
    })

    if (this.refs._inputFirstName.isFocused()) {

      this.refs._inputFirstName.blur()
    }

    if (this.refs._inputLastName.isFocused()) {

      this.refs._inputLastName.blur()
    }

    setTimeout(() => {

      Navigation.push(this.props.componentId, {
        component: {
          name: 'verification.Email',
          passProps: {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
          },
          options: {
            topBar: {
              transparent: true,
              backButton: {
                title: 'Email'
              },
            },
            layout: {
              backgroundColor: '#F0F3F4'
            }
          }
        }
      })
    }, 1)
  }

  _termsLink() {

    Linking.openURL(url + '/legal').catch(err => this.setState({error: err}))
  }

  render () {

    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior="padding"
        enabled={this.state.keyboard}
        >
        <View>
          <Text style={styles.error}>{this.state.error}</Text>
          <Text style={styles.heading}>What's your name?</Text>
        </View>
        <TextInput
          style={styles.TextInput}
          ref={'_inputFirstName'}
          value={this.state.firstName}
          placeholder='First Name'
          autoFocus={false}
          autoCorrect={false}
          onChangeText={(text) => this.setState({firstName: text})}
          returnKeyType = 'next'
        />
        <TextInput
          ref={'_inputLastName'}
          placeholder='Last Name'
          style={styles.TextInput}
          value={this.state.lastName}
          autoFocus={false}
          autoCorrect={false}
          onChangeText={(text) => this.setState({lastName: text})}
          returnKeyType='done'
        />
        <View style={styles.termsContainer}>
          <Text style={styles.statement}>Tap "Submit & Continue" to accept Mello Cloud's</Text>
          <Text style={styles.termsLink} onPress={this._termsLink}>Terms of Service and Privacy Policy</Text>
        </View>
        <Button
          title="Submit & Continue"
          disabled={this.state.alreadyTouched}
          onPress={this._next}
        />
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 10
  },
  error: {
    color: 'red',
    marginBottom: 20,
    textAlign: 'center'
  },
  heading: {
    fontSize: 20,
    textAlign: 'center'
  },
  TextInput: {
    height: 40,
    marginTop: 20,
    fontSize: 18,
    borderColor: '#ccc',
    borderBottomWidth: 1
  },
  termsContainer: {
    marginTop: 20
  },
  statement: {
    textAlign: 'center',
    fontSize: 17,
  },
  termsLink: {
    color: '#007aff',
    textAlign: 'center',
    fontSize: 16,
    marginBottom: 20,
    marginTop: 5
  }
})