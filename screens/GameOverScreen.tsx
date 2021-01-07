import React, {useEffect, useState} from 'react';
import { View, Text, StyleSheet, Button, Image, ScrollView, Dimensions } from 'react-native';
import MainButton from '../components/MainButton';
import DefaultStyles from '../constans/DefaultStyles';
import Colors from '../constans/Colors';

interface IGameOverScreen {
    numberOfRounds: number,
    userNumber: number | undefined,
    newGame: () => void
}

const GameOverScreen = (props: IGameOverScreen) => {
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

    return (
        <ScrollView>
            <View style={styles.screen}>
                <Text style={{...styles.title, ...DefaultStyles.title}}>The Game is Over!</Text>
                <View style={{
                    ...styles.imageContainer,
                    width: currentDeviceHeight > 600 ? 300 : 150,
                    height: currentDeviceHeight > 600 ? 300 : 150,
                    borderRadius: currentDeviceWidth / 2,
                }}>
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
                <MainButton
                    onPress={props.newGame}
                    style={styles.button}
                >
                    New Game
                </MainButton>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        marginTop: 30
    },
    imageContainer: {
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
    },
    button: {
        marginTop: 20
    }
})

export default GameOverScreen;