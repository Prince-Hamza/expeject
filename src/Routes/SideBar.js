import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';
import Text from 'react-native'
import Home from '../screens/Home';
import PrivacyPolicy from '../screens/PrivacyPolicy';
import Terms from '../screens/Terms';
import DeleteData from '../screens/DeleteData'
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import CustomSidebarMenu from './CustomSidebar';


const Drawer = createDrawerNavigator();

function MyDrawer() {

  return (
    <Drawer.Navigator
      drawerStyle={{
        paddingTop: 30
      }}

      drawerContentOptions={{
        activeTintColor: "#FFFFFF",
        activeBackgroundColor: "#21273b"
      }}

      drawerContent={(props) => <CustomSidebarMenu {...props} />}
    >

      <Drawer.Screen name="Home" component={Home}
        options={{
          title: "الصفحة الرئيسية",
          drawerIcon: ({ focused }) => (
            <FontAwesome name="home" size={24} color={focused ? "#FFFFFF" : "#000000"} />
          )
        }} />
      <Drawer.Screen name="Privacy Policy" component={PrivacyPolicy}
        options={{
          title: "سياسة الخصوصية",
          drawerIcon: ({ focused }) => (
            <MaterialIcons name="policy" size={24} color={focused ? "#FFFFFF" : "#000000"} />
          ),
        }} />
      <Drawer.Screen name="Terms" component={Terms}
        options={{
          title: "البنود والظروف",
          drawerIcon: ({ focused }) => (
            <MaterialIcons name="book" size={24} color={focused ? "#FFFFFF" : "#000000"} />
          ),
        }} />
      <Drawer.Screen name="Delete Data" component={DeleteData}
        options={{
          title: "حذف بياناتي",
          drawerIcon: ({ focused }) => (
            <MaterialIcons name="delete" size={24} color={focused ? "#FFFFFF" : "#000000"} />
          ),
        }} />
    </Drawer.Navigator>
  );
}
export default MyDrawer;