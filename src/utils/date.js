export const convertInputToSave = (date) => {
    if (!date) return '';

    const pad = (num) => String(num).padStart(2, '0');
    const padMilliseconds = (num) => String(num).padStart(3, '0');

    // Use local time values
    const year = date.getFullYear();
    const month = pad(date.getMonth() + 1);
    const day = pad(date.getDate());
    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());
    const seconds = pad(date.getSeconds());
    const milliseconds = padMilliseconds(date.getMilliseconds());
    
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}+07:00`;
};

export const convertDataToOutput = (dateString) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return null;
    }
  
    // Vietnam timezone is UTC+7
    const vietnamTimezoneOffset = 7 * 60; // in minutes
  
    // Get the current UTC offset in minutes and adjust for Vietnam's timezone
    const utcOffsetInMinutes = date.getTimezoneOffset();
    const adjustedDate = new Date(date.getTime() + (utcOffsetInMinutes + vietnamTimezoneOffset) * 60 * 1000);
  
    return adjustedDate;
};

export const convertDataToOutputString = (dateString) => {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    return null;
  };

  const formattedDate = date.toLocaleDateString("en-GB");

  return formattedDate;
};

// Return number meaning:
//  0 : active
//  -1: done
//  1: pending
export const compareDates = (startDate,endDate) => {
  const today = new Date();
  const eventStartDate = new Date(startDate);
  const eventEndDate = new Date(endDate);

  const dayStart = eventStartDate.getDate();
  const monthStart = eventStartDate.getMonth();
  const yearStart = eventStartDate.getFullYear();

  const dayEnd = eventEndDate.getDate();
  const monthEnd = eventEndDate.getMonth();
  const yearEnd = eventEndDate.getFullYear();

  const dayToday = today.getDate();
  const monthToday = today.getMonth();
  const yearToday = today.getFullYear();

  if(yearToday < yearStart || (yearToday === yearStart && monthToday < monthStart) 
    || (yearToday === yearStart && monthToday === monthStart && dayToday < dayStart) ){
      return "pending";
  } else if(yearToday > yearEnd || (yearToday === yearEnd && monthToday > monthEnd) 
    || (yearToday === yearEnd && monthToday === monthEnd && dayToday > dayEnd) ){
      return "done";
  }
  return "active";
}