import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import Navigation from "./src/navigators/Navigation";
import Home from "./src/components/HomeScreen";
import Test from "./src/components/SeeOrderDetails";
import { AuthProvider } from "./src/context/AuthContext";


export default function App() {
  return (
    <AuthProvider>
      <Navigation />
    </AuthProvider>
  );
}
