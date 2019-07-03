import {RATINGS} from './consts.js';

const getRatingDescription = (rating) => {
  let result = null;

  if (rating <= RATINGS.LOW) {
    result = `bad`;
  } else if (rating > RATINGS.LOW && rating <= RATINGS.NORMAL) {
    result = `normal`;
  } else if (rating > RATINGS.AVERAGE && rating <= RATINGS.GOOD) {
    result = `good`;
  } else if (rating > RATINGS.GOOD && rating <= RATINGS.VERY_GOOD) {
    result = `very good`;
  } else if (rating === RATINGS.VERY_GOOD) {
    result = `awesome`;
  }

  return result;
};

function splitToMinutesAndHours(durationInMinutes) {
  const hours = Math.floor(durationInMinutes / 60);
  const minutes = Math.floor(durationInMinutes % 60);

  return {hours, minutes};
}

const formatDuration = (durationInMinutes) => {
  const {hours, minutes} = splitToMinutesAndHours(durationInMinutes);

  return `${hours}h ${minutes}m`;
};

const formatPlayerDuration = (durationInMinutes) => {
  const {hours, minutes} = splitToMinutesAndHours(durationInMinutes);

  return `${hours}:${minutes}:00`;
};

export {getRatingDescription, formatDuration, formatPlayerDuration};
