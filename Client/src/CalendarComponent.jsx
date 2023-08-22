import React, { useState } from "react";
import { Calendar } from "react-calendar";
import Timepicker from "react-time-picker"
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';

function CalendarComponent() {
  const [value, setValue] = useState(new Date());
  const [time, setTime] = useState("10:00")
  const [calendarData, setCalendarData] = useState({
    generalMedicine: false,
    cardiology: false,
    dermatology: false,
  });

  // disable a particular day for a service being not selected
  const disableWeekend = ({ date }) => date.getDay() === 0 || date.getDay() === 6;
  const disableDays = ({ date }) => date.getDay() === 0 || date.getDay() === 6 || [1, 2, 4].includes(date.getDay());
  
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

  // Handles which calender to mount and unmount on selecting a button
  function handleEventToggle(eventType) {
    setCalendarData((prevData) => {
      const updatedData = Object.keys(prevData).reduce((acc, key) => {
        acc[key] = key === eventType ? !prevData[key] : false;
        return acc;
      }, {});
      return updatedData;
    });
  }
  
  return (
    <div>
      <button onClick={() => handleEventToggle("generalMedicine")}>General Medicine</button>
      {calendarData.generalMedicine && 
        <>
        <Calendar onChange={handleOnChange} value={value} />
        <Timepicker onChange={setTime} value={time} amPmAriaLabel="Select AM/PM" maxTime="18:00:00" minTime="09:00:00"/>
        <form>
          <label for="GM">Please select a doctor:</label>
          <select id="GM" name="Doctor">
            {!offDays.sunday && !offDays.thursday && <option>Dr Jhon</option>} 
            <option>Dr Smith</option>
            {!offDays.saturday && !offDays.saturday && <option>Dr Hennah</option>}
            {!offDays.tuesday && <option>Dr Alvaro</option>}
            {!offDays.friday && <option>Dr Hari</option>}
          </select>
        </form>
        </>
      }
      <button onClick={() => handleEventToggle("cardiology")}>Cardiology</button>
      {calendarData.cardiology && 
        <>
        <Calendar onChange={handleOnChange} value={value} tileDisabled={disableWeekend} />
        <Timepicker onChange={setTime} value={time} amPmAriaLabel="Select AM/PM" minTime="12:00:00" maxTime="21:00:00"/>
        <form>
          <label for="cardiology">Please select a doctor:</label>
          <select id="cardiology" name="doctor">
          {!offDays.sunday && !offDays.thursday && <option>Dr Jhon</option>}
          {!offDays.monday && <option>Dr Rizwan</option>}
          </select>
        </form>
        </>
      }
      <button onClick={() => handleEventToggle("dermatology")}>Dermatology</button>
      {calendarData.dermatology && 
        <>
        <Calendar onChange={handleOnChange} value={value} tileDisabled={disableDays} />
        <Timepicker onChange={setTime} value={time} amPmAriaLabel="Select AM/PM" minTime="15:00:00" maxTime="23:00:00" />
        <form>
        <label for="dermatology">Please select a doctor:</label>
        <select id="dermatology" name="doctor">
        <option>Dr Angela</option>
        </select>
        </form>
        </>
      }
    </div>
  );
}

export default CalendarComponent;
