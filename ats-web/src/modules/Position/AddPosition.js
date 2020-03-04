import React from 'react';
import ReactDOM from 'react-dom';
import HorizontalTabs from '../../components/shared/TextInput';
import TextInput from '../../components/shared/TextInput';
import { Modal } from 'antd';



class AddPosition extends React.Component {
  constructor(props) {
       super(props);
    this.state = { fields: {name: '',experience:'',positions:'',pos_location:'',tags:''},
    errors: {
      name: '',
      experience: '',
      positions: '',
      pos_location:'',
      tags: ''
    }
  };
  this.state.props=props;
  this.handleChange = this.handleChange.bind(this);
  this.submitform = this.submitform.bind(this);
  this.resetForm = this.resetForm.bind(this);

  }

  handleChange(e) {
    let fields = this.state.fields;
    fields[e.target.name] = e.target.value;
    this.setState({
      fields
    });

  }
  resetForm(e) {
    this.state.props.onCloseModal();
  }
  submitform(e){
    e.preventDefault();
    if (this.validateForm()) {
      let fields = {};
      fields["name"] = "";
      fields["experience"] = "";
      fields["positions"] = "";
      fields["tags"] = "";
      fields["pos_location"] = "";
      this.setState({fields:fields});
      alert("Form submitted");
      this.resetForm();
  }
   
}

validateForm(e) {

  let fields = this.state.fields;
  let errors = {};
  let formIsValid = true;

  if (!fields["name"]) {
    formIsValid = false;
    errors["name"] = "Please enter position.";
  }
  if (!fields["experience"]) {
    formIsValid = false;
    errors["experience"] = "Please enter experience.";
  }
  if (!fields["positions"]) {
    formIsValid = false;
        errors["positions"] = "Please enter positions.";
  }
  else if (!Number(fields["positions"])) {
    formIsValid = false;
    errors["positions"] = "Please enter integer value.";
}
  if (!fields["pos_location"]) {
    formIsValid = false;
    errors["pos_location"] = "Please enter location.";
  }
  if (!fields["tags"]) {
    formIsValid = false;
    errors["tags"] = "Please enter tags.";
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
          onCancel={this.resetForm}
          width="1000px"
        >
      <form >
        <div className="ant-row" >
          <div className="ant-col-12">
          <TextInput label={'Position Name'} id={'name'} name={'name'}  value={this.state.fields.name} isRequired={true}  errorMsg={this.state.errors.name} onChange={this.handleChange}/>
          </div>
        
        <div className="ant-col-12">
          <TextInput label={'Required Experience'} id={'experience'} name={'experience'} value={this.state.fields.experience} isRequired={true}   errorMsg={this.state.errors.experience} onChange={this.handleChange}/>
          </div>
     </div>

     <div className="ant-row" >
        <div className="ant-col-12">
          <TextInput label={'No of Positions'} id={'positions'} name={'positions'}  value={this.state.fields.positions} isRequired={true}  errorMsg={this.state.errors.positions} onChange={this.handleChange} />
          </div>
       
          <div className="ant-col-12">
          <TextInput label={'Location'} id={'pos_location'} name={'pos_location'}  value={this.state.fields.pos_location} isRequired={true}  errorMsg={this.state.errors.pos_location} onChange={this.handleChange} />
          </div>
 </div>
 <div className="ant-row" >
        <div className="ant-col-12">
          <TextInput label={'Tags'} id={'tags'} name={'tags'} value={this.state.fields.tags}  isRequired={true}  errorMsg={this.state.errors.tags} onChange={this.handleChange} />
          </div>
 </div>
       
      
      </form>
      </Modal>
      </>
    );
  }

}

export default AddPosition;

