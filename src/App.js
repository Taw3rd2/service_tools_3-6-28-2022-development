import React, { useEffect, lazy, Suspense } from 'react'

import { connect } from "react-redux";
import { Routes, Route } from "react-router-dom";

import { checkUserSession } from "./redux/user/user.actions";
import { selectCurrentUser } from "./redux/user/user.selectors";
import { createStructuredSelector } from "reselect";

import Navbar from './components/navbar/Navbar'
import Spinner from './components/spinner/Spinner';

const GeneralLedger = lazy(() => import("./pages/accounting/GeneralLedger.page"))
const HomePage = lazy(() => import("./pages/homepage/HomePage.page"))
const Invoice = lazy(() => import("./pages/invoice/Invoice.page"))
const PartsCatalog = lazy(() => import("./pages/parts_catalog/PartsCatalog.page"))
const PartsQuote = lazy(() => import("./pages/parts_quote/PartsQuote.page"))
const PrintDailySlips = lazy(() => import("./pages/print_daily_slips/PrintDailySlips.page"))
const PrintOneSlip = lazy(() => import("./pages/print_one_slip/PrintOneSlip.page"))
const Schedule = lazy(() => import("./pages/schedule/Schedule.page"))
const Settings = lazy(() => import("./pages/settings/Settings.page"))
const SignIn = lazy(() => import("./pages/sign-in/SignIn.page"))

function App({ currentUser, checkUserSession }) {

  useEffect(() => {
    checkUserSession()
  }, [checkUserSession]);

  return (
    <div>
      <Navbar />
      <Suspense fallback={<Spinner />}>
      <Routes>
        <Route 
          path="/"
          element= { currentUser? <HomePage /> : <SignIn />}
        />
        <Route  
          path="/schedule"
          element = {<Schedule />}
        />
        <Route  
          path="/accounting"
          element = {<GeneralLedger />}
        />
        <Route  
          path="/invoice"
          element = {<Invoice />}
        />
        <Route  
          path="/settings"
          element = {<Settings />}
        />
        <Route  
          path="/parts_catalog"
          element = {<PartsCatalog />}
        />
        <Route  
          path="/parts_quote"
          element = {<PartsQuote />}
        />
        <Route  
          path="/print_daily_slips"
          element = {<PrintDailySlips />}
        />
        <Route  
          path="/print_one_slip"
          element = {<PrintOneSlip />}
        />
        <Route 
          path='*' 
          element={
            <main style={{ padding: "1rem"}}>
              <p>Theres nothing here!</p>
            </main>
          }
        />
      </Routes>
      </Suspense>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
})

const mapDispatchToProps = (dispatch) => ({
  checkUserSession: () => dispatch(checkUserSession())
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
