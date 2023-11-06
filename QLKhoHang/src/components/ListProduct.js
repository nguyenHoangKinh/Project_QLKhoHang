import React, { useState } from "react";
import { Dropdown } from "react-native-element-dropdown";
import AppStyle from "../theme";
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar, TextInput, TouchableOpacity } from "react-native";
import { AntDesign } from '@expo/vector-icons';

const products = [
    {
        id: 'product1',
        nameProduct: 'Bánh mì',
        warehouse: 'Kho 1',
        count: '200 kg',
        idWarehouse: 'warehouse1',
    },
    {
        id: 'product2',
        nameProduct: 'Tạp chí',
        warehouse: 'Kho 2',
        count: '500 kg',
        idWarehouse: 'warehouse2',
    },
    {
        id: 'product3',
        nameProduct: 'Hải sản',
        warehouse: 'Kho 3',
        count: '5 tấn',
        idWarehouse: 'warehouse3',
    },
    {
        id: 'product4',
        nameProduct: 'Aquafina',
        warehouse: 'Kho 1',
        count: '1000 m3',
        idWarehouse: 'warehouse1',
    },
    {
        id: 'product5',
        nameProduct: 'Cua',
        warehouse: 'Kho 4',
        count: '1000 m3',
        idWarehouse: 'warehouse1',
    },
];

const warehouses = [
    {
        id: 'warehouse1',
        warehouse: 'Kho 1'
    },
    {
        id: 'warehouse2',
        warehouse: 'Kho 2'
    },
    {
        id: 'warehouse3',
        warehouse: 'Kho 3'
    },
    {
        id: 'warehouse4',
        warehouse: 'Kho 4'
    },
];

const ListProduct = ({ navigation }) => {
    const [userInput, setUserInput] = useState("");
    const [productList, setProductList] = useState(products);
    const [id, setId] = useState("");

    const handleSearch = (text) => {
        if (text) {
            let searchList = productList.filter((productList) =>
                productList.nameProduct.toLowerCase().includes(text.toLowerCase())
            );

            if (id) {
                let filterList = products.filter((products) =>
                    products.idWarehouse.toLowerCase().includes(id.toLowerCase())
                )
                setProductList(filterList)
            }

            setProductList(searchList)
        } else {
            let filterList = products.filter((productList) =>
                productList.idWarehouse.toLowerCase().includes(id.toLowerCase())
            );

            setProductList(filterList)
        }
    }

    const filterWarehouse = (id) => {
        if (id) {
            let filterList = products.filter((productList) =>
                productList.idWarehouse.toLowerCase().includes(id.toLowerCase())
            );

            if (userInput) {
                let searchList = products.filter((products) =>
                    products.nameProduct.toLowerCase().includes(userInput.toLowerCase()
                    )
                )
                setProductList(searchList)
            }

            setProductList(filterList)
        } else {
            let searchList = products.filter((productList) =>
                productList.nameProduct.toLowerCase().includes(userInput.toLowerCase())
            );

            setProductList(searchList)
        }
        setUserInput("");
    }

    return (
        <SafeAreaView style={AppStyle.StyleListProduct.container}>
            <TextInput
                placeholder="Search"
                clearButtonMode="always"
                style={AppStyle.StyleListProduct.searchBar}
                autoCapitalize="none"
                autoCorrect={false}
                value={userInput}
                onChangeText={(text) => {
                    setUserInput(text);
                    handleSearch(text);
                }} />

            <Dropdown
                style={AppStyle.StyleListProduct.dropdown}
                placeholderStyle={AppStyle.StyleListProduct.placeholderStyle}
                selectedTextStyle={AppStyle.StyleListProduct.selectedTextStyle}
                inputSearchStyle={AppStyle.StyleListProduct.inputSearchStyle}
                iconStyle={AppStyle.StyleListProduct.iconStyle}
                data={warehouses}
                maxHeight={300}
                labelField="warehouse"
                valueField="id"
                placeholder="Select item"
                searchPlaceholder="Search..."
                value={id}
                onChange={item => {
                    setId(item.id);
                    filterWarehouse(item.id);
                }}
            />

            <TouchableOpacity
                style={AppStyle.StyleProfile.btn_logout}
                onPress={
                    () => navigation.navigate('TotalProductScreen')
                }>
                <AntDesign name="back" size={20} color="#fff" />
                <Text style={{ color: '#fff' }}>Biểu Đồ</Text>
            </TouchableOpacity>

            <FlatList
                data={productList}
                renderItem={({ item, index }) =>
                    <View style={AppStyle.StyleListProduct.item}>
                        <Text style={AppStyle.StyleListProduct.nameProduct}>Tên sản phẩm: {item.nameProduct}</Text>
                        <View style={AppStyle.StyleListProduct.warehouse_count}>
                            <Text>{item.warehouse}</Text>
                        </View>
                        <Text>{item.count}</Text>
                    </View>
                }
                keyExtractor={item => item.id}
            />
        </SafeAreaView>
    )
}

export default ListProduct;