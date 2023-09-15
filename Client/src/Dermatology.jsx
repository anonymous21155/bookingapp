import React, {useState, useContext} from "react";
import { Calendar } from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Timepicker from "react-time-picker"
import ServiceContext from "./ContextObject";
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';
import "./Dermatology.css";

function Dermatology () {
    const [value, setValue] = useState(new Date());
    const [calendarData, setCalendarData] = useState(false);
    const [time, setTime] = useState("10:00");
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
    const serverData = {
      time: time,
      date: value
    }
    function handleOnChange(nextValue) {
        setValue(nextValue);
    }
    
    const disableDays = ({ date }) => [0, 1, 2, 4, 6].includes(date.getDay());
    
    function handleOnClick () {
        setCalendarData(prevCalendarData => !prevCalendarData); 
        setServieSelected('Dermatology')
        setDoctorSelected('Dr Angela')
    }
    function handleServerData () {
      fetch('http://localhost:1337/bookings', { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(serverData)})
    }
    return (
      
        <div>
          <button type="button" onClick={handleOnClick}>Dermatology</button>
      {calendarData && 
        <form>
        <Calendar onChange={handleOnChange} value={value} tileDisabled={disableDays} />
        {offDays.wednesday && <Timepicker onChange={setTime} value={time}  minTime="14:00:00" maxTime="18:00:00" />}
        {offDays.friday && <Timepicker onChange={setTime} value={time}  minTime="09:00:00" maxTime="12:30:00" />} 
        <label htmlFor="dermatology">Please select a doctor:</label>
        <select id="dermatology" name="doctor" onChange={handleServerData}>
        <option>Please select a doctor</option>
        <option>Dr Angela</option>
        </select>
        <label htmlFor="amount">Amount to pay:</label>
        <input type="number" id="amount" name="amount" value="300" className="no-box"/>
        <span>₹</span>
        </form>
      } 
        </div>
          
    )
}

export default Dermatology;