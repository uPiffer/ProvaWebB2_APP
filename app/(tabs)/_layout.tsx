import { Tabs } from 'expo-router';
import React from 'react';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Ionicons } from '@expo/vector-icons'; // Biblioteca de ícones
import '../App.css'; 


export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        tabBarInactiveTintColor: '#8a8a8a',
        tabBarStyle: {
          backgroundColor: colorScheme === 'dark' ? '#1A1A1A' : '#ffffff',
          borderTopWidth: 1,
          borderTopColor: '#dcdcdc',
          height: 70,
          paddingBottom: 10,
        },
        tabBarLabelStyle: {
          fontFamily: 'Poppins',
          fontSize: 12,
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Timeline',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? 'newspaper' : 'newspaper-outline'}
              size={24}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="post"
        options={{
          title: 'Criar Post',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? 'pencil' : 'pencil-outline'}
              size={24}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}