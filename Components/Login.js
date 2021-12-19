import React, { useState } from 'react';
import { Input, Icon, Stack, Center, Image, Heading, Button, NativeBaseProvider, useToast, Text } from "native-base"
import { MaterialIcons } from "@expo/vector-icons"
import logo from "../imgs/Logo.png"
import { Ionicons } from "@expo/vector-icons"
import { ToastAndroid } from "react-native";
import { auth, signInWithEmailAndPassword } from "../firebaseconfig"
export default function Login({ navigation }) {
    const toast = useToast()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const LoginUser = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                ToastAndroid.show('Success', ToastAndroid.SHORT);
                navigation.navigate('Loader')
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorMessage)
                toast.show({
                    title: errorCode,
                    status: "error",
                    description: errorMessage,
                })
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
                                as={<MaterialIcons name="person" />}
                                size={5}
                                ml="2"
                                color="muted.400"
                            />
                        }
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
                        placeholder="Password"
                        value={password}
                        onChangeText={text => setPassword(text)}
                    />
                    <Button
                        variant="subtle"
                        colorScheme="green"
                        onPress={LoginUser}

                        endIcon={<Icon as={Ionicons} name="checkmark-done-outline" size="sm" />}
                    >
                        Login
                    </Button>
                    <Text>Not a member? <Text onPress={() => navigation.navigate('SignUp')} style={{ color: 'blue' }}>SignUp</Text></Text>
                </Stack>
            </Center>
        </NativeBaseProvider>
    )
}
