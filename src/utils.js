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

export {getRatingDescription};
