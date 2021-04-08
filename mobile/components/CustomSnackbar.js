import React from "react";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import Snackbar from "react-native-snackbar-component";

export default function CustomSnackbar({
  snackContent,
  snackIsVisible,
  snackType,
  setSnackIsVisible,
}) {
  return (
    <Snackbar
      containerStyle={{
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 10,
      }}
      visible={snackIsVisible}
      textMessage={snackContent}
      backgroundColor={
        snackType === "success"
          ? "green"
          : snackType === "error"
          ? "red"
          : snackType === "warning"
          ? "orange"
          : "blue"
      }
      actionHandler={() => {
        setSnackIsVisible(false);
      }}
    />
  );
}

const styles = StyleSheet.create({});
