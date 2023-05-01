import AsyncStorage from "@react-native-async-storage/async-storage"
import moment from "moment"

const ExpireInMinutes = 5100
const saveHistoy = async (key, data, t) => {
  const value = t ? data.slice(0, 3) : data.slice(0, 30)

  var history = (await getItems("history")) || {}
  // console.log(history)
  value.forEach((element) => {
    history[element.key] = {
      key: element.key,
      name: element.name,
      phone: element.phone,
    }
  })
  history["timestamp"] = Date.now()

  try {
    await AsyncStorage.setItem(key, JSON.stringify(history))
  } catch (error) {
    console.log(error)
  }
}

const getItems = async (key) => {
  try {
    const getItems = await AsyncStorage.getItem(key)
    const item = JSON.parse(getItems)
    if (!item) return null

    return item
  } catch (error) {
    console.log(error)
  }
}

const getHistory = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key)
    const item = JSON.parse(value)
    if (!item) return []
    const now = moment(Date.now())
    const storedTime = moment(item.timestamp)

    const isExpired = now.diff(storedTime, "minutes") > ExpireInMinutes
    if (isExpired) {
      await AsyncStorage.removeItem(key)
      return []
    }

    const array = Object.values(item)

    return array
  } catch (error) {
    console.log(error)
  }
}

export default {
  saveHistoy,
  getHistory,
}
