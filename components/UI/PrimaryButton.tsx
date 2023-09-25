import React from 'react';
import { Text, View } from 'react-native';
import { Pressable, StyleSheet } from 'react-native';

import Colors from '../../constants/colors';

type Props = { children: React.ReactNode; onPress: () => void };

const PrimaryButton: React.FC<Props> = ({ children, onPress }) => {
  const pressHandler = () => onPress();

  return (
    <View style={styles.outerContainer}>
      <Pressable
        style={({ pressed }) =>
          pressed
            ? [styles.pressed, styles.innerContainer]
            : styles.innerContainer
        }
        onPress={pressHandler}
        android_ripple={{ color: Colors.primary600 }}
      >
        <Text style={styles.text}>{children}</Text>
      </Pressable>
    </View>
  );
};

export default PrimaryButton;

const styles = StyleSheet.create({
  outerContainer: {
    borderCurve: 'circular',
    borderRadius: 28,
    marginVertical: 4,
    overflow: 'hidden',
  },
  innerContainer: {
    backgroundColor: Colors.primary500,
    elevation: 2,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  text: {
    color: 'white',
    fontFamily: 'OpenSans_400Regular',
    textAlign: 'center',
  },
  pressed: {
    borderCurve: 'circular',
    borderRadius: 28,
    opacity: 0.75,
  },
});
