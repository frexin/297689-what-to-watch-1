const getRatingDescription = (rating) => {
  let result = null;

  if (rating <= 3) {
    result = `bad`;
  } else if (rating > 3 && rating <= 5) {
    result = `normal`;
  } else if (rating > 5 && rating <= 8) {
    result = `good`;
  } else if (rating > 9 && rating <= 10) {
    result = `very good`;
  } else if (rating === 10) {
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

  return`${hours}h ${minutes}m`;
};

const formatPlayerDuration = (durationInMinutes) => {
  const {hours, minutes} = splitToMinutesAndHours(durationInMinutes);

  return `${hours}:${minutes}:00`;
};

export {getRatingDescription, formatDuration, formatPlayerDuration};
