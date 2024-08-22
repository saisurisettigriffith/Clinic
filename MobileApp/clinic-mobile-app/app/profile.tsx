import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Text, View } from 'react-native';

const Stack = createStackNavigator();

export default function Profile() {
    const isLoggedIn = false;
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        {isLoggedIn ? (
          <Text>Profile Page</Text>
        ) : (
          <Text>Not Logged In!</Text>
        )}
      </View>
    );
}