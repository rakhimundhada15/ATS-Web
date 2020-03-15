import { handleResponse, handleError } from "./apiUtils";
const baseUrl = "http://13.233.58.211:4000/interviews";

export async function getScheduleInterviewList() {
  try {
    let handleRes = await fetch(baseUrl);
    return handleResponse(handleRes);
  }
  catch (handleErr) {
    return handleError(handleErr);
  }
}

export function setScheduleInterview(scheduleDetails) {
    return fetch(baseUrl + '/schedule', {
      method:   "POST", // POST for create, PUT to update when id already exists.
      headers: { "content-type": "application/json" },
      body: JSON.stringify(scheduleDetails)
    })
      .then(handleResponse)
      .catch(handleError);
  }