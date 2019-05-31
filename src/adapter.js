import camelcase from 'camelcase';

const adapter = (items) => {
  const result = [];

  for (let item of items) {
    const transformed = {};

    for (let key in item) {
      if (item.hasOwnProperty(key)) {
        let camelKey = camelcase(key);
        transformed[camelKey] = item[key];
      }
    }

    result.push(transformed);
  }

  return result;
};

export default adapter;
