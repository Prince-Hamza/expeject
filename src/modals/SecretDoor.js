import React from "react";
import {
  View,
  Text,
  TextInput,
  Keyboard,
  TouchableOpacity,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const SecretDoor = ({ onSuccess, onClose }) => {
  function _changingValue(val) {
    if (val === "moataz393") {
      Keyboard.dismiss();
      onSuccess();
    }
  }
  const ref = React.useRef();

  React.useEffect(() => {
    setTimeout(() => {
      ref.current.focus();
    }, 500);
  }, []);
  return (
    <>
      
      <View
        style={{
          height: 200,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#000000",
          borderRadius: 10,
        }}
      >
        <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => {
          Keyboard.dismiss();
          onClose();
        }}
        style={{
          position:"absolute",
          left:3,
          top:3
        }}
      >
        <MaterialIcons name="close" color="white" size={30} />
      </TouchableOpacity>
        <Text
          style={{
            color: "white",
            fontWeight: "bold",
            letterSpacing: 5,
            fontSize: 12,
            marginBottom: 10,
            textAlign: "center",
          }}
        >
          Enter your SECRET {"\n\n"}
          (أدخل سرك)
        </Text>
        <View
          style={{
            height: 40,
            width: "50%",
            marginHorizontal: 50,
            backgroundColor: "white",
            borderRadius: 10,
          }}
        >
          <TextInput
            ref={ref}
            //   value={secret}
            onChangeText={_changingValue}
            style={{
              flex: 1,
              marginHorizontal: 10,
            }}
          />
        </View>
      </View>
    </>
  );
};

export { SecretDoor };
