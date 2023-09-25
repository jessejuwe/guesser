import Ionicons from '@expo/vector-icons/Ionicons';
import { useEffect, useState } from 'react';
import { FlatList, Text } from 'react-native';
import { View } from 'react-native';
import { Alert, AlertButton } from 'react-native';
import { StyleSheet, useWindowDimensions } from 'react-native';

import Card from '../components/UI/Card';
import LogItem from '../components/Game/LogItem';
import NumberContainer from '../components/Game/NumberContainer';
import PrimaryButton from '../components/UI/PrimaryButton';
import Title from '../components/UI/Title';
import generateRandomBetween from '../utils/generateRandomNumber';

type Props = {
  onGameOver: () => void;
  userNumber: number;
  onUpdateRounds: () => void;
};

// prettier-ignore
let min = 1, max = 100;

const GameScreen: React.FC<Props> = props => {
  const { onGameOver, onUpdateRounds, userNumber } = props;
  const initialGuess = generateRandomBetween(1, 100, userNumber);

  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [guessRound, setGuessRound] = useState<number[]>([initialGuess]);

  const { width, height } = useWindowDimensions();

  useEffect(() => {
    if (currentGuess === userNumber) onGameOver();
  }, [currentGuess, userNumber, onGameOver]);

  useEffect(() => {
    min = 1;
    max = 100;
  }, []);

  const nextGuessHandler = (direction: string) => {
    if (
      (direction === 'lower' && currentGuess < userNumber) ||
      (direction === 'higher' && currentGuess > userNumber)
    ) {
      const title = 'Lie detected!';
      const message = 'Be truthful to the game';

      // prettier-ignore
      const okay = { text: 'You got this!', style: "cancel" };

      Alert.alert(title, message, [okay] as AlertButton[]);
      return;
    }

    switch (direction) {
      case 'lower':
        max = currentGuess;
        break;

      case 'higher':
        min = currentGuess + 1;
        break;

      default:
        break;
    }

    const newValue = generateRandomBetween(min, max, currentGuess);
    setCurrentGuess(newValue);

    // TODO: update rounds
    setGuessRound(prevState => [newValue, ...prevState]);
    onUpdateRounds();
  };

  const guessRoundLength = guessRound.length;

  let content = (
    <>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card>
        <Text style={styles.text}>Lower or Higher?</Text>
        <View style={styles.buttonGroup}>
          <View style={styles.button}>
            <PrimaryButton onPress={nextGuessHandler.bind(this, 'lower')}>
              <Ionicons name="md-remove" size={24} color="white" />
            </PrimaryButton>
          </View>
          <View style={styles.button}>
            <PrimaryButton onPress={nextGuessHandler.bind(this, 'higher')}>
              <Ionicons name="md-add" size={24} color="white" />
            </PrimaryButton>
          </View>
        </View>
      </Card>
    </>
  );

  if (width > 500) {
    content = (
      <>
        <View style={styles.buttonGroupWide}>
          <View style={styles.button}>
            <PrimaryButton onPress={nextGuessHandler.bind(this, 'lower')}>
              <Ionicons name="md-remove" size={24} color="white" />
            </PrimaryButton>
          </View>
          <NumberContainer>{currentGuess}</NumberContainer>
          <View style={styles.button}>
            <PrimaryButton onPress={nextGuessHandler.bind(this, 'higher')}>
              <Ionicons name="md-add" size={24} color="white" />
            </PrimaryButton>
          </View>
        </View>
      </>
    );
  }

  return (
    <View style={styles.container}>
      <Title>Opponent's Guess</Title>
      {content}
      <View style={styles.listContainer}>
        <FlatList
          data={guessRound}
          renderItem={listData => (
            <LogItem
              guess={listData.item}
              roundNumber={guessRoundLength - listData.index}
            />
          )}
          keyExtractor={item => item.toString()}
        />
      </View>
    </View>
  );
};

export default GameScreen;

const styles = StyleSheet.create({
  screen: { flex: 1 },
  container: { flex: 1, padding: 24, alignItems: 'center' },
  buttonGroup: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'space-between',
  },
  button: { flex: 1 },
  text: {
    color: 'white',
    fontFamily: 'OpenSans_400Regular',
    fontSize: 16,
    marginBottom: 12,
  },
  listContainer: { flex: 1, padding: 24 },
  buttonGroupWide: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 4,
    justifyContent: 'center',
  },
});
