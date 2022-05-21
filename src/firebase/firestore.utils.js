import { useState } from "react";

import { initializeApp } from "firebase/app"
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth"
import { addDoc, deleteDoc, setDoc, updateDoc } from "firebase/firestore";
import { useEffect } from "react";


//configuration
const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY ,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
};
const app = initializeApp(firebaseConfig)
const auth = getAuth()

//Authorization
export default app

export const logOut = () => {
    return signOut(auth)
}

export const logIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
}

export const useAuth = () => {
    const [ currentUser, setCurrentUser ] = useState()
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => setCurrentUser(user))
        return unsubscribe()
    }, [])
    return currentUser
}

//Firestore
export const createNamedDocument = async (documentReference, payload) => {
    await setDoc(documentReference, payload)
}
export const createUnNamedDocument = async (collectionReference, payload) => {
    await addDoc(collectionReference, payload)
}
export const updateDocument = async (documentReference, payload) => {
    await updateDoc(documentReference, payload)
}
export const deleteDocument = async (documentReference) => {
    await deleteDoc(documentReference)
}

//get

//sync