import * as resources from '../../components/common/resources';
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const phoneNoRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
const nameRegex = /^[A-Za-z]+$/;
const errorMessages = resources.errorMessages();

export const validate = (candidateDetails, elementName, elementValue) => {
    let error = null;
    switch (elementName) {
        case "emailAddress":
            error = validateEmail(elementValue);
            break;
        case "phoneNumber":
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
        case "skillSet":
        case "referrer":
        case "location":
        case "status":
        case "currentOrg":
        case "noticePeriod":
            error = validateRequiredFields(elementValue);
            break;
        case "currentCtc":
        case "expectedCtc":
            error = validateCtc(elementValue);
            break;
    }
    if (error) {
        candidateDetails[elementName].errorMessage = error;
    }
    return candidateDetails;
}

const validateEmail = (email) => {
    console.log(email);
    if (!email || email === "") {
        return errorMessages.requiredFieldError;
    }

    if (!emailRegex.test(String(email).toLowerCase())) {
        return errorMessages.invalidEmailError;
    }
}

const validatePhoneNumber = (phoneNumber) => {
    if (!phoneNumber || phoneNumber === "") {
        return errorMessages.requiredFieldError;
    }
    if (!phoneNoRegex.test(phoneNumber)) {
        return errorMessages.invalidPhoneNumberError;
    }
}

const validateFirstName = (firstName) => {
    if (!firstName || firstName === "") {
        return errorMessages.requiredFieldError;
    }
    console.log(nameRegex.test(firstName));
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