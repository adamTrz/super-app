import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TabsNavigator from './TabsNavigator';
import HomeScreen from '../screens/HomeScreen';

export type MainStackParamList = {
  Tabs: undefined;
};

const Main = createNativeStackNavigator<MainStackParamList>();

const MainNavigator = () => {
  return <HomeScreen />;
};

export default MainNavigator;
