import React from "react";
import PropTypes from "prop-types";

class FileSelector extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            fileName: props.fileNameText,
        };
    }

    fileChange = e => {
        this.setState(
            { fileName: e.target.files[0].name },
            () => {
                    console.log("File name  --->", this.state.fileName)
            }
        );

        this.props.onChange(e);
    };

    render() {
        return (
            <div className={this.props.error ? this.props.containerErrorClass : this.props.containerClass }>
                <label htmlFor={this.props.id} className={this.props.isRequired ? this.props.requiredLabelClass  : this.props.labelClass}>{this.props.label}</label>
                <div className={this.props.controlClass}>
                        <input type="file" 
                            className={this.props.fieldClass}
                            id={this.props.id} 
                            name={this.props.name}
                            multiple lang="ar"
                            dir="rtl"
                            onChange={this.fileChange} />

                        <label 
                            className={this.props.fileNameLabelClass}
                            htmlFor={this.props.id}>{this.state.fileName}</label>
                    {this.props.error && (
                        <span className="help-block">{this.props.error}</span>
                    )}
                </div>
            </div>
        );
    }
}

FileSelector.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string,
    error: PropTypes.string,
    containerClass: PropTypes.string,
    containerErrorClass: PropTypes.string,
    fieldClass: PropTypes.string,
    controlClass: PropTypes.string,
    labelClass: PropTypes.string,
    requiredLabelClass: PropTypes.string,
    fileNameText: PropTypes.string,
    fileNameLabelClass: PropTypes.string,
};

FileSelector.defaultProps = {
    error: "",
    containerClass: "form-group",
    containerErrorClass: "form-group has-error",
    controlClass: "col-sm-8 custom-file",
    labelClass: "control-label col-sm-4",
    requiredLabelClass: "control-label required col-sm-4",
    fieldClass: "custom-file-input",
    fileNameText: "Choose File ...",
    fileNameLabelClass: "custom-file-label text-left",
};

export default FileSelector;
