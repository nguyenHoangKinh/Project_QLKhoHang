import {
    StyleSheet,
    StatusBar
} from 'react-native';
const StyleListProduct = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 20,
        marginTop: StatusBar.currentHeight || 0,
    },

    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },

    warehouse_count: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    count: {
        width: 100,
        height: 100,
        alignItems: 'flex-end',
    },

    nameProduct: {
        fontSize: 20,
    },

    searchBar: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
    },

    dropdown: {
        margin: 16,
        height: 50,
        borderBottomColor: 'gray',
        borderBottomWidth: 0.5,
    },

    icon: {
        marginRight: 5,
    },

    placeholderStyle: {
        fontSize: 16,
    },

    selectedTextStyle: {
        fontSize: 16,
    },

    iconStyle: {
        width: 20,
        height: 20,
    },

    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
});
export default StyleListProduct;
