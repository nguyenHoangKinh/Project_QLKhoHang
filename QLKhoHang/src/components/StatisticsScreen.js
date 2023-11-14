import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import AppStyle from "../theme";

export default function StatisticsScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={AppStyle.StyleStatistics.btn_statistics}
        onPress={() => navigation.navigate("HomeNavigation")}
      >
        <Text style={AppStyle.StyleStatistics.btn_text}>THỐNG KÊ KHO HÀNG</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={AppStyle.StyleStatistics.btn_statistics}
        onPress={() => navigation.navigate("TotalProductScreen")}
      >
        <Text style={AppStyle.StyleStatistics.btn_text}>THỐNG KÊ HÀNG HÓA</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
