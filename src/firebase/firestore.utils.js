import { addDoc, deleteDoc, setDoc, updateDoc } from "firebase/firestore";

export const createNamedDocument = async (documentReference, payload) => {
    await setDoc(documentReference, payload)
}

export const createUnNamedDocument = async (collectionReference, payload) => {
    await addDoc(collectionReference, payload)
}

//get

//sync

export const updateDocument = async (documentReference, payload) => {
    await updateDoc(documentReference, payload)
}

export const deleteDocument = async (documentReference) => {
    await deleteDoc(documentReference)
}