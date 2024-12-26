import { DarkTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import "../global.css";
import { useColorScheme } from '@/hooks/useColorScheme';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import { DrawerItem, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { Alert, Text, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
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
          router.push('/Login');
          setTimeout(() => SplashScreen.hideAsync(), 300);
        } else {
          SplashScreen.hideAsync();
          setSesion(true);
        }
      });
    }
  }, [loaded]);

  function CustomDrawerContent(props: any) {
    return (
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        <DrawerItem
          label="Cerrar Sesión"
          onPress={() => handleLogout(props.navigation)}
          labelStyle={{ fontSize: 16, color: 'red' }}
        />
      </DrawerContentScrollView>
    );
  }

  const logout = async () => {
    try {
      const response = await fetch('http://localhost:3000/logout', {
        method: 'POST',
      });
      if (response.ok) {
        Alert.alert('Éxito', 'Se ha cerrado la sesión con éxito.');
      } else {
        const error = await response.json();
        Alert.alert('Error', error.message || 'No se pudo cerrar sesión.');
      }
    } catch (error) {
      Alert.alert('Error', 'Hubo un problema al cerrar la sesión.');
    }
  };

  const verificarsesion = async (): Promise<boolean> => {
    try {
      const response = await fetch(`http://localhost:3000/verificarsesion`);
      const data = await response.json();
      return data === true;
    } catch (error) {
      return false;
    }
  };

  const handleLogout = async (navigation: any) => {
    const sesionActual = await verificarsesion();
    if (sesionActual) {
      Alert.alert(
        'Cerrar Sesión',
        '¿Estás seguro de que deseas cerrar sesión?',
        [
          { text: 'Cancelar', style: 'cancel' },
          {
            text: 'Sí',
            onPress: () => {
              logout();
              navigation.navigate('Login');
            },
          },
        ]
      );
    } else {
      navigation.navigate('Login');
    }
  };

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DarkTheme}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Drawer drawerContent={(props) => <CustomDrawerContent {...props} />}>
          <Drawer.Screen
            name="(tabs)"
            options={{
              drawerLabel: 'Home',
              title: 'Overview',
              headerShown: false,
            }}
          />
          <Drawer.Screen
            name="+not-found"
            options={{
              drawerItemStyle: { display: 'none' },
            }}
          />
          <Drawer.Screen
            name="Login"
            options={() => ({
              headerShown: false,
              drawerItemStyle: { display: 'none' },
            })}
          />
        </Drawer>
      </GestureHandlerRootView>
    </ThemeProvider>
  );
}