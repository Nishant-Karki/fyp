import React, { useState } from "react";
import { StyleSheet, Image, View } from "react-native";
import { StatusBar } from "react-native";
import Feather from "react-native-vector-icons/Feather";
import {
  Surface,
  Headline,
  Button,
  Subheading,
  Paragraph,
  Caption,
} from "react-native-paper";
import DropDownPicker from "react-native-dropdown-picker";
import DatePicker from "react-native-datepicker";
import moment from "moment";

export default function ServiceDetail({ navigation }) {
  Feather.loadFont();
  const [date, setDate] = useState();
  const [staff, setStaff] = useState([
    { label: "Item 1", value: "item1" },
    { label: "Item 2", value: "item2" },
  ]);

  const TimeAvailable = [
    { label: "9:00-10:00", value: "9-10" },
    { label: "10:00-11:00", value: "10-11" },
    { label: "11:00-12:00", value: "11-12" },
    { label: "2:00-3:00", value: "2-3" },
    { label: "3:00-4:00", value: "3-4" },
    { label: "4:00-5:00", value: "4-5" },
  ];

  //to get tommorows date
  const todayMoment = moment();
  const tommorowMoment = todayMoment.clone().add(1, "days");
  const tommorowDate = moment.utc(tommorowMoment._d).format("YYYY-MM-DD");

  const [selectedStaff, setSelectedStaff] = useState();
  const [selectedTime, setSelectedTime] = useState();

  return (
    <View style={{ flex: 1 }}>
      <StatusBar translucent backgroundColor="transparent" />

      <Surface style={{ elevation: 10 }}>
        <Image
          source={{ uri: "https://picsum.photos/700" }}
          style={{ height: 220 }}
        />
      </Surface>
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
          <Headline>Service Name</Headline>
          <Subheading>Price</Subheading>
        </View>
        <View style={{ marginTop: 10 }}>
          <Paragraph>Description</Paragraph>
        </View>
      </Surface>
      <Surface
        style={{
          margin: 10,
          padding: 12,
          borderRadius: 10,
          elevation: 5,
          height: 210,
        }}
      >
        <View>
          <Caption>Choose Specialist</Caption>
          <DropDownPicker
            items={staff}
            placeholder="Select Specialist"
            containerStyle={{ height: 40 }}
            onChangeItem={(item) => setSelectedStaff(item)}
          />
        </View>
        <View style={{ flex: 1, flexDirection: "row", marginTop: 10 }}>
          <View style={{ flex: 1 }}>
            <Caption>Choose Time</Caption>
            <DropDownPicker
              items={TimeAvailable}
              placeholder="Select Time"
              containerStyle={{ height: 40 }}
              onChangeItem={(item) => setSelectedTime(item)}
            />
          </View>
          <View style={{ flex: 2 }}>
            <Caption style={{ marginLeft: 34 }}>Choose Date</Caption>
            <DatePicker
              style={styles.datePickerStyle}
              date={date} //initial date from state
              mode="date" //The enum of date, datetime and time
              placeholder="Appointment Date"
              format="YYYY-MM-DD"
              minDate={tommorowDate}
              showIcon={false}
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
                dateIcon: {
                  // display: 'none',
                  position: "absolute",
                  left: 0,
                  top: 4,
                  marginLeft: 0,
                },
                dateInput: {
                  marginLeft: 36,
                },
              }}
              onDateChange={(date) => {
                setDate(date);
              }}
            />
          </View>
        </View>

        <Button
          onPress={() => navigation.navigate("Services")}
          style={{ width: 220, alignSelf: "center" }}
        >
          Book Appointment
        </Button>
      </Surface>

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
