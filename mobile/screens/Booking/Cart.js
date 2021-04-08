import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { Button, Surface } from "react-native-paper";

export default function Cart({ navigation }) {
  return (
    <View style={styles.topDesign}>
      <View
        style={{
          height: 35,
          display: "flex",
          flexDirection: "row",
          marginLeft: 10,
          marginTop: 10,
        }}
      >
        <Surface
          style={{
            elevation: 5,
            height: 60,
            borderRadius: 10,
            margin: 5,
            elevation: 5,
            padding: 10,
          }}
        >
          <Text style={{ color: "black", fontSize: 15 }}>
            Total Amount with 13% VAT
          </Text>
          <Text style={{ color: "black", fontSize: 22 }}>Rs 2000000 /-</Text>
        </Surface>
        <TouchableOpacity
          style={{
            elevation: 5,
            backgroundColor: "white",
            width: 120,
            marginTop: 17,
            marginLeft: 25,
            borderRadius: 10,
          }}
        >
          <Button onPress={() => alert("CHECKOUT")}>Checkout</Button>
        </TouchableOpacity>
      </View>
      <View style={styles.cartElevated}>
        <ScrollView style={styles.scrollView}>
          <View
            style={{
              height: 80,
              borderRadius: 8,
              overflow: "hidden",
              flex: 4,
              flexDirection: "row",
              backgroundColor: "#F4F4F4",
            }}
          >
            <Image
              source={{ uri: "https://picsum.photos/700" }}
              style={{ flex: 1 }}
            />
            <View style={{ flex: 2, padding: 8 }}>
              <View style={{ flex: 3, flexDirection: "row" }}>
                <View style={{ flex: 2 }}>
                  <Text style={{ fontSize: 18 }}>Service Name</Text>
                  <Text>Rs. 200</Text>
                  <Text>Date and Time</Text>
                </View>

                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <TouchableOpacity>
                    <MaterialIcons name="delete" size={25} color="red" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  topDesign: {
    backgroundColor: "#e91e63",
    height: 160,
    borderBottomEndRadius: 80,
    borderBottomLeftRadius: 80,
  },
  cartElevated: {
    backgroundColor: "white",
    elevation:5,
    marginTop: 45,
    height: 420,
    margin: 15,
    elevation: 3,
    borderRadius: 10,
    padding: 20,
  },
  scrollView: {
    borderRadius: 20,
  },
});
