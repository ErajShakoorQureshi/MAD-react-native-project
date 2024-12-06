import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './LoginScreen';
import HomeScreen from './HomeScreen';
import WorkoutScreen from './WorkoutScreen';
import FitScreen from './FitScreen';
import RestScreen from './RestScreen';

// Create the Stack Navigator
const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Workout" component={WorkoutScreen} />
        <Stack.Screen name="Fit" component={FitScreen} />
        <Stack.Screen name="Rest" component={RestScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;
