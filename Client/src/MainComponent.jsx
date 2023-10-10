import React, { useState } from "react";
import Dermatology from "./Dermatology";
import Cardiology from "./Cardiology";
import GeneralMedicine from "./GeneralMedicine";
import { useNavigate } from "react-router-dom";


function MainComponent ({ setData }) {
    const [generalMedicineComponent, setGeneralMedicineComponent] = useState(false);
    const [cardiologyComponent, setCardiologyComponent] = useState(false);
    const [dermatologyComponent, setDermatologyComponent] = useState(false);
    const { setMail, setServieSelected } = setData;
    const navigate = useNavigate();
    function handleOnChange (e) {
        const mailid = e.target.value;
        setMail(mailid);
    }
    function handleOnClick () {
        navigate("/Payment")
    }
    function handleCalendarButton1 () {
        setGeneralMedicineComponent(!generalMedicineComponent);
        setServieSelected('GenralMedicine');
    }
    function handleCalendarButton2 () {
        setCardiologyComponent(!cardiologyComponent);
        setServieSelected('Cardiology');
    }
    function handleCalendarButton3 () {
        setDermatologyComponent(!dermatologyComponent);
        setServieSelected('Dermatology');
    }
    return (
      
        <div className="App">
      <form>
      <label htmlFor="username" >Name:</label>
      <input type="text" id="username" name="username"></input>
      <label htmlFor="email">Email:</label>
      <input type="text" id="email" name="email" onChange={handleOnChange} placeholder="someone@example.com"></input>
      <button type="button" onClick={handleCalendarButton1}>GeneralMedicine</button>
      <button type="button" onClick={handleCalendarButton2}>Cardiology</button>
      <button type="button" onClick={handleCalendarButton3}>Dermatology</button>
      {generalMedicineComponent && <GeneralMedicine />}
      {cardiologyComponent && <Cardiology />}
      {dermatologyComponent && <Dermatology />}
      
      
      </form>
      <button type="button" onClick={handleOnClick}>Proceed to payment</button>
      
    </div>
    
    )
}

export default MainComponent;