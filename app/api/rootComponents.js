import { Navigation } from 'react-native-navigation'
import { getIcons } from './icons'
import { url } from './url'

export function verification (error) {

  return {
    root: {
      stack: {
        children: [
          {
            component: {
              name: 'verification.Login',
              passProps: {
                error: error
              }
            },
          }
        ],
        options: {
          topBar: {
            background: {
              color: 'rgb(58, 61, 80)'
            },
            transparent: true,
          },
          layout: {
            backgroundColor: 'rgb(58, 61, 80)'
          }
        }
      }
    }
  }
}

export async function app () {

  const tabBarIcons = [
    { iconName: 'ios-cloud-outline', iconSize: 30, ref: 'Feed' },
    { iconName: 'ios-people', iconSize: 30, ref: 'Customers' },
    { iconName: 'ios-add', iconSize: 30, ref: 'Create' },
    { iconName: 'ios-card', iconSize: 30, ref: 'Money' },
    { iconName: 'ios-menu', iconSize: 30, ref: 'Account' },
  ]

  let appIcons = await getIcons(tabBarIcons)

  return {
    root: {
      bottomTabs: {
        children: [
          {
            stack: {
              children: [
                {
                  component: {
                    name: 'root.Feed',
                  }
                } 
              ],
              options: {
                topBar: {
                  background: {
                    color: 'rgb(58, 61, 80)'
                  },
                  transparent: true,
                },
                bottomTab: {
                  icon: appIcons.Feed,
                  iconColor: 'rgb(118, 118, 118)',
                  selectedIconColor: 'rgb(58, 61, 80)',
                  iconInsets: { top: 6, left: 0, bottom: -6, right: 0 },
                }
              }
            },
          },
          {
            stack: {
              children: [
                {
                  component: {
                    name: 'root.Customers',
                  }
                }
              ],
              options: {
                topBar: {
                  background: {
                    color: 'rgb(58, 61, 80)'
                  },
                  transparent: true,
                },
                bottomTab: {
                  icon: appIcons.Customers,
                  iconColor: 'rgb(118, 118, 118)',
                  selectedIconColor: 'rgb(58, 61, 80)',
                  iconInsets: { top: 6, left: 0, bottom: -6, right: 0 },
                }
              }
            },
          },
          {
            stack: {
              children: [
                {
                  component: {
                    name: 'root.Create',
                  }
                }
              ],
              options: {
                topBar: {
                  background: {
                    color: 'rgb(58, 61, 80)'
                  },
                  transparent: true,
                },
                bottomTab: {
                  icon: appIcons.Create,
                  iconColor: 'rgb(118, 118, 118)',
                  selectedIconColor: 'rgb(58, 61, 80)',
                  iconInsets: { top: 6, left: 0, bottom: -6, right: 0 },
                }
              }
            },
          },
          {
            stack: {
              children: [
                {
                  component: {
                    name: 'root.Money',
                  }
                }
              ],
              options: {
                topBar: {
                  background: {
                    color: 'rgb(58, 61, 80)'
                  },
                  transparent: true,
                },
                bottomTab: {
                  icon: appIcons.Money,
                  iconColor: 'rgb(118, 118, 118)',
                  selectedIconColor: 'rgb(58, 61, 80)',
                  iconInsets: { top: 6, left: 0, bottom: -6, right: 0 },
                }
              }
            },
          },
          {
            stack: {
              children: [
                {
                  component: {
                    name: 'root.Account',
                  },
                }
              ],
              options: {
                topBar: {
                  background: {
                    color: 'rgb(58, 61, 80)'
                  },
                  title: {
                    text: 'Settings',
                    color: 'white'
                  },
                  transparent: true,
                },
                bottomTab: {
                  icon: appIcons.Account,
                  iconColor: 'rgb(118, 118, 118)',
                  selectedIconColor: 'rgb(58, 61, 80)',
                  iconInsets: { top: 6, left: 0, bottom: -6, right: 0 },
                },
                layout: {
                  backgroundColor: '#F0F3F4'
                }
              }
            },
          }
        ],
      }
    }
  }
}
