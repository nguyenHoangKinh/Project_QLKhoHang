import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import AppNavigation from './src/navigators/appNavigation';


export default function App() {
  return (
    <AppNavigation />
  );
}
