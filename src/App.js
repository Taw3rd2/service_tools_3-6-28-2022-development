import React, { lazy, Suspense } from 'react'

import { useAuth } from './firebase/firestore.utils'

import { Routes, Route } from "react-router-dom";

import Navbar from './components/navbar/Navbar'
import Spinner from './components/spinner/Spinner';
import PrintDailySlips from './pages/print_daily_slips/PrintDailySlips.page';
import PrintOneSlip from './pages/print_daily_slips/PrintOneSlip';

const GeneralLedger = lazy(() => import("./pages/accounting/GeneralLedger.page"))
const HomePage = lazy(() => import("./pages/homepage/HomePage.page"))
const Invoice = lazy(() => import("./pages/invoice/Invoice.page"))
const PartsCatalog = lazy(() => import("./pages/parts_catalog/PartsCatalog.page"))
const PartsQuote = lazy(() => import("./pages/parts_quote/PartsQuote.page"))
//const PrintDailySlips = lazy(() => import("./pages/print_daily_slips/PrintDailySlips.page"))
//const PrintOneSlip = lazy(() => import("./pages/print_one_slip/PrintOneSlip.page"))
const Schedule = lazy(() => import("./pages/schedule/Schedule.page"))
const Settings = lazy(() => import("./pages/settings/Settings.page"))
const SignIn = lazy(() => import("./pages/sign-in/SignIn.page"))

function App() {
  const currentUser = useAuth()
  return (
    <div>
      <Navbar 
        currentUser={currentUser}
      />
      <Suspense fallback={<Spinner />}>
      <Routes>
        <Route 
          path="/"
          element= {currentUser ? <HomePage /> : <SignIn />}
        />
        <Route 
          path="/homepage"
          element= {currentUser ? <HomePage /> : <SignIn />}
        />
        <Route  
          path="/schedule"
          element = {currentUser ? <Schedule /> : <SignIn />}
        />
        <Route  
          path="/accounting"
          element = {currentUser ? <GeneralLedger /> : <SignIn />}
        />
        <Route  
          path="/invoice"
          element = {currentUser ? <Invoice /> :  <SignIn />}
        />
        <Route  
          path="/settings"
          element = {currentUser ? <Settings /> : <SignIn />}
        />
        <Route  
          path="/parts_catalog"
          element = {currentUser ? <PartsCatalog /> : <SignIn />}
        />
        <Route  
          path="/parts_quote"
          element = {currentUser ? <PartsQuote /> : <SignIn />}
        />
        <Route  
          path="/print_daily_slips/:state"
          element = {currentUser ? <PrintDailySlips /> : <SignIn />}
        />
        <Route  
          path="/print_one_slip/:state"
          element = {currentUser ? <PrintOneSlip /> : <SignIn />}
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

export default App;
