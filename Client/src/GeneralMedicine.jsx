import React, {useState, useContext, useMemo} from "react";
import { Calendar } from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Timepicker from "react-time-picker"
import ServiceContext from "./ContextObject";
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';
import "./Dermatology.css";

function GeneralMedicine () {
    const [value, setValue] = useState(new Date());
    const [calendarData, setCalendarData] = useState(false);
    const [time, setTime] = useState("10:00");
    const [alvaroSelected, setAalvaroSelected] = useState(false);
    const [hennahSelected, setHennahSelected] = useState(false);
    const [availability, setAvailability] = useState({
      jhonAvailability: true,
      hariAvailability: true,
      smithAvailability: true
    });
    const { setServieSelected, setDoctorSelected } = useContext(ServiceContext);
    
    
    const serverData = {
      time: time.toString(),
      date: value
    }
    
    
    
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
    
    function handleOnClick () {
      setCalendarData(prevCalendarData => !prevCalendarData);
      setServieSelected('GeneralMedicine');
      console.log(setServieSelected);
      fetch('http://localhost:1337/service', { method: 'POST', headers: { 'Content-Type': 'application/json'}, body: JSON.stringify({ Service: 'GeneralMedicine' })})
    }

   async function handleChangeOnTime (newTime) {
      setTime(newTime);
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
    
    const serverTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      console.log(`Server Timezone: ${serverTimezone}`);
    return (
      
         <div>
           <button type="button" onClick={handleOnClick}>General Medicine</button>
      {calendarData && 
        <form>
        <Calendar onChange={handleOnChange} value={value}  minDate={new Date()}/>
        <Timepicker onChange={handleChangeOnTime} value={time} minTime="09:00:00" maxTime="17:00:00" />
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
        
      } 
        </div>
      
        
    )
}

export default GeneralMedicine;