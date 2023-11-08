import React from 'react'
import { View } from 'react-native'

function TableRow() {
  return (
    <View>
        <Text>Ten: {item.wareHouseName}</Text>
                  <Text> Dia chi: {item.address}</Text>
                  <Text> Danh muc: {item.category}</Text>
                  <Text> Gia tien: {item.monney}</Text>
                  <Text> Chu Kho:{item.owner}</Text>
    </View>
  )
}

export default TableRow
