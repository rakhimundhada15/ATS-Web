import { handleResponse, handleError } from "./apiUtils";
const baseUrl = "http://13.233.58.211:5000/candidates";

export async function getCandidates() {
  try {
    let handleRes = await fetch(baseUrl);
    return handleResponse(handleRes);
  }
  catch (handleErr) {
    return handleError(handleErr);
  }
}

export async function getCandidate(id) {
  try {
    let handleRes = await fetch(baseUrl + "/" + id);
    return handleResponse(handleRes);
  }
  catch (handleErr) {
    return handleError(handleErr);
  }
}

export function saveCandidate(candidate) {
  return fetch(baseUrl + (candidate.id ? "/"+candidate.id: ""), {
    method: candidate.id ? "PUT" : "POST", // POST for create, PUT to update when id already exists.
    headers: { "content-type": "application/json" },
    body: JSON.stringify(candidate)
  })
    .then(handleResponse)
    .catch(handleError);
}

export function deleteCandidate(candidateId) {
  return fetch(baseUrl + candidateId, { method: "DELETE" })
    .then(handleResponse)
    .catch(handleError);
}
