import PropTypes from "prop-types";

export default class DefaultPropTypes {
  constructor() { 
    this.id = PropTypes.string.isRequired;
    this.name = PropTypes.string.isRequired;
    this.label = PropTypes.string.isRequired;
    this.onChange = PropTypes.func;
    this.isRequired = PropTypes.bool;
    this.value = PropTypes.any;
    this.errorMsg = PropTypes.string;
    this.containerClass = PropTypes.string;
    this.containerErrorClass = PropTypes.string;
    this.controlClass = PropTypes.string;
    this.labelClass = PropTypes.string;
    this.requiredLabelClass = PropTypes.string;
    this.fieldClass = PropTypes.string;
  };
}
