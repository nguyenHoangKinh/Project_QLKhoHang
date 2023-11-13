import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import Navigation from "./src/navigators/Navigation";
import Home from "./src/components/HomeScreen";
import AddOrderScreen from "./src/components/AddOrderScreen";
import Home from "./src/components/ChangePasswordScreen";
import { AuthProvider } from "./src/context/AuthContext";


export default function App() {
  return (
    <AuthProvider>
      <Navigation />
    </AuthProvider>
  );
}
