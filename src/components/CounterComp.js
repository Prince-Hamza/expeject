import { StyleSheet, Text, View } from "react-native";
import React from "react";
import CountDown from "react-native-countdown-component";
const CounterComp = ({ countTime, switchfun }) => {
  const onFinishMethod = () => {
    switchfun();
  };
  // backgroundColor: "#21273b",
  //        backgroundColor: "",

  return (
    <View style={styles.counterCont}>
      <CountDown
        until={countTime}
        size={30}
        onFinish={onFinishMethod}
        digitStyle={{
          backgroundColor: "#21273b",
          borderColor: "grey",
          borderWidth: 2,
        }}
        digitTxtStyle={{ color: "grey" }}
        timeLabelStyle={{ color: "grey", fontWeight: "bold" }}
        timeToShow={["H", "M", "S"]}
        timeLabels={{ h: "ساعة", m: "دقيقة", s: "ثانية" }}
        running={true}
      />
    </View>
  );
};

export default CounterComp;

const styles = StyleSheet.create({
  counterCont: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
});
