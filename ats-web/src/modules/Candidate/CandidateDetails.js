import * as resources from '../../components/common/resources';
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const phoneNoRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
const nameRegex = /^[A-Za-z ]+$/;
const errorMessages = resources.errorMessages();

export const validate = (candidateDetailErrors, elementName, elementValue) => {
    let error = null;
    elementValue = typeof(elementValue) === "string" ? elementValue.trim() : elementValue;
    switch (elementName) {
        case "email":
            error = validateEmail(elementValue);
            break;
        case "mobileNumber":
            error = validatePhoneNumber(elementValue);
            break;
        case "firstName":
            error = validateFirstName(elementValue);
            break;
        case "middleName":
        case "lastName":
            error = validateName(elementValue);
            break;
        case "source":
        case "referrer":
        case "location":
        case "status":
        case "currentOrganisation":
        case "noticePeriod":
            error = validateRequiredFields(elementValue);
            break;
        case "currentCtc":
        case "expectedCtc":
            error = validateCtc(elementValue);
            break;
        case "skills":
            error = validateSkills(elementValue);
            break;
    }
    // console.log(elementName, elementValue, error);
    if (error) {
        candidateDetailErrors[elementName] = error;
     }else{
         delete candidateDetailErrors[elementName];
     }
    return candidateDetailErrors;
}

const validateEmail = (email) => {
    if (!email || email === "") {
        return errorMessages.requiredFieldError;
    }

    if (!emailRegex.test(String(email).toLowerCase())) {
        return errorMessages.invalidEmailError;
    }
}

const validatePhoneNumber = (mobileNumber) => {
    if (!mobileNumber || mobileNumber === "") {
        return errorMessages.requiredFieldError;
    }
    if (!phoneNoRegex.test(mobileNumber)) {
        return errorMessages.invalidPhoneNumberError;
    }
}

const validateFirstName = (firstName) => {
    if (!firstName || firstName === "") {
        return errorMessages.requiredFieldError;
    }
    if (!nameRegex.test(firstName)) {
        return errorMessages.invalidNameError;
    }
}

const validateName = (name) => {
    if (name && name !== "" && !nameRegex.test(name)) {
        return errorMessages.invalidNameError;
    }
}

const validateRequiredFields = (value) => {
    if (!value || value === "") {
        return errorMessages.requiredFieldError;
    }
}
const validateCtc = (ctc) => {
    if (!ctc || ctc === "") {
        return errorMessages.requiredFieldError;
    }
    if (isNaN(ctc) || ctc < 0) {
        return errorMessages.invalidCtcError;
    }
}

const validateSkills = (skills) => {
    console.log(skills);
    console.log(skills.toString());
    if(skills.length === 0){
        return errorMessages.requiredFieldError;
    }
}