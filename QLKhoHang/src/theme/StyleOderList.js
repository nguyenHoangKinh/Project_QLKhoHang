import { StyleSheet } from "react-native";
const StyleOderList = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
  },
  text_address: {
    fontSize: 14,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "balck",
  },
  text: {
    fontSize: 18,
    fontWeight: "600",
    lineHeight: 21,
    letterSpacing: 0.25,
  },
  //FlatList
  item: {
    flexDirection: "row",
    height: 100,
    margin: 10,
    borderRadius: 10,
  },
  boxesList: {
    paddingBottom: 200
  },
  //boxes
  leftItem: {
    width: "30%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  rightItem: {
    justifyContent: "center",
    width: "70%",
    height: "100%",
  },
  boxes: {
    marginTop: 15,
    width: "100%",
    // height: "6%",
    flexDirection: "row",
  },
  button: {
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
    fontSize: 10,
    backgroundColor: "white",
  },

  //search
  header: {
    width: "100%",
    height: "5%",
    marginTop: 50,
    flexDirection: "row",
  },
  listFilter: {
    flex: 1,
    width: "20%",
    alignItems: "center",
    justifyContent: "center",
  },
  iconFilter: {
    width: "50%",
    textAlign: "center",
  },
  searchBar: {
    flexDirection: "row",
    alignSelf: "center",
    width: "80%",
    // height:"22px",
    marginLeft: 10,
    paddingHorizontal: 1,
    paddingVertical: 2,
    coler: "#000",
    borderWidth: 1,
    borderRadius: 9,
  },
  iconSearch: {
    marginTop: 1,
    marginLeft: 3,
    alignItems: "center",
    width: "10%",
  },
  search: {
    borderTopRightRadius: 9,
    borderBottomRightRadius: 9,
    width: "90%",
  },
  //Model
  centeredView: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  modalView: {
    width: "90%",
    height: 500,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  buttonClose: {
    width: "10%",
    left: 160,
  },
  modalView_1: {
    height: "50%",
  },
  modalView_2: {
    height: "20%",
  },
  //filter
  Fliter: {
    alignItems: "center",
    margin: 10,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#00ffce",
  },
});
export default StyleOderList;
