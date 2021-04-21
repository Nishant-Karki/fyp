import React, { useState, useEffect } from "react";
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
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import DeleteAccountModal from "../../components/DeleteAccountModal";

export default function Profile({ navigation }) {
  const [visible, setVisible] = useState(false);

  const dispatch = useDispatch();
  const userData = useSelector((state) => state.login.userData);

  const data = useSelector((state) => state.login.userData);
  const appointments = useSelector((state) => state.booking.appointments);

  const [userId] = data.map((item) => item.user_id);

  const recentActivities = appointments?.filter(
    (appointment) => appointment.user_id === userId
  );

  return (
    <View style={{ flex: 1 }}>
      <StatusBar translucent backgroundColor="transparent" />

      <View style={{ backgroundColor: "black", height: 120 }}>
        <Image
          source={require("../../logo-white.png")}
          style={{ width: "100%", height: "100%", paddingBottom: 10 }}
        />
      </View>
      <ScrollView>
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
            marginTop: -40,
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

        {userData.map((item) => (
          <View key={item.user_id}>
            <Surface style={{ margin: 20, borderRadius: 10, padding: 15 }}>
              <List.Item
                titleStyle={{ marginLeft: 15 }}
                title={item.fname + " " + item.lname}
                left={(props) => (
                  <Entypo
                    name="user"
                    size={20}
                    {...props}
                    style={{ marginTop: 6 }}
                  />
                )}
              />
              <List.Item
                titleStyle={{ marginLeft: 15 }}
                title={moment(item.dob).format("YYYY/MM/DD")}
                left={(props) => (
                  <FontAwesome
                    name="birthday-cake"
                    size={20}
                    {...props}
                    style={{ marginTop: 6 }}
                  />
                )}
              />
              <List.Item
                titleStyle={{ marginLeft: 15 }}
                title={
                  item.gender === "M"
                    ? "Male"
                    : item.gender === "F"
                    ? "Female"
                    : "Others"
                }
                left={(props) => (
                  <FontAwesome
                    name="transgender-alt"
                    size={20}
                    {...props}
                    style={{ marginTop: 6 }}
                  />
                )}
              />
              <List.Item
                titleStyle={{ marginLeft: 15 }}
                title={item.email}
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
                title={item.phone}
                left={(props) => (
                  <Entypo
                    name="mobile"
                    size={20}
                    {...props}
                    style={{ marginTop: 6 }}
                  />
                )}
              />
            </Surface>

            {recentActivities?.length > 0 && (
              <Surface style={{ margin: 20, borderRadius: 10, padding: 15 }}>
                <List.Item
                  titleStyle={{ marginLeft: 15 }}
                  title="Recent Bookings"
                />
                {item.role === "C" &&
                  recentActivities.map((item) => (
                    <ScrollView
                      style={{
                        marginLeft: 30,
                      }}
                    >
                      <Text>
                        Booked {item.serviceName} with {item.staff_name} on{" "}
                        {moment(item.date).format("YYYY/MM/DD")} at {item.time}{" "}
                        {item.payment === "offline" || item.payment === "online"
                          ? `Choosen Payment method is ${item.payment}`
                          : "Payment not done."}
                      </Text>
                    </ScrollView>
                  ))}
              </Surface>
            )}

            <Surface
              style={{
                margin: 20,
                borderRadius: 10,
                backgroundColor: "red",
              }}
            >
              <TouchableOpacity onPress={() => setVisible(true)}>
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
        ))}

        <DeleteAccountModal
          visible={visible}
          setVisible={setVisible}
          userId={[userData.map((item) => item.user_id)]}
          navigation={navigation}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({});
