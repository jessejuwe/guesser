import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { useCallback, useState } from 'react';
import { ImageBackground } from 'react-native';
import { SafeAreaView, StyleSheet } from 'react-native';
import { useFonts, OpenSans_400Regular } from '@expo-google-fonts/open-sans';
import * as SplashScreen from 'expo-splash-screen';

import Colors from './constants/colors';
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen';
import StartGameScreen from './screens/StartGameScreen';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [userNumber, setUserNumber] = useState<number | null>(null);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [rounds, setRounds] = useState<number>(0);

  let [fontsLoaded, fontError] = useFonts({ OpenSans_400Regular });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) await SplashScreen.hideAsync();
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) return null;

  const trackedInputHandler = (value: number) => setUserNumber(value);

  const endGameHandler = () => setGameOver(true);

  const updateRoundsHandler = () => setRounds(prevState => prevState + 1);

  const resetHandler = () => {
    setGameOver(false);
    setUserNumber(null);
    setRounds(0);
  };

  return (
    <>
      <StatusBar style="light" />
      <LinearGradient
        colors={[Colors.primary700, Colors.accent500]}
        style={styles.app}
        onLayout={onLayoutRootView}
      >
        <ImageBackground
          style={styles.background}
          imageStyle={styles.imageStyle}
          source={require('./assets/images/background.png')}
          resizeMode="cover"
        >
          <SafeAreaView style={styles.safeArea}>
            {!gameOver && userNumber && (
              <GameScreen
                onGameOver={endGameHandler}
                onUpdateRounds={updateRoundsHandler}
                userNumber={userNumber}
              />
            )}
            {!gameOver && !userNumber && (
              <StartGameScreen onTrack={trackedInputHandler} />
            )}
            {gameOver && (
              <GameOverScreen
                onReset={resetHandler}
                rounds={rounds}
                userNumber={userNumber}
              />
            )}
          </SafeAreaView>
        </ImageBackground>
      </LinearGradient>
    </>
  );
}

const styles = StyleSheet.create({
  app: { flex: 1 },
  background: { flex: 1 },
  imageStyle: { opacity: 0.15 },
  safeArea: { flex: 1 },
});
