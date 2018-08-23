import React, { Component } from 'react'
import { StyleSheet, View, TextInput, Text, Button, ScrollView, KeyboardAvoidingView} from 'react-native'
import { Navigation } from 'react-native-navigation'
import { url } from '../../api/url'

export default class Password extends Component<{}> {

  constructor (props) {
    
    super(props)

    Navigation.events().bindComponent(this)

    this._validatePassword = this._validatePassword.bind(this)

    this.state = {
      error: null,
      password: null,
      passwordConfirmation: null,
      alreadyTouched: false,
      keyboard: null
    }
  }

  componentDidAppear() {

    if (this.state.keyboard === null) {

      this.refs._passwordInput.focus()
    }

    this.setState({
      keyboard: true
    })
  }

  componentDidDisappear() {

    this.setState({
      keyboard: false
    })
  }

  _validatePassword () {

    let passwordTest = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/

    if (!passwordTest.test(this.state.password) || !passwordTest.test(this.state.passwordConfirmation)) {

      this.setState({
        error: "Password doesn't contain at least 8 characters and 1 number"
      })

    } else if (this.state.password !== this.state.passwordConfirmation) {

      this.setState({
        error: 'Passwords do not match'
      })

    } else {

      this.setState({ 
        alreadyTouched: true 
      })

      Navigation.push(this.props.componentId, {
        component: {
          name: 'root.CreateUser',
          passProps: {
            email: this.props.email,
            password: this.state.password
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
          <Text style={styles.heading}>Let's secure your account</Text>
          <Text style={styles.inputHeadings}>Password:</Text>
        </View>
        <TextInput
          ref={'_passwordInput'}
          style={styles.TextInput}
          value={this.state.password}
          autoCorrect={false}
          secureTextEntry={true}
          onChangeText={(text) => this.setState({password: text})}
          onSubmitEditing={() => this.refs._passwordInput2.focus()}
          blurOnSubmit={false}
          returnKeyType = 'next'
        />
        <View>
          <Text style={styles.inputHeadings}>Password Confirmation:</Text>
        </View>
        <TextInput
          ref={'_passwordInput2'}
          style={styles.TextInput}
          value={this.state.passwordConfirmation}
          autoCorrect={false}
          secureTextEntry={true}
          onChangeText={(text) => this.setState({passwordConfirmation: text})}
          returnKeyType='done'
        />
        <View>
          <Text style={styles.note}>Password must contain at least 8 characters and 1 number</Text>
        </View>
        <View style={styles.buttonContainer}>
          <Button 
            title="Register"
            disabled={this.state.alreadyTouched}
            onPress={this._validatePassword}
          />
        </View>
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
  inputHeadings: {
    marginTop: 20
  },
  TextInput: {
    height: 40,
    borderColor: '#ccc',
    borderBottomWidth: 1
  },
  note: {
    color: 'grey',
    marginTop: 20,
    textAlign: 'center'
  },
  buttonContainer: {
    marginTop: 20
  }
})

