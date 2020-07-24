const methods = {
  filterArray: (list, filters) => {
    let filteredList = list;

    if (filters.name && filteredList.length) {
      filteredList = filteredList.filter(
        listElem => listElem.name.toLowerCase().indexOf(filters.name.toLowerCase()) > -1
      );
    }

    if (filters.gender && filteredList.length) {
      filteredList = filteredList.filter(
        listElem => listElem.gender === filters.gender
      );
    }

    if (
      filters["eye-color"] &&
      filters["eye-color"].length &&
      filteredList.length
    ) {
      filteredList = filteredList.filter(
        listElem => filters["eye-color"].indexOf(listElem.eyeColor) > -1
      );
    }

    if (
      filters["prefered-pet"] &&
      filters["prefered-pet"].length &&
      filteredList.length
    ) {
      filteredList = filteredList.filter(
        listElem =>
          filters["prefered-pet"].indexOf(listElem.preferences.pet) > -1
      );
    }

    if (
      filters["prefered-fruit"] &&
      filters["prefered-fruit"].length &&
      filteredList.length
    ) {
      filteredList = filteredList.filter(
        listElem =>
          filters["prefered-fruit"].indexOf(listElem.preferences.fruit) > -1
      );
    }

    if (filters.age && filters.age.length && filteredList.length) {
      filteredList = filteredList.filter(listElem => listElem.age >= filters.age[0] && listElem.age <= filters.age[1]);
    }

    return filteredList;
  }
};

export default {
  methods
};
