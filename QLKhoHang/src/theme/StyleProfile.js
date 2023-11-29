import { StyleSheet } from "react-native";
const StyleProfile = StyleSheet.create({
  avatar: {
    width: 140,
    height: 140,
    borderRadius: 100,
    marginTop: -70,
  },
  name: {
    fontSize: 25,
    fontWeight: "bold",
    padding: 10,
  },
  email: {
    fontSize: 20,
    fontWeight: "bold",
    color: "gray",
  },
  icon_items: {
    width: 20,
    height: 20,
  },
  items: {
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "#fff",
    width: "90%",
    padding: 20,
    paddingBottom: 22,
    borderRadius: 10,
    shadowOpacity: 80,
    elevation: 15,
    marginTop: 20,
  },
  btn_edit: {
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "rgb(41 88 195)",
    width: "90%",
    padding: 20,
    paddingBottom: 22,
    borderRadius: 10,
    shadowOpacity: 80,
    elevation: 15,
    marginTop: 20,
  },
  btn_logout: {
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "#fff",
    width: "90%",
    padding: 20,
    paddingBottom: 22,
    borderRadius: 10,
    shadowOpacity: 80,
    elevation: 15,
    marginTop: 20,
    marginBottom: 30,
    backgroundColor: "#000",
  },
  btn_upload: {
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "#1383c9",
    width: "90%",
    padding: 20,
    paddingBottom: 22,
    borderRadius: 10,
    shadowOpacity: 80,
    elevation: 15,
    marginTop: 20,
    backgroundColor: "#1383c9",
  },
  btn_delete: {
    alignSelf: "flex-end",
    backgroundColor: "red",
    width: "30%",
    padding: 15,
    borderRadius: 10,
    shadowOpacity: 80,
    elevation: 15,
    backgroundColor: "red",
    marginBottom: 10,
    marginRight: 10
  },
  btn_update_post: {
    alignSelf: "flex-end",
    backgroundColor: "#5FBDFF",
    width: "30%",
    padding: 15,
    borderRadius: 10,
    shadowOpacity: 80,
    elevation: 15,
    backgroundColor: "#5FBDFF",
    marginBottom: 10,
    marginRight: 10
  },
});
export default StyleProfile;
