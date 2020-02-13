import React from "react";
import PropTypes from "prop-types";

class FileSelector extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            selectedFileName: "",
            error: this.props.isRequired,
        };
    }

    undateErrorState = ()=> {
        this.setState({ error: (this.props.isRequired && this.state.selectedFileName === "") });
    };

    fileChange = e => {
        if (e.target.files !== undefined && e.target.files !== null && e.target.files.length > 0){
            this.setState({ selectedFileName: e.target.files[0].name }, this.undateErrorState);
            this.props.onChange(e);
        }
        else{
            this.undateErrorState();
        }
    };

    render() {
        return (
            <div className={this.state.error ? this.props.containerErrorClass : this.props.containerClass }>
                <label htmlFor={this.props.id} className={this.props.isRequired ? this.props.requiredLabelClass  : this.props.labelClass}>{this.props.label}</label>
                <div className={this.props.controlClass}>
                        <input type="file" 
                            className={this.props.fieldClass}
                            id={this.props.id} 
                            name={this.props.name}
                            accept={this.props.acceptFilesOfType}
                            onChange={this.fileChange} />

                        <label 
                            className={this.props.fileNameLabelClass}
                            htmlFor={this.props.id}>{this.state.selectedFileName === "" ? this.props.fileNameLabel : this.state.selectedFileName}</label>
                        {this.state.error && this.props.error && (
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
    isRequired: PropTypes.bool,
    value: PropTypes.string,
    error: PropTypes.string,
    containerClass: PropTypes.string,
    containerErrorClass: PropTypes.string,
    fieldClass: PropTypes.string,
    controlClass: PropTypes.string,
    labelClass: PropTypes.string,
    requiredLabelClass: PropTypes.string,
    fileNameLabel: PropTypes.string,
    fileNameLabelClass: PropTypes.string,
    acceptFilesOfType: PropTypes.string,
};

FileSelector.defaultProps = {
    error: "",
    containerClass: "form-group",
    containerErrorClass: "form-group has-error",
    controlClass: "col-sm-8 custom-file",
    labelClass: "control-label col-sm-4",
    requiredLabelClass: "control-label required col-sm-4",
    fieldClass: "custom-file-input",
    fileNameLabel: "Choose File ...",
    fileNameLabelClass: "custom-file-label text-left",
    acceptFilesOfType: ".doc,.docx,.pdf,.txt,.rtf",
    isRequired: false,
};

export default FileSelector;
