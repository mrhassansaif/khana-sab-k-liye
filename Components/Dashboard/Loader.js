import React, { useState } from 'react';
import { Button, Stack, Center, NativeBaseProvider, Text } from "native-base"
import { auth, onAuthStateChanged, doc, getDoc, db, updateDoc } from '../../firebaseconfig'

export default function Loader({ navigation }) {
    const [isData, setIsData] = useState(false)

    onAuthStateChanged(auth, async (user) => {
        if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/firebase.User
            const uid = user.uid;
            console.log(uid)
            const docRef = doc(db, "users", uid);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                console.log("Document data:", docSnap.data());
                setIsData(true)
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            } // ...
        } else {
            // User is signed out
            // ...
        }
    });
    if (isData == true) {
        navigation.navigate('Dashboard')
    }

    return (
        <>
            < NativeBaseProvider >
                <Center flex={1} px="3">
                    <Stack
                        direction={{
                            base: "column",
                            md: "row",
                        }}
                        space={2}
                        alignItems={{
                            base: "center",
                            md: "flex-start",
                        }}
                    >

                        <Button isLoading isLoadingText="Please Wait" variant="outline" colorScheme="green">
                            Button
                        </Button>
                    </Stack>
                </Center>
            </NativeBaseProvider >

        </>
    )
}
