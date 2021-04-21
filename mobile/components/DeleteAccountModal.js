import * as React from "react";
import {
  Modal,
  Portal,
  Button,
  Provider,
  Subheading,
} from "react-native-paper";
import { View } from "react-native";
import { useDispatch } from "react-redux";
import { deleteAccount } from "../redux/Login/login-actions";

const DeleteAccountModal = ({ setVisible, visible, userId, navigation }) => {
  const dispatch = useDispatch();

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {
    backgroundColor: "white",
    padding: 20,
    margin: 20,
    minHeight: 100,
    borderRadius: 10,
  };

  return (
    <Provider>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={containerStyle}
        >
          <Subheading>
            Deleting you account will remove all your data from our database.
          </Subheading>
          <View style={{ display: "flex", flexDirection: "row" }}>
            <Button
              color="red"
              onPress={() => {
                hideModal(true);
                dispatch(deleteAccount(userId));
                navigation.navigate("Login");
              }}
            >
              Proceed
            </Button>
            <Button onPress={() => hideModal(true)}>Abort</Button>
          </View>
        </Modal>
      </Portal>
    </Provider>
  );
};

export default DeleteAccountModal;
