import React, { useState, useRef, useEffect, Fragment } from 'react';
import {View, Text, StyleSheet, Button, Alert, ScrollView, Dimensions} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';
import MainButton from '../components/MainButton';
import Colors from '../constans/Colors';
import DefaultStyles from '../constans/DefaultStyles';

interface IGameScreenProps {
    userChoice: number | undefined,
    onNumberRound: (number: number) => void;
}

const generateRandomBetween = (min: number, max: number, exclude?: number): number => {
    min = Math.ceil(min);
    max = Math.floor(max);
    const rndNum = Math.floor(Math.random() * ( max-min )) + min;
    return rndNum === exclude ? generateRandomBetween(min, max, exclude) : rndNum;
};

// let currentLow = 1;
// let currentHigh = 100;

const renderListOfGuess = (numberOfRounds: number, numberGuess: number) => {
    return (
        <View
            key={Math.random()}
            style={styles.guessContainer}
        >
            <Text style={DefaultStyles.bodyText}>
                #{numberGuess}
            </Text>
            <Text style={DefaultStyles.bodyText}>
                {numberOfRounds}
            </Text>
        </View>
    );
}

const GameScreen = (props: IGameScreenProps) => {
    const initialGuess = generateRandomBetween(1,100, props.userChoice);
    const [currentGuess, setCurrentGuess] = useState(initialGuess);
    const [rounds, setRounds] = useState(0);
    const [listOfNumberGuess, setListOfNumberGuess] = useState([initialGuess]);
    const [ currentDeviceHeight, setCurrentDeviceHeight ] = useState(Dimensions.get('window').height);
    const currentLow = useRef(1);
    const currentHigh = useRef(100);

    const { userChoice, onNumberRound } = props;

    useEffect(() => {
        const updateLayout = () => {
            setCurrentDeviceHeight(Dimensions.get('window').height);
        }

        Dimensions.addEventListener('change', updateLayout)

        return () => {
            Dimensions.removeEventListener('change', updateLayout)
        }
    })

    useEffect(() => {
        if (currentGuess === props.userChoice) {
            props.onNumberRound(rounds);
            console.log('onNumber: ', onNumberRound)
        }
    }, [currentGuess, userChoice, onNumberRound])

    const horizontalDevice = () => {
        return (
            <Card style={styles.container}>
                <Text style={{...styles.text, ...DefaultStyles.bodyText}}>Opponent's Guess</Text>
                <View style={styles.gameScreenCard}>
                    <MainButton
                        style={styles.secondary}
                        onPress={nextGuessHandler.bind(this, 'lower')}
                    >
                        <Ionicons name="remove" size={24} color="white" />
                    </MainButton>
                    <NumberContainer>{currentGuess}</NumberContainer>
                    <MainButton
                        onPress={nextGuessHandler.bind(this, 'greater')}
                    >
                        <Ionicons name="add" size={24} color="white" />
                    </MainButton>
                </View>
            </Card>
        );
    }

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

        const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess)
        setCurrentGuess(nextNumber);
        setRounds(currentRound => currentRound + 1);
        setListOfNumberGuess((prevState) => [nextNumber, ...prevState])
    };

    return (
        <View style={styles.screen}>
            {currentDeviceHeight < 500 ? (
                horizontalDevice()
            ) : (
                <Card style={styles.container}>
                    <Text style={{...styles.text, ...DefaultStyles.bodyText}}>Opponent's Guess</Text>
                    <NumberContainer>{currentGuess}</NumberContainer>
                    <View style={styles.gameScreenCard}>
                        <MainButton
                            style={styles.secondary}
                            onPress={nextGuessHandler.bind(this, 'lower')}
                        >
                            <Ionicons name="remove" size={24} color="white" />
                        </MainButton>
                        <MainButton
                            onPress={nextGuessHandler.bind(this, 'greater')}
                        >
                            <Ionicons name="add" size={24} color="white" />
                        </MainButton>
                    </View>
                </Card>
            )}
            <View style={styles.listContainer}>
                <ScrollView contentContainerStyle={styles.list}>
                    {listOfNumberGuess.map((guess: number, index: number) => renderListOfGuess(guess, listOfNumberGuess.length - index))}
                </ScrollView>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        padding: 20,
        alignItems: 'center',
        flex: 1
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
    },
    secondary: {
        backgroundColor: Colors.secondary
    },
    listContainer: {
        width: '50%',
        flex: 1
    },
    list: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    guessContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderWidth: 2,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginTop: 20,
        width: '60%'
    }
})

export default GameScreen;