import React, { useState } from 'react'
import {
    Text,
    VStack,
    FormControl,
    Input,
    NativeBaseProvider,
    Center,
    ScrollView,
    CheckIcon,
    Select
} from "native-base";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { auth, onAuthStateChanged, doc, getDoc, db, updateDoc } from '../../firebaseconfig'
import Form from './Form'
import CodeQR from './CodeQR'
import { View, ToastAndroid } from 'react-native';
const Tab = createMaterialTopTabNavigator();
export default function Dashboard({ navigation }) {
    const [userUID, setUserUID] = useState("Fetching...")
    onAuthStateChanged(auth, async (user) => {
        if (user) {
            // User is signed in, see docs for a list of available properties
            const uid = user.uid;
            console.log(uid)
            const docRef = doc(db, "users", uid);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                console.log("Document data:", docSnap.data());
                let snapdata = docSnap.data()
                console.log("75456hs", snapdata.username)
                setUserUID(snapdata.username)
                setIsData(true)
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            } // ...
        } else {
            // User is signed out
        }
    });
    return (
        <>
            <NativeBaseProvider>
                <View style={{ padding: 10 }}>
                    <Text style={{ textAlign: 'center', fontSize: 20 }}><Text style={{ fontWeight: 'bold' }}>{userUID}</Text></Text></View>
                <Tab.Navigator
                    initialRouteName="Form"
                    screenOptions={{
                        tabBarActiveTintColor: 'black',
                        tabBarLabelStyle: { fontSize: 20 },
                    }}
                >
                    <Tab.Screen
                        name="Form"
                        component={Form}
                        options={{ tabBarLabel: 'Form' }}
                    />

                    <Tab.Screen
                        name="CodeQR"
                        component={CodeQR}
                        options={{ tabBarLabel: 'QR Code' }}
                    />
                </Tab.Navigator>
            </NativeBaseProvider>
        </>
    )
}