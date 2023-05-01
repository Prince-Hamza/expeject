import React from "react";
import { View, Text, Dimensions } from "react-native";

const BannerBottomAd = () => {
  const { height } = Dimensions.get("screen");
  return (
    <View
      style={{
        height: height / 4,
        backgroundColor: "white",
      }}
    >
      <Text>bottom ads</Text>
    </View>
  );
};

export { BannerBottomAd };
