import { handleResponse, handleError } from "./apiUtils";
import * as CandidateService from '../services/candidates';
const baseUrl = process.env.REACT_APP_API_URL + "/candidates/";


export function getCandidates() {
 return CandidateService.getCandidateToList();
  // return fetch(baseUrl)
  //   .then(handleResponse)
  //   .catch(handleError);
}

export function getCandidateById(candidateId) {
  return CandidateService.getCandidateById(candidateId);
  // return fetch(baseUrl)
  //   .then(handleResponse)
  //   .catch(handleError);
}

export async function getCandidate(id) {
  return {
    emailAddress: "abc123@niyuj.com" ,
    phoneNumber: "98********",
    location:  "EastUS",
    firstName:  "abc",
    experience: "5",
    middleName: "def",
    skillSet: "algorithms",
    lastName:  "xyz",
    referrer: "pqr",
};
  // try {
  //   let handleResponse = await fetch(baseUrl + "/id");
  //   return handleResponse(handleResponse);
  // }
  // catch (handleError) {
  //   return handleError(handleError);
  // }
}

export function saveCandidate(candidate) {
  return CandidateService.addCandidate(candidate);
  // return fetch(baseUrl + (candidate.id || ""), {
  //   method: candidate.id ? "PUT" : "POST", // POST for create, PUT to update when id already exists.
  //   headers: { "content-type": "application/json" },
  //   body: JSON.stringify(candidate)
  // })
  //   .then(handleResponse)
  //   .catch(handleError);
}

export function deleteCandidate(candidateId) {
  return fetch(baseUrl + candidateId, { method: "DELETE" })
    .then(handleResponse)
    .catch(handleError);
}
