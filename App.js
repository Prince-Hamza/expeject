import React, { useState, useEffect } from "react";
import Home from "./src/screens/Home";
import Welcome from "./src/screens/Welcome";
import Admin from "./src/screens/Admin";
import * as firebase from "firebase";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading/src";
import MyDrawer from "./src/Routes/SideBar";
import { NavigationContainer } from "@react-navigation/native";
import { ToastProvider } from "react-native-toast-notifications";
import Icon from "react-native-vector-icons/Ionicons";
import { getStoredId, removeStoredId } from './src/util/Global'
import { DeviceIdProvider } from './src/util/DeviceIdContext';



function App() {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(false);
  const [user, setUser] = useState("");
  const [fontLoaded, setFontLoaded] = useState(false);

  // Handle user state changes
  // function onAuthStateChanged(user) {
  //   setUser(user);
  //   if (initializing) setInitializing(false);
  // }

  useEffect(() => {
    getFonts();
  })
  async function getFonts() {


    await Font.loadAsync({
      "BurbankBigCondensedBlack": require("./assets/fonts/BurbankBigCondensedBlack.otf"),
    });
    setFontLoaded(true);
  }


  useEffect(() => {
    (async function () {

      const deviceId = await getStoredId();
      if (deviceId !== null) {
        setUser(deviceId);
        console.log(deviceId);
      }
      else {

        setUser("")
      }
    })();
  }, []);

  const appProps = {
    setUser: setUser,
    user: user
  };
  return (

    <DeviceIdProvider value={appProps}>


      {fontLoaded ?

        user === "" ?
          <Welcome /> :
          <>
            <ToastProvider
              dangerColor="#B33030"
              successColor="#95CD41"
              dangerIcon={<Icon name={"close-circle"} color={"white"} size={25} />}
              successIcon={
                <Icon name={"checkmark-done-circle"} color={"white"} size={25} />
              }
            >

              <NavigationContainer>
                <MyDrawer />
              </NavigationContainer>
            </ToastProvider>
          </>



        :



        <AppLoading

          onError={(err) => console.log(err)}
        />
      }
    </DeviceIdProvider>

  );
}





export default App;
