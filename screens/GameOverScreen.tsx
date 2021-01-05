import React from 'react';
import { View, Text, StyleSheet, Button, Image } from 'react-native';
import DefaultStyles from '../constans/DefaultStyles';
import Colors from '../constans/Colors';

interface IGameOverScreen {
    numberOfRounds: number,
    userNumber: number | undefined,
    newGame: () => void
}

const GameOverScreen = (props: IGameOverScreen) => {
    return (
        <View style={styles.screen}>
            <Text style={DefaultStyles.title}>The Game is Over!</Text>
            <View style={styles.imageContainer}>
                <Image
                    // locale
                    // source={require('../assets/tower.jpg')}
                    // online
                    source={{uri: 'https://cdn.pixabay.com/photo/2014/04/03/10/22/mountain-310231_1280.png'}}
                    style={styles.image}
                    resizeMode="cover"
                    fadeDuration={1000}
                />
            </View>
            <Text style={DefaultStyles.bodyText}>Your phone needed <Text style={styles.highlight}>{props.numberOfRounds}</Text> rounds</Text>
            <Text style={DefaultStyles.bodyText}>to guess the number <Text style={styles.highlight}>{props.userNumber}</Text>.</Text>
            <Button title="NEW GAME" onPress={props.newGame} />
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageContainer: {
        width: 300,
        height: 300,
        borderRadius: 150,
        borderWidth: 3,
        marginVertical: 20,
        borderColor: 'black',
        overflow: 'hidden'
    },
    image: {
        width: '100%',
        height: '100%'
    },
    highlight: {
        color: Colors.primary,
        fontFamily: 'Lato-Bold',
        fontSize: 20
    }
})

export default GameOverScreen;