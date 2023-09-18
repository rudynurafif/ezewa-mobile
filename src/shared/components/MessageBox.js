import { Alert } from "react-native";

const MessageBox = (title, message, okCallback) => {
  const showAlert = () => {
    Alert.alert(title, message, [{ text: "OK", onPress: okCallback }]);
  };
  return {
    showAlert,
  };
};

export default MessageBox;
