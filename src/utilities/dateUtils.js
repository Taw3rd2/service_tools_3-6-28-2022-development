import {
    setMilliseconds,
    setSeconds,
    setMinutes,
    setHours,
    format,
    parse,
    getUnixTime
  } from "date-fns";
  
  //called in create dispatch
  export const setDateToZeroHours = (date) => {
    const newHours = setHours(date, 0);
    const newMin = setMinutes(newHours, 0);
    const newSeconds = setSeconds(newMin, 0);
    const newMillis = setMilliseconds(newSeconds, 0);
    return newMillis;
  };
  
  //called in ClientActivityPage
  export const getFormattedTime = (date) => {
    if (Object.prototype.toString.call(date) === "[object Date]") {
      const newDateTime = format(date, "h:mm:ss aaa");
      return newDateTime;
    } else {
      const newDate = date.toDate();
      const newTime = format(newDate, "h:mm:ss aaa");
      return newTime;
    }
  };
  
  //called in EquipmentList
  export const getFormattedDate = (date) => {
    if (date !== null) {
    if (Object.prototype.toString.call(date) === "[object Date]") {
      const newDateTime = format(date, "MMM, dd, yyyy");
      return newDateTime;
    } else {
      const newDate = date.toDate();
      const newTime = format(newDate, "MMM, dd, yyyy");
      return newTime;
    }
  } else return "Not done yet"
  };
  
  //called in ClientActivity
  export const getFormattedDateAndTime = (date) => {
    if (Object.prototype.toString.call(date) === "[object Date]") {
      const newDateTime = format(date, "MMM, dd, yyyy h:mm:ss aaa");
      return newDateTime;
    } else {
      const newDate = date.toDate();
      const newTime = format(newDate, "MMM, dd, yyyy h:mm:ss aaa");
      return newTime;
    }
  };
  
  export const getDateFromString = (string) => {
    return parse(string,"MMM, dd, yyyy",new Date())
  }
  
  export const getUnixFromDate = (date) => {
    return getUnixTime(date)
  }