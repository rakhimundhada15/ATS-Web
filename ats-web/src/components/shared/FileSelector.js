import React from "react";
import PropTypes from "prop-types";
import DefaultPropTypes from '../common/defaultPropTypes';
import DefaultProps from '../common/defaultProps';


class FileSelector extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            selectedFileName: "",
            error: this.props.isRequired,
        };
    }

    updateErrorState = ()=> {
        this.setState({ error: (this.props.isRequired && this.state.selectedFileName === "") });
    };

    fileChange = e => {
        if (e.target.files !== undefined && e.target.files !== null && e.target.files.length > 0){
            this.setState({ selectedFileName: e.target.files[0].name }, this.updateErrorState);
            this.props.onChange(e);
        }
        else{
            this.undateErrorState();
        }
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

                        <input type="file" 
                            className={this.props.fieldClass}
                            id={this.props.id} 
                            name={this.props.name}
                            accept={this.props.acceptFilesOfType}
                            onChange={this.fileChange} />
                    </span>
                    { this.state.error && this.props.errorMsg && (<div className="ant-form-explain">
                            {this.props.errorMsg }
                    </div> )
                    }
                </div>
            </div>
        </div>           
        );
    }
}

FileSelector.propTypes = new DefaultPropTypes();
//Add new prop types
FileSelector.propTypes.fileNameLabel = PropTypes.string;
FileSelector.propTypes.fileNameLabelClass = PropTypes.string;
FileSelector.propTypes.acceptFilesOfType = PropTypes.string;

FileSelector.defaultProps = new DefaultProps();
//Customize default props values
FileSelector.defaultProps.controlClass = "col-sm-8 custom-file";
FileSelector.defaultProps.fieldClass = "custom-file-input";
FileSelector.defaultProps.fileNameLabelClass = "custom-file-label text-left";
FileSelector.defaultProps.acceptFilesOfType = ".doc,.docx,.pdf,.txt,.rtf";

export default FileSelector;
