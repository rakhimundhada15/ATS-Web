import { Input } from 'antd';
import React from "react";
import DefaultPropTypes from '../common/defaultPropTypes';
import DefaultProps from '../common/defaultProps';

function TextInput(props) {
    return (
        <div className={props.errorMsg ? props.containerErrorClass : props.containerClass}>
            <div className={props.labelWrapperClass}>
                <label htmlFor={props.id} className={props.isRequired ? props.requiredLabelClass : "ant-form-item"}>
                    {props.label}
                </label>
            </div>
            <div className={props.fieldContainerClass}>
                <div className={props.fieldWrapperClass}>
                    <span className={props.fieldClass}>

                        <input type="text" id={props.id} name={props.name} className={props.inputControlClass} style={props.style ? props.style : {}} onChange={props.onChange ? props.onChange : {}} value={props.value}  />

                    </span>
                    { props.errorMsg && (<div className="ant-form-explain">
                            {props.errorMsg }
                    </div> )
                    }
                </div>
            </div>
        </div>        
    );
}


TextInput.propTypes = new DefaultPropTypes();

TextInput.defaultProps = new DefaultProps();


export default TextInput;
