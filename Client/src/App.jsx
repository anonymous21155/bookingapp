import React, { useState } from "react";
import "./App.css";

import Payment from "./Payment";
//import CalendarComponent from "./CalendarComponent";
import MainComponent from "./MainComponent";
import ServiceContext from "./ContextObject";
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom";


function App() {
 const [mail, setMail] = useState(null); 
 const [serviceSelected, setServieSelected] = useState(null);
 const [doctorSelected, setDoctorSelected] = useState(null);
 const propObject = {
  email: mail,
  service: serviceSelected,
  doctor: doctorSelected
}
const contextValue = {
  setServieSelected,
  setDoctorSelected
}
 const router = createBrowserRouter(createRoutesFromElements(
  <Route>
    
    <Route path="/" element={ 
      <ServiceContext.Provider value={contextValue}>
    <MainComponent setMail={setMail} /> 
    </ServiceContext.Provider> 
    } />
   
    <Route path="Payment" element={ <Payment propObject={propObject}/> } />
    
    
  </Route>
))

  return (
    <RouterProvider router={router} />
    
    
  )
}

export default App;
