import React, { useState } from "react";

import { StyleSheet, Image, View, LogBox } from "react-native";
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
import { useDispatch, useSelector } from "react-redux";
import CustomSnackbar from "../../components/CustomSnackbar";
import axios from "axios";
import { bookAppointment } from "../../redux/Booking/booking-actions";

LogBox.ignoreAllLogs();
export default function ServiceDetail({ navigation }) {
  const dispatch = useDispatch();

  const item = useSelector((state) => state.booking.currentItem);
  const userData = useSelector((state) => state.login.userData);
  const staffs = useSelector((state) => state.booking.staffs);
  const specialist = staffs.map((item) => ({
    label: item.fname,
    value: item.user_id,
  }));

  Feather.loadFont();
  const [date, setDate] = useState();

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

  const [appointmentDate, setappointmentDate] = useState(tommorowDate);

  const [choosenSpecialist, setChoosenSpecialist] = useState(null);
  const [choosenTime, setChoosenTime] = useState();

  const [snackIsVisible, setSnackIsVisible] = useState(false);
  const [snackContent, setSnackContent] = useState("");
  const [snackType, setSnackType] = useState("blue");

  const onSubmit = () => {
    let userId;
    let timeId;

    // TimeAvailable.map((item) => (timeId = item.id));
    // if (authToken !== null) {
    if (userData.length > 0) {
      if (choosenSpecialist !== null && choosenTime.label !== null) {
        userData.map((user) => (userId = user.user_id));

        axios
          .post("http://192.168.0.103:3001/bookAppointment", {
            serviceId: item.service_id,
            userId: userId,
            time: choosenTime.label,
            date: date,
            specialist: choosenSpecialist.label,
          })
          .then((res) => {
            setSnackContent(res.data.message);
            setSnackType(res.data.type);
            setSnackIsVisible(true);

            if (res.data.type === "success") {
              dispatch(
                bookAppointment(
                  item.service_id,
                  item.name,
                  item.image,
                  item.price,
                  userId,
                  choosenTime.label,
                  date,
                  choosenSpecialist.label
                )
              );
              setTimeout(() => {
                navigation.navigate("Services");
              }, 700);
            }
          });

        // dispatch(
        //   bookAppointment(item.service_id, userId, time, choosenSpecialist)
        // );
      } else {
        setSnackContent("Please provide all the Details");
        setSnackType("error");
        setSnackIsVisible(true);
      }
    } else {
      navigation.navigate("Login");
    }
    setTimeout(() => {
      setSnackIsVisible(false);
    }, 1600);
    // }
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
          <Headline>{item.name}</Headline>
          <Subheading>Rs. {item.price}</Subheading>
        </View>
        <View style={{ marginTop: 10 }}>
          <Paragraph>{item.description}</Paragraph>
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
          {specialist && specialist?.length > 0 && (
            <DropDownPicker
              items={specialist}
              placeholder="Select Specialist"
              containerStyle={{ height: 40 }}
              onChangeItem={(item) => setChoosenSpecialist(item)}
            />
          )}
        </View>
        <View style={{ flex: 1, flexDirection: "row", marginTop: 10 }}>
          <View style={{ flex: 1 }}>
            <Caption>Choose Time</Caption>
            {TimeAvailable && TimeAvailable?.length > 0 && (
              <DropDownPicker
                items={TimeAvailable}
                placeholder="Select Time"
                containerStyle={{ height: 40 }}
                onChangeItem={(item) => setChoosenTime(item)}
              />
            )}
          </View>
          <View style={{ flex: 2 }}>
            <Caption style={{ marginLeft: 34 }}>Choose Date</Caption>
            <DatePicker
              style={styles.datePickerStyle}
              date={date} //initial date from state
              mode="date" //The enum of date, datetime and time
              placeholder="Appointment Date"
              format="YYYY-MM-DD"
              minDate={appointmentDate}
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
          onPress={() => onSubmit()}
          style={{ width: 220, alignSelf: "center" }}
        >
          Book Appointment
        </Button>
      </Surface>
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
