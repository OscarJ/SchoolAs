import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import PendingBottomTabNavigator from '../navigation/PendingBottomTabNavigator';


const Stack = createStackNavigator();

export default function PendingScreen({ navigation, route }) {
  
  return (
    <Stack.Navigator>
      <Stack.Screen name="Root" component={PendingBottomTabNavigator} />
    </Stack.Navigator>
  );
}
