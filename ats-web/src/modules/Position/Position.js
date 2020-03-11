import React from 'react';
import TextInput from '../../components/shared/TextInput';
import { Modal } from 'antd';
import * as positionApi from '../../api/positionApi';

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
        skills: ''
      }
    };
    this.state.props = props;
    this.handleChange = this.handleChange.bind(this);
    this.submitform = this.submitform.bind(this);
    this.resetForm = this.resetForm.bind(this);
    this.onCancel = this.onCancel.bind(this);
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
  handleChange(e) {
    let fields = this.state.fields;
    fields[e.target.name] = e.target.value;
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
    fields["pos_location"] = "";
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
    if (!fields["pos_location"]) {
      formIsValid = false;
      errors["pos_location"] = "Please enter location.";
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
  render = () => (
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
        <form >
          <div className="ant-row" >
            <div className="ant-col-12">
              <TextInput disabled={this.state.props.disabled} label={'Position Name'} id={'title'} name={'title'} value={this.state.fields.title} isRequired={true} errorMsg={this.state.errors.title} onChange={this.handleChange} />
            </div>

            <div className="ant-col-12">
              <TextInput disabled={this.state.props.disabled} label={'Required Experience'} id={'experience'} name={'experience'} value={this.state.fields.experience} isRequired={true} errorMsg={this.state.errors.experience} onChange={this.handleChange} />
            </div>
          </div>

          <div className="ant-row" >
            <div className="ant-col-12">
              <TextInput disabled={this.state.props.disabled} label={'No of Positions'} id={'no_of_openings'} name={'no_of_openings'} value={this.state.fields.no_of_openings} isRequired={true} errorMsg={this.state.errors.no_of_openings} onChange={this.handleChange} />
            </div>

            <div className="ant-col-12">
              <TextInput disabled={this.state.props.disabled} label={'Location'} id={'pos_location'} name={'pos_location'} value={this.state.fields.pos_location} isRequired={true} errorMsg={this.state.errors.pos_location} onChange={this.handleChange} />
            </div>
          </div>
          <div className="ant-row" >
            <div className="ant-col-12">
              <TextInput disabled={this.state.props.disabled} label={'Skills'} id={'skills'} name={'skills'} value={this.state.fields.skills} isRequired={true} errorMsg={this.state.errors.skills} onChange={this.handleChange} />
            </div>
            <div className="ant-col-12">
              <div class="ant-form-item">
                <div class="ant-col ant-form-item-label ant-col-8">
                  <label for="project_id" class="ant-form-item-required">Select Project</label>
                </div>
                <div class="ant-col ant-form-item-control-wrapper ant-col-12">
                  <div class="ant-form-item-control">
                    <span class="ant-form-item-children">
                      <select disabled={this.state.fields.disabled} id={'project_id'} name={'project_id'} value={this.state.fields.project_id} onChange={this.handleChange}>
                        <option value={null}>Select Project</option>
                        {this.state.fields.projects ?
                          this.state.fields.projects.map((value) => {
                            return <option value={value.id}>{value.name}</option>
                          }
                          ) : <option></option>}
                      </select>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </Modal>
    </>
  );
}

export default Position;

