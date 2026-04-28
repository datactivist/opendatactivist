export const toCollection = (data) => {
  if (Array.isArray(data)) {
    return data;
  }

  if (data && typeof data === 'object') {
    return Object.values(data);
  }

  return [];
};

export const toIdMap = (data) =>
  toCollection(data).reduce((accumulator, item) => {
    if (item?.id) {
      accumulator[item.id] = item;
    }

    return accumulator;
  }, {});

export const getItemById = (data, id) => {
  if (!id) {
    return null;
  }

  return toIdMap(data)[id] ?? null;
};
