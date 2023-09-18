import { StyleSheet } from "react-native";
const loginStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  logoSection: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  form: {
    padding: 25,
    borderRadius: 15,
  },
  headerForm: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 50,
  },
  title: { fontWeight: "bold", fontSize: 20 },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  input: {
    borderColor: "#ccc",
    borderWidth: 0.5,
    borderRadius: 4,
    padding: 8,
    marginBottom: 10,
    backgroundColor: "white",
  },
  btn: {
    backgroundColor: "#233d90",
    padding: 10,
    borderRadius: 10,
  },
});

export default loginStyles;
