import React, { useState } from 'react'
import QRCode from 'react-native-qrcode-svg';
import { View, Text } from 'react-native';
import { auth, onAuthStateChanged, doc, getDoc, db, updateDoc } from '../../firebaseconfig'
export default function CodeQR() {
    const [userName, setUserName] = useState("Fetching...")
    const [userUID, setUserUID] = useState("Fetching...")
    let logoFromFile = require('../../imgs/Logo.png')
    onAuthStateChanged(auth, async (user) => {
        if (user) {
            // User is signed in, see docs for a list of available properties
            const uid = user.uid;
            console.log(uid)
            setUserUID(uid)
            console.log('USER UID USING USESTATE USERUID', userUID)
            const docRef = doc(db, "users", uid);
            const docSnap = await getDoc(docRef);
            console.log('CONSOLED DATA IN QR CODE COMPONENT')
            if (docSnap.exists()) {
                console.log("Document data:", docSnap.data());
                let snapdata = docSnap.data()
                console.log("75456hs", snapdata.username)
                setUserName(snapdata.username)
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
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ paddingVertical: 10, fontSize: 20 }}>Scan this<Text style={{ fontWeight: 'bold' }}> QR Code </Text>to verify your form</Text>
            <QRCode
                value="Just some string value"
                logo={logoFromFile}
                logoSize={40}
                size={190}
                logoBackgroundColor='white'
            />
        </View>
    )
}