import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, Button, TouchableWithoutFeedback, Keyboard, Alert, ScrollView, Dimensions} from 'react-native';
import Card from '../components/Card';
import Input from '../components/Input';
import NumberContainer from '../components/NumberContainer';
import MainButton from '../components/MainButton';
import Colors from '../constans/Colors';
import DefaultStyles from '../constans/DefaultStyles';

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
    const [ currentDeviceHeight, setCurrentDeviceHeight ] = useState(Dimensions.get('window').height);
    const [ currentDeviceWidth, setCurrentDeviceHWidth ] = useState(Dimensions.get('window').width);

    useEffect(() => {
        const updateLayout = () => {
            setCurrentDeviceHeight(Dimensions.get('window').height);
            setCurrentDeviceHWidth(Dimensions.get('window').width);
        }

        Dimensions.addEventListener('change', updateLayout)

        return () => {
            Dimensions.removeEventListener('change', updateLayout)
        }
    })

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
            <Card style={{...styles.startGame, marginTop: currentDeviceHeight < 500 ? 30 : 70}}>
                <View style={styles.startGameContainer}>
                    <Text
                        style={{...styles.textStartGame, ...DefaultStyles.bodyText}}
                    >Selected number is:</Text>
                    <NumberContainer>{selectedNumber}</NumberContainer>
                    <MainButton
                        onPress={() => props.onStartGame(selectedNumber)}
                    >Start Game</MainButton>
                </View>
            </Card>
        );
    }

    return (
        <TouchableWithoutFeedback
            onPress={() => Keyboard.dismiss()}
            style={{flex: 1}}
        >
            <ScrollView>
                <View style={styles.screen}>
                    <Text style={{...styles.title, ...DefaultStyles.title}} >Start a New Game!</Text>
                    <Card style={styles.inputContainer}>
                        <Text style={{...styles.title, ...DefaultStyles.bodyText}}>Select a Number</Text>
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
                        <View style={{...styles.buttonContainer, justifyContent: currentDeviceWidth < 500 ? 'space-between' : 'space-around'}}>
                            <MainButton
                                onPress={resetInputHandler}
                                style={{...styles.button, width: currentDeviceWidth < 400 ? 100 : 140}}
                            >
                                Reset
                            </MainButton>
                            <MainButton
                                onPress={confirmInputHandler}
                                style={{width: currentDeviceWidth < 500 ? 100 : 150}}
                            >
                                Confirm
                            </MainButton>
                        </View>
                    </Card>
                    {confirmedOutput}
                </View>
            </ScrollView>
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
        marginBottom: 30
    },
    textInput: {
        marginBottom: 20,
        width: 50
    },
    inputContainer: {
        width: '80%',
        maxWidth: '95%',
        minWidth: 300,
        padding: 25,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '90%'
    },
    button: {
       // width: 100,
       //  width: Dimensions.get('window').width / 4,
        backgroundColor: Colors.secondary
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