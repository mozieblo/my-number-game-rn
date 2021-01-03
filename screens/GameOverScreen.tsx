import React from 'react';
import { View, Text, StyleSheet } from "react-native";

interface IGameOverScreen {

}

const GameOverScreen = (props: IGameOverScreen) => {
    return (
        <View style={styles.screen}>
            <Text>The Game is Over!</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default GameOverScreen;