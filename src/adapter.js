import camelcase from 'camelcase';

const adapter = (items) => {

  function extractObject(item) {
    const transformed = {};

    for (let key in item) {
      if (item.hasOwnProperty(key)) {
        const camelKey = camelcase(key);
        transformed[camelKey] = item[key];
      }
    }

    return transformed;
  }

  if (Array.isArray(items)) {
    const result = [];

    for (let item of items) {
      result.push(extractObject(item));
    }

    return result;
  } else {
    return extractObject(items);
  }
};

export default adapter;
