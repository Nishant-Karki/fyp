import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { Avatar, Paragraph, Surface, Title } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "react-native";
import { Menu, List } from "react-native-paper";
import {
  AntDesign,
  Entypo,
  FontAwesome,
  FontAwesome5,
  MaterialIcons,
} from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function AboutUs() {
  return (
    <>
      <View style={{ backgroundColor: "black", height: 97 }}>
        <Image
          source={require("../../logo.png")}
          style={{
            marginLeft: 20,
            width: "87%",
            height: "100%",
            paddingBottom: 10,
            marginTop: 25,
          }}
        />
      </View>
      <View style={{ margin: 30, alignItems: "center" }}>
        <Title>WHO ARE WE?</Title>
        <Paragraph style={{ textAlign: "justify" }}>
          {" "}
          Our salon is the territory created for men and women who appreciate
          high quality, impeccable service, and the perfect look.
        </Paragraph>
      </View>
    </>
  );
}

const styles = StyleSheet.create({});
