import React, { Fragment, useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  TouchableOpacity,
  LogBox,
  Keyboard,
} from "react-native";
import { Button } from "react-native-elements";
import { Formik } from "formik";
import { MaterialIcons } from "@expo/vector-icons";
import * as Yup from "yup";
import { HideWithKeyboard } from "react-native-hide-with-keyboard";
import FormInput from "../../components/FormInput";
import FormButton from "../../components/FormButton";
import ErrorMessage from "../../components/ErrorMessage";
import AppLogo from "../../components/AppLogo";
import { StatusBar } from "react-native";
import { Surface } from "react-native-paper";
import axios from "axios";
import CustomSnackbar from "../../components/CustomSnackbar";
import { useDispatch, useSelector } from "react-redux";
import { userData as user, authToken } from "../../redux/Login/login-actions";

LogBox.ignoreAllLogs();
const validationSchema = Yup.object().shape({
  email: Yup.string()
    .label("Email")
    .email("Enter a valid email")
    .required("Please enter a registered email"),
  password: Yup.string()
    .label("Password")
    .required()
    .min(8, "Password must have at least 8 characters "),
});

export default Login = ({ navigation }) => {
  // for snackbar
  const [snackIsVisible, setSnackIsVisible] = useState(false);
  const [snackContent, setSnackContent] = useState("");
  const [snackType, setSnackType] = useState("blue");

  const dispatch = useDispatch();
  const Token = useSelector((state) => state.login.authToken);
  const userData = useSelector((state) => state.login.userData);
  const goToSignup = () => navigation.navigate("Signup");

  const handleOnLogin = async (values, { resetForm }) => {
    Keyboard.dismiss();
    userAuthenticated();
    axios
      .post("http://192.168.0.104:3001/login", { values: values })
      .then((res) => {
        setSnackContent(res.data.message);
        setSnackType(res.data.type);
        setSnackIsVisible(true);
        setTimeout(() => {
          setSnackIsVisible(false);
          if (res.data.type === "success") {
            // resetForm();
            // navigation.navigate("Services");
          }
        }, 2500);
        if (snackType === "success") {
          dispatch(user(res.data.result));
          dispatch(authToken(res.data.token));
          let id;
          userData !== undefined && userData.map((item) => (id = item.user_id));
          dispatch(fetchUserAppointment(id));
        }
      })
      .catch((err) => console.log(err));
  };

  const userAuthenticated = async () => {
    await axios
      .post("http://192.168.0.104:3001/isUserAuth")
      .then((response) => {
        response.data.auth === true && navigation.navigate("Services");
      })
      .catch((err) => console.log(err));

    axios.defaults.headers.common["authorization"] = Token;
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" />

      <Surface
        style={{ margin: 20, padding: 10, elevation: 5, borderRadius: 10 }}
      >
        <HideWithKeyboard style={styles.logoContainer}>
          <AppLogo />
        </HideWithKeyboard>

        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={handleOnLogin}
          validationSchema={validationSchema}
        >
          {({
            handleChange,
            values,
            handleSubmit,
            errors,
            isValid,
            touched,
            handleBlur,
            isSubmitting,
          }) => (
            <Fragment>
              <FormInput
                name="email"
                value={values.email}
                onChangeText={handleChange("email")}
                placeholder="Enter email"
                autoCapitalize="none"
                iconColor="#2C384A"
                iconName="email"
                onBlur={handleBlur("email")}
              />
              <ErrorMessage errorValue={touched.email && errors.email} />
              <FormInput
                name="password"
                value={values.password}
                onChangeText={handleChange("password")}
                placeholder="Enter password"
                iconColor="#2C384A"
                secureTextEntry
                iconName="vpn-key"
                onBlur={handleBlur("password")}
              />
              <ErrorMessage errorValue={touched.password && errors.password} />
              <View style={styles.buttonContainer}>
                <FormButton
                  buttonType="outline"
                  onPress={handleSubmit}
                  title="LOGIN"
                  buttonColor="#e91e63"
                  // disabled={!isValid || isSubmitting}
                  // loading={isSubmitting}
                />
              </View>
              <View style={{ marginTop: 20 }}>
                <Button
                  title="Don't have an account? Sign Up"
                  onPress={goToSignup}
                  titleStyle={{
                    color: "#039BE5",
                  }}
                  type="clear"
                />
              </View>
            </Fragment>
          )}
        </Formik>
      </Surface>
      <CustomSnackbar
        snackContent={snackContent}
        snackIsVisible={snackIsVisible}
        snackType={snackType}
        setSnackIsVisible={setSnackIsVisible}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 80,
  },
  logoContainer: {
    marginBottom: 15,
    alignItems: "center",
  },
  buttonContainer: {
    width: 200,
    marginTop: 30,
    alignSelf: "center",
  },
});
