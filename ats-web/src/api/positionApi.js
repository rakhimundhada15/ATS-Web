import { handleResponse, handleError } from "./apiUtils";
// const baseUrl = process.env.REACT_APP_API_URL + "/positions/";
const baseUrl = "http://13.233.58.211:7000/positions";
export function getPositions() {
  return fetch(baseUrl)
    .then(handleResponse)
    .catch(handleError);
}

export function getPosition(id) {
  return fetch(baseUrl + '/' + id)
    .then(handleResponse)
    .catch(handleError);
}

export function savePosition(position) {
  return fetch(baseUrl + (position.id ? "/update/"+position.id: ""), {
    method: position.id ? "PUT" : "POST", // POST for create, PUT to update when id already exists.
    headers: { "content-type": "application/json" },
    body: JSON.stringify(position)
  })
    .then(handleResponse)
    .catch(handleError);
}

export function deletePosition(positionId) {
  return fetch(baseUrl + positionId, { method: "DELETE" })
    .then(handleResponse)
    .catch(handleError);
}
