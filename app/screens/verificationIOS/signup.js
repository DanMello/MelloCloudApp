import React, { Component } from 'react'
import { StyleSheet, View, TextInput, Text, Button, Linking, KeyboardAvoidingView } from 'react-native'
import { Navigation } from 'react-native-navigation'
import { url } from '../../api/url'

export default class Signup extends Component<{}> {

  constructor (props) {
    
    super(props)

    Navigation.events().bindComponent(this)

    this._validEmail = this._validEmail.bind(this)

    this.state = {
      error: null,
      email: null,
      alreadyTouched: null,
      keyboard: null
    }
  }

  componentDidAppear() {

    if (this.state.keyboard === null) {

      this.refs._textInput.focus()
    }

    this.setState({
      keyboard: true,
      alreadyTouched: false,
    })
  }

  componentDidDisappear() {

    this.setState({
      keyboard: false
    })
  }

  _validEmail () {

    let emailTest = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (emailTest.test(this.state.email)) {

      this.setState({
        alreadyTouched: true
      })

      this.refs._textInput.blur()

      fetch(url + '/account/signup/emailCheck', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }, 
        body: JSON.stringify({
          email: this.state.email
        })

      }).then(res => {

        return res.json()

      }).then(resJson => {

        if (resJson.error) {

          this.setState({error: resJson.message, alreadyTouched: false})

        } else {

          Navigation.push(this.props.componentId, {
            component: {
              name: 'root.Password',
              passProps: {
                email: this.state.email
              },
              options: {
                topBar: {
                  transparent: true,
                },
                layout: {
                  backgroundColor: '#F0F3F4'
                }
              }
            }
          })
        }

      }).catch(err => {

        console.log(err)

        this.setState({
          error: "There was an error connection to the server, this most likely means the server is down or under maintenance. Please try again in a couple of hours.",
          alreadyTouched: false
        })
      })

    } else {

      this.setState({error: 'Please enter a valid email address'})
    }
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
          <Text style={styles.heading}>Enter your email to signup</Text>
        </View>
        <TextInput
          style={styles.TextInput}
          ref={'_textInput'}
          onChangeText={(text) => this.setState({email: text})}
          placeholder='Your email address'
          keyboardType='email-address'
          value={this.state.email}
          autoCorrect={false}
          returnKeyType='done'
        />
        <View>
          <Text style={styles.statement}>Tap "Submit & Continue" to accept Mello Cloud's</Text>
          <Text style={styles.termsLink} onPress={this._termsLink}>Terms of Service and Privacy Policy</Text>
        </View>
        <Button
          title="Submit & Continue"
          disabled={this.state.alreadyTouched}
          onPress={this._validEmail}
        />
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  error: {
    color: 'red',
    textAlign: 'center',
    fontSize:18,
    marginBottom: 10
  },
  heading: {
    textAlign: 'center',
    fontSize: 20,
    marginBottom: 20,
  },
  TextInput: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    width: '70%',
    fontSize: 20,
    marginBottom: 20,
    alignSelf: 'center',
    textAlign: 'center'
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
  },

})

