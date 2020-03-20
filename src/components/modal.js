import React from 'react';
import Button from './button';
import ModalForm from './modalForm';

const closeIcon = <svg xmlns="http://www.w3.org/2000/svg" width="29" height="29"><path d="M2.126 2.126l24.748 24.748m0-24.748L2.126 26.874" stroke="#222" fill="none"/></svg>;

function Modal(props) {
  const buttonTextVariants = {
    edit: 'Save',
    add: 'Add',
  };

  const submitHandlers = {
    edit: props.editHandler,
    add: props.addHandler,
  };

  return (
    <div className={`modal ${props.visibility ? 'modal-is-visible' : ''}`}>
      <ModalForm
        fieldsTemplate={props.options.fieldsTemplate}
        initialFieldsValues={props.options.values}
        submitHandler={submitHandlers[props.options.mode]}
        buttonText={buttonTextVariants[props.options.mode]}
      />
      <Button
        action={props.closeHandler}
        className="closeModalButton">
        Close
        {closeIcon}
      </Button>
    </div>);
}

export default Modal;
