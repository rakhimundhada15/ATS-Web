import { handleResponse, handleError } from "./apiUtils";
const baseUrl = "http://13.233.58.211:7000/";

export async function getEmployees() {
  try {
    let handleRes = await fetch(baseUrl+"/employees");
    return handleResponse(handleRes);
  }
  catch (handleErr) {
    return handleError(handleErr);
  }
}