import { StyleSheet } from 'react-native';
const StyleProfile = StyleSheet.create({
    avatar: {
        width: 140, 
        height: 140, 
        borderRadius: 100, 
        marginTop: -70,
    },
    name: {
        fontSize: 25, 
        fontWeight: 'bold', 
        padding: 10, 
    },
    email: {
        fontSize: 15, 
        fontWeight: 'bold', 
        color: 'gray', 
    },
    icon_items: {
        width: 20, 
        height: 20,
    },
    items: {
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: '#fff',
        width: '90%',
        padding: 20,
        paddingBottom: 22,
        borderRadius: 10,
        shadowOpacity: 80,
        elevation: 15,
        marginTop: 20,
    },
    btn_logout: {
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: '#fff',
        width: '90%',
        padding: 20,
        paddingBottom: 22,
        borderRadius: 10,
        shadowOpacity: 80,
        elevation: 15,
        marginTop: 20,
        backgroundColor: '#000'
    }
});
export default StyleProfile;