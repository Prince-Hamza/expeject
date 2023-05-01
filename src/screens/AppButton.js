import React from "react";
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const AppButton = ({
  title,
  color,
  border,
  icon,
  icolor,
  onPress,
  disable,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      disabled={disable}
      onPress={onPress}
      style={[
        styles.button,
        {
          backgroundColor: disable ? "gray" : "white",
          borderWidth: border ? 1 : null,
        },
      ]}
    >
      <MaterialCommunityIcons
        name={icon ? icon : null}
        size={icon ? 22 : null}
        color={icolor ? icolor : "black"}
      />
      {disable ? (
        <ActivityIndicator size="small" color="black" />
      ) : (
        <Text style={[styles.text, { color: "black" }]}>
          {title ? title : null}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginHorizontal: 20,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#0e2a54",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
  },
  text: {
    textAlign: "center",
    fontFamily: "BurbankBigCondensedBlack",
    flex: 1,
    color: "white",
    fontWeight: "bold",
    fontSize: RFPercentage(2),
    textTransform: "uppercase",
    letterSpacing: 3,
  },
});

export { AppButton };
