import React from "react"
import { View, Text, StyleSheet, Dimensions, Platform } from "react-native"
import { FontAwesome5, FontAwesome } from "@expo/vector-icons"

function EmptyList({ title }) {
  return (
    <View style={styles.container}>
      <FontAwesome5 name="search" size={40} color="gray" />

      <Text style={styles.textStyle}>{title}</Text>
    </View>
  )
}
const height = Dimensions.get("window").height
const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: height * 0.5,
    alignItems: "center",
    justifyContent: "center",
  },

  textStyle: {
    fontFamily: "normal",
    fontSize: Platform.OS === "ios" ? 35 : 30,
    color: "gray",
    marginTop: 30,
    textAlign: "center",
  },
})

export default EmptyList
