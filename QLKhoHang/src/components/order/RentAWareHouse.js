import React from 'react';
import axios from "axios";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";

const RentAWareHouse = ({ route, navigation }) => {
  const [capacity, setCapacity] = useState('');
  const [rentalTime, setRentalTime] = useState('');
  const { userInfo, logout, ListAccOwners, account, setAccount } =
    useContext(AuthContext);
  const { id_warehouse } = route.params;

  const handleRentWarehouse = () => {
    // ... (unchanged)

    // After processing, you can navigate back to the previous screen
    // navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Thông tin đơn hàng</Text>

      <TextInput
        style={styles.input}
        placeholder="Dung tich can thue"
        value={capacity}
        onChangeText={(text) => setCapacity(text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Thoi gian Thue"
        value={rentalTime}
        onChangeText={(text) => setRentalTime(text)}
        keyboardType="numeric"
      />
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleRentWarehouse}>
          <Text style={{ color: '#fff' }}>Gui yeu cau</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("DetailWareHouseUser")}
        >
          <Text style={{ color: '#fff' }}>Quay lại</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', // Vertically center the content
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    alignItems: 'center',
    borderRadius: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 16,
  },
});

export default RentAWareHouse;
