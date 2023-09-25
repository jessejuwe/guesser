import React, { useState } from 'react';
import { Text, TextInput } from 'react-native';
import { KeyboardAvoidingView, ScrollView, View } from 'react-native';
import { Alert, AlertButton } from 'react-native';
import { StyleSheet, useWindowDimensions } from 'react-native';

import Card from '../components/UI/Card';
import PrimaryButton from '../components/UI/PrimaryButton';
import Title from '../components/UI/Title';
import Colors from '../constants/colors';

type Props = { onTrack: (value: number) => void };

const StartGameScreen: React.FC<Props> = ({ onTrack }) => {
  const [input, setInput] = useState<string>('');

  const { height } = useWindowDimensions();

  const inputChangeHandler = (value: string) => setInput(value);

  const resetHandler = () => setInput('');

  const confirmHandler = () => {
    const value = parseInt(input);

    if (isNaN(value) || value <= 0 || value > 99) {
      const title = 'Validation failed';
      const message = 'Enter a valid number and try again';

      // prettier-ignore
      const okay = { text: 'Okay', style: "destructive", onPress: resetHandler };

      Alert.alert(title, message, [okay] as AlertButton[]);
      return;
    }

    onTrack(value); // update tracked number in App.tsx
  };

  const marginTop = height < 450 ? 50 : 100;

  return (
    <ScrollView style={styles.screen}>
      <KeyboardAvoidingView style={styles.screen} behavior="position">
        <View style={[styles.rootContainer, { marginTop }]}>
          <Title>Guess My Number</Title>
          <Card>
            <Text style={styles.text}>Enter any number between 0 & 100</Text>
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="number-pad"
              maxLength={2}
              onChangeText={inputChangeHandler}
              style={styles.textInput}
              value={input}
            />
            <View style={styles.buttonGroup}>
              <View style={styles.button}>
                <PrimaryButton onPress={resetHandler}>Reset</PrimaryButton>
              </View>
              <View style={styles.button}>
                <PrimaryButton onPress={confirmHandler}>Confirm</PrimaryButton>
              </View>
            </View>
          </Card>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default StartGameScreen;

const styles = StyleSheet.create({
  screen: { flex: 1 },
  rootContainer: { flex: 1, alignItems: 'center' },
  text: { color: 'white', fontFamily: 'OpenSans_400Regular', fontSize: 16 },
  textInput: {
    borderBottomColor: Colors.accent500,
    borderBottomWidth: StyleSheet.hairlineWidth,
    color: Colors.accent500,
    fontFamily: 'OpenSans_400Regular',
    fontSize: 32,
    height: 50,
    marginVertical: 8,
    textAlign: 'center',
    width: 60,
  },
  buttonGroup: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'space-between',
  },
  button: { flex: 1 },
});
