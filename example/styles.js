import {
    StyleSheet,
    Dimensions,
    Platform
} from 'react-native';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
    flex: {
        flex: 1
    },

    flexCenter: {
        justifyContent : 'center',
        alignItems     : 'center'
    },

    paddingStatusBar: {
        paddingTop: Platform.OS === 'android' ? 0 : 20
    },

    flexRow: {
        flexDirection: 'row'
    },

    card: {
        width: 300,
        height: 300,
        borderRadius: 15,
        backgroundColor: '#FA5F5C',
        position: 'relative'
    },

    button: {
        borderRadius: 1000,
        width: 50,
        height: 50,
        backgroundColor: 'white',
        marginHorizontal: 10,
        shadowColor: 'rgba(0,0,0,0.05)',
        shadowOffset: {
            width: 0,
            height: 2
        }
    },

    text: {
        backgroundColor: 'transparent',
        fontSize: 24
    },

    none: {
        color: 'red'
    },

    done: {
        color: '#64DA8B'
    },

    like: {
        color: '#007AFF'
    },

    reactImage: {
        width: 160,
        height: 160,
        position: 'absolute',
        zIndex: 100
    },

    buttonIcon: {
        width: 40,
        height: 40
    },
    title: {
        position: 'absolute',
        bottom: 20,
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 18,
        borderRadius: 30,
        backgroundColor: 'rgba(0, 0, 0, .4)'
    }
});
