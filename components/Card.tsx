import React from 'react';
import { StyleSheet, View } from 'react-native';

interface CardProps {
    children: any,
    style: object
}

const Card = (props: CardProps) => {
    return (
        <View style={{...styles.card, ...props.style}}>
            {props.children}
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: 'white',
        borderRadius: 10,
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.26,
        shadowRadius: 10,
        elevation: 8
    },
});

export default Card;