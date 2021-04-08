import React from "react";
import { Input } from "react-native-elements";
import { StyleSheet, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const FormInput = ({
  iconName,
  iconColor,
  returnKeyType,
  keyboardType,
  name,
  newIcon,
  customIcon,
  placeholder,
  ...rest
}) => (
  <View style={styles.inputContainer}>
    <Input
      {...rest}
      leftIcon={
        newIcon ? (
          customIcon
        ) : (
          <MaterialIcons name={iconName} size={20} color={iconColor} />
        )
      }
            leftIconContainerStyle={styles.iconStyle}
      placeholderTextColor="grey"
      name={name}
      placeholder={placeholder}
      style={styles.input}
    />
  </View>
);

const styles = StyleSheet.create({
  inputContainer: {
    marginLeft: 10,
    marginRight: 10,
    marginBottom: -15,
    marginTop: 10,
  },
  iconStyle: {
    marginRight: 10,
  },
});

export default FormInput;
