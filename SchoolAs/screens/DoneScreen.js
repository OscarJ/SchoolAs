import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import DoneBottomTabNavigator from '../navigation/DoneBottomTabNavigator';


const Stack = createStackNavigator();

export default function DoneScreen({ navigation, route }) {
  
  return (
    <Stack.Navigator>
      <Stack.Screen name="Root" component={DoneBottomTabNavigator} />
    </Stack.Navigator>
  );
}
