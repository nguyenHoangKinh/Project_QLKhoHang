import { StyleSheet, Dimensions } from "react-native";
const deviceHeight = Dimensions.get('window').height
const StyleListBlogOwner = StyleSheet.create({
    container: {
        width: "100%",
        alignSelf: "center",
        shadowOpacity: 0.5,
        shadowColor: "#000",
        shadowOffset: {
            height: 5,
            width: 5,
        },
        backgroundColor: "#fff",
        marginTop: 10,
    },
    image: {
        height: 200,
        width: "100%",
    },
    title: {
        fontSize: 30,
        fontWeight: "bold",
        marginTop: 10,
    },
    money: {
        fontSize: 20,
        fontWeight: "bold",
        marginTop: 10,
    },
    description: {
        fontSize: 16,
        fontWeight: "400",
        marginTop: 10,
    },
    data: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10,
    },
    heading: {},
    author: {
        fontWeight: "bold",
        fontSize: 15,
    },
    date: {
        fontWeight: "bold",
        color: "#e63946",
        fontSize: 15,
    },
    source: {
        color: "#e63946",
        fontWeight: "bold",
        fontSize: 18,
    },
    avatar: {
        width: 60,
        height: 60,
    },
    modal: {
        backgroundColor: "#fff",
        width: '100%',
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        paddingHorizontal: 10,
        maxHeight: deviceHeight * 0.5
    },
    title_modal: {
        color: '#182e44',
        fontSize: 20,
        fontWeight: '500',
        margin: 15,
    },
});
export default StyleListBlogOwner;
