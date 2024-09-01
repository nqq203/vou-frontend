export const convertInputToSave = (date) => {
    if (!date) return '';
    const pad = (num) => String(num).padStart(2, '0');
    const padMilliseconds = (num) => String(num).padStart(3, '0');
    
    const year = date.getUTCFullYear();
    const month = pad(date.getUTCMonth() + 1);
    const day = pad(date.getUTCDate());
    const hours = pad(date.getUTCHours());
    const minutes = pad(date.getUTCMinutes());
    const seconds = pad(date.getUTCSeconds());
    const milliseconds = padMilliseconds(date.getUTCMilliseconds());
    
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}+00:00`;
};

export const convertDataToOutput = (dateString) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return null;
    };
  
    return date
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
  console.log(today)
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

  // if (year1 < year2 || (year1 === year2 && month1 < month2) || (year1 === year2 && month1 === month2 && day1 < day2)) {
  //   return "done";
  // } else if (year1 > year2 || (year1 === year2 && month1 > month2) || (year1 === year2 && month1 === month2 && day1 > day2)) {
  //   return "pending";
  // }
  //   return "active";

  if(yearToday < yearStart || (yearToday === yearStart && monthToday < monthStart) 
    || (yearToday === yearStart && monthToday < monthStart && dayToday < dayStart) ){
      return "pending";
  } else if(yearToday > yearEnd || (yearToday === yearEnd && monthToday > monthEnd) 
    || (yearToday === yearEnd && monthToday < monthEnd && dayToday > dayEnd) ){
      return "done";
  }
  return "active";
}