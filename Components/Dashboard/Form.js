import React, { useState } from "react";
import { ToastAndroid, LogBox } from "react-native";
import {
    VStack,
    FormControl,
    Input,
    NativeBaseProvider,
    Center,
    ScrollView,
    CheckIcon,
    Select,
    Button
} from "native-base";
import { auth, onAuthStateChanged, doc, getDoc, db, updateDoc } from '../../firebaseconfig'
export default function Form() {
    const [userUID, setUserUID] = useState('')
    onAuthStateChanged(auth, (user) => {
        if (user) {
            // User is signed in, see docs for a list of available properties
            const uid = user.uid;
            setUserUID(uid)
            // ...
        } else {
            // User is signed out
        }
    });
    const [formData, setData] = React.useState({});
    const docRef = doc(db, "users", userUID || "uids");
    const update = async () => {
        await updateDoc(docRef, {
            formData
        });
        ToastAndroid.show('Form Submitted', ToastAndroid.SHORT);
    }
    console.log(formData)
    return (
        <NativeBaseProvider>
            <ScrollView>
                <Center flex={1} safeAreaTop>
                    <VStack width="85%" mx="3">
                        <FormControl isRequired>
                            <FormControl.Label _text={{ bold: true }}>Enter Name</FormControl.Label>
                            <Input
                                placeholder="John Doe"
                                onChangeText={(value) => setData({ ...formData, name: value })}
                            />
                            <FormControl.HelperText _text={{ fontSize: 'xs' }}>
                                Name should contain atleast 3 character.
                            </FormControl.HelperText>
                            <FormControl.Label _text={{ bold: true }}>Father Name</FormControl.Label>
                            <Input
                                placeholder="John Doe"
                                onChangeText={(value) => setData({ ...formData, fatherName: value })}
                            />
                            <FormControl.HelperText _text={{ fontSize: 'xs' }}>
                                Name should contain atleast 3 character.
                            </FormControl.HelperText>
                            <FormControl.Label _text={{ bold: true }}>CNIC number</FormControl.Label>
                            <Input
                                placeholder="42201-1234567-8"
                                onChangeText={(value) => setData({ ...formData, CNIC: value })}
                            />
                            <FormControl.HelperText _text={{ fontSize: 'xs' }}>
                                CNIC number should contain 12 Numbers.
                            </FormControl.HelperText>
                            <FormControl.Label _text={{ bold: true }}>Date of Birth</FormControl.Label>
                            <Input
                                placeholder="19-12-2021"
                                onChangeText={(value) => setData({ ...formData, DOB: value })}
                            />
                            <FormControl.HelperText _text={{ fontSize: 'xs' }}>
                                Enter Date Of Birth in digits                        </FormControl.HelperText>
                            <FormControl.Label _text={{ bold: true }}>Number of
                                family members</FormControl.Label>
                            <Input
                                placeholder="0"
                                onChangeText={(value) => setData({ ...formData, noFM: value })}
                            />
                            <FormControl.Label _text={{ bold: true }}>Monthly Income</FormControl.Label>
                            <Input
                                placeholder="10000"
                                onChangeText={(value) => setData({ ...formData, income: value })}
                            />
                            <FormControl.HelperText _text={{ fontSize: 'xs' }}>
                                Name should contain atleast 3 character.
                            </FormControl.HelperText>
                            <Select
                                selectedValue={formData.HelpType}
                                minWidth="200"
                                accessibilityLabel="Choose Help Type"
                                placeholder="Choose Help Type"
                                _selectedItem={{
                                    bg: "teal.600",
                                    endIcon: <CheckIcon size="5" />,
                                }}
                                mt={1}
                                onValueChange={(itemValue) => setData({ ...formData, HelpType: itemValue })}
                            >
                                <Select.Item label="Monthly Ration" value="Monthly Ration" />
                                <Select.Item label="Daily" value="Daily" />
                            </Select>
                            <Select
                                selectedValue={formData.DailyHelpType}
                                minWidth="200"
                                accessibilityLabel="Choose Help Type"
                                placeholder="If Daily Choose Time"
                                _selectedItem={{
                                    bg: "teal.600",
                                    endIcon: <CheckIcon size="5" />,
                                }}
                                mt={1}
                                onValueChange={(itemValue) => setData({ ...formData, DailyHelpType: itemValue })}
                            >
                                <Select.Item label="1" value="1" />
                                <Select.Item label="2" value="2" />
                                <Select.Item label="3" value="3" />
                            </Select>
                            <Button
                                variant="subtle"
                                colorScheme="green"
                                onPress={update}  >
                                Submit Document
                            </Button>
                        </FormControl>
                    </VStack>
                </Center>
            </ScrollView>
        </NativeBaseProvider>

    );
}