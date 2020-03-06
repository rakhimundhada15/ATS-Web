import React from "react";
import PropTypes from "prop-types";
import DefaultPropTypes from '../common/defaultPropTypes';
import DefaultProps from '../common/defaultProps';

class TextArea extends React.Component{
    state = {
        value: this.props.value,
        error: false
    };
 
    handleChange = (e) => {
        this.setState({
          value: e.target.value,
          error: (e.target.value.length > this.props.maxlength || e.target.value.length < this.props.minlength)
        });
        console.log(e.target.value)
        this.props.onChange(e.target.value);
      };
    render(){

        return (
            <div className={this.props.error ? this.props.containerErrorClass : this.props.containerClass }>
                <label htmlFor={this.props.id} className={this.props.isRequired ? this.props.requiredLabelClass  : this.props.labelClass}>{this.props.label}</label>
                <div className={this.props.controlClass}>
                    <textarea
                        id={this.props.id}
                        name={this.props.name}
                        value={this.state.value}
                        className={this.props.fieldClass}
                        cols={this.props.cols}
                        rows={this.props.rows}
                        disable={this.props.disable}
                        onChange={this.handleChange}
                    />
                    {this.state.error && (
                   <div className="help-block">{this.props.errorMsg} (char min: {this.props.minlength}, max: {this.props.maxlength})</div>
                )}
                </div>
    
            </div>
        );
    }  
}

TextArea.propTypes = new DefaultPropTypes();
TextArea.propTypes.value = PropTypes.string;
TextArea.propTypes.maxlength = PropTypes.number;
TextArea.propTypes.minlength = PropTypes.number.isRequired;
TextArea.propTypes.disable = PropTypes.boolean;
TextArea.propTypes.rows = PropTypes.number;
TextArea.propTypes.cols = PropTypes.number;

TextArea.defaultProps = new DefaultProps();
TextArea.defaultProps.maxlength = 100;
TextArea.defaultProps.minlength = 10;
TextArea.defaultProps.rows = 10;
TextArea.defaultProps.cols = 30;
TextArea.defaultProps.disable = false;

export default TextArea;
