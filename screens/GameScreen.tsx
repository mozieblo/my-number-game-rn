import React, { useState, useRef, useEffect } from 'react';
import {View, Text, StyleSheet, Button, Alert} from 'react-native';
import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';
import Colors from '../constans/Colors';

interface IGameScreenProps {
    userChoice: number | undefined,
    onNumberRound: (number: number) => void;
}

const generateRandomBetween = (min: number, max: number, exclude: number | undefined) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    const rndNum = Math.floor(Math.random() * ( max-min )) + min;
    if (rndNum === exclude) {
        return generateRandomBetween(min, max, exclude);
    } else {
        return rndNum;
    }
};

// let currentLow = 1;
// let currentHigh = 100;

const GameScreen = (props: IGameScreenProps) => {
    const [currentGuess, setCurrentGuess] = useState(generateRandomBetween(1,100, props.userChoice));
    const [rounds, setRounds] = useState(0);
    const currentLow = useRef(1);
    const currentHigh = useRef(100);

    const { userChoice, onNumberRound } = props;

    useEffect(() => {
        if (currentGuess === props.userChoice) {
            props.onNumberRound(rounds);
            console.log('onNumber: ', onNumberRound)
        }
    }, [currentGuess, userChoice, onNumberRound])

    const nextGuessHandler = (direction: string) => {
        if ((direction === 'lower' && currentGuess < props.userChoice) || (direction === 'greater' && currentGuess > props.userChoice)) {
            Alert.alert('Don\'t lie!', 'You know that this is wrong...', [{
                text: 'Sorry',
                style: 'cancel'
            }])
            return;
        }

        if (direction === 'lower' && currentGuess > props.userChoice) {
            currentHigh.current = currentGuess;
            // currentHigh = currentGuess;
        }

        if (direction === 'greater' && currentGuess < props.userChoice) {
            currentLow.current = currentGuess;
            // currentLow = currentGuess;
        }

        setCurrentGuess(generateRandomBetween(currentLow.current, currentHigh.current, currentGuess));
        // setCurrentGuess(generateRandomBetween(currentLow, currentHigh, currentGuess));
        setRounds(currentRound => currentRound + 1);
    };

    return (
        <View style={styles.screen}>
            <Card style={styles.container}>
                <Text style={styles.text}>Opponent's Guess</Text>
                <NumberContainer>{currentGuess}</NumberContainer>
                <View style={styles.gameScreenCard}>
                    <Button
                        title="LOWER"
                        color={Colors.secondary}
                        onPress={nextGuessHandler.bind(this, 'lower')}
                    />
                    <Button
                        title="GREATER"
                        color={Colors.primary}
                        onPress={nextGuessHandler.bind(this, 'greater')}
                    />
                </View>
            </Card>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        padding: 20,
        alignItems: 'center',
    },
    text: {
        marginBottom: 20
    },
    gameScreenCard: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10,
        width: 300,
        maxWidth: '80%'
    },
    container: {
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default GameScreen;