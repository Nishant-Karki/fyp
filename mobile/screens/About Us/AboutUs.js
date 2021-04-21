import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import {
  Avatar,
  Caption,
  Paragraph,
  Subheading,
  Surface,
  Title,
} from "react-native-paper";
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
      <View style={{ marginTop: 70 }}></View>
      <View style={{ height: 97 }}>
        <Image
          source={require("../../logo.png")}
          style={{
            marginLeft: 20,
            width: 350,
            height: 109,
            paddingBottom: 10,
            marginTop: 45,
          }}
        />
      </View>
      <View style={{ margin: 30, marginTop: 60, alignItems: "center" }}>
        <Title>WHO ARE WE?</Title>
        <Paragraph style={{ textAlign: "justify" }}>
          {" "}
          Our salon is the territory created for men and women who appreciate
          high quality, impeccable service, and the perfect look.
        </Paragraph>
      </View>
      <View style={{ margin: 30, marginTop: 5 }}>
        <Title>GET IN TOUCH WITH US</Title>
        <View style={{ display: "flex", flexDirection: "row" }}>
          <Subheading>Email:</Subheading>
          <Subheading style={{ marginLeft: 10 }}>
            nepadesalon@gmail.com
          </Subheading>
        </View>
        <View style={{ display: "flex", flexDirection: "row" }}>
          <Subheading>Number:</Subheading>
          <Subheading style={{ marginLeft: 10 }}>9840209779</Subheading>
          <Subheading style={{ marginLeft: 10 }}>9841299179</Subheading>
        </View>
        <View style={{ display: "flex", flexDirection: "row" }}>
          <Subheading>Location:</Subheading>
          <Subheading style={{ marginLeft: 10 }}>Jagati, Bhaktapur</Subheading>
        </View>
        <View style={{ display: "flex", flexDirection: "row" }}>
          <Subheading>Opening Hours:</Subheading>
          <Subheading style={{ marginLeft: 10 }}>9:00 - 17:00</Subheading>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({});
