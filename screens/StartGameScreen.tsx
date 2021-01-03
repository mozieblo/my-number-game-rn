import React, {useState} from 'react';
import {StyleSheet, View, Text, Button, TouchableWithoutFeedback, Keyboard, Alert} from 'react-native';
import Card from '../components/Card';
import Input from '../components/Input';
import NumberContainer from '../components/NumberContainer';
import Colors from '../constans/Colors';

interface StartGameScreenProps {
    onStartGame: (number: number | undefined) => void;
}

interface IColors {
    primary: string,
    secondary: string
}

const StartGameScreen = (props: StartGameScreenProps) => {
    const [ enteredValue, setEnteredValue ] = useState('');
    const [ confirmed, setConfirmed ] = useState(false);
    const [ selectedNumber, setSelectedNumber] = useState();

    const numberInputHandler = (inputText: string) => {
        setEnteredValue(inputText.replace(/[^0-9]/g, ''));
    }

    const resetInputHandler = () => {
        setEnteredValue('');
        setConfirmed(false);
    }

    const confirmInputHandler = () => {
        const chosenNumber = parseInt(enteredValue);

        if(isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
            Alert.alert('Invalid number!', 'You have to choose a number between 1-99', [{
                text: 'Okay',
                style: 'destructive',
                onPress: resetInputHandler
            }])
            return;
        }

        setConfirmed(true);
        setSelectedNumber(chosenNumber);
        setEnteredValue('');
        Keyboard.dismiss();
    }

    let confirmedOutput;

    if(confirmed) {
        confirmedOutput = (
            <Card style={styles.startGame}>
                <View style={styles.startGameContainer}>
                    <Text
                        style={styles.textStartGame}
                    >Selected number is:</Text>
                    <NumberContainer>{selectedNumber}</NumberContainer>
                    <Button
                        title={'Start Game'}
                        color={Colors.primary}
                        onPress={() => props.onStartGame(selectedNumber)}
                    />
                </View>
            </Card>
        );
    }

    return (
        <TouchableWithoutFeedback
            onPress={() => Keyboard.dismiss()}
        >
            <View style={styles.screen}>
                <Text style={styles.title} >Start a New Game!</Text>
                <Card style={styles.inputContainer}>
                    <Text style={styles.title}>Select a Number</Text>
                    <Input
                        style={styles.textInput}
                        blurOnSubmit
                        autoCapitalize="none"
                        autoCorrect={false}
                        keyboardType="number-pad"
                        maxLength={2}
                        value={enteredValue}
                        onChangeText={(value: string) => numberInputHandler(value)}
                    />
                    <View style={styles.buttonContainer}>
                        <View style={styles.button}>
                            <Button
                                title="Reset"
                                onPress={resetInputHandler}
                                color={Colors.secondary}
                            />
                        </View>
                        <View style={styles.button}>
                            <Button
                                title="Confirm"
                                onPress={confirmInputHandler}
                                color={Colors.primary}
                            />
                        </View>
                    </View>
                </Card>
                {confirmedOutput}
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
   screen: {
        flex: 1,
        padding: 30,
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        marginVertical: 5,
        textAlign: 'center',
        marginBottom: 30,
        fontFamily: 'Lato-Bold'
    },
    textInput: {
        marginBottom: 20,
        width: 50
    },
    inputContainer: {
        width: 300,
        minWidth: '80%',
        padding: 25,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%'
    },
    button: {
       width: 100
    },
    startGame: {
       padding: 30,
       marginTop: 50
    },
    textStartGame: {
       marginBottom: 20,
       textAlign: 'center'
    },
    startGameContainer: {
       justifyContent: 'center',
        alignItems: 'center'
    }
});

export default StartGameScreen;