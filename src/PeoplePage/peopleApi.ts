import { baseURL } from '../constants';

export const peopleApi = {
  getAllPeople,
  getPeopleById
};

function getAllPeople(queryParams = {}) {
  const searchParamsString = new URLSearchParams(queryParams).toString();
  let url = `${baseURL}/people`;

  if (searchParamsString.length) {
    url += `?${searchParamsString}`;
  }

  return fetch(url);
}

function getPeopleById(peopleId: string) {
  return fetch(`${baseURL}/people/${peopleId}`);
}
