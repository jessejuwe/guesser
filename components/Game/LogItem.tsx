import { StyleSheet, Text, View } from 'react-native';

import Colors from '../../constants/colors';

type Props = { guess: number; roundNumber: number };

const LogItem: React.FC<Props> = ({ guess, roundNumber }) => {
  return (
    <View style={styles.listItem}>
      <Text style={styles.text}>#{roundNumber}</Text>
      <Text style={styles.text}>Opponents Guess: {guess}</Text>
    </View>
  );
};

export default LogItem;

const styles = StyleSheet.create({
  listItem: {
    alignItems: 'center',
    backgroundColor: Colors.accent500,
    borderColor: Colors.primary800,
    borderRadius: 40,
    borderWidth: StyleSheet.hairlineWidth,
    elevation: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8,
    padding: 12,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    width: '100%',
  },
  text: { fontFamily: 'OpenSans_400Regular' },
});
