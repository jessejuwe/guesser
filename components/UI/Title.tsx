import { StyleSheet, Text } from 'react-native';

type Props = { children: React.ReactNode };

const Title: React.FC<Props> = ({ children }) => {
  return <Text style={styles.title}>{children}</Text>;
};

export default Title;

const styles = StyleSheet.create({
  title: {
    borderColor: 'white',
    borderWidth: 2,
    borderRadius: 8,
    color: 'white',
    fontFamily: 'OpenSans_400Regular',
    fontSize: 24,
    fontWeight: '700',
    maxWidth: '80%',
    padding: 12,
    textAlign: 'center',
    width: 300,
  },
});
