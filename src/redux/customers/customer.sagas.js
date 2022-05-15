import { takeLatest, put, all, call, take } from "redux-saga/effects";
import { eventChannel } from 'redux-saga'

import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils'

import {
    addCustomerFailure,
    fetchCustomersSuccess,
    fetchCustomersFailure,
    updateCustomerSuccess,
    updateCustomerFailure,
    deleteCustomerSuccess,
    deleteCustomerFailure
} from './customer.actions'

import { CustomerActionTypes } from './customer.types'

//create
export function* addCustomerAsync({
    payload: {
        altPhoneName,
        altphone,
        billingAlternateEmail,
        billingAlternateName,
        billingAlternatePhone,
        billingOtherEmail,
        billingOtherName,
        billingOtherPhone,
        billingPrimaryEmail,
        billingPrimaryName,
        billingPrimaryPhone,
        billingcity,
        billingiscommercial,
        billingorg,
        billingstate,
        billingstreet,
        billingzip,
        city,
        cnotes,
        firstname,
        lastname,
        otherPhone,
        otherPhoneName,
        phone,
        phoneName,
        squarefootage,
        state,
        street,
        zip,
    },
}) {
    try {
    const customerRef = firestore.collection("customers")
    yield customerRef
        .add({
            altPhoneName: altPhoneName,
            altphone: altphone,
            billingAlternateEmail: billingAlternateEmail,
            billingAlternateName: billingAlternateName,
            billingAlternatePhone: billingAlternatePhone,
            billingOtherEmail: billingOtherEmail,
            billingOtherName: billingOtherName,
            billingOtherPhone: billingOtherPhone,
            billingPrimaryEmail: billingPrimaryEmail,
            billingPrimaryName: billingPrimaryName,
            billingPrimaryPhone: billingPrimaryPhone,
            billingcity: billingcity,
            billingiscommercial: billingiscommercial,
            billingorg: billingorg,
            billingstate: billingstate,
            billingstreet: billingstreet,
            billingzip: billingzip,
            city: city,
            cnotes: cnotes,
            firstname: firstname,
            lastname: lastname,
            otherPhone: otherPhone,
            otherPhoneName: otherPhoneName,
            phone: phone,
            phoneName: phoneName,
            squarefootage: squarefootage,
            state: state,
            street: street,
            zip: zip,
        })
        .then(() => console.log("Added ", lastname))
    } catch (error) {
        yield put(addCustomerFailure(error.message))
    }
}

export function* onAddNewCustomerStart() {
    yield takeLatest(CustomerActionTypes.ADD_CUSTOMER_START, addCustomerAsync)
}

//sync
export function* syncCustomers() {
    const customerRef = firestore.collection("customers")
    const channel = eventChannel((emit) => customerRef.onSnapshot(emit))
    try {
        while (true) {
            const snapshot = yield take(channel)
            const collectionsMap = yield call(
                convertCollectionsSnapshotToMap,
                snapshot
            )
            yield put(fetchCustomersSuccess(collectionsMap))
        }
    } catch (error) {
        yield put(fetchCustomersFailure(error.message))
    }
}

// update
export function* updateCustomerAsync({
    payload: {
        altPhoneName,
        altphone,
        billingAlternateEmail,
        billingAlternateName,
        billingAlternatePhone,
        billingOtherEmail,
        billingOtherName,
        billingOtherPhone,
        billingPrimaryEmail,
        billingPrimaryName,
        billingPrimaryPhone,
        billingcity,
        billingiscommercial,
        billingorg,
        billingstate,
        billingstreet,
        billingzip,
        city,
        cnotes,
        firstname,
        lastname,
        otherPhone,
        otherPhoneName,
        phone,
        phoneName,
        squarefootage,
        state,
        street,
        zip,
        id,
    }
}) {
    try {
        const customerRef = firestore.collection("customers")
        yield customerRef
            .doc(id)
            .update({
                altPhoneName,
                altphone,
                billingAlternateEmail,
                billingAlternateName,
                billingAlternatePhone,
                billingOtherEmail,
                billingOtherName,
                billingOtherPhone,
                billingPrimaryEmail,
                billingPrimaryName,
                billingPrimaryPhone,
                billingcity,
                billingiscommercial,
                billingorg,
                billingstate,
                billingstreet,
                billingzip,
                city,
                cnotes,
                firstname,
                lastname,
                otherPhone,
                otherPhoneName,
                phone,
                phoneName,
                squarefootage,
                state,
                street,
                zip,
            })
            .then(() => console.log("Updated ", lastname))
            yield put(
                updateCustomerSuccess({
                    altPhoneName,
                    altphone,
                    billingAlternateEmail,
                    billingAlternateName,
                    billingAlternatePhone,
                    billingOtherEmail,
                    billingOtherName,
                    billingOtherPhone,
                    billingPrimaryEmail,
                    billingPrimaryName,
                    billingPrimaryPhone,
                    billingcity,
                    billingiscommercial,
                    billingorg,
                    billingstate,
                    billingstreet,
                    billingzip,
                    city,
                    cnotes,
                    firstname,
                    lastname,
                    otherPhone,
                    otherPhoneName,
                    phone,
                    phoneName,
                    squarefootage,
                    state,
                    street,
                    zip,
                })
            )
    } catch (error) {
        yield put(updateCustomerFailure(error.message))
    }
}

export function* onUpdateCustomerStart() {
    yield takeLatest(CustomerActionTypes.UPDATE_CUSTOMER_START, updateCustomerAsync)
}

//delete
export function* deleteCustomerAsync({ payload: { lastname, id }}) {
    try {
        const customerRef = firestore.collection("customers")
        yield customerRef
            .doc(id)
            .delete()
            .then(() => console.log("Deleted ", lastname))
        yield put(deleteCustomerSuccess({ id }))
    } catch (error) {
        yield put(deleteCustomerFailure(error.message))
    }
}

export function* onDeleteCustomerStart() {
    yield takeLatest(CustomerActionTypes.DELETE_CUSTOMER_START, deleteCustomerAsync)
}

export function* customerSagas() {
    yield all([
        call(onAddNewCustomerStart),
        call(syncCustomers),
        call(onUpdateCustomerStart),
        call(onDeleteCustomerStart)
    ])
}