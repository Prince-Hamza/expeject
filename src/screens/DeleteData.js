import React, { useState } from "react";
import {
    StyleSheet,
    View,
    Text,
    Platform,
    Dimensions,
    ScrollView,
    useWindowDimensions,
    TextInput,
    Button,
} from "react-native";
import HTML from "react-native-render-html";
import { removeStoredId, getStoredId, serverUrl } from "../util/Global";
import { BackHandler } from 'react-native';
import DeviceIdContext from '../util/DeviceIdContext'
import { SimpleLineIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";


const deleteUserData = async (email) => {
    await AsyncStorage.setItem("status", "cont_not_saved");
    const id = await getStoredId();
    console.log(email, id);
    fetch(serverUrl + '/api/contacts/deleteData', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: email,
            userId: id

        })
    })

        .then(() => removeStoredId())
        .catch(err => console.log(err))
}
function DeleteData({ navigation }) {
    const appProps = React.useContext(DeviceIdContext)

    const screenHeight = Dimensions.get("window").height;
    const screenWidth = Dimensions.get("window").width;
    const contentWidth = screenWidth * 0.9;
    const [email, setEmail] = useState('');
    const [valid, setValid] = useState(false);

    validate = (text) => {
        setEmail(text);
        console.log(text);
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        if (reg.test(text) === false) {
            console.log("Email is Not Correct");
            setValid(false);
            return false;
        }
        else {
            setValid(true)
            console.log("Email is Correct");
        }
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
                <Text style={{ fontSize: 24, marginLeft: "25%" }}>حذف بياناتي</Text>
            </View>
            <ScrollView style={styles.container}>
                <Text
                    style={{
                        textAlign: 'left',
                        fontSize: Platform.OS == "ios" ? 18 : 18,
                        fontFamily: "BurbankBigCondensedBlack",
                        marginTop: 10,
                        marginBottom: 10
                    }}>ضع بريدك الالكتروني ليصلك رابط الحذف</Text>
                <Text>

                    عندما تضغط على زر حذف البيانات ، نعدك بحذف جميع المعلومات التي تم جمعها من هاتفك والمعلومات التي نعني بها جهات الاتصال ، لكن لن تتمكن من استخدام التطبيق مرة أخرى
                </Text>
                <TextInput
                    placeholder="email@example.com"
                    textContentType='emailAddress'
                    value={email}

                    onChangeText={(text) => validate(text)}

                    style={{
                        color: "#020a17",
                        flex: 1,
                        textAlign: "left",
                        marginVertical: 15,
                        paddingRight: 5,
                        fontSize: Platform.OS == "ios" ? 18 : 18,
                        fontFamily: "BurbankBigCondensedBlack",
                    }}></TextInput>
                <Button title='حذف' color="#000"
                    disabled={!valid}
                    style={{

                        fontSize: Platform.OS == "ios" ? 18 : 18,
                        fontFamily: "BurbankBigCondensedBlack"
                    }}
                    onPress={() => {
                        if (email !== '') {


                            deleteUserData(email)


                            appProps.setUser("");
                        }
                    }}></Button>
            </ScrollView>
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

export default DeleteData;