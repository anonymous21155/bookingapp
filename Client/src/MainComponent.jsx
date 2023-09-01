import React from "react";
import Dermatology from "./Dermatology";
import Cardiology from "./Cardiology";
import GeneralMedicine from "./GeneralMedicine";
import { useNavigate } from "react-router-dom";


function MainComponent ({ setMail }) {
    
    const navigate = useNavigate();
    function handleOnChange (e) {
        const mailid = e.target.value;
        setMail(mailid);
    }
    function handleOnClick () {
        navigate("/Payment")
    }
    
    return (
      
        <div className="App">
      <form>
      <label htmlFor="username" >Name:</label>
      <input type="text" id="username" name="username"></input>
      <label htmlFor="email">Email:</label>
      <input type="text" id="email" name="email" onChange={handleOnChange} placeholder="someone@example.com"></input>
      <GeneralMedicine />
      <Cardiology />
      <Dermatology />
      
      </form>
      <button type="button" onClick={handleOnClick}>Proceed to payment</button>
      
    </div>
    
    )
}

export default MainComponent;