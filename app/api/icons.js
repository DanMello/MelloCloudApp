import Icon from 'react-native-vector-icons/Ionicons'

export function getIcons(arrayIcons) {

  return arrayIcons.reduce(async (previousObj, current) => {

    let currentObj = await previousObj

    currentObj[current.ref] = await Icon.getImageSource(current.iconName, current.iconSize)

    return currentObj

  }, Promise.resolve({}))
}