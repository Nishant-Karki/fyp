import React from "react";
import { View, StyleSheet } from "react-native";
import {
  useTheme,
  Avatar,
  Title,
  Caption,
  Paragraph,
  Drawer,
  Text,
  TouchableRipple,
  Switch,
} from "react-native-paper";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import {
  AntDesign,
  Entypo,
  FontAwesome5,
  FontAwesome,
  MaterialIcons,
} from "@expo/vector-icons";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function CustomDrawer(props) {
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <TouchableRipple
            style={{
              borderBottomColor: "lightgrey",
              paddingBottom: 20,
              borderBottomWidth: 1,
            }}
          >
            <View style={styles.userInfoSection}>
              <View style={{ flexDirection: "row", marginTop: 15 }}>
                <View
                  style={{
                    width: 70,
                    height: 70,
                    backgroundColor: "grey",
                    borderRadius: 35,
                    justifyContent: "center",
                  }}
                >
                  <FontAwesome5
                    name="user-alt"
                    size={40}
                    color="white"
                    style={{ alignSelf: "center" }}
                  />
                </View>
                <View style={{ marginLeft: 15, flexDirection: "column" }}>
                  <Title style={styles.title}>Name</Title>
                  <Caption style={styles.caption}>Email</Caption>
                </View>
              </View>
            </View>
          </TouchableRipple>

          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              labelStyle={{ fontSize: 16, color: "black" }}
              icon={({ color, size }) => (
                <FontAwesome name="user" size={size} color={color} />
              )}
              label="Profile"
              onPress={() => props.navigation.navigate("Profile")}
            />

            <DrawerItem
              labelStyle={{ fontSize: 16, color: "black" }}
              icon={({ color, size }) => (
                <FontAwesome name="home" size={size} color={color} />
              )}
              label="Home"
              onPress={() => {
                props.navigation.navigate("Booking");
              }}
            />
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem
          labelStyle={{ fontSize: 16, color: "black" }}
          icon={({ color, size }) => (
            <AntDesign name="login" color={color} size={size} />
          )}
          label="Log In"
          onPress={() => props.navigation.navigate("Login")}
        />
      </Drawer.Section>
    </View>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
    marginTop: 1,
  },
  title: {
    fontSize: 20,
    marginTop: 3,
    fontWeight: "bold",
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
  },
  paragraph: {
    fontWeight: "bold",
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: "#f4f4f4",
    borderTopWidth: 1,
  },
  preference: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
