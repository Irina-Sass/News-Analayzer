function determineDate(startDate, days) {
  const date = new Date(startDate);
  date.setDate(date.getDate() - days);
  return date;
}

function convertDateToUTC(date) {
  return new Date(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate(),
    date.getUTCHours(),
    date.getUTCMinutes(),
    date.getUTCSeconds()
  );
}

function formatDateFull(str) {
  const date = convertDateToUTC(new Date(str));
  const monthArray = [
    'января',
    'февраля',
    'марта',
    'апреля',
    'мая',
    'июня',
    'июля',
    'августа',
    'сентября',
    'октября',
    'ноября',
    'декабря',
  ];
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  return `${day} ${monthArray[month]}, ${year}`;
}

function getMonthString(date) {
  return date.toLocaleString('ru', { month: 'long' });
}

function formatDateShort(date) {
  const dayArray = ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'];
  const weekday = date.getDay();
  const day = date.getDate();
  return `${day}, ${dayArray[weekday]}`;
}

export {
  determineDate,
  convertDateToUTC,
  formatDateFull,
  getMonthString,
  formatDateShort,
};
