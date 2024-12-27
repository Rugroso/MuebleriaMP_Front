import { DarkTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import "../global.css";
import { useColorScheme } from '@/hooks/useColorScheme';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Stack, router } from 'expo-router';
import { StatusBar } from 'react-native';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  const [sesion, setSesion] = useState(false);

  useEffect(() => {
    if (loaded) {
      verificarsesion().then((sesionActiva) => {
        if (!sesionActiva) {
          router.replace('/Login');
          setTimeout(() => SplashScreen.hideAsync(), 1000);
        } else {
          SplashScreen.hideAsync();
          setSesion(true);
        }
      });
    }
  }, [loaded]);
  
  const verificarsesion = async (): Promise<boolean> => {
    try {
      const response = await fetch(`http://localhost:3000/verificarsesion`);
      const data = await response.json();
      return data === true;
    } catch (error) {
      return false;
    }
  };

  

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DarkTheme}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Stack
          screenOptions={{
            headerShown: false,
            animation: 'slide_from_right',
            contentStyle: { backgroundColor: 'transparent' },
          }}
        >
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="login" options={{ headerShown: false }} />
          <Stack.Screen name="not-found" options={{ headerShown: false, presentation: 'modal' }} />
        </Stack>
      </GestureHandlerRootView>
    </ThemeProvider>
  );
}
