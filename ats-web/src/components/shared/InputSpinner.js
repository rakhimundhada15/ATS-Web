import React from 'react';
import PropTypes from "prop-types";
import DefaultPropTypes from '../common/defaultPropTypes';
import DefaultProps from '../common/defaultProps';

class InputSpinner extends React.Component {
  state = {
    number: this.props.min,
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
      <div className={this.state.error ? this.props.containerErrorClass : this.props.containerClass }>
        <label htmlFor={this.props.id} className={this.props.isRequired ? this.props.requiredLabelClass : this.props.labelClass}>{this.props.label}</label>
        <div className={this.props.controlClass}>
          <input
            name={this.props.name}
            min={this.props.min}
            max={this.props.max ? this.props.max : 10}
            value={this.state.number}
            type='number'
            onChange={this.handleChange}
          />
          {this.state.error && (
            <span className="help-block">{this.props.errorMsg}</span>
          )}
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