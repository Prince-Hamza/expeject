import React, { useState } from "react"
import {
  View,
  StyleSheet,
  TextInput,
  Dimensions,
  Platform,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native"
import { FontAwesome5, FontAwesome } from "@expo/vector-icons"

const SearchBar = ({ loading, onSearch, onClearHandler, myTextInput, SearchType }) => {
  const [searchText, setSearchText] = useState(null);
  return (
    <View style={styles.container}>
      <View style={{ paddingHorizontal: 5 }}>
        <TouchableOpacity onPress={onClearHandler}>
          <FontAwesome name="close" size={24} color="#000000" />
        </TouchableOpacity>
      </View>
      <TextInput
        placeholder={SearchType === 'phone' ? "ادخل رقم هاتف للبحث" : "ادخل اسما للبحث"}
        placeholderTextColor="#8c95a4"
        autoCapitalize="none"
        numberOfLines={1}
        autoCorrect={false}
        allowFontScaling={true}
        ref={myTextInput}
        onChangeText={setSearchText}
        returnKeyType="search"
        keyboardType={SearchType == "phone" ? "numeric" : "default"}
        onSubmitEditing={() => { onSearch(searchText) }}
        style={{
          color: "#020a17",
          flex: 1,
          textAlign: "right",
          paddingRight: 5,
          fontSize: Platform.OS == "ios" ? 16 : 16,
          fontFamily: "BurbankBigCondensedBlack",

        }}
      />
      {loading ? (
        <View style={{ paddingHorizontal: 5, marginLeft: 3 }}>
          <ActivityIndicator color="#000000" />
        </View>
      ) : (
        <TouchableOpacity style={{ paddingHorizontal: 5, marginLeft: 3 }} onPress={() => { onSearch(searchText) }}>
          <FontAwesome5 name="search" size={24} color="#000000" />
        </TouchableOpacity>
      )}
    </View>
  )
}

const height = Dimensions.get("window").height
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    borderColor: "#000000",

    lineHeight: 18,
    width: "75%",
    //marginTop: 10,
    marginTop: 0,
    borderRadius: 10,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
  },
})
export default SearchBar
