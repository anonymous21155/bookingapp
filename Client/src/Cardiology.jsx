import React, {useState, useContext, useMemo} from "react";
import { Calendar } from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Timepicker from "react-time-picker";
import ServiceContext from "./ContextObject";
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';
import "./Dermatology.css"

function Cardiology () {
    const [value, setValue] = useState(new Date());
    const [calendarData, setCalendarData] = useState(false);
    const [time, setTime] = useState("10:00");
    const [availability, setAvailability] = useState({
      jhonAvailability: true,
      rizwanAvailability: true
    });
    const { setServieSelected, setDoctorSelected } = useContext(ServiceContext);
    
    
    
    const offDays = {
      sunday: value.getDay() === 0,
      monday: value.getDay() === 1,
      tuesday: value.getDay() === 2,
      wednesday: value.getDay() === 3,
      thursday: value.getDay() === 4,
      friday: value.getDay() === 5,
      saturday: value.getDay() === 6
    }
    const offTime = {
      jhonOnMonday: value.getDay() === 1 && time >= "09:00" && time <= "18:00",
      jhonOnTuesday: value.getDay() === 2 && time >= "09:00" && time <= "13:00",
      rizwanOnTuesday: value.getDay() === 2 && time >= "14:00" && time <= "18:00",
      jhonOnWednesday: value.getDay() === 3 & time >= "14:00" && time < "19:00",
      rizwanOnWednesday: value.getDay() === 3 && time >= "08:00" && time <= "12:00",
      rizwanOnThursday: value.getDay() === 4 && time >= "09:00" && time <= "17:00",
      jhonOnFriday: value.getDay() === 5 && time >= "09:00" && time <= "14:00",
      rizwanOnFriday: value.getDay() === 5 && time >= "13:00" && time <= "18:00"
    }
    const serverData = {
      time: time,
      date: value
    }
    
    function handleOnChange(nextValue) {
      setValue(nextValue);
    }

    const disableWeekend = ({ date }) => date.getDay() === 0 || date.getDay() === 6;

    function handleOnClick () {
      setCalendarData(prevCalendarData => !prevCalendarData);
      setServieSelected("Cardiology")
      fetch('http://localhost:1337/service', { method: 'POST', headers: { 'Content-Type': 'application/json'}, body: JSON.stringify({ Service: 'Cardiology' })})
    }
    
    function handleChange (e) {
       const doctor = e.target.value;
       setDoctorSelected(doctor)
       
    }
    async function handleChangeOnTime (newTime) {
      setTime(newTime);
      
       fetch('http://localhost:1337/bookings', { method: 'POST', headers: { 'Content-Type': 'application/json'}, body: JSON.stringify(serverData) })
      
      const response =  await fetch('http://localhost:1337/availability', { method: 'GET', headers: { 'Content-Type': 'application/json'}}).then((res) => res.json());
      console.log(`tt: ${response.jhonStatus}, ${response.rizwanStatus} `);
      console.log(availability);
      if (response.jhonStatus === true) {
        const updatedAvailability = {
          ...availability,
          jhonAvailability: false
        }
        setAvailability(updatedAvailability);
     } 
     if (response.rizwanStatus === true) {
      const updatedAvailability = {
        ...availability,
        rizwanAvailability: false
      }
        setAvailability(updatedAvailability);
     } 
     
    }
    
    
   return (
    
    <div>
      <button type="button" onClick={handleOnClick}>Cardiology</button>
      {calendarData && 
        <>
        <form>
          <Calendar onChange={handleOnChange} value={value} tileDisabled={disableWeekend}  minDate={new Date()}/>
          <Timepicker onChange={handleChangeOnTime} value={time}  minTime="09:00:00" maxTime="17:00:00" />
          <label htmlFor="cardiology">Please select a doctor:</label>
          <select id="cardiology" name="doctor" onChange={handleChange}>
          <option>Please select a doctor</option>
          {(!offDays.sunday && !offDays.thursday) && ( offTime.jhonOnMonday || offTime.jhonOnTuesday || offTime.jhonOnWednesday || offTime.jhonOnFriday) && availability.jhonAvailability ? <option value="Dr jhon">Dr Jhon</option> : null}
          {(!offDays.monday)  && (offTime.rizwanOnTuesday || offTime.rizwanOnWednesday || offTime.rizwanOnThursday || offTime.rizwanOnFriday) && availability.rizwanAvailability ? <option value="Dr Rizwan">Dr Rizwan</option> : null}
          </select>
        <label htmlFor="amount">Amount to pay:</label>
        <input id="amount" name="amount" value="500" type="number" className="no-box"></input>
        <span>₹</span>
        </form>
        </>
      }
    </div>
    
   ) 
}

export default Cardiology;

