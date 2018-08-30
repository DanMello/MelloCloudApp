import React, { Component } from 'react'
import { StyleSheet, View, Text, Button, AsyncStorage, Image, ScrollView, TouchableOpacity} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { url, userProfile, signOut } from '../../../api/apiLoader'
import { editPersonalInfo } from './pushComponents'

export default class Account extends Component<{}> {

  constructor() {

    super()

  }

  render() {
    return (
      <ScrollView>
        <TouchableOpacity
          style={styles.profileHeading}
          activeOpacity={0.5}
          onPress={() => {editPersonalInfo(this.props.componentId)}}
          >
          <View style={styles.profileSmallContainer}>
            <Image
              style={{ width: 60, height: 60, borderRadius: 60/2 }}
              source={{ uri: url + userProfile.profile_pic }}
            />
            <View>
              <Text style={styles.profileName}>{`${userProfile.first_name} ${userProfile.last_name}`}</Text>
              <Text style={styles.profilePersonalInfo}>Edit your personal info</Text>
            </View>
          </View>
          <Icon name="chevron-right" size={17} color="#ccc" />
        </TouchableOpacity>
        <Button
          title="Sign out"
          onPress={() => {signOut()}}
        />
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  profileHeading: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    marginTop: 25,
    padding: 10,
  },
  profileSmallContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileName: {
    fontSize: 22,
    marginLeft: 5
  },
  profilePersonalInfo: {
    marginLeft: 5
  }
})





