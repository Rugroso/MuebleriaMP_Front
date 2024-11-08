import { Tabs } from 'expo-router';
import React from 'react';


import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        tabBarStyle: { backgroundColor: '#131414' },
        headerShown: false,
        tabBarHideOnKeyboard: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="inventory"
        options={{
          title: 'Inventario',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'clipboard' : 'clipboard-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="purchase"
        options={{
          title: 'Compras',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'cart' : 'cart-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="sale"
        options={{
          title: 'Ventas',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'cash' : 'cash-outline'} color={color} />
          ),
        }}
      />
            <Tabs.Screen
        name="Clientes"
        options={{
          title: 'Clientes',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'person' : 'person-outline'} color={color} />
          ),
        }}
      />

    </Tabs>
  );
}