import React from 'react'
import Login from "./Components/Login"
import SignUp from './Components/SignUp'
import Loader from './Components/Dashboard/Loader'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Form from './Components/Dashboard/Form'
import Dashboard from './Components/Dashboard/Dashboard'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { StyleSheet, Text, View, TouchableOpacity, ToastAndroid } from 'react-native';

import { auth, onAuthStateChanged, doc, getDoc, db, updateDoc, signOut } from './firebaseconfig'

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} options={{
          headerShown: false,
        }} />
        <Stack.Screen name="Loader" component={Loader} options={{
          headerShown: false,
        }} />
        <Stack.Screen name="SignUp" component={SignUp} options={{
          headerShown: false,
        }} />
        <Stack.Screen name="Dashboard" component={Dashboard} options={{
          headerRight: () => {
            return (
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity style={{ marginHorizontal: 4 }}>
                  <Ionicons name="log-out" size={30} color="black" onPress={LogOut} />
                </TouchableOpacity>

              </View>
            )
          },
          headerBackVisible: false, title: 'Welcome to KSL', headerTitleAlign: 'center'
        }} />
        {/* <Stack.Screen name="Dashboard" component={Dashboard} options={{
          headerShown: false,
        }} /> */}
      </Stack.Navigator>
    </NavigationContainer>

  )
}

function LogOut({ navigation }) {
  signOut(auth).then(() => {
    // Sign-out successful.
    ToastAndroid.show('LogOut', ToastAndroid.SHORT);
    navigation.navigate('Login')


  }).catch((error) => {
    console.log(error)
  });
}