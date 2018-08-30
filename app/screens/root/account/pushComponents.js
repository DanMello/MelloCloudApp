import { Navigation } from 'react-native-navigation'

export function editPersonalInfo (componentId) {
    
  Navigation.push(componentId, {
    component: {
      name: 'account.editPersonalInfo',
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