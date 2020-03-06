import React from 'react';
import PropTypes from "prop-types";
import DefaultPropTypes from '../common/defaultPropTypes';
import DefaultProps from '../common/defaultProps';

class InputSpinner extends React.Component {
  state = {
    number: this.props.value ? this.props.value : this.props.min,
    error: false
  };
  handleChange = (e) => {
    this.setState({
      number: e.target.value,
      error: (e.target.value > this.props.max || e.target.value < this.props.min)
    });
    this.props.onChange(e.target.value);
  };
  render() {
    return (
      <div className={this.props.errorMsg ? this.props.containerErrorClass : this.props.containerClass}>
        <div className={this.props.labelWrapperClass}>
          <label htmlFor={this.props.id} className={this.props.isRequired ? this.props.requiredLabelClass : "ant-form-item"}>
            {this.props.label}
          </label>
        </div>
        <div className={this.props.fieldContainerClass}>
          <div className={this.props.fieldWrapperClass}>
            <span className={this.props.fieldClass}>

              <input
                name={this.props.name}
                min={this.props.min}
                max={this.props.max ? this.props.max : 10}
                value={this.state.number}
                type='number'
                onChange={this.handleChange}
                className={this.props.inputControlClass}
              />

            </span>
            {this.props.errorMsg && (<div className="ant-form-explain">
              {this.props.errorMsg}
            </div>)
            }
          </div>
        </div>
      </div>

    );
  }
}

InputSpinner.propTypes = new DefaultPropTypes();
//Add new prop types
InputSpinner.propTypes.min = PropTypes.number;
InputSpinner.propTypes.max = PropTypes.number;

InputSpinner.defaultProps = new DefaultProps();
//Customize default props values
InputSpinner.defaultProps.min = 0;
InputSpinner.defaultProps.max = 100;

export default InputSpinner;