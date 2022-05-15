import { CustomerActionTypes } from "./customer.types";

//create
export const addCustomerStart = (customer) => ({
    type: CustomerActionTypes.ADD_CUSTOMER_START,
    payload: customer
})

export const addCustomerSuccess = (customer) => ({
    type: CustomerActionTypes.ADD_CUSTOMER_SUCCESS,
    payload: customer
})

export const addCustomerFailure = (errorMessage) => ({
    type: CustomerActionTypes.ADD_CUSTOMER_FAILURE,
    payload: errorMessage
})

//sync
export const fetchCustomersSuccess = (customerMap) => ({
    type: CustomerActionTypes.FETCH_CUSTOMERS_SUCCESS,
    payload: customerMap
})

export const fetchCustomersFailure = (errorMessage) => ({
    type: CustomerActionTypes.FETCH_CUSTOMERS_FAILURE,
    payload: errorMessage
})

//update
export const updateCustomerStart = (customer) => ({
    type: CustomerActionTypes.UPDATE_CUSTOMER_START,
    payload: customer
})

export const updateCustomerSuccess = (customer) => ({
    type: CustomerActionTypes.UPDATE_CUSTOMER_SUCCESS,
    payload: customer
})

export const updateCustomerFailure = (errorMessage) => ({
    type: CustomerActionTypes.UPDATE_CUSTOMER_FAILURE,
    payload: errorMessage
})

//delete
export const deleteCustomerStart = (customer) => ({
    type: CustomerActionTypes.DELETE_CUSTOMER_START,
    payload: customer
})

export const deleteCustomerSuccess = (customer) => ({
    type: CustomerActionTypes.DELETE_CUSTOMER_SUCCESS,
    payload: customer
})

export const deleteCustomerFailure = (errorMessage) => ({
    type: CustomerActionTypes.DELETE_CUSTOMER_FAILURE,
    payload: errorMessage
})