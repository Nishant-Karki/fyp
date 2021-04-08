import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, Card, Title, Paragraph } from "react-native-paper";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { StatusBar } from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const Cardss = ({ navigation }) => {
  return (
    <View style={{ margin: 20, borderRadius: 10, overflow: "hidden" }}>
      <Card>
        <Card.Cover source={{ uri: "https://picsum.photos/700" }} />
        <Card.Actions
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <Text style={{ marginLeft: 8, fontSize: 18 }}>Service Name</Text>
          <TouchableOpacity>
            <Button onPress={() => navigation.navigate("Item Detail")}>
              Book Now
            </Button>
          </TouchableOpacity>
        </Card.Actions>
      </Card>
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
      <Cardss navigation={navigation} />
      <Cardss navigation={navigation} />
      <Cardss navigation={navigation} />
      <Cardss navigation={navigation} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({});
