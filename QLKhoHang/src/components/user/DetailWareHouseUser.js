import { useContext, useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { ScrollView, Text, Image, TouchableOpacity, View } from 'react-native';
import AppStyle from '../../theme';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import axios from "axios";
import { useRoute } from '@react-navigation/native';
import { AuthContext } from '../../context/AuthContext';
import { FlatList } from 'react-native-gesture-handler';

const DetailWarehouseScreen = ({ navigation }) => {
    const { userInfo, splashLoading,list } = useContext(AuthContext);
    const [warehouses, setWarehouse] = useState();
    //const [categories, setCategories] = useState([]);
    const route = useRoute();
    // const idWarehouse = route.params?.idWarehouse;
    console.log(list);
    console.log(userInfo.accessToken);

    useEffect(() => {
        axios
            .get(`https://warehouse-management-api.vercel.app/v1/warehouse/getAWarehouse`,
                {
                    headers:
                    {
                        Authorization: `Bearer ${userInfo.accessToken}`
                    },
                    params:
                    {
                        id: list
                    },
                })
                .then((res) => {
                    let warehouseUser = res.data.warehouse;
                    setWarehouse(warehouseUser);
                    console.log(res.data.warehouse);
                  })
                  .catch((e) => {
                    console.log(`get warehouseUser error ${e.res}`);
                  });
            // .then(res) => {
            //     //console.log(res.list);
            //     let warehouse = res.data.warehouse;
            //     setWarehouse(warehouse)
            //     console.log(res.data.warehouse);
            // })
            // .catch(e => {
            //     console.log(`Get warehouse error ${e}`);
            // });
    }, []);

    // useEffect(() => {
    //     axios
    //         .get(`https://warehouse-management-api.vercel.app/v1/warehouse/category/list`,
    //             {
    //                 headers:
    //                 {
    //                     Authorization: `Bearer ${userInfo.accessToken}`
    //                 },
    //             })
    //         .then((res) => {
    //             let categorie = res.data.categories;
    //             setCategories(categorie);
    //         })
    //         .catch((e) => {
    //             console.log(`get categories error ${e.res}`);
    //         });
    // }, []);

    // const categorie = [];
    // for (let i = 0; i < categories.length; i++) {
    //     {
    //         categories[i]._id.includes(warehouses.category) &&
    //             categorie.push(
    //                 <Text key={i}>
    //                     {categories[i].name}
    //                 </Text>
    //             )
    //     }
    // }



    return (
        <View>
            <ScrollView style={{ marginTop: 50 }}>
                {warehouses && (
                    <>
                        <Text style={{ flex: 1, fontSize:  15 ,alignItems: "center", justifyContent: "center" }}>
                            Chi tiết của kho {warehouses.wareHouseName}</Text>
                        <View style={AppStyle.StyleProfile.items}>
                            <FontAwesome5 name="warehouse" size={20} color="black" />
                            <Text> {warehouses.wareHouseName}</Text>
                        </View>
                        <View style={AppStyle.StyleProfile.items}>
                            <Entypo name="address" size={20} color="black" />
                            <Text>{warehouses.address}</Text>
                        </View>
                        <View style={AppStyle.StyleProfile.items}>
                            <MaterialIcons name="category" size={20} color="black" />
                            <Text>{warehouses.category.name}</Text>
                        </View>
                        <View style={AppStyle.StyleProfile.items}>
                            <FontAwesome name="money" size={20} color="black" />
                            <Text> {warehouses.monney}</Text>
                        </View>
                        <View style={AppStyle.StyleProfile.items}>
                            <Entypo name="owner" size={20} color="black" />
                            <Text> {warehouses.owner.username}</Text>
                            {/* <Text>{userInfo.others.username}</Text> */}
                        </View>
                    </>
                )}
                <TouchableOpacity
                    style={AppStyle.StyleProfile.btn_logout}
                    onPress={
                        () => navigation.navigate('HomeNavigationUser')
                    }>
                    <Text style={{ color: '#fff' }}>QUAY LẠI</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
}

export default DetailWarehouseScreen;