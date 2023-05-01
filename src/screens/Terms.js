import React, { useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Platform,
  Dimensions,
  ScrollView,
  useWindowDimensions,
} from "react-native";
import { WebView } from 'react-native-webview';

import { SimpleLineIcons } from "@expo/vector-icons";
function Terms({ navigation }) {
  useEffect(() => {

    //Linking.openURL('');
    // WebBrowser.openBrowserAsync('https://pages.flycricket.io/01-0/privacy.html');
  })
  const screenHeight = Dimensions.get("window").height;
  const screenWidth = Dimensions.get("window").width;
  const contentWidth = screenWidth * 0.9;

  const TermsWeb = () => {
    return (
      <WebView
        source={{ uri: 'https://pages.flycricket.io/01-0/terms.html' }}
        style={{ width: screenWidth, height: screenHeight, marginTop: 10 }}
      />
    )
  }
  return (
    <View style={{ flex: 1, flexDirection: "column" }}>
      <View
        style={{
          marginLeft: 10,
          marginTop: 40,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <SimpleLineIcons
          name="menu"
          size={24}
          color="#000000"
          onPress={() => navigation.toggleDrawer()}
        />
        <Text style={{ fontSize: 24, marginLeft: "25%" }}>البنود والظروف</Text>
      </View>
      <TermsWeb />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 5,
    marginHorizontal: 5,
    paddingHorizontal: 10,
  },
});

export default Terms;