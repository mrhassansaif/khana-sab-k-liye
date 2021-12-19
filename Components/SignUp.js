import React, { useState } from 'react';
import { Input, Icon, Stack, Center, Image, Heading, Button, NativeBaseProvider, useToast } from "native-base"
import { MaterialIcons } from "@expo/vector-icons"
import logo from "../imgs/Logo.png"
import { Ionicons } from "@expo/vector-icons"
import { ToastAndroid } from "react-native";
import { auth, createUserWithEmailAndPassword, db, doc, setDoc } from "../firebaseconfig"
export default function SignUp({ navigation }) {
    const toast = useToast()
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const SignUpUser = () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                setDoc(doc(db, "users", user.uid), {
                    email: email,
                    username: username,
                    User: true,
                    isSubmit: false,
                    isAccepted: false,
                })
                ToastAndroid.show('Success', ToastAndroid.SHORT);
                navigation.navigate('Login')
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, '/n', errorMessage)
                ToastAndroid.show('errorMessage', ToastAndroid.SHORT);
            });
    }
    return (
        <NativeBaseProvider>
            <Center flex={1} px="3">
                <Image
                    source={
                        logo
                    }
                    alt="Alternate Text"
                    size={230}
                />
                <Stack space={4} w="100%" alignItems="center">
                    <Input
                        w={{
                            base: "75%",
                            md: "25%",
                        }}
                        InputLeftElement={
                            <Icon
                                as={<MaterialIcons name="supervised-user-circle" />}
                                size={5}
                                ml="2"
                                color="muted.400"
                            />
                        }
                        id="first-name"
                        placeholder="Username"
                        value={username}
                        onChangeText={text => setUsername(text)}
                    />
                    <Input
                        w={{
                            base: "75%",
                            md: "25%",
                        }}
                        InputLeftElement={
                            <Icon
                                as={<MaterialIcons name="person" />}
                                size={5}
                                ml="2"
                                color="muted.400"
                            />
                        }
                        id="Email"
                        placeholder="Email"
                        value={email}
                        onChangeText={text => setEmail(text)}
                    />
                    <Input
                        w={{
                            base: "75%",
                            md: "25%",
                        }}
                        InputRightElement={
                            <Icon
                                as={<MaterialIcons name="visibility-off" />}
                                size={5}
                                mr="2"
                                color="muted.400"
                            />
                        }
                        secureTextEntry={true}
                        id="Password"
                        placeholder="Password"
                        value={password}
                        onChangeText={text => setPassword(text)}
                    />
                    <Button
                        variant="subtle"
                        colorScheme="green"
                        onPress={SignUpUser}
                        endIcon={<Icon as={Ionicons} name="checkmark-done-outline" size="sm" />}
                    >
                        Sign Up!
                    </Button>
                </Stack>
            </Center>
        </NativeBaseProvider>
    )
}
