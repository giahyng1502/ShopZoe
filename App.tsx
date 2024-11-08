import {StyleSheet} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './Screen/HomeScreen';
import NotificationScreen from './Screen/NotificationScreen';
import ProfileScreen from './Screen/ProfileScreen';
import Favourite from './Screen/SearchScreen';
import LoginScreen from './Screen/LoginScreen';
import {NavigationContainer} from '@react-navigation/native';
import RegisterScreen from './Screen/RegisterScreen';
import IconBottom from './Component/IconBottom';
import SearchScreen from './Screen/SearchScreen';
import Colors from './Style/Colors';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const BottomNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: '#f5f5f5',
          height: 80,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: '',
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <IconBottom
              name="home"
              focus={focused}
              color={focused ? Colors.blueColor : Colors.black}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          title: '',
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <IconBottom
              name="search"
              focus={focused}
              color={focused ? Colors.blueColor : Colors.black}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={NotificationScreen}
        options={{
          title: '',
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <IconBottom
              focus={focused}
              name="notifications"
              color={focused ? Colors.blueColor : Colors.black}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: '',
          headerShown: false,
          tabBarIcon: ({size, focused}) => (
            <IconBottom
              focus={focused}
              name="profile"
              color={focused ? Colors.blueColor : Colors.black}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="BottomNavigation">
        <Stack.Screen
          name="BottomNavigation"
          component={BottomNavigation}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({});
