import React from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Image,
  Text,
  Linking,
  TouchableOpacity
} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';

import { FontAwesome, MaterialIcons } from '@expo/vector-icons';

import DeviceIdContext from '../util/DeviceIdContext';
import * as WebBrowser from 'expo-web-browser';
//import { useState, useEffect } from 'react/cjs/react.development';

const CustomSidebarMenu = (props) => {
  const appProps = React.useContext(DeviceIdContext);
  return (
    <SafeAreaView style={{ flex: 1, paddingTop: 10 }}>
      {/*Top Large Image */}
      <Image
        source={require('../../assets/newLogo.png')}
        style={styles.sideMenuProfileIcon}
      />
      <Text style={styles.customItem}>{"USER ID: " + appProps.user}</Text>
      <DrawerContentScrollView {...props} >

        <DrawerItemList {...props} />



        {/* <TouchableOpacity style={styles.customItem} onPress={() => {
          WebBrowser.openBrowserAsync('https://pages.flycricket.io/01-0/privacy.html');
        }}>
          <MaterialIcons name="policy" size={24} color="black"
            style={{
              marginRight: 20,
              textAlign: "left",

            }} />
          <Text
            style={{

              textAlign: "left",

            }}>
            سياسة الخصوصية
          </Text>
        </TouchableOpacity> */}
        {/* <TouchableOpacity style={styles.customItem} onPress={() => {
          WebBrowser.openBrowserAsync('https://pages.flycricket.io/01-0/terms.html');
        }}>
          <MaterialIcons name="book" size={24} color="black"
            style={{
              marginRight: 20,
              textAlign: "left",

            }} />
          <Text
            style={{

              textAlign: "left",

            }}>
            البنود والظروف
          </Text>
        </TouchableOpacity> */}
        <TouchableOpacity style={styles.customItem} onPress={() => {
          Linking.openURL('https://m.facebook.com/01-%D9%84%D9%84%D8%A7%D8%B1%D9%82%D8%A7%D9%85-%D9%88%D8%A7%D9%84%D8%A7%D8%B3%D9%85%D8%A7%D8%A1-102865128541623');
        }}>
          <FontAwesome name="facebook-square" size={24} color="black"
            style={{
              marginRight: 20,
              textAlign: "left",

            }} />
          <Text
            style={{

              textAlign: "left",

            }}>
            زورنا
          </Text>
        </TouchableOpacity>

      </DrawerContentScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sideMenuProfileIcon: {
    resizeMode: 'center',
    width: 100,
    height: 100,
    alignSelf: 'center',
  },
  iconStyle: {
    width: 15,
    height: 15,
    marginHorizontal: 5,
  },
  customItem: {
    padding: 15,
    paddingLeft: 20,
    paddingRight: 55,
    flexDirection: 'row',
    alignItems: 'center',
    fontFamily: "BurbankBigCondensedBlack"

  },
});

export default CustomSidebarMenu;
