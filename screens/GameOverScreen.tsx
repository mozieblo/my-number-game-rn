import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import DefaultStyles from '../constans/DefaultStyles';

interface IGameOverScreen {
    numberOfRounds: number,
    userNumber: number | undefined,
    newGame: () => void
}

const GameOverScreen = (props: IGameOverScreen) => {
    return (
        <View style={styles.screen}>
            <Text style={DefaultStyles.bodyText}>The Game is Over!</Text>
            <Text style={DefaultStyles.bodyText}>Number of rounds: {props.numberOfRounds}</Text>
            <Text style={DefaultStyles.bodyText}>Number was: {props.userNumber}</Text>
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