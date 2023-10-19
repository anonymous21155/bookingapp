import React, {useState, useContext, useEffect} from "react";
import { Calendar } from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Timepicker from "react-time-picker"
import ServiceContext from "./ContextObject";
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';
import "./Dermatology.css";

function GeneralMedicine () {
    const [value, setValue] = useState(new Date());
    const [time, setTime] = useState("10:00");
    const [alvaroSelected, setAalvaroSelected] = useState(false);
    const [hennahSelected, setHennahSelected] = useState(false);
    const [availability, setAvailability] = useState({
      jhonAvailability: true,
      hariAvailability: true,
      smithAvailability: true
    });
    const setDoctorSelected = useContext(ServiceContext);
    useEffect(() => {
      const fetchData = async () => {
        await fetch('http://localhost:1337/bookings', { method: 'POST', headers: { 'Content-Type': 'application/json'}, body: JSON.stringify(serverData) })
        const response =  await fetch('http://localhost:1337/availability', { method: 'GET', headers: { 'Content-Type': 'application/json'}}).then((res) => res.json())
        if (response.jhonStatus === true) {
          const updatedAvailability = {
            ...availability,
            jhonAvailability: false
          }
           setAvailability(updatedAvailability);
        } else if (response.smithStatus === true) {
          const updatedAvailability = {
            ...availability,
            smithAvailability: false
          }
          setAvailability(updatedAvailability);
        } else if (response.hariStatus === true) {
          const updatedAvailability = {
            ...availability,
            hariAvailability: false
          }
          setAvailability(updatedAvailability);
        }
      }
      fetchData();
      
    },[time])
    
    const serverData = {
      time: time.toString(),
      date: value
    }
    
    console.log(serverData);
    
    const offDays = {
      sunday: value.getDay() === 0,
      monday: value.getDay() === 1,
      tuesday: value.getDay() === 2,
      wednesday: value.getDay() === 3,
      thursday: value.getDay() === 4,
      friday: value.getDay() === 5,
      saturday: value.getDay() === 6
    }


    function handleOnChange(nextValue) {
      setValue(nextValue);
    }
    
    

   
    
    function handleDrFees (e) {
      const doctor = e.target.value;
      setDoctorSelected(doctor);
      
      
      if (doctor === "Dr Alvaro") {
        setAalvaroSelected(true);
      } else {
        setAalvaroSelected(false);
      }
      if (doctor === "Dr Hennah") {
        setHennahSelected(true);
      } else {
        setHennahSelected(false);
      }
    }
    
    return (
      
         <div>
           
      
        <form>
        <Calendar onChange={handleOnChange} value={value}  minDate={new Date()}/>
        <Timepicker onChange={setTime} value={time} minTime="09:00:00" maxTime="17:00:00" />
          <label htmlFor="GM">Please select a doctor:</label>
          <select id="GM" name="Doctor" onChange={handleDrFees}>
            <option>Please select a doctor</option>
            {!offDays.sunday && !offDays.thursday && availability.jhonAvailability && <option>Dr Jhon</option>} 
            {availability.smithAvailability && <option>Dr Smith</option>}
            {!offDays.saturday && !offDays.saturday && <option>Dr Hennah</option>}
            {!offDays.tuesday && <option>Dr Alvaro</option>}
            {!offDays.friday && availability.hariAvailability && <option>Dr Hari</option>}
          </select>
          <label htmlFor="amount">Amount to pay:</label>
          {(!alvaroSelected && !hennahSelected) && <input type="number" id="amount" name="amount" value="200" className="no-box"/>}
          {alvaroSelected  && <input type="number" id="amount" name="amount" value="250" className="no-box"/>  }
          {hennahSelected && <input type="number" id="amount" name="amount" value="350" className="no-box"/>}
          <span>₹</span>
        </form>
        
       
        </div>
      
        
    )
}

export default GeneralMedicine;