// get date and shorten it
export const eventDate = (event) => {
  return new Date(event.slice(0, 10))
              .toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

// get the start and end times for an event
export const getTime = (str) => {
  const dateObj = new Date(str);
  const hours = dateObj.getHours();
  const minutes = dateObj.getMinutes();
  const ampm = hours >= 12 ? 'pm' : 'am';
  let nonMilitaryTime;

  if (hours === 0) {
    nonMilitaryTime = 12;
  } else if (hours > 12) {
    nonMilitaryTime = hours - 12;
  } else {
    nonMilitaryTime = hours;
  }

  const time = `${nonMilitaryTime}:${minutes < 10 ? '0' : ''}${minutes} ${ampm}`;

  return time;
}

// shorten address
export const getAddress =(addr) => {
  let lines = addr.split('\n');
  let street = lines[0];
  let cityStateZip = lines[1];
  let endIndex = cityStateZip.lastIndexOf(' ');
  let cityState = cityStateZip.substring(0, endIndex);
  let zip = cityStateZip.substring(endIndex + 1);

  return `${street} ${cityState} ${zip}`;
}


// return google maps link for address
export const addressToMap = (str) => {
  const MAP_URL = 'https://www.google.com/maps/place'
  const addr = str.split(' ').join('+');

  return `${MAP_URL}/${addr}`;
}