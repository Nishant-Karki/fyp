import React from "react";
import { SafeAreaView } from "react-native";
import { StyleSheet, Text, View } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import {
  Caption,
  Card,
  Subheading,
  Title,
  TouchableRipple,
} from "react-native-paper";

export default function Home({ navigation }) {
  return (
    <SafeAreaView style={{ flex: 1, margin: 20 }}>
      <TouchableOpacity onPress={() => navigation.navigate("Booking")}>
        <Card style={{ borderRadius: 10, height: 250 }}>
          <Card.Cover
            source={require("../../images/other/booking-png.png")}
            style={{ margin: 10, padding: 5 }}
          />
          <Card.Content>
            <Subheading style={{ alignSelf: "center" }}>
              Book Appointment
            </Subheading>
          </Card.Content>
        </Card>
      </TouchableOpacity>
      <View style={{ marginTop: 10 }}>
        <TouchableOpacity onPress={() => navigation.navigate("Products")}>
          <Card style={{ borderRadius: 10, height: 250 }}>
            <Card.Cover
              source={require("../../images/other/cart-mobile.png")}
              style={{ margin: 10, elevation: 5, padding: 5 }}
            />
            <Card.Content>
              <Subheading style={{ alignSelf: "center" }}>
                Buy Products
              </Subheading>
            </Card.Content>
          </Card>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
