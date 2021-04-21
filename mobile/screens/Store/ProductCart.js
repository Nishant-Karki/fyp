import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, Linking } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import {
  Button,
  Caption,
  Headline,
  Paragraph,
  Subheading,
  Surface,
  Title,
} from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { deleteAppointment } from "../../redux/Booking/booking-actions";
import { fetchAppointment } from "../../redux/Booking/booking-actions";
import {
  fetchProducts,
  removeFromCart,
} from "../../redux/Ecommerce/eStore-actions";

export default function ProductCart({ navigation }) {
  const storeCart = useSelector((state) => state.store.cart);
  const dispatch = useDispatch();
  // const [open, setOpen] = useState(false);
  const userData = useSelector((state) => state.login.userData);
  const [userId] = userData.map((item) => item.user_id);

  const newCart = storeCart.filter((item) => item.userId === userId);

  const [click, setClick] = useState(false);

  useEffect(() => {
    setCart(newCart);
  }, [click]);
  // let newCart = cart.filter((item) => item.userId === userId);
  // console.log(newCart);
  const [cart, setCart] = useState(newCart);

  let totalPrice;
  let withVAT;

  if (cart?.length > 0) {
    let array = cart.map((item) => item.price * item.qty);
    totalPrice = array.reduce((a, b) => a + b);
    withVAT = totalPrice + Math.round(totalPrice * (13 / 100));
  }

  const OpenWEB = () => {
    Linking.openURL("http://192.168.0.103:3000/payment");
  };
  return (
    <View style={styles.topDesign}>
      <View>
        {cart && cart?.length > 0 && (
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
                height: 65,
                borderRadius: 10,
                margin: 5,
                elevation: 5,
                padding: 10,
              }}
            >
              <Text style={{ color: "black", fontSize: 15 }}>
                Total Amount with 13% VAT
              </Text>
              <Text style={{ color: "black", fontSize: 22 }}>
                Rs. {withVAT}
              </Text>
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
              <Button
                onPress={() => {
                  OpenWEB();
                  dispatch(handleStorePayment(cart));
                }}
              >
                Checkout
              </Button>
            </TouchableOpacity>
          </View>
        )}
        <View style={styles.cartElevated}>
          <ScrollView style={styles.scrollView}>
            {cart && cart?.length > 0 ? (
              cart.map((item) => (
                <View
                  key={item.product_id}
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
                        <Subheading>{item.name}</Subheading>
                        <Text>Rs. {item.price}</Text>
                        <Text>
                          Total: {item.qty} * {item.price} = {totalPrice}
                        </Text>
                      </View>

                      <View
                        style={{
                          flex: 1,
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <TouchableOpacity
                          onPress={() => {
                            dispatch(removeFromCart(item.product_id));
                            setClick(!click);
                          }}
                        >
                          <MaterialIcons name="delete" size={25} color="red" />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
              ))
            ) : (
              <View
                style={{
                  marginTop: 100,
                  display: "flex",
                  flexDirection: "row",
                  padding: 20,
                  marginLeft: 10,
                }}
              >
                <Subheading style={{ alignItems: "center" }}>
                  No products in cart
                </Subheading>
                <TouchableOpacity
                  onPress={() => navigation.navigate("Products")}
                >
                  <Button
                    style={{ width: 200, marginTop: -2, marginLeft: -20 }}
                  >
                    Book Now
                  </Button>
                </TouchableOpacity>
              </View>
            )}
          </ScrollView>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  topDesign: {
    backgroundColor: "teal",
    height: 160,
    borderBottomEndRadius: 80,
    borderBottomLeftRadius: 80,
  },
  cartElevated: {
    backgroundColor: "white",
    elevation: 5,
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
