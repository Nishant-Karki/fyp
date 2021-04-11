import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { Avatar, Surface } from "react-native-paper";
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
import { useSelector } from "react-redux";

export default function Profile() {
  const userData = useSelector((state) => state.login.userData);
  return (
    <View style={{ flex: 1 }}>
      <StatusBar translucent backgroundColor="transparent" />
      <View style={{ backgroundColor: "black", height: 120 }}>
        <Image
          source={require("../../logo-white.png")}
          style={{ width: "100%", height: "100%", paddingBottom: 10 }}
        />
      </View>
      <View style={{ backgroundColor: "black", height: 40 }}></View>
      {/* <Avatar.Image
        size={120}
        source={{ uri: "https://picsum.photos/700" }}
        style={{ marginTop: -60, alignSelf: "center" }}
      /> */}
      <View
        style={{
          height: 120,
          width: 120,
          borderRadius: 60,
          marginTop: -60,
          alignSelf: "center",
          backgroundColor: "grey",
          justifyContent: "center",
          elevation: 5,
        }}
      >
        <FontAwesome5
          name="user-alt"
          size={70}
          color="white"
          style={{ alignSelf: "center" }}
        />
      </View>
      <Surface
        style={{ margin: 20, borderRadius: 10, elevation: 5, padding: 15 }}
      >
        <List.Item
          titleStyle={{ marginLeft: 15 }}
          title="Name"
          left={(props) => (
            <Entypo name="user" size={20} {...props} style={{ marginTop: 6 }} />
          )}
        />
        <List.Item
          titleStyle={{ marginLeft: 15 }}
          title="Email"
          left={(props) => (
            <MaterialIcons
              name="email"
              size={20}
              {...props}
              style={{ marginTop: 6 }}
            />
          )}
        />
        <List.Item
          titleStyle={{ marginLeft: 15 }}
          title="Number"
          left={(props) => (
            <Entypo
              name="mobile"
              size={20}
              {...props}
              style={{ marginTop: 6 }}
            />
          )}
        />
        <List.Item
          titleStyle={{ marginLeft: 15 }}
          title="Gender"
          left={(props) => (
            <FontAwesome
              name="transgender-alt"
              size={20}
              {...props}
              style={{ marginTop: 6 }}
            />
          )}
        />
      </Surface>

      <Surface
        style={{
          margin: 20,
          borderRadius: 10,
          elevation: 5,
          backgroundColor: "red",
        }}
      >
        <TouchableOpacity>
          <List.Item
            titleStyle={{ color: "white", marginLeft: 15 }}
            rippleColor="red"
            title="Delete Account"
            left={(props) => (
              <MaterialIcons
                name="delete"
                size={25}
                color="white"
                style={{ marginTop: 4 }}
              />
            )}
          />
        </TouchableOpacity>
      </Surface>
    </View>
  );
}

const styles = StyleSheet.create({});
