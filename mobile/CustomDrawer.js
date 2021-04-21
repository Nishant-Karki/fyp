import React from "react";
import { View, StyleSheet, Image } from "react-native";
import {
  useTheme,
  Avatar,
  Title,
  Caption,
  Paragraph,
  Drawer,
  StatusBar,
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
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "./redux/Login/login-actions";
import { fetchAppointment } from "./redux/Booking/booking-actions";
import { fetchProducts } from "./redux/Ecommerce/eStore-actions";

export default function CustomDrawer(props) {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.login.userData);
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          {/* <TouchableRipple
            style={{
              borderBottomColor: "lightgrey",
              paddingBottom: 20,
              borderBottomWidth: 1,
            }}
          > */}
          <View style={{ margin: 10 }}>
            <Image
              source={require("./logo.png")}
              style={{
                width: 250,
                height: 78,
                marginLeft: 10,
                paddingBottom: 10,
              }}
            />
          </View>
          {/* <View style={styles.userInfoSection}>
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
            </View> */}
          {/* </TouchableRipple> */}

          <Drawer.Section style={styles.drawerSection}>
            <View
              style={{ borderTopColor: "#f4f4f4", borderTopWidth: 2 }}
            ></View>

            <DrawerItem
              labelStyle={{ fontSize: 16, color: "black" }}
              icon={({ color, size }) => (
                <FontAwesome name="home" size={size} color={color} />
              )}
              label="Home"
              onPress={() => {
                props.navigation.navigate("Home");
              }}
            />

            {userData?.length > 0 && (
              <DrawerItem
                labelStyle={{ fontSize: 16, color: "black", marginLeft: 7 }}
                icon={({ color, size }) => (
                  <FontAwesome name="user" size={size} color={color} />
                )}
                label="Profile"
                onPress={() => {
                  dispatch(fetchAppointment());
                  dispatch(fetchProducts());
                  props.navigation.navigate("Profile");
                }}
              />
            )}

            <DrawerItem
              labelStyle={{ fontSize: 16, color: "black" }}
              icon={({ color, size }) => (
                <MaterialCommunityIcons
                  name="hair-dryer"
                  size={size}
                  color={color}
                />
              )}
              label="Booking"
              onPress={() => {
                props.navigation.navigate("Booking");
              }}
            />

            <DrawerItem
              labelStyle={{ fontSize: 16, color: "black" }}
              icon={({ color, size }) => (
                <Entypo name="shop" size={size} color={color} />
              )}
              label="Products"
              onPress={() => {
                props.navigation.navigate("Products");
              }}
            />

            <DrawerItem
              labelStyle={{ fontSize: 16, color: "black" }}
              icon={({ color, size }) => (
                <Entypo name="info-with-circle" color={color} size={size} />
              )}
              label="Support"
              onPress={() => props.navigation.navigate("About Us")}
            />
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDrawerSection}>
        {userData && userData.length === 0 ? (
          <DrawerItem
            labelStyle={{ fontSize: 16, color: "black" }}
            icon={({ color, size }) => (
              <AntDesign name="login" color={color} size={size} />
            )}
            label="Log In"
            onPress={() => props.navigation.navigate("Login")}
          />
        ) : (
          <DrawerItem
            labelStyle={{ fontSize: 16, color: "black" }}
            icon={({ color, size }) => (
              <AntDesign name="login" color={color} size={size} />
            )}
            label="Log Out"
            onPress={() => {
              dispatch(logout());
              setTimeout(() => {
                props.navigation.navigate("Login");
              }, 1);
            }}
          />
        )}
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
