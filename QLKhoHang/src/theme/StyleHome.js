import { StyleSheet, StatusBar } from "react-native";
const StyleHome = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10,
    marginTop: StatusBar.currentHeight || 0,
  },
  warehouse_view: {
    backgroundColor: "#fff",
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 8,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    height: StatusBar.currentHeight,
  },
  name_warehouse: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  tittle_warehouse: {
    color: "#000",
    fontSize: 18,
    fontWeight: "600",
    flex: 1,
  },
});
export default StyleHome;
