import { all, call } from "redux-saga/effects";

import { userSagas } from "./user/user.sagas";
//import { customerSagas } from "./customers/customer.sagas"

export default function* rootSaga() {
    yield all ([
        call(userSagas),
        //call(customerSagas),
    ])
}