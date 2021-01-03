import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import Header from './components/Header';
import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen';

const fetchFonts = () => {
    return Font.loadAsync({
        'Lato-Regular': require('./assets/fonts/Lato-Regular.ttf'),
        'Lato-Bold': require('./assets/fonts/Lato-Bold.ttf')
    })
}

export default function App() {
    const [userNumber, setUserNumber] = useState();
    const [numberOfRounds, setNumberOfRounds] = useState(0);
    const [isNewGame, setIsNewGame] = useState(false);
    const [isDataLoaded, setIsDataLoaded] = useState(false);

    if (!isDataLoaded) {
        return (<AppLoading
            startAsync={fetchFonts}
            onFinish={() => setIsDataLoaded(true)}
            onError={() => console.log('error')}
        />);
    }

    const configureNewGameHandler = () => {
        setIsNewGame(true)
    }

    const startGameHandler = (selectedNumber: number | undefined) => {
        setUserNumber(selectedNumber);
        setNumberOfRounds(0);
        setIsNewGame(false);
    }

    const gameOverScreenHandler = (rounds: number) => {
        setNumberOfRounds(rounds);
    }

    let content = <StartGameScreen onStartGame={startGameHandler} />;

    if (userNumber && numberOfRounds <= 0) {
        content = <GameScreen
            userChoice={userNumber}
            onNumberRound={gameOverScreenHandler}
        />
    }

    if (numberOfRounds > 0) {
        content = <GameOverScreen
            numberOfRounds={numberOfRounds}
            userNumber={userNumber}
            newGame={configureNewGameHandler}
        />
    }

    if (isNewGame) {
        content = <StartGameScreen onStartGame={startGameHandler} />;
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
