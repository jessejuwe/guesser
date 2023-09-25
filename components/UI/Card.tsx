import { View } from 'react-native';
import { Dimensions, StyleSheet } from 'react-native';

import Colors from '../../constants/colors';

type Props = { children: React.ReactNode };

const Card: React.FC<Props> = ({ children }) => {
  return <View style={styles.card}>{children}</View>;
};

export default Card;

const deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    backgroundColor: Colors.primary800,
    borderRadius: 8,
    elevation: 4, // shadow styling for android
    justifyContent: 'center',
    marginTop: deviceWidth < 380 ? 18 : 28,
    marginHorizontal: 24,
    padding: 16,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
  },
});
