import React, {useContext} from 'react';
import {Button, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {AuthContext} from '../context/AuthContext';

const HomeScreen = ({navigation}) => {
  const {userInfo, isLoading, logout, token} = useContext(AuthContext);

  return (
    <View style={styles.container}>
    <Text>Hello</Text>
      <Spinner visible={isLoading} />
      <Text style={styles.welcome}>Welcome Onwer {userInfo.others.username} </Text>
      <Button title="Logout" color="red" onPress={logout} />
      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text className="font-semibold text-yellow-500"> Sign Up</Text>
          </TouchableOpacity>
          
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcome: {
    fontSize: 18,
    marginBottom: 8,
  },
});

export default HomeScreen;
