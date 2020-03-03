import React from 'react';
import ReactDOM from 'react-dom';
import HorizontalTabs from '../../components/shared/TextInput';
import TextInput from '../../components/shared/TextInput';


class AddPosition extends React.Component {
  constructor(props) {
    super(props);
    this.state = { fields: {name: '',experience:'',positions:'',tags:''},
    errors: {
      name: '',
      experience: '',
      positions: '',
      tags: ''
    }
  };

  this.handleChange = this.handleChange.bind(this);
  this.submitform = this.submitform.bind(this);

  }

  handleChange(e) {
    let fields = this.state.fields;
    fields[e.target.name] = e.target.value;
    this.setState({
      fields
    });

  }
  submitform(e){
    e.preventDefault();
    if (this.validateForm()) {
      let fields = {};
      fields["name"] = "";
      fields["experience"] = "";
      fields["positions"] = "";
      fields["tags"] = "";
      this.setState({fields:fields});
      alert("Form submitted");
  }
   
}

validateForm() {

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
      <form onSubmit={this.submitform.bind(this)}>
        <div className="ant-row" >
          <div className="ant-col-12">
          <TextInput label={'Position Name'} id={'name'} name={'name'}  value={this.state.fields.name} isRequired={true} style={{width:'70%'}} errorMsg={this.state.errors.name} onChange={this.handleChange}/>
          </div>
        </div>

        <div className="ant-row" >
        <div className="ant-col-12">
          <TextInput label={'Required Experience'} id={'experience'} name={'experience'} value={this.state.fields.experience} isRequired={true}  style={{width:'70%'}} errorMsg={this.state.errors.experience} onChange={this.handleChange}/>
          </div>
        </div>

        <div className="ant-row" >
        <div className="ant-col-12">
          <TextInput label={'No of Positions'} id={'positions'} name={'positions'}  value={this.state.fields.positions} isRequired={true} style={{width:'70%'}} errorMsg={this.state.errors.positions} onChange={this.handleChange} />
          </div>
        </div>

        <div className="ant-row" >
        <div className="ant-col-12">
          <TextInput label={'Tags'} id={'tags'} name={'tags'} value={this.state.fields.tags}  isRequired={true} style={{width:'70%'}} errorMsg={this.state.errors.tags} onChange={this.handleChange} />
          </div>
        </div>
        <div className="ant-row" >
        <button  type="submit">Submit</button>
        <button >Cancel</button>
        </div>
      
      </form>
    );
  }

}

export default AddPosition;

