import React, {useState, useContext, useEffect} from "react";
import { Calendar } from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Timepicker from "react-time-picker"
import ServiceContext from "./ContextObject";
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';
import "./Dermatology.css";

function Dermatology () {
    const [value, setValue] = useState(new Date());
    const [time, setTime] = useState("10:00");
    const setDoctorSelected = useContext(ServiceContext);
    const [availability, setAvailability] = useState(true);
    useEffect(() => {
      const fetchData = async() => {
       await  fetch('http://localhost:1337/bookings', { method: 'POST', headers: { 'Content-Type': 'application/json'}, body: JSON.stringify(serverData) })
      const response = await  fetch('http://localhost:1337/availability', { method: 'GET', headers: { 'Content-Type': 'application/json'}}).then((res) => res.json())
      console.log(`k:${response.angelaStatus}`);
      if (response.angelaStatus === true) {
        setAvailability(false);
     }
      }
      fetchData();
    },[time])
    console.log(time, availability);
    const offDays = {
        sunday: value.getDay() === 0,
        monday: value.getDay() === 1,
        tuesday: value.getDay() === 2,
        wednesday: value.getDay() === 3,
        thursday: value.getDay() === 4,
        friday: value.getDay() === 5,
        saturday: value.getDay() === 6
      }
      const serverData = {
        time: time.toString(),
        date: value
      }
    
    function handleOnChange(nextValue) {
        setValue(nextValue);
    }
    
    const disableDays = ({ date }) => [0, 1, 2, 4, 6].includes(date.getDay());
    
    function handleOnClick () {
       
        setDoctorSelected('Dr Angela')
    }
    

    return (
      
        <div>
          
      
        <form>
        <Calendar onChange={handleOnChange} value={value} tileDisabled={disableDays}  minDate={new Date()}/>
        {offDays.wednesday && <Timepicker onChange={setTime} value={time}   minTime="14:00:00" maxTime="18:00:00" />}
        {offDays.friday && <Timepicker onChange={setTime} value={time}   minTime="09:00:00" maxTime="12:30:00" />} 
        <label htmlFor="dermatology">Please select a doctor:</label>
        <select id="dermatology" name="doctor" onChange={handleOnClick}>
        <option>Please select a doctor</option>
        { availability && <option>Dr Angela</option>}
        </select>
        <label htmlFor="amount">Amount to pay:</label>
        <input type="number" id="amount" name="amount" value="300" className="no-box"/>
        <span>₹</span>
        </form>
       
        </div>
          
    )
}

export default Dermatology;