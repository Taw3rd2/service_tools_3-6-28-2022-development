import { CustomerActionTypes } from './customer.types'

const INITIAL_STATE = {
    customers: null,
    isFetching: false,
    errorMessage: undefined
}

const customerReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CustomerActionTypes.ADD_CUSTOMER_SUCCESS:
            return {
                ...state,
                customers: [...state.customers, action.payload],
            }
        case CustomerActionTypes.FETCH_CUSTOMERS_START:
            return {
                ...state,
                isFetching: true
            }
        case CustomerActionTypes.FETCH_CUSTOMERS_SUCCESS:
            return {
                ...state,
                isFetching: false,
                customers: action.payload
            }
        case CustomerActionTypes.UPDATE_CUSTOMER_SUCCESS:
            return {
                ...state,
                customers: state.customers.map((customer) => {
                    if(customer.id === action.payload.id) {
                        return { ...customer, lastname: action.payload.lastname }
                    }
                    return customer
                })
            }
        case CustomerActionTypes.DELETE_CUSTOMER_SUCCESS:
            return {
                ...state,
                customers: state.customers.filter(
                    (customer) => customer.id !== action.payload.id
                )
            }
        case CustomerActionTypes.ADD_CUSTOMER_FAILURE:
        case CustomerActionTypes.FETCH_CUSTOMERS_FAILURE:
        case CustomerActionTypes.UPDATE_CUSTOMER_FAILURE:
        case CustomerActionTypes.DELETE_CUSTOMER_FAILURE:
            return {
                ...state,
                isFetching: false,
                errorMessage: action.payload
            }
        default:
            return state
    }
}

export default customerReducer