import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '../constans/Colors';

interface INumberContainerProps {
    children: any
}

const NumberContainer = (props: INumberContainerProps) => {
    return (
        <View style={styles.container}>
            <Text style={styles.textNumber}>
                {props.children}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        borderWidth: 2,
        borderRadius: 7,
        borderColor: Colors.secondary,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15,
        width: '50%'
    },
    textNumber: {
        color: Colors.secondary,
        fontSize: 22,
    }
})

export default NumberContainer;