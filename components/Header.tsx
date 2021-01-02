import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Colors from '../constans/Colors';

interface HeaderProps {
    title: string
}

const Header = (props: HeaderProps) => {
    return (
        <View style={styles.header}>
            <Text style={styles.headerTitle}>
                {props.title}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: 90,
        paddingTop: 36,
        backgroundColor: Colors.primary,
        alignItems: 'center',
        justifyContent: 'center'
    },
    headerTitle: {
        fontSize: 18,
        color: 'black'
    }
});

export default Header;