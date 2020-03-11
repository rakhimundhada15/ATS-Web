import React, { Component } from 'react';
import PropTypes from "prop-types";
import { Select } from 'antd';

class DropdownElement extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { Option } = Select;
    return (
      <div className={this.props.error ? this.props.containerErrorClass : this.props.containerClass}>
        <div className={this.props.divLabelClass}>
          <label htmlFor={this.props.id} className={this.props.isRequired ? this.props.requiredLabelClass : this.props.labelClass}>{this.props.label}</label>
        </div>
        <div className={this.props.divSelectClass}>
          <Select
            showSearch searchBy="label"
            id={this.props.id}
            name={this.props.name}
            onChange={this.props.onChange}
            className={this.props.fieldClass}
            placeholder={this.props.placeHolder}
            value= {this.props.value }
            disabled={this.props.isDisabled ? this.props.isDisabled : false}
            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          >
            {this.props.array.map((item,index) => {
              return (<Option key={item.Val} value={item.Val} >
                {item.Label}
              </Option>);
            })}

          </Select>
          {this.props.error && (
            <div className="ant-form-explain">
            {this.props.error}
          </div> )}
        </div>
      </div>
    );
  }
}

DropdownElement.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  array: PropTypes.array.isRequired,
  placeHolder:PropTypes.string.isRequired,
  error: PropTypes.string,
  containerErrorClass: PropTypes.string,
  containerClass: PropTypes.string,
  Class: PropTypes.string,
  requiredLabelClass: PropTypes.string,
  labelClass: PropTypes.string,
  divLabelClass: PropTypes.string,
  divSelectClass: PropTypes.string
};

DropdownElement.defaultProps = {
  error: "",
  containerClass: "ant-col-12",
  containerErrorClass: "ant-col-12 has-error",
  labelClass: "ant-form-item-label",
  requiredLabelClass: "ant-form-item-required",
  Class: "ant-form-item-children",
  divLabelClass: "ant-col-4",
  divSelectClass: "ant-col-8",
  fieldClass: "ant-col-18",
};

export default DropdownElement;