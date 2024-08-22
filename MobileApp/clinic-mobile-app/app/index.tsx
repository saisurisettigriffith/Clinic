import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Login from './login';
import Payments from './payments';
import Appointments from './appointments';
import Profile from './profile';

function HomeScreen() {
  const isLoggedIn = false;
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {isLoggedIn ? (
        <Text>Home Page</Text>
      ) : (
        <Text>Not Logged In!</Text>
      )}
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} options={{ headerTitle: 'Donny Brook Clinic' }} />
        <Tab.Screen name="Payments" component={Payments} options={{ headerTitle: 'Donny Brook Clinic' }} />
        <Tab.Screen name="Appointments" component={Appointments} options={{ headerTitle: 'Donny Brook Clinic' }} />
        <Tab.Screen name="Profile" component={Profile} options={{ headerTitle: 'Donny Brook Clinic' }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}