import React from "react";
import DefaultPropTypes from '../common/defaultPropTypes';
import DefaultProps from '../common/defaultProps';

function TextInput(props) {
    return (
        <div className={props.errorMsg ? props.containerErrorClass : props.containerClass }>
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
                {props.errorMsg && (
               <span className="help-block">{props.errorMsg}</span>
            )}
            </div>

        </div>
    );
}


TextInput.propTypes = new DefaultPropTypes();

TextInput.defaultProps = new DefaultProps();


export default TextInput;
