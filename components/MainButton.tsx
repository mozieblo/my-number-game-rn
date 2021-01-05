import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '../constans/Colors';

interface IMainButtonProps {
    onPress: () => void,
    children: any,
    style?: any
}

const MainButton = (props: IMainButtonProps) => {
    return (
        <TouchableOpacity
            activeOpacity={0.6}
            onPress={props.onPress}
        >
            <View style={{...styles.button, ...props.style}}>
                <Text style={styles.buttonText}>
                    {props.children}
                </Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: Colors.primary,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 25
    },
    buttonText: {
        color: '#fff',
        fontFamily: 'Lato-Bold'
    }
})

export default MainButton;