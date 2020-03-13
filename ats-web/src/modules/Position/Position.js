import React from 'react';
import TextInput from '../../components/shared/TextInput';
import { Modal } from 'antd';
import * as positionApi from '../../api/positionApi';
import DropdownElement from '../../components/shared/DropdownElement';

class Position extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: Object.assign({}, props),
      errors: {
        title: '',
        experience: '',
        no_of_openings: '',
        pos_location: '',
        skills: '',
        project_id:'',
        employee_id:'',
        grade:'',
        status:''
      }
    };
    this.state.props = props;
    this.handleChange = this.handleChange.bind(this);
    this.submitform = this.submitform.bind(this);
    this.resetForm = this.resetForm.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.state.statuses= [
      { Val: 'closed', Label: 'Closed' },
      { Val: 'open', Label: 'Open' },
    ];
    this.state.grades= [
      { Val: 'A', Label: 'A' },
      { Val: 'B', Label: 'B' },
      { Val: 'C', Label: 'C' },
      { Val: 'D', Label: 'D' },
      { Val: 'E', Label: 'E' }
    ];
  }
  async componentDidMount() {
    const projects = await positionApi.getProjects();
    this.state.fields.projects = projects;
    this.setState({ fields: this.state.fields });
  }
  savePosition(position) {
    const savePosition = async (position) => {
      await positionApi.savePosition(position).then(() => {
        this.onCancel();
        this.refreshPage();
      });
    };
    savePosition(position);
   
  }
  refreshPage() {
    window.location.reload(false);
  }

  handleChange = (field, value) =>  {
   
    let fields = this.state.fields;
   
    fields[field] = value;
    this.setState({
      fields
    });
  
  }
  onCancel(e) {
    this.state.props.onCloseModal();
  }
  resetForm(e) {
    if (this.state.props.disabled) {
      return;
    }
    let fields = {};
    fields["title"] = "";
    fields["experience"] = 0;
    fields["no_of_openings"] = 0;
    fields["skills"] = "";
    fields["project_id"] = "";
    fields["employee_id"] = "";
    fields["grade"] = "";
    fields["status"] = "";
    this.setState({ fields: fields });
  }
  submitform(e) {
    if (this.state.props.disabled) {
      return;
    }
    e.preventDefault();
    if (this.validateForm()) {
      this.savePosition(this.state.fields);
     
    }
  }

  validateForm(e) {

    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;

    if (!fields["title"]) {
      formIsValid = false;
      errors["title"] = "Please enter title.";
    }
    if (!fields["experience"]) {
      formIsValid = false;
      errors["experience"] = "Please enter experience.";
    }
    else if (!Number(fields["experience"])) {
      formIsValid = false;
      errors["experience"] = "Please enter integer value.";
    }
    if (!fields["no_of_openings"]) {
      formIsValid = false;
      errors["no_of_openings"] = "Please enter positions.";
    }
    else if (!Number(fields["no_of_openings"])) {
      formIsValid = false;
      errors["no_of_openings"] = "Please enter integer value.";
    }
   if (!fields["employee_id"]) {
      formIsValid = false;
      errors["employee_id"] = "Please select employee.";
    }
    if (!fields["grade"]) {
      formIsValid = false;
      errors["grade"] = "Please select grade.";
    }
    if (!fields["status"]) {
      formIsValid = false;
      errors["status"] = "Please select status.";
    }
    if (!fields["skills"]) {
      formIsValid = false;
      errors["skills"] = "Please enter skills.";
    }

    this.setState({
      errors: errors
    });
    return formIsValid;


  }
  render() {
    return (
      <>
        <Modal
          className="add-candidate-modal"
          wrapClassName="wrap-add-candidate"
          title="Add Position"
          centered
          visible={true}
          okText="Save"
          cancelText="Cancel"
          onOk={this.submitform}
          onCancel={this.onCancel}
          width="1000px"
        >
         
            <div className="ant-row" >
              <div className="ant-col-12">
                <TextInput disabled={this.state.props.disabled} label={'Position Name'} id={'title'} name={'title'} value={this.state.fields.title} isRequired={true} errorMsg={this.state.errors.title}  onChange={(e) =>this.handleChange("title",e.target.value)} />
              </div>


            <div className="ant-col-12">
              <TextInput disabled={this.state.props.disabled} label={'Required Experience'} id={'experience'} name={'experience'} value={this.state.fields.experience} isRequired={true} errorMsg={this.state.errors.experience} onChange={(e) =>this.handleChange("experience",e.target.value)} />
            </div>
          </div>

          <div className="ant-row" >
            <div className="ant-col-12">
              <TextInput disabled={this.state.props.disabled} label={'No of Positions'} id={'no_of_openings'} name={'no_of_openings'} value={this.state.fields.no_of_openings} isRequired={true} errorMsg={this.state.errors.no_of_openings} onChange={(e) =>this.handleChange("no_of_openings",e.target.value)} />
            </div>

              <div className="ant-col-12">
                        <DropdownElement 
                            name="project_id"
                            id="project_id"
                            placeHolder="Select Project"
                            onChange={(e) =>this.handleChange("project_id",e)}
                             value={this.state.fields.project_id}
                             label="Project" 
                             array={this.state.props.projects} 
                             containerClass="ant-col-24"
                             containerErrorClass="ant-col-24 has-error"
                             divLabelClass="ant-col ant-form-item-label ant-col-8"
                             divSelectClass="ant-col-16"
                             fieldClass="ant-col-18"/>
              </div>
              </div>
              <div className="ant-row" >
              <div className="ant-col-12">
                        <DropdownElement 
                            name="employee_id"
                            id="employee_id"
                            placeHolder="Select Employee"
                            isRequired={true}
                            error={this.state.errors.employee_id }
                            onChange={(e) =>this.handleChange("employee_id",e)}
                            value={this.state.fields.employee_id}
                             label="Employee"  array={this.state.props.employees}
                             containerClass="ant-col-24"
                             containerErrorClass="ant-col-24 has-error"
                             divLabelClass="ant-col ant-form-item-label ant-col-8"
                             divSelectClass="ant-col-16"
                             fieldClass="ant-col-18" />
              </div>
                       
              <div className="ant-col-12">
                <TextInput disabled={this.state.props.disabled} label={'Skills'} id={'skills'} name={'skills'} value={this.state.fields.skills} isRequired={true} errorMsg={this.state.errors.skills} onChange={(e) =>this.handleChange("skills",e.target.value)} />
              </div>
            </div>
            <div className="ant-row" >
              <div className="ant-col-12">
                        <DropdownElement id="grade"
                            name="grade"
                            placeHolder="Select Grade"
                            isRequired={true}
                            error={this.state.errors.grade }
                            onChange={(e) =>this.handleChange("grade",e)}
                            value={this.state.fields.grade}
                             label="Grade"  array={this.state.grades}
                             containerClass="ant-col-24"
                             containerErrorClass="ant-col-24 has-error"
                             divLabelClass="ant-col ant-form-item-label ant-col-8"
                             divSelectClass="ant-col-16"
                             fieldClass="ant-col-18" />
              </div>
              <div className="ant-col-12">
                        <DropdownElement id="status"
                            name="status"
                            placeHolder="Select Status"
                            isRequired={true}
                            error={this.state.errors.status }
                            onChange={(e) =>this.handleChange("status",e)}
                            value={this.state.fields.status}
                             label="Status"  array={this.state.statuses}
                             containerClass="ant-col-24"
                             containerErrorClass="ant-col-24 has-error"
                             divLabelClass="ant-col ant-form-item-label ant-col-8"
                             divSelectClass="ant-col-16"
                             fieldClass="ant-col-18" />
              </div>
              </div>
        </Modal>
      </>
    );
  }

}

export default Position;

