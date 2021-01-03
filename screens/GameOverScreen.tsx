import React from 'react';
import { View, Text, StyleSheet, Button } from "react-native";

interface IGameOverScreen {
    numberOfRounds: number,
    userNumber: number | undefined,
    newGame: () => void
}

const GameOverScreen = (props: IGameOverScreen) => {
    return (
        <View style={styles.screen}>
            <Text>The Game is Over!</Text>
            <Text>Number of rounds: {props.numberOfRounds}</Text>
            <Text>Number was: {props.userNumber}</Text>
            <Button title="NEW GAME" onPress={props.newGame} />
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