import React, {useState} from "react";
import { Calendar } from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Timepicker from "react-time-picker"
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';
import "./Dermatology.css";

function GeneralMedicine () {
    const [value, setValue] = useState(new Date());
    const [calendarData, setCalendarData] = useState(false);
    const [time, setTime] = useState("10:00");
    const [alvaroSelected, setAalvaroSelected] = useState(false);
    const [hennahSelected, setHennahSelected] = useState(false);
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
    }
    
    function handleDrFees (e) {
      const doctor = e.target.value;
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
           <button type="button" onClick={handleOnClick}>General Medicine</button>
      {calendarData && 
        <form>
        <Calendar onChange={handleOnChange} value={value} />
        <Timepicker onChange={setTime} value={time}  maxTime="18:00:00" minTime="09:00:00"/>
          <label htmlFor="GM">Please select a doctor:</label>
          <select id="GM" name="Doctor" onChange={handleDrFees}>
            {!offDays.sunday && !offDays.thursday && <option>Dr Jhon</option>} 
            <option>Dr Smith</option>
            {!offDays.saturday && !offDays.saturday && <option>Dr Hennah</option>}
            {!offDays.tuesday && <option>Dr Alvaro</option>}
            {!offDays.friday && <option>Dr Hari</option>}
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