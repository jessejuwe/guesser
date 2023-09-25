import React from 'react';
import { Image, Text, View } from 'react-native';
import { Dimensions, StyleSheet, useWindowDimensions } from 'react-native';
import PrimaryButton from '../components/UI/PrimaryButton';

import Title from '../components/UI/Title';
import Colors from '../constants/colors';

type Props = { onReset: () => void; rounds: number; userNumber: number };

const GameOverScreen: React.FC<Props> = ({ onReset, rounds, userNumber }) => {
  const { width, height } = useWindowDimensions();

  let content = (
    <>
      <Title>GAME OVER</Title>

      <View style={styles.imageCircle}>
        <Image
          style={styles.image}
          source={require('../assets/images/success.png')}
        />
      </View>
      <Text style={styles.summary}>
        Your phone needed <Text style={styles.highlight}>{rounds}</Text> rounds
        to guess the number <Text style={styles.highlight}>{userNumber}</Text>
      </Text>
      <PrimaryButton onPress={onReset}>New Game</PrimaryButton>
    </>
  );

  if (width > 500) {
    content = (
      <View style={styles.screenWide}>
        <View style={styles.viewWide}>
          <Title>GAME OVER</Title>
          <Text style={styles.summary}>
            Your phone needed <Text style={styles.highlight}>{rounds}</Text>{' '}
            rounds to guess the number{' '}
            <Text style={styles.highlight}>{userNumber}</Text>
          </Text>
          <PrimaryButton onPress={onReset}>New Game</PrimaryButton>
        </View>
        <View style={styles.viewWide}>
          <View style={styles.imageCircle}>
            <Image
              style={styles.image}
              source={require('../assets/images/success.png')}
            />
          </View>
        </View>
      </View>
    );
  }

  return <View style={styles.screen}>{content}</View>;
};

export default GameOverScreen;

const deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageCircle: {
    borderRadius: deviceWidth < 380 ? 100 : 150,
    borderWidth: 3,
    borderColor: Colors.primary800,
    height: deviceWidth < 380 ? 200 : 300,
    margin: deviceWidth < 380 ? 18 : 36,
    overflow: 'hidden',
    width: deviceWidth < 380 ? 200 : 300,
  },
  image: { width: '100%', height: '100%' },
  summary: {
    color: 'white',
    fontFamily: 'OpenSans_400Regular',
    fontSize: 24,
    textAlign: 'center',
    marginVertical: 24,
  },
  highlight: {
    color: Colors.accent500,
    fontFamily: 'OpenSans_400Regular',
    fontWeight: 'bold',
  },
  screenWide: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row-reverse',
    justifyContent: 'center',
  },
  viewWide: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});
