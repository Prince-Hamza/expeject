import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import firebase from "firebase";
import "firebase/firestore";
import { MaterialIcons } from "@expo/vector-icons";
import { serverUrl } from '../util/Global'
const AdminScreen = ({ onClose }) => {
  const [collection, setCollection] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  ///EDIT///
  React.useEffect(() => {
    //console.log(serverUrl);
    fetch(serverUrl + '/api/dashboard/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        if (json.length !== 0) {
          setCollection(json[0])
        }
      })
      .catch((error) => {
        console.error(error);
      })
      // firebase
      //   .firestore()
      //   .collection("dashboard")
      //   .get()
      //   .then((data) => {
      //     if (!data.empty) {
      //       setCollection(data.docs[0].data());
      //     }
      //   })
      //   .catch((err) => console.log(err))
      .finally(() => {
        setLoading(false);
      });
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      {!loading ? (
        <>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={onClose}
            style={{
              backgroundColor: "gray",
            }}
          >
            <MaterialIcons name="close" color="white" size={30} />
          </TouchableOpacity>
          <Text style={styles.mainTitle}>English</Text>
          <View style={styles.innerContainer}>
            <View style={styles.box}>
              <Text style={styles.txtHeading}>Total Users:</Text>
              <Text style={styles.txt}>{collection.total_users}</Text>
            </View>
            <View style={styles.box}>
              <Text style={styles.txtHeading}>Total Contacts:</Text>
              <Text style={styles.txt}>{collection.total_contacts}</Text>
            </View>
            <View style={styles.box}>
              <Text style={styles.txtHeading}>Total ADS View:</Text>
              <Text style={styles.txt}>{collection.ads_click}</Text>
            </View>
          </View>

          <Text style={styles.mainTitle}>عربي</Text>
          <View style={[styles.innerContainer]}>
            <View style={styles.box}>
              <Text style={styles.txt}>{collection.total_users}</Text>
              <Text style={styles.txtHeading}>إجمالي المستخدمين:</Text>
            </View>
            <View style={styles.box}>
              <Text style={styles.txt}>{collection.total_contacts}</Text>
              <Text style={styles.txtHeading}>مجموع الاتصالات:</Text>
            </View>
            <View style={styles.box}>
              <Text style={styles.txt}>{collection.ads_click}</Text>
              <Text style={styles.txtHeading}>إجمالي عرض الإعلانات:</Text>
            </View>
          </View>
        </>
      ) : (
        <ActivityIndicator size="large" color="white" />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#21273b",
    paddingTop: Platform.OS == "android" ? StatusBar.currentHeight : null,
  },
  innerContainer: {
    marginHorizontal: 30,
  },
  box: {
    flexDirection: "row",
    alignItems: "center",
  },
  txtHeading: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    letterSpacing: 2,
  },
  txt: {
    marginLeft: 10,
    color: "white",
  },
  mainTitle: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
  },
});
export default AdminScreen;
