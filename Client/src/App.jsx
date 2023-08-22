import React from "react";
import "./App.css";

import Payment from "./Payment";
//import CalendarComponent from "./CalendarComponent";
import MainComponent from "./MainComponent";
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom";
const router = createBrowserRouter(createRoutesFromElements(
  <Route>
    <Route path="/" element={ <MainComponent /> } />
    <Route path="Payment" element={ <Payment /> } />
    
    
  </Route>
))

function App() {
  
  return (
    <RouterProvider router={router} />
  )
}

export default App;
