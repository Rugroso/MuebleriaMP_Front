import { Image, StyleSheet, Platform, View, Text } from 'react-native';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {
  return (
    <View className='w-full h-full flex items-center justify-center bg-slate-400'>
      <Text className='text-3xl font-semibold'>
          Hola, Mundo.
      </Text>
    </View>
  );
}