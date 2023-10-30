import {
    StyleSheet,
    StatusBar
} from 'react-native';
const StyleHome = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 10,
        marginTop: StatusBar.currentHeight || 0,
    },
    topHome: {
        backgroundColor: '#2a53c5',
        paddingHorizontal: 50,
        paddingVertical: 12,
        color: 'white',
        fontWeight: 'bold',
        fontSize: 30,
    },
    image_name: {
        paddingTop: 10,
        flex: 1,
        flexDirection: 'row',
    },
    name_email: {
        paddingTop: 30,
        marginLeft: 10,
    },
    image: {
        width: 150,
        height: 150,
    },
    name: {
        fontSize: 25,
    },
    email: {
        fontSize: 25,
        paddingTop: 20,
    }
});
export default StyleHome;
