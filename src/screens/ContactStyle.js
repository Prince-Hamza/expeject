import React from "react";
import {
    View,
    StyleSheet,
    Text,
    Image,
    TouchableOpacity,
    Dimensions,
    Platform,
} from "react-native";
import * as Animatable from "react-native-animatable";
import {
    AdMobBanner,
} from 'expo-ads-admob';
import { RFValue } from "react-native-responsive-fontsize";


//const bannerTestID = "ca-app-pub-2443081892899227/6583880569";
const bannerTestID = "ca-app-pub-2496923677374216/3701978612";


// const betweenContactAdID =  Constants.isDevice && !__DEV__ ? "ca-app-pub-2496923677374216/3065561478" : bannerTestID;
const betweenContactAdID = bannerTestID;
const Contact = ({ name, phone, _longPressHandler, onPress, otherStyles }) => {
    return (
        <View>
            <Animatable.View animation="fadeIn" duration={300}>
                <TouchableOpacity
                    style={styles.contactContainer}
                    onLongPress={_longPressHandler}
                    onPress={onPress}
                    activeOpacity={0.6}
                >
                    <View style={styles.imgContainer}>
                        <Image
                            source={require("../../assets/phone.png")}
                            style={styles.img}
                        />
                    </View>
                    <View style={styles.detailsContainer}>
                        <Text style={styles.name} numberOfLines={1}>
                            {name}
                        </Text>
                        <Text style={[styles.phone, { ...otherStyles }]} numberOfLines={2}>
                            {phone}
                        </Text>
                    </View>
                </TouchableOpacity>
            </Animatable.View>

            {/* {Math.random()<0.1 ?  <AdMobBanner
            bannerSize="smartBannerPortrait"
            adUnitID={betweenContactAdID} 
            servePersonalizedAds={true}/>: null} */}
        </View>
    );
};
const height = Dimensions.get("window").height;

const styles = StyleSheet.create({
    contactContainer: {
        marginTop: 10,
        borderRadius: 10,
        height: height * 0.1,
        alignItems: "center",
        paddingRight: 10,
        backgroundColor: "#4a5575",
        flexDirection: "row-reverse",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,

        elevation: 10,
    },
    name: {
        color: "white",
        fontSize: RFValue(18),
        paddingVertical: 2,
        alignSelf: "flex-end",
        letterSpacing: 1,
        fontFamily: "BurbankBigCondensedBlack",
    },
    imgContainer: {
        height: height * 0.06,
        width: height * 0.06,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
        marginRight: 10,
    },
    phone: {
        color: "#d8dfeb",
        fontSize: RFValue(15),
        paddingVertical: 2,
        alignSelf: "flex-end",
        fontFamily: "BurbankBigCondensedBlack",
    },
    img: {
        resizeMode: "stretch",
        height: height * 0.06,
        width: height * 0.06,
        overflow: "hidden",
        borderRadius: 10,
    },
    detailsContainer: {
        flex: 1,
        paddingHorizontal: 10,
        height: height * 0.12,
        justifyContent: "center",
    },
});
export default React.memo(Contact);
