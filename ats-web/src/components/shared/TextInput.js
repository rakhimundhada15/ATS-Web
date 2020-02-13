import React from "react";
import PropTypes from "prop-types";

function TextInput(props) {
    return (
        <div className={props.error ? props.containerErrorClass : props.containerClass }>
            <label htmlFor={props.id} className={props.isRequired ? props.requiredLabelClass  : props.labelClass}>{props.label}</label>
            <div className={props.controlClass}>
                <input
                    id={props.id}
                    type="text"
                    name={props.name}
                    className={props.fieldClass}
                    onChange={props.onChange}
                    // value={props.value}
                />
                {props.error && (
               <span className="help-block">{props.error}</span>
            )}
            </div>

        </div>
    );
}

TextInput.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    isRequired: PropTypes.bool,
    value: PropTypes.string,
    error: PropTypes.string,
    containerClass: PropTypes.string,
    containerErrorClass: PropTypes.string,
    fieldClass: PropTypes.string,
    controlClass: PropTypes.string,
    labelClass: PropTypes.string,
    requiredLabelClass: PropTypes.string,
};

TextInput.defaultProps = {
    error: "",
    containerClass: "form-group",
    containerErrorClass: "form-group has-error",
    controlClass: "col-sm-8",
    labelClass: "control-label col-sm-4",
    requiredLabelClass: "control-label required col-sm-4",
    fieldClass: "form-control",
    isRequired: false,
};

export default TextInput;
