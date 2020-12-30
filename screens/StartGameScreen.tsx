import React from 'react';
import {StyleSheet, View, Text, TextInput, Button} from 'react-native';
import Card from '../components/Card';

interface StartGameScreenProps {

}

const StartGameScreen = (props: StartGameScreenProps) => {
    return (
        <View style={styles.screen}>
            <Text style={styles.title} >Start a New Game!</Text>
            <Card style={styles.inputContainer}>
                <Text style={styles.title} >Select a Number</Text>
                <TextInput style={styles.textInput} />
                <View style={styles.buttonContainer}>
                    <Button
                        title="Reset"
                        onPress={() => {}}
                    />
                    <Button
                        title="Confirm"
                        onPress={() => {}}
                    />
                </View>
            </Card>
        </View>
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
        marginBottom: 20
    },
    inputContainer: {
        width: 300,
        minWidth: '80%',
        padding: 25,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%'
    }
});

export default StartGameScreen;