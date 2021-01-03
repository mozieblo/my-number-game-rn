import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Header from './components/Header';
import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen';

export default function App() {
    const [userNumber, setUserNumber] = useState();
    const [numberOfRounds, setNumberOfRounds] = useState(0);

    const startGameHandler = (selectedNumber: number | undefined) => {
        setUserNumber(selectedNumber);
        setNumberOfRounds(0);
    }

    const gameOverScreenHandler = (rounds: number) => {
        setNumberOfRounds(rounds)
    }

    let content = <StartGameScreen onStartGame={startGameHandler} />;

    if (userNumber && numberOfRounds <= 0) {
        content = <GameScreen
            userChoice={userNumber}
            onNumberRound={gameOverScreenHandler}
        />
    }

    if (numberOfRounds > 0) {
        content = <GameOverScreen />
    }

    return (
        <View style={styles.screen}>
          <Header title="Guess a Number" />
            {content}
        </View>
    );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
