import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import HomeScreen from './src/components/HomeScreen';
import HomeNavigation from './src/navigators/HomeNavigation';
import EditProfileScreen from './src/components/EditProfileScreen';
import AppNavigator from './src/navigators/AppNavigation';

export default function App() {
  return (
    <View style={styles.container}>
      <HomeNavigation/>
      <StatusBar style="auto" />
      {/* <AppNavigator/> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
