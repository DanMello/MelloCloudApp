import React, { Component } from 'react'
import { StyleSheet, View, TextInput, Text, Button, ScrollView, TouchableOpacity, Linking} from 'react-native'
import { Navigation } from 'react-native-navigation'
import { url } from '../../api/url'

export default class Login extends Component<{}> {

  constructor() {

    super()
    
    this._validate = this._validate.bind(this)
    this._next = this._next.bind(this)

    this.state = {
      error: null,
      email: null,
      password: null
    }
  }

  _validate() {

    if (!this.state.email || !this.state.password) {

      this.setState({error: 'Input fields cannot be empty'})

    } else {
      
      fetch(url + '/welcome/login', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }, 
        body: JSON.stringify({
          email: this.state.email,
          password: this.state.password
        })

      }).then(res => {

        return res.json()

      }).then(resJson => {

        if (resJson.error) {

          this.setState({error: resJson.message})

        } else {

          this.props.createToken('userToken', resJson.token)
        }
          
      }).catch(err => {

        this.setState({error: 'There was a problem trying to connect to the server, please try again.'})
      })
    }
  }

  _next () {

    Navigation.push(this.props.componentId, {
      component: {
        name: 'root.Signup',
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
  }

  _resetLink() {

    Linking.openURL(url + '/reset').catch(err => this.setState({error: err}))
  }

  render() {
    return (
      <View style={styles.container}>   
          <Text style={styles.heading}>Mello Cloud</Text>
	        <View style={styles.centerContainer}>
		        <Text style={styles.error}>{this.state.error}</Text>
		        <Text style={styles.inputHeadings}>Email:</Text>
		        <TextInput
		          style={styles.TextInput}
		          onChangeText={(text) => this.setState({email: text})}
		          keyboardType='email-address'
		          autoCorrect={false}
		          value={this.state.email}
		          returnKeyType='done'
		        />
		        <Text style={styles.inputHeadings}>Password:</Text>
		        <TextInput
		          style={styles.TextInput}
		          onChangeText={(text) => this.setState({password: text})}
		          value={this.state.password}
		          secureTextEntry={true}
		          returnKeyType='done'
		        />
		        <TouchableOpacity 
		          style={styles.loginContainer}
		          onPress={this._validate}>
		          <Text style={styles.loginText}>Log in</Text>
		        </TouchableOpacity>
	        </View>
          <View>
            <TouchableOpacity 
              style={styles.signupContainer}
              onPress={this._next}>
              <Text style={styles.signupText}>Register now</Text>
            </TouchableOpacity>
            <TouchableOpacity
  	          style={styles.buttonContainer}
            	onPress={this._resetLink}>
            	<Text style={styles.forgotAccount}>Forgot account?</Text>
            </TouchableOpacity>
          </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  error: {
    color: 'red',
    textAlign: 'center'
  },
  container: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  heading: {
    fontSize: 33,
    color: 'white',
    textAlign: 'center',
    fontFamily: 'AppleSDGothicNeo-UltraLight'
  },
  inputHeadings: {
    marginTop: 20,
    color: 'white',
    fontSize: 15
  },
  centerContainer: {
    marginBottom: '15%'
  },
  TextInput: {
    height: 40,
    color: 'white',
    borderColor: '#ccc',
    borderBottomWidth: 1
  },
  loginContainer: {
    backgroundColor: 'rgb(154, 218, 232)',
    marginTop: 40,
    padding: 10,
    borderRadius: 10
  },
  loginText: {
    textAlign: 'center',
    fontSize: 20,
    color: 'white',
  },
  buttonContainer: {
    alignSelf: 'center',
  },
  signupContainer: {
    backgroundColor: 'rgb(212,174,157)',
    marginBottom: 25,
    padding: 10,
    borderRadius: 10,
    width: '50%',
    alignSelf: 'center'
  },
  signupText: {
    textAlign: 'center',
    fontSize: 20,
    color: 'white',
  },
  forgotAccount: {
  	color: 'rgb(154, 218, 232)',
  	fontSize: 18
  }
  //midnight blue 'rgb(58, 61, 80)'
  //light blue 'rgb(154, 218, 232)'
  //rose gold 'rgb(212,174,157)'
})