import React, { useState, useEffect } from "react";

import { StyleSheet, Image, View, LogBox } from "react-native";
import { StatusBar } from "react-native";
import {
  Surface,
  Headline,
  Button,
  Subheading,
  Paragraph,
  Caption,
  Title,
  List,
  Menu,
  Avatar,
  TextInput,
} from "react-native-paper";
import { FontAwesome5, FontAwesome, MaterialIcons } from "@expo/vector-icons";
import DropDownPicker from "react-native-dropdown-picker";
import DatePicker from "react-native-datepicker";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import CustomSnackbar from "../../components/CustomSnackbar";
import axios from "axios";
import { bookAppointment } from "../../redux/Booking/booking-actions";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { addToCart } from "../../redux/Ecommerce/eStore-actions";

LogBox.ignoreAllLogs();
export default function ProductDetail({ navigation }) {
  const dispatch = useDispatch();

  const [snackIsVisible, setSnackIsVisible] = useState(false);
  const [snackContent, setSnackContent] = useState("");
  const [snackType, setSnackType] = useState("green");

  const currentItem = useSelector((state) => state.store.currentItem);
  const { product_id, name, price, image, description } = currentItem;
  const userData = useSelector((state) => state.login.userData);
  const [userId] = userData.map((item) => item.user_id);

  const [count, setCount] = useState(1);

  const handleAdd = () => {
    setCount(count + 1);
    console.log(count);
  };

  const handleSubtract = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const onSubmit = (product_id, count, userId) => {
    if (userData.length > 0) {
      dispatch(addToCart(product_id, count, userId));
      setSnackContent("Added to Cart");
      setSnackType("success");
      setSnackIsVisible(true);
      setTimeout(() => {
        navigation.navigate("Products");
      }, 700);
    } else {
      navigation.navigate("Login");
    }
  };

  const [productFeedback, setProductFeedback] = useState([]);
  const [trigger, setTrigger] = useState(false);

  useEffect(() => {
    fetchFeedback();
    console.log(productFeedback);
    console.log("here");
  }, [trigger]);

  const fetchFeedback = async () => {
    await axios
      .get("http://192.168.0.103/userProductReview")
      .then((res) => setProductFeedback(res.data.result));
  };

  const deleteFeedback = (id) => {
    axios.post("http://192.168.0.103/deleteFeedback", { id: id });
    setProductFeedback(productFeedback.filter((value) => value.fed_id !== id));
    setTrigger(true);
  };

  const [feedback, setFeedback] = useState("");

  const onFeedbackSubmit = () => {
    console.log(feedback);
    if (feedback?.length !== 0) {
      axios.post("http://192.168.0.103/userReview", {
        feedback: feedback,
        userId: userId,
        type: "product",
        serviceId: product_id,
      });
      setFeedback("");
    }
    setTrigger(true);
    fetchFeedback();
    // setBookingFeedback([
    //   ...bookingFeedback,
    //   {
    //     feedback: feedback,
    //     user_id: userId,
    //     service_type: "booking",
    //     service_number: item.service_id,
    //   },
    // ]);
  };

  return (
    <View style={{ flex: 1 }}>
      <StatusBar translucent backgroundColor="transparent" />

      <Surface style={{ elevation: 10 }}>
        <Image
          source={{ uri: "https://picsum.photos/700" }}
          style={{ height: 220 }}
        />
      </Surface>
      <ScrollView>
        <Surface
          style={{ margin: 10, padding: 12, borderRadius: 10, elevation: 5 }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Headline>{name}</Headline>
            <Subheading>Rs. {price}</Subheading>
          </View>
          <View style={{ marginTop: 10 }}>
            <Paragraph>{description}</Paragraph>
          </View>
          <View style={{ marginTop: 20 }}>
            <Caption style={{ alignSelf: "center" }}>Choose Quantity</Caption>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignContent: "center",
                marginTop: 15,
                marginBottom: 10,
              }}
            >
              <TouchableOpacity>
                <Button
                  style={{ backgroundColor: "teal", marginRight: 10 }}
                  onPress={handleSubtract}
                >
                  <Subheading style={{ color: "white" }}>-</Subheading>
                </Button>
              </TouchableOpacity>
              <View
                style={{
                  marginLeft: 10,
                  marginRight: 10,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Headline>{count}</Headline>
              </View>
              <TouchableOpacity>
                <Button
                  style={{
                    backgroundColor: "teal",
                    marginLeft: 10,
                  }}
                  onPress={handleAdd}
                >
                  <Subheading style={{ color: "white" }}>+</Subheading>
                </Button>
              </TouchableOpacity>
            </View>
          </View>

          <Button
            onPress={() => onSubmit(product_id, count, userId)}
            style={{ width: 220, alignSelf: "center", marginTop: 10 }}
          >
            Add to Cart
          </Button>
        </Surface>

        <Surface style={{ margin: 10, borderRadius: 10, elevation: 5 }}>
          <List.Section>
            <List.Subheader>Reviews and Feedback</List.Subheader>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                marginLeft: 15,
                marginBottom: 15,
              }}
            >
              <TextInput
                style={{ width: 240, height: 50 }}
                name="name"
                value={feedback}
                onChangeText={(text) => setFeedback(text)}
                disabled={userData?.length > 0 ? false : true}
                placeholder={
                  userId?.length > 0
                    ? "Any reviews or feedback?"
                    : "Login To Give Feedback"
                }
                placeholder="Any feedback or review?"
              />

              <TouchableOpacity>
                <Button style={{ marginTop: 8 }} onPress={onFeedbackSubmit}>
                  Submit
                </Button>
              </TouchableOpacity>
            </View>
            {productFeedback
              .filter((filterItem) => filterItem.service_number === product_id)
              .map((item) => (
                <List.Item
                  key={item.fed_id}
                  style={{ marginLeft: 12 }}
                  titleStyle={{ marginLeft: 10, marginTop: -11 }}
                  title={
                    <View>
                      <View>
                        <Paragraph>
                          {item.client} {item.lastname}
                        </Paragraph>
                        <Caption>{item.feedback}</Caption>
                      </View>
                      <TouchableOpacity
                        onPress={() => deleteFeedback(item.fed_id)}
                      >
                        <MaterialIcons name="delete" size={25} color="red" />
                      </TouchableOpacity>
                    </View>
                  }
                  left={(props) => (
                    <FontAwesome5
                      name="user"
                      size={18}
                      {...props}
                      style={{ marginTop: 6 }}
                    />
                  )}
                />
              ))}
          </List.Section>
        </Surface>
      </ScrollView>

      <CustomSnackbar
        snackContent={snackContent}
        snackIsVisible={snackIsVisible}
        snackType={snackType}
        setSnackIsVisible={setSnackIsVisible}
      />
      {/* <Button title="ss" onPress={() => navigation.goBack()} /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    padding: 20,
  },
  datePickerStyle: {
    width: 200,
  },
});
