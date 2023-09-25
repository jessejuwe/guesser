import React from 'react';
import { Text, View } from 'react-native';
import { StyleSheet, Dimensions } from 'react-native';

import Colors from '../../constants/colors';

type Props = { children: React.ReactNode };

const NumberContainer: React.FC<Props> = ({ children }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{children}</Text>
    </View>
  );
};

export default NumberContainer;

const deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    borderColor: Colors.accent500,
    borderRadius: 8,
    borderWidth: 4,
    justifyContent: 'center',
    margin: deviceWidth < 380 ? 12 : 24,
    padding: deviceWidth < 380 ? 12 : 24,
  },
  text: {
    color: Colors.accent500,
    fontFamily: 'OpenSans_400Regular',
    fontSize: deviceWidth < 380 ? 28 : 36,
    fontWeight: 'bold',
  },
});
