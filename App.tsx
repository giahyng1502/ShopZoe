import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './Screen/HomeScreen';
import {NavigationContainer} from '@react-navigation/native';
import IconBottom from './Component/IconBottom';
import Colors from './Style/Colors';
import SearchScreen from './Screen/SearchScreen';
import NotificationScreen from './Screen/NotificationScreen';
import ProfileScreen from './Screen/ProfileScreen';
import LoginScreen from './Screen/LoginScreen';
import RegisterScreen from './Screen/RegisterScreen';
import ProductDetail from './Screen/ProductDetail';
import CartScreen from './Screen/CartScreen';
import {Provider} from 'react-redux';
import store from './redux/state/store';
import ProfileDetail from './Screen/ProfileDetail';

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
          tabBarIcon: ({focused}) => (
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
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="BottomNavigation">
          <Stack.Screen
            name="BottomNavigation"
            component={BottomNavigation}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={'CartScreen'}
            component={CartScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={'ProfileDetail'}
            component={ProfileDetail}
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
          <Stack.Screen
            name="DetailScreen"
            component={ProductDetail}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
