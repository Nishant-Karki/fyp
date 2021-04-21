import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, Card, Title, Paragraph } from "react-native-paper";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { StatusBar } from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchServices,
  fetchUserAppointment,
  fetchAppointment,
  fetchStaffs,
  loadCurrentService,
} from "../../redux/Booking/booking-actions";

const Cardss = ({ navigation }) => {
  const userData = useSelector((state) => state.login.userData);
  const services = useSelector((state) => state.booking.services);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchServices());
    let id;
    userData !== undefined && userData.map((item) => (id = item.user_id));
    dispatch(fetchUserAppointment(id));
    dispatch(fetchStaffs());
    dispatch(fetchAppointment());
  }, []);

  return (
    <View style={{ margin: 20, borderRadius: 10, overflow: "hidden" }}>
      {services &&
        services?.map((item) => (
          <Card key={item.service_id}>
            <Card.Cover />
            <Card.Actions
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <Text style={{ marginLeft: 8, fontSize: 18 }}>{item.name}</Text>
              <TouchableOpacity>
                <Button
                  onPress={() => {
                    dispatch(loadCurrentService(item));
                    userData?.length > 0
                      ? navigation.navigate("Item Detail")
                      : navigation.navigate("Login");
                  }}
                >
                  Book Now
                </Button>
              </TouchableOpacity>
            </Card.Actions>
          </Card>
        ))}
    </View>
  );
};
export default function Services({ navigation }) {
  // const navigation = useNavigation();

  // function navigateToDetail() {
  //     navigation.navigate("Detail");
  // }

  return (
    <ScrollView>
      <StatusBar translucent backgroundColor="transparent" />
      <Cardss navigation={navigation} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({});
