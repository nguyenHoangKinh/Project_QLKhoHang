import React, { useState } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import DetailWareHouseUser from '../user/DetailWareHouseUser';

const AddOrder = () => {
  const [isDialogVisible, setDialogVisible] = useState(false);

  const handleAddWarehouse = (data) => {
    // Xử lý dữ liệu kho đã nhập tại đây
    console.log('Dữ liệu kho mới:', data);
  };

  return (
    <View>
      <TouchableOpacity onPress={() => setDialogVisible(true)}>
        <Text>Hiển thị dialog thêm kho</Text>
      </TouchableOpacity>

      <AddWarehouseDialog
        isVisible={isDialogVisible}
        onClose={() => setDialogVisible(false)}
        onAddWarehouse={handleAddWarehouse}
      />
    </View>
  );
};

export default AddOrder;
