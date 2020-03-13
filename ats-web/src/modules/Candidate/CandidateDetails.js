import * as resources from '../../components/common/resources';
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const phoneNoRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
const nameRegex = /^[A-Za-z' ]+$/;
const errorMessages = resources.errorMessages();

export const validate = (candidateDetailErrors, elementName, elementValue) => {
    let error = null;
    elementValue = typeof(elementValue) === "string" ? elementValue.trim() : elementValue;
    switch (elementName) {
        case "email":
            error = validateEmail(elementValue);
            break;
        case "mobileno":
            error = validatePhoneNumber(elementValue);
            break;
        case "name":
            error = validateName(elementValue);
            break;
        case "source":
        case "reffered_by":
        case "address":
        case "status":
        case "current_organization":        
        case "skills":
            error = validateRequiredFields(elementValue);
            break;
        case "current_ctc":
        case "expected_ctc":
        case "notice_period":
        case "experience":
            error = validateNumber(elementValue);
            break;
        case "resume":
            error = validateResume(elementValue);
            break;
    }
    if (error) {
        candidateDetailErrors[elementName] = error;
     }else{
         delete candidateDetailErrors[elementName];
     }
    return candidateDetailErrors;
}

const validateResume = (resume) =>{
    if(!resume){
        return errorMessages.fileSelectError;
    }
}
const validateEmail = (email) => {
    if (!email || email === "") {
        return errorMessages.requiredFieldError;
    }

    if (!emailRegex.test(String(email).toLowerCase())) {
        return errorMessages.invalidEmailError;
    }
}

const validatePhoneNumber = (mobileno) => {
    if (!mobileno || mobileno === "") {
        return errorMessages.requiredFieldError;
    }
    if (!phoneNoRegex.test(mobileno)) {
        return errorMessages.invalidPhoneNumberError;
    }
}

const validateName = (name) => {
    if (!name || name === "") {
        return errorMessages.requiredFieldError;
    }
    if (!nameRegex.test(name)) {
        return errorMessages.invalidNameError;
    }
}

const validateRequiredFields = (value) => {
    if (!value || value === "") {
        return errorMessages.requiredFieldError;
    }
}
const validateNumber = (number) => {    
    if (number === "") {
        return errorMessages.requiredFieldError;
    }
    if (isNaN(number) || number < 0) {
        return errorMessages.invalidNumberError;
    }   
}