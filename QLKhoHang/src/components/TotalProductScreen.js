import React from "react";
import {
  View,
  Dimensions,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Text,
  ScrollView,
} from "react-native";
import { LineChart } from "react-native-chart-kit";
import AppStyle from "../theme";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

const TotalProductScreen = ({ navigation }) => {
  const chartConfig = {
    backgroundGradientFrom: "#000",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#000",
    backgroundGradientToOpacity: 0,
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
  };

  const screenWidth = Dimensions.get("window").width;

  const data = {
    labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
    datasets: [
      {
        data: [10, 45, 28, 50, 70, 43, 80, 80, 60, 99, 43],
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // optional
        strokeWidth: 2, // optional
      },
    ],
    legend: ["Tổng số hàng hóa trong kho lạnh (m3)"], // optional
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <LineChart
          data={data}
          width={screenWidth}
          height={300}
          chartConfig={chartConfig}
        />
        <LineChart
          data={data}
          width={screenWidth}
          height={300}
          chartConfig={chartConfig}
        />
        <LineChart
          data={data}
          width={screenWidth}
          height={300}
          chartConfig={chartConfig}
        />
        <LineChart
          data={data}
          width={screenWidth}
          height={300}
          chartConfig={chartConfig}
        />
      </ScrollView>
      <TouchableOpacity
        style={AppStyle.StyleProfile.btn_edit}
        onPress={() => navigation.navigate("HomeNavigation")}
      >
        <AntDesign name="back" size={20} color="#fff" />
        <Text style={{ color: "#fff" }}>Thống Kê</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={AppStyle.StyleProfile.btn_logout}
        onPress={() => navigation.navigate("ListProduct")}
      >
        <Text style={{ color: "#fff" }}>Danh Sách Hàng Hóa</Text>
        <MaterialIcons name="navigate-next" size={20} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginLeft: -20,
    marginTop: StatusBar.currentHeight || 0,
  },
});

export default TotalProductScreen;
