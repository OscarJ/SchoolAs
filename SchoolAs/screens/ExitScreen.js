import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { SchoolService } from '../services/schoolService';
import { Button } from 'react-native';


const Stack = createStackNavigator();

export default function ExitScreen({ navigation, route }) {
  SchoolService.cleartstudent()
  return (
    <Button title="Hola"></Button>
  );
}
