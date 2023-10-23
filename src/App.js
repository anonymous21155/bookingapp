import React, { useState, useEffect } from "react";
import "./App.css";

//mport Payment from "./Payment";
import MainComponent from "./MainComponent";
import ServiceContext from "./ContextObject";
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom";


function App() {
 const [mail, setMail] = useState(null); 
 const [serviceSelected, setServieSelected] = useState('Cardiology');
 const [doctorSelected, setDoctorSelected] = useState(null);
 useEffect(() => {
  fetch('http://localhost:1337/service', { method: 'POST', headers: { 'Content-Type': 'application/json'}, body: JSON.stringify({ Service: serviceSelected })})
},[serviceSelected])
 const propObject = {
  email: mail,
  service: serviceSelected,
  doctor: doctorSelected
}
const mainObject = {
  setMail,
  setServieSelected
}

 const router = createBrowserRouter(createRoutesFromElements(
  <Route>
    
    <Route path="/" element={ 
      <ServiceContext.Provider value={setDoctorSelected}>
    <MainComponent setData={mainObject} /> 
    </ServiceContext.Provider> 
    } />
   
    
    
    
  </Route>
))

  return (
    <RouterProvider router={router} />
    
    
  )
}

export default App;
