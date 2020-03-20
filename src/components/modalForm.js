import React from 'react';
import Button from './button';

const formValueBuffer = [];

class ModalForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 0,
      formValue: this.props.initialFieldsValues || {},
      isValid: false,
    };
  }

  onFormSubmit = (event) => {
    event.preventDefault();
    this.props.submitHandler({ ...this.state.formValue });
  }

  checkExistence = element => this.state.formValue[element.name];

  checkForm = () => {
    const isValid = this.props.fieldsTemplate.every(this.checkExistence);
    this.setState({ isValid });
  }

  setValues = (values) => {
    this.setState({ formValue: { ...this.state.formValue, ...values } }, this.checkForm);
  }

  handleInputChanges = (event) => {
    event.preventDefault();
    this.setValues({ [event.target.name]: event.target.value });
  }

  changeTab = (index) => {
    this.setState({ activeTab: index });
  }

  renderTabButton = ({ name }, index) => (
    <Button
      key={`${name}TabButton`}
      action={ () => { this.changeTab(index); } }
      className={`modalFormTabButton ${this.state.activeTab === index ? 'modalFormTabButton-is-active' : ''}`}>
      {name}
    </Button>
  )

  renderTabs = () => (
    <div className="modalFormTabButtons">
      {this.props.fieldsTemplate.map(this.renderTabButton)}
    </div>
  )

  renderInput = (field, index) => {
    const hasDefault = this.state.formValue[field.name];
    return (
      <input
        type={field.type}
        name={field.name}
        className={ `modalFormTabInput ${this.state.activeTab === index ? 'modalFormTabInput-is-active' : ''}` }
        defaultValue={ hasDefault ? this.state.formValue[field.name] : ''}
      />
    );
  }

  renderInputs = () => this.props.fieldsTemplate.map(this.renderInput);

  render() {
    formValueBuffer.length = this.props.fieldsTemplate.length;
    return (
      <form className="modalForm" onChange={this.handleInputChanges}>
        {this.renderTabs()}
        {this.renderInputs()}
        <Button
          action={this.onFormSubmit}
          className="formSubmit"
          disabled={!this.state.isValid}>
          {this.props.buttonText}
        </Button>
      </form>
    );
  }
}

export default ModalForm;
