import { createSelector } from 'reselect'

const selectCustomers = (state) => state.customers;

export const selectCustomerList = createSelector(
    [selectCustomers],
    (customers) => customers
)

export const selectIsCustomerFetching = createSelector(
    [selectCustomers],
    (customer) => customer.isFetching
)

export const selectIsCustomerLoaded = createSelector(
    [selectCustomers],
    (customers) => !!customers.customers
)