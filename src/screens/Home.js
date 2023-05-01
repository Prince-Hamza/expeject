import React, { useEffect, useState, useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  Platform,
  InteractionManager,
  ToastAndroid,
  SafeAreaView,
  StatusBar,
  FlatList,
  Clipboard,
  BackHandler,
  TouchableOpacity,
  Button,
  Dimensions,
  TouchableHighlight,
} from "react-native";
import DeviceIdContext from '../util/DeviceIdContext'
import * as Contacts from "expo-contacts";
import * as Linking from "expo-linking";
import Modal from "react-native-modal";
import { useToast } from "react-native-toast-notifications";
import CountDown from "react-native-countdown-component";

import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

import { AdMobBanner, AdMobInterstitial, AdMobRewarded } from "expo-ads-admob";
import { debounce } from "throttle-debounce";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as firebase from "firebase";
//import Constants from "expo-constants";
import "firebase/firestore";
import SearchBar from "./SearchBar";
import ContactStyle from "./ContactStyle";
import EmptyList from "./EmptyList";
import moment from "moment";
import { AppButton } from "./AppButton";
import localStorage from "../components/server";
import { FontAwesome, SimpleLineIcons, Entypo } from "@expo/vector-icons";
import { BannerBottomAd } from "../modals/BannerBottomAd";
import { SecretDoor } from "../modals/SecretDoor";
import AdminScreen from "../screens/Admin";
import CounterComp from "../components/CounterComp";
import DataListComp from "../components/DataListComp";
import { getStoredId, removeStoredId, serverUrl } from "../util/Global";
const _setTimeout = global.setTimeout;
const _clearTimeout = global.clearTimeout;
const MAX_TIMER_DURATION_MS = 60 * 1000;
if (Platform.OS === "android") {
  const timerFix = {};
  const runTask = (id, fn, ttl, args) => {
    const waitingTime = ttl - Date.now();
    if (waitingTime <= 1) {
      InteractionManager.runAfterInteractions(() => {
        if (!timerFix[id]) {
          return;
        }
        delete timerFix[id];
        fn(...args);
      });
      return;
    }

    const afterTime = Math.min(waitingTime, MAX_TIMER_DURATION_MS);
    timerFix[id] = _setTimeout(() => runTask(id, fn, ttl, args), afterTime);
  };

  global.setTimeout = (fn, time, ...args) => {
    if (MAX_TIMER_DURATION_MS < time) {
      const ttl = Date.now() + time;
      const id = "lt" + Object.keys(timerFix).length;
      runTask(id, fn, ttl, args);
      return id;
    }
    return _setTimeout(fn, time, ...args);
  };

  global.clearTimeout = (id) => {
    if (typeof id === "string" && id.startsWith("lt")) {
      _clearTimeout(timerFix[id]);
      delete timerFix[id];
      return;
    }
    _clearTimeout(id);
  };
}

// const bannerTestID = "ca-app-pub-2443081892899227/9509426808";
// const interstitialTestId = "ca-app-pub-2443081892899227/4618276365";
// const rewardVideoTestId = "ca-app-pub-2443081892899227/6583880569";

const bannerTestID = "ca-app-pub-2496923677374216/3701978612";
const interstitialTestId = "ca-app-pub-2496923677374216/6543764379";
const rewardVideoTestId = "ca-app-pub-2496923677374216/5418384962";


// const homepageBannerAdID= Constants.isDevice && !_DEV_ ? "ca-app-pub-2496923677374216/5581465055" : bannerTestID;
// const onSelectSearchByAdID = Constants.isDevice && !_DEV_ ? "ca-app-pub-2496923677374216/3996673226" : interstitialTestId;
// const viewMoreAdID = Constants.isDevice && !_DEV_ ? "ca-app-pub-2496923677374216/4160324755" : rewardVideoTestId;
// const adUnitID = Constants.isDevice && !_DEV_ ? "ca-app-pub-2496923677374216/7413174050" : interstitialTestId;

const homepageBannerAdID = bannerTestID;
const onSelectSearchByAdID = interstitialTestId;
const viewMoreAdID = rewardVideoTestId;
const adUnitID = interstitialTestId;
const facebookLink =
  "https://m.facebook.com/01-%D9%84%D9%84%D8%A7%D8%B1%D9%82%D8%A7%D9%85-%D9%88%D8%A7%D9%84%D8%A7%D8%B3%D9%85%D8%A7%D8%A1-102865128541623";
const Home = ({ navigation }) => {
  global.contactADCount = false;
  const [contacts, setContacts] = useState([]);
  const [history, setHistory] = useState([]);
  const [check_history, setCheck_history] = useState(true);
  const [ishint, setIshint] = useState(false);
  const [isdisable, setIsDisable] = useState(false);
  const [term, setTerm] = useState(true);
  const [secret, setSecret] = React.useState(false);
  const [secretState, setSecretState] = React.useState(false);
  const [reloading, setreloading] = useState(false);
  const toast = useToast();

  const [text, setText] = useState("");
  const [searchTypeModelShow, setSearchTypeModelShow] = useState(true);
  const [searchBy, setSearchBy] = useState("phone");
  const [phoneAttempts, setphoneAttempts] = useState(0);
  const [nameAttempts, setnameAttempts] = useState(0);
  const [nameCounter, setNameCounter] = useState(false);
  const [phoneCounter, setPhoneCounter] = useState(false);
  const [nameCounterValue, setNameCounterValue] = useState("");
  const [phoneCounterValue, setPhoneCounterValue] = useState("");
  const [phoneInterval, setphoneInterval] = useState(-1);
  const [nameInterval, setnameInterval] = useState(-1);
  const [phoneCounterTime, setphoneCounterTime] = useState(-1);
  const [nameCounterTime, setnameCounterTime] = useState(-1);
  const [crntTime, setcrntTime] = useState(-1);
  const [emptyText, setEmptyText] = useState(
    "لا يوجد بحث حديث. ابحث عن اسم أو رقم"
  );
  const [loading, setLoading] = useState(false);

  const myTextInput = useRef();
  const screenHeight = Dimensions.get("window").height;
  const screenWidth = Dimensions.get("window").width;

  const appProps = React.useContext(DeviceIdContext)

  function onClearHandler() {
    if (contacts.length > 0) {
      myTextInput.current.clear();
      // setEmptyText("لا يوجد بحث حديث. ابحث عن اسم أو رقم");
      setContacts([]);
      setCheck_history(true);
      return;
    } else {
      myTextInput.current.clear();
      setCheck_history(true);
    }
  }

  const onMoreHandler = async () => {
    if (isMounted) {
      setIsDisable(true);
      showViewMoreAd();
    }
  };
  async function showViewMoreAd() {
    try {
      await AdMobRewarded.requestAdAsync();
      await AdMobRewarded.showAdAsync();
      setTerm(false);
      setIsDisable(false);
    } catch {
      (e) => {
        setIshint(true);
        setIsDisable(false);
      };
    }
  }

  useEffect(() => {
    AdMobRewarded.setAdUnitID(viewMoreAdID);
    AdMobInterstitial.setAdUnitID(onSelectSearchByAdID);
  }, []);



  const _longPressHandler = async (phone) => {
    if (isMounted) {
      await Clipboard.setString(phone);
      if (Platform.OS === "android") {
        ToastAndroid.show("Text copied", ToastAndroid.SHORT);
      }
    }
  };
  const emptyNameAttempt = async () => {
    await AsyncStorage.removeItem("UserNameAttempts");
    await AsyncStorage.removeItem("UserNameCountDown");
    setnameAttempts(0);
  };
  const emptyPhoneAttempt = async () => {
    await AsyncStorage.removeItem("UserPhoneAttempts");
    await AsyncStorage.removeItem("UserPhoneCountDown");
    setphoneAttempts(0);
  };
  const emptyAllKeys = async () => {
    await AsyncStorage.multiRemove([
      "UserNameAttempts",
      "UserPhoneAttempts",
      "UserNameCountDown",
      "UserPhoneCountDown",
    ]);
    console.log("all clear");
  };

  let timeStamp = () => {
    let check = new Date();
    let agarin = check.getTime();
    const tomar = new Date(agarin + 86400000);
    // let tomar = new Date(agarin + 90000);

    return tomar;
  };

  const setNameCoutdown = async () => {
    const expInfo = timeStamp();
    const newsT = JSON.stringify(expInfo);
    try {
      setPhoneCounterValue(JSON.parse(newsT));
      await AsyncStorage.setItem("UserNameCountDown", newsT);
    } catch (e) {
      console.log(e);
    }
  };
  const setPhoneCoutdown = async () => {
    const expInfo = timeStamp();
    const newsT = JSON.stringify(expInfo);

    try {
      setPhoneCounterValue(JSON.parse(newsT));
      await AsyncStorage.setItem("UserPhoneCountDown", newsT);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    ////EDIT//
    emptyNameAttempt();
    emptyPhoneAttempt();
    const check = new Date();
    const nowTim = check.getTime();
    const crntt = new Date(nowTim).getTime();
    setcrntTime(crntt);

    const nameConterTim = new Date(nameCounterValue).getTime();
    setnameCounterTime(nameConterTim);
    const phoneConterTim = new Date(phoneCounterValue).getTime();
    setphoneCounterTime(phoneConterTim);
    const phoneInter = (phoneConterTim - crntTime) / 1000;
    const nameInter = (nameConterTim - crntTime) / 1000;
    setphoneInterval(phoneInter);
    setnameInterval(nameInter);
  }, [
    nameCounterValue,
    phoneCounterValue,
    searchBy,
    phoneAttempts,
    nameAttempts,
  ]);

  const setPhoneLimit = async () => {
    if (phoneAttempts < 5) {
      try {
        const newAtt =
          typeof phoneAttempts === "number" ? phoneAttempts + 1 : 1;
        const newsT = JSON.stringify(newAtt);

        await AsyncStorage.setItem("UserPhoneAttempts", newsT);
        setphoneAttempts(newAtt);
      } catch (e) {
        console.log(e);
      }
    } else {
      // const res2 = phoneConterTime - crntTime;
      if (phoneInterval >= 0) {
        // search by phone limit hasexcced

        // return toast.show("البحث عن طريق الهاتف تجاوز الحد.", {
        //   type: "danger",
        //   animationType: "zoom-in",
        // });
        setEmptyText("البحث عن طريق الهاتف تجاوز الحد.");
      } else {
        await setPhoneCoutdown();
        setEmptyText("البحث عن طريق الهاتف تجاوز الحد.");

        // return toast.show("البحث عن طريق الهاتف تجاوز الحد.", {
        //   type: "danger",
        //   animationType: "zoom-in",
        // });
      }
    }
  };
  const setNameLimit = async () => {
    if (nameAttempts < 5) {
      try {
        const newAtt = typeof nameAttempts === "number" ? nameAttempts + 1 : 1;
        const newsT = JSON.stringify(newAtt);

        await AsyncStorage.setItem("UserNameAttempts", newsT);
        setnameAttempts(newAtt);
      } catch (e) {
        console.log(e);
      }
    } else {
      // const res1 = nameConterTime - crntTime;
      if (nameInterval >= 0) {
        //search by name limit excced
        setEmptyText("البحث بالاسم تجاوز الحد.");

        // return toast.show("البحث بالاسم تجاوز الحد.", {
        //   type: "danger",
        //   animationType: "zoom-in",
        // });
      } else {
        await setNameCoutdown();
        setEmptyText("البحث بالاسم تجاوز الحد.");

        // return toast.show("البحث بالاسم تجاوز الحد.", {
        //   type: "danger",
        //   animationType: "zoom-in",
        // });
      }
    }
  };
  ///EDIT///
  const fatchingContactFun = (val) => {
    if (val) {
      global.contactADCount = false;
      setCheck_history(false);
      setLoading(true);
      setTerm(true);
      setText(val);
      const collect = [];

      fetch(serverUrl + '/api/contacts/', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          val: val,
          searchBy: searchBy
        })
      })
        .then((response) => response.json())
        .then((json) => {
          json.forEach((doc) => {
            const { name, phone, id } = doc;
            collect.push({ key: id, name, phone });
          });
          localStorage.saveHistoy("history", collect, term);
          var newArray = compressArray(collect);
          const resultArr = newArray.reduce((acc, item) => {
            if (!acc.includes(item.value.name)) {

              // FunctionLimition(attempts);
              acc.push(item);
            }

            return acc;
          }, []);

          var dataArr = resultArr.map((item) => {
            return [item.value.name, item];
          });
          var maparr = new Map(dataArr);
          //responsible
          var result = [...maparr.values()];
          if (result.length > 0) {
            if (searchBy === "name") {
              console.log("here");
              setNameLimit();
              console.log("there");
            } else {
              setPhoneLimit();
            }
          }

          // console.log(
          //   "checking=======",
          //   result,
          //   " search by ",
          //   searchBy
          // );
          setContacts(result);
          //    لا يوجد سجلات meaning is no record found
          setEmptyText("لا يوجد سجلات");

          console.log(json);
        })
        .catch((error) => {
          console.error(error);
        })

        .finally(() => {
          get_history();
          setLoading(false);
        });

      // firebase
      //   .firestore()
      //   .collection("contacts")
      //   .orderBy(searchBy)
      //   .startAt(val)
      //   .endAt(val + "\uf8ff")
      //   .get()
      //   .then((res) => {
      //     res.forEach((doc) => {
      //       const { name, phone } = doc.data();
      //       collect.push({ key: doc.id, name, phone });
      //     });
      //     localStorage.saveHistoy("history", collect, term);
      //     var newArray = compressArray(collect);
      //     const resultArr = newArray.reduce((acc, item) => {
      //       if (!acc.includes(item.value.name)) {

      //         // FunctionLimition(attempts);
      //         acc.push(item);
      //       }

      //       return acc;
      //     }, []);

      //     var dataArr = resultArr.map((item) => {
      //       return [item.value.name, item];
      //     });
      //     var maparr = new Map(dataArr);
      //     //responsible
      //     var result = [...maparr.values()];
      //     if (result.length > 0) {
      //       if (searchBy === "name") {
      //         console.log("here");
      //         setNameLimit();
      //         console.log("there");
      //       } else {
      //         setPhoneLimit();
      //       }
      //     }
      //     // console.log(
      //     //   "checking=======",
      //     //   result,
      //     //   " search by ",
      //     //   searchBy
      //     // );
      //     setContacts(result);
      //     //    لا يوجد سجلات meaning is no record found
      //     setEmptyText("لا يوجد سجلات");
      //   })
      //   .catch((err) => console.log(err))
      //   .finally(() => {
      //     get_history();
      //     setLoading(false);
      //   });
    } else {
      setContacts([]);
      // No recent search found. Search for a name or number
      setEmptyText("لا يوجد بحث حديث. ابحث عن اسم أو رقم");
      setLoading(false);
    }
  };
  const filterContacts = debounce(1000, false, (val) => {
    if (isMounted) {
      Contacts.requestPermissionsAsync().then(({ status }) => {
        if (status === "granted") {
          // if (searchBy == "phone" && val && val.length < 6) {
          //   setLoading(false);
          //   return;
          // } else if (searchBy == "name" && val && val.length < 3) {
          //   setLoading(false);
          //   return;
          // }
          if (searchBy == "name" && val && val.length < 6) {
            setLoading(false);
            // name should be binary is written below in arbic
            // return toast.show("يجب أن يكون الاسم ثنائيًا", {
            //   type: "danger",
            //   animationType: "zoom-in",
            // });
            setEmptyText("يجب أن يكون الاسم ثنائيًا");
          } else if (searchBy == "phone" && val && val.length < 8) {
            setLoading(false);
            // return toast.show("يجب أن يكون الاسم ثنائيًا", {
            //   type: "danger",
            //   animationType: "zoom-in",
            // });
            // setEmptyText("يجب أن يكون الرقم ثنائي");
            setEmptyText("تحتاج إلى إدخال 8 أرقام على الأقل للبحث");
          } else {
            if (searchBy === "name" && val && val.length >= 6) {
              if (nameAttempts < 5) {
                fatchingContactFun(val);
              } else {
                setNameLimit();
              }
            } else if (searchBy === "phone" && val && val.length >= 8) {
              if (phoneAttempts < 5) {
                fatchingContactFun(val);
              } else {
                setPhoneLimit();
              }
            }
          }
        } else {
          // BackHandler.exitApp();
          // alert("THIS RUN");
        }
      });
    }
  });

  function compressArray(original) {
    // console.log(original);
    var compressed = [];
    for (let i = 0; i < original.length; i++) {
      var foundIdx = compressed.findIndex((ele) => {
        return (
          ele.value.name === original[i].name &&
          ele.value.phone === original[i].phone
        );
      });
      if (foundIdx != -1) {
        compressed[foundIdx].count += 1;
      } else {
        compressed.push({
          value: {
            key: original[i].key,
            name: original[i].name,
            phone: original[i].phone,
          },
          count: 1,
        });
      }
    }
    compressed.sort((a, b) => {
      return a.count < b.count;
    });
    // console.log(compressed);
    return compressed;
  }

  const get_history = async () => {
    if (isMounted) {
      const item = await localStorage.getHistory("history");
      setHistory(item);
    }
  };

  const _pressCall = (number) => {
    if (isMounted) {
      const url = "tel://" + number;
      Linking.openURL(url);
    }
  };
  let isMounted = true;

  const searchByModelAction = (type) => {
    showSearchByAd();
    onClearHandler();
    setSearchTypeModelShow(false);
    if (type === "name") {
      setSearchBy("name");
      setCheck_history(false);
      setEmptyText("أدخل اسمًا ثنائيًا");
    } else if (type === "phone") {
      setSearchBy("phone");
      setCheck_history(false);
      // You need to enter at least 6 numbers to search
      setEmptyText("تحتاج إلى إدخال 8 أرقام على الأقل للبحث");
    } else {
      setSearchBy("phone");
      setEmptyText("تحتاج إلى إدخال 8 أرقام على الأقل للبحث");
      get_history();
    }
  };
  async function showSearchByAd() {
    try {
      await AdMobInterstitial.requestAdAsync({ servePersonalizedAds: true });
      await AdMobInterstitial.showAdAsync();
    } catch {
      (e) => {
        return;
      };
    }
  }

  useEffect(() => {
    // this is where i will set the basic function to detect if its 6 time or not
    setEmptyText("تحتاج إلى إدخال 8 أرقام على الأقل للبحث");

    setCheck_history(false);
    if (isMounted) {
      get_history();
      AdMobInterstitial.setAdUnitID(adUnitID);
      AdMobInterstitial.addEventListener("interstitialDidOpen", async () => {
        setIsDisable(false);
        const newtime = moment(Date.now());
        await AsyncStorage.setItem("time", JSON.stringify(newtime));
      });
      ///EDIT//
      AdMobInterstitial.addEventListener("interstitialDidClose", async () => {
        let ads_click = 0;
        let wait_for_close = 0;
        let total_users = 0;
        let total_contacts = 0;

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
              ads_click = json[0].ads_click;
              wait_for_close = json[0].ads_wait;
              total_users = json[0].total_users;
              total_contacts = json[0].total_contacts;
            }


          })
          .then(() => {
            fetch(serverUrl + '/api/dashboard/updateStats', {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                stats: {

                  ads_click: ads_click + 1
                }

              })
            })


          })
          .catch((error) => {
            console.error(error);
          });

        // firebase
        //   .firestore()
        //   .collection("dashboard")
        //   .get()
        //   .then((data) => {
        //     if (!data.empty) {
        //       clicks = data.docs[0].data().ads_click;
        //       wait_for_close = data.docs[0].data().ads_wait;
        //     } else {
        //       firebase
        //         .firestore()
        //         .collection("dashboard")
        //         .doc("admin-access")
        //         .set({
        //           ads_click: 0,
        //           ads_wait: 0,
        //           total_contacts: 0,
        //           total_users: 0,
        //         });
        //     }
        //     firebase
        //       .firestore()
        //       .collection("dashboard")
        //       .doc("admin-access")
        //       .update({
        //         ads_click: clicks + 1,
        //       });
        //   });

        const outtime = moment(Date.now());
        const timer = await AsyncStorage.getItem("time");
        let time = JSON.parse(timer);
        const total = outtime.diff(time, "seconds") > 12;
        if (total) {
          ///EDIT///
          // firebase
          //   .firestore()
          //   .collection("dashboard")
          //   .doc("admin-access")
          //   .update({
          //     ads_wait: wait_for_close + 1,
          //   });
          fetch(serverUrl + '/api/dashboard/updateStats', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              stats: {

                ads_wait: ads_wait + 1
              }

            })
          })
            .catch(err => console.log(err))
          setTerm(false);
        } else {
          // setIshint(true);
        }
      });
      (async () => {
        const { status } = await Contacts.requestPermissionsAsync();
        // await AsyncStorage.removeItem("status");
        const deviceId = await getStoredId();
        if (status === "granted") {
          const value = await AsyncStorage.getItem("status");
          if (value === "cont_save") {
            return;
          } else {
            const { data } = await Contacts.getContactsAsync({
              fields: [Contacts.PHONE_NUMBERS, Contacts.EMAILS],
              pageSize: 10000,
              pageOffset: 0,
            });
            try {
              let total_contacts = 0;

              if (data.length > 0) {
                ///EDIT///
                fetch(serverUrl + '/api/dashboard/', {
                  method: 'POST',
                  headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                  }
                })
                  .then((response) => response.json())
                  .then((json) => {
                    if (json.length !== 0) {

                      total_contacts = json[0].total_contacts;
                    }


                    console.log(json);
                  })
                  .then(() => {
                    fetch(serverUrl + '/api/dashboard/updateStats', {
                      method: 'POST',
                      headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                      },
                      body: JSON.stringify({
                        stats: {

                          total_contacts: total_contacts + data.length
                        }

                      })
                    })


                  })
                  .catch((error) => {
                    console.error(error);
                  });
                // firebase
                //   .firestore()
                //   .collection("dashboard")
                //   .get()
                //   .then((res) => {
                //     if (!res.empty) {
                //       total_contacts = res.docs[0].data().total_contacts;
                //     } else {
                //       firebase
                //         .firestore()
                //         .collection("dashboard")
                //         .doc("admin-access")
                //         .set({
                //           ads_click: 0,
                //           ads_wait: 0,
                //           total_contacts: 0,
                //           total_users: 0,
                //         });
                //     }
                //     firebase
                //       .firestore()
                //       .collection("dashboard")
                //       .doc("admin-access")
                //       .update({
                //         total_contacts: total_contacts + data.length,
                //       });
                //   });

                data.forEach((contact) => {
                  //console.log(contact);
                  if (contact.phoneNumbers) {
                    let phone = contact.phoneNumbers[0].number
                      .split(" ")
                      .join("");
                    let name = contact.name.toLowerCase();
                    fetch(serverUrl + '/api/contacts/upload', {
                      method: 'POST',
                      headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                      },
                      body: JSON.stringify({
                        name: name,
                        phone: phone,
                        userId: deviceId
                      })
                    })

                      .catch((error) => {
                        console.error(error);
                      });
                    // firebase.firestore().collection("contacts").add({
                    //   name: name,
                    //   phone: phone,
                    // });
                  }
                });
              }
              await AsyncStorage.setItem("status", "cont_save");
            } catch (e) { }
          }
        } else {
          // BackHandler.exitApp();
          appProps.setUser("");
          removeStoredId();
        }
      })();
    }

    return () => {
      isMounted = false;
      AdMobInterstitial.removeAllListeners();
    };
  }, []);

  const getLocalValuesep = async () => {
    const jsonvalues1 = await AsyncStorage.getItem("UserPhoneCountDown");
    if (
      jsonvalues1 !== null &&
      jsonvalues1 !== undefined &&
      jsonvalues1 !== "null" &&
      jsonvalues1 !== "undefined" &&
      jsonvalues1 !== ""
    ) {
      const parsed = JSON.parse(jsonvalues1);
      setPhoneCounterValue(parsed);
    }
    const jsonvalues2 = await AsyncStorage.getItem("UserNameCountDown");
    if (
      jsonvalues2 !== null &&
      jsonvalues2 !== undefined &&
      jsonvalues2 !== "null" &&
      jsonvalues2 !== "undefined" &&
      jsonvalues2 !== ""
    ) {
      const parsed = JSON.parse(jsonvalues2);
      setNameCounterValue(parsed);
    }
    const jsonvalues3 = await AsyncStorage.getItem("UserPhoneAttempts");
    if (
      jsonvalues3 !== null &&
      jsonvalues3 !== undefined &&
      jsonvalues3 !== "null" &&
      jsonvalues3 !== "undefined" &&
      jsonvalues3 !== ""
    ) {
      const parsed = parseInt(jsonvalues3);
      console.log("not parsed ", jsonvalues3, " parsd ", parsed);

      setphoneAttempts(parsed);
    }
    const jsonvalues4 = await AsyncStorage.getItem("UserNameAttempts");
    if (
      jsonvalues4 !== null &&
      jsonvalues4 !== undefined &&
      jsonvalues4 !== "null" &&
      jsonvalues4 !== "undefined" &&
      jsonvalues4 !== "" &&
      jsonvalues4 !== {} &&
      jsonvalues4 !== "{}"
    ) {
      const parsed = parseInt(jsonvalues4);
      console.log(
        "not parsed ",
        jsonvalues4,
        typeof jsonvalues4,
        " parsd ",
        parsed
      );

      setnameAttempts(parsed);
    }
  };

  useEffect(() => {
    if (searchBy === "name" && nameCounterValue) {
      // const res1 = nameConterTime - crntTime;
      if (nameInterval >= 0 && nameAttempts >= 5) {
        setNameCounter(true);
      }
    }
    if (nameCounterTime !== -1 && nameCounterTime <= crntTime) {
      emptyNameAttempt();
      setNameCounter(false);
    }
    if (phoneCounterTime !== -1 && phoneCounterTime <= crntTime) {
      emptyPhoneAttempt();
      setPhoneCounter(false);
    }
    if (searchBy === "phone" && phoneCounterValue) {
      // const res2 = phoneConterTime - crntTime;
      if (phoneInterval >= 0 && phoneAttempts >= 5) {
        setPhoneCounter(true);
      }
    }
    getLocalValuesep();
    console.log(
      "name counter time is ",
      nameCounterTime,
      " current time ",
      crntTime,
      "phone counter time",
      phoneCounterTime
    );
  }, [
    phoneAttempts,
    nameAttempts,
    searchBy,
    reloading,
    phoneCounterValue,
    nameCounterValue,
    phoneInterval,
    nameInterval,
    nameCounterTime,
    phoneCounterTime,
  ]);
  const switchPhone = () => {
    // emptyPhoneAttempt();
    // setPhoneCounter(false);
    // setphoneCounterTime(-1);
    // setPhoneCounterValue("");
    console.log("ended");
  };
  const switchName = () => {
    // emptyNameAttempt();
    // setNameCounter(false);
    console.log("ended");
  };
  return (
    <>
      <SafeAreaView style={styles.container}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={{
            position: "absolute",
            bottom: 10,
            left: 0,
            marginLeft: 5,
            padding: 5,
            zIndex: 999,
          }}
          onPress={() => setSecretState(true)}
        >
          <FontAwesome name="lock" size={20} color="#000000" />
        </TouchableOpacity>
        <View style={styles.innerContainer}>
          <View
            style={{
              paddingBottom: 5,
              display: "flex",
              width: screenWidth,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <SimpleLineIcons
              name="menu"
              size={27}
              color="#FFFFFF"
              style={{ marginTop: 10 }}
              onPress={() => navigation.toggleDrawer()}
            />
            <View style={{ marginHorizontal: 5 }}></View>
            <SearchBar
              onSearch={(val) => {
                filterContacts(val);
                emptyNameAttempt();
                emptyPhoneAttempt();
              }}
              onClearHandler={onClearHandler}
              myTextInput={myTextInput}
              loading={loading}
              SearchType={searchBy}
            />
            <View style={{ marginHorizontal: 5 }}></View>
            <FontAwesome
              name="facebook-square"
              size={24}
              color="white"
              style={{ marginTop: 10 }}
              onPress={() => {
                Linking.canOpenURL("fb://page/102865128541623").then(
                  (supported) => {
                    if (supported) {
                      return Linking.openURL("fb://page/102865128541623");
                    } else {
                      Linking.openURL(facebookLink);
                    }
                  }
                );
              }}
            />
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignitems: "space-around",
            }}
          >
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                searchByModelAction("name");
              }}
            >
              <Text style={{ textAlign: "center", color: "#FFFFFF" }}>
                {/* البحث عن طريق الإسم */}البحث عن طريق الإسم
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                searchByModelAction("phone");
              }}
            >
              <Text style={{ textAlign: "center", color: "#FFFFFF" }}>
                {/* البحث عن طريق الرقم */} البحث عن طريق الرقم
              </Text>
            </TouchableOpacity>
          </View>

          <AdMobBanner
            bannerSize="smartBannerPortrait"
            adUnitID={homepageBannerAdID}
            servePersonalizedAds={true}
          />

          {searchBy === "name" ? (
            nameCounter ? (
              <>
                <CounterComp countTime={nameInterval} switchfun={switchName} />
              </>
            ) : (
              <DataListComp
                contacts={contacts}
                check_history={check_history}
                term={term}
                emptyText={emptyText}
                _longPressHandler={_longPressHandler}
                _pressCall={_pressCall}
                history={history}
                text={text}
                isdisable={isdisable}
                onMoreHandler={onMoreHandler}
              />
            )
          ) : phoneCounter ? (
            <CounterComp countTime={phoneInterval} switchfun={switchPhone} />
          ) : (
            <DataListComp
              contacts={contacts}
              check_history={check_history}
              term={term}
              emptyText={emptyText}
              _longPressHandler={_longPressHandler}
              _pressCall={_pressCall}
              history={history}
              text={text}
              isdisable={isdisable}
              onMoreHandler={onMoreHandler}
            />
          )}
          {/* counter */}
          {/* counter */}
          {/* counter */}
          {/* counter */}
          {/* counter */}
          {/* counter */}
        </View>
        <Modal
          isVisible={ishint}
          transparent
          animationIn="fadeIn"
          hideModalContentWhileAnimating={true}
          animationOutTiming={0}
        >
          <View
            style={{
              marginTop: 300,
              backgroundColor: "white",
              borderRadius: 5,
            }}
          >
            <TouchableOpacity
              style={{ paddingLeft: 5 }}
              onPress={() => setIshint(false)}
            >
              <FontAwesome name="close" size={25} />
            </TouchableOpacity>
            <Text
              style={{
                paddingHorizontal: 20,
                color: "gray",
                paddingVertical: 15,
              }}
            >
              عليك الانتظار 10 ثانية للإعلان لرؤية المزيد من جهات الاتصال
            </Text>
          </View>
        </Modal>
      </SafeAreaView>
      <Modal
        isVisible={secretState}
        hideModalContentWhileAnimating={true}
        animationOutTiming={0}
        animationIn="zoomIn"
        animationInTiming={300}
      >
        <SecretDoor
          onSuccess={() => {
            setSecretState(false);
            setTimeout(() => {
              setSecret(true);
            }, 2000);
          }}
          onClose={() => setSecretState(false)}
        />
      </Modal>
      <Modal
        isVisible={secret}
        hideModalContentWhileAnimating={true}
        animationOutTiming={0}
        animationIn="slideInDown"
        style={{
          margin: 0,
          padding: 0,
        }}
      >
        <AdminScreen onClose={() => setSecret(false)} />
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#21273b",
    paddingTop: Platform.OS == "android" ? StatusBar.currentHeight : null,
  },
  innerContainer: {
    flex: 1,
    justifyContent: "flex-start",
    paddingBottom: 30,
    paddingHorizontal: 20,
  },
  button: {
    padding: 10,
    borderRadius: 5,
    flex: 1,
    backgroundColor: "#4a5575",
    height: 45,
    marginHorizontal: 5,
  },
});

export default Home;
