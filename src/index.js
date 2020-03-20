import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import Table from './components/table';
import Button from './components/button';
import Modal from './components/modal';
import './index.scss';

const fieldsTemplate = [
  { name: 'name', type: 'text' },
  { name: 'email', type: 'email' },
  { name: 'phone', type: 'tel' },
];

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: {
        isOpen: false,
        mode: null, // create || edit
        values: null,
      },
      tableRows: JSON.parse(localStorage.getItem('tableRows')) || [],
    };
  }

  saveState = (key) => {
    localStorage.setItem(key, JSON.stringify(this.state[key]));
  }

  deleteRow = (index) => {
    this.setState({
      tableRows: this.state.tableRows.filter((_, i) => i !== index),
    }, () => { this.saveState('tableRows'); });
  }

  addRow = (newRow) => {
    this.setState({
      tableRows: [ ...this.state.tableRows, newRow],
    }, () => {
      this.toggleModal();
      this.saveState('tableRows');
    });
  }

  editRow = (newData) => {
    const { tableRows, modal } = this.state;
    tableRows.splice(modal.rowIndex, 1, newData);
    this.setState({ tableRows: [...tableRows] }, () => {
      this.toggleModal();
      this.saveState('tableRows');
    });
  }

  toggleModal = (options) => {
    if (options && options.mode) {
      this.setState(prevState => ({
        modalIsOpen: !prevState.modalIsOpen,
        modal: {
          mode: options.mode || null,
          rowIndex: options.rowIndex || null,
          values: prevState.tableRows[options.rowIndex] || null,
        },
      }));
    } else {
      this.setState(prevState => ({
        modalIsOpen: !prevState.modalIsOpen,
        modal: {},
      }));
    }
  }

  render() {
    return (
      <Fragment>
        <Button
          action={() => { this.toggleModal({ mode: 'add' }); }}
          className='addButton'>
            Add record
        </Button>
        <Table
          fieldsTemplate={fieldsTemplate}
          tableRows={this.state.tableRows}
          editHandler={(options) => { this.toggleModal(options); }}
          deleteHandler={this.deleteRow}
        />
        {this.state.modalIsOpen &&
          <Modal
            visibility={this.state.modalIsOpen}
            options={{ ...this.state.modal, fieldsTemplate }}
            addHandler={this.addRow}
            editHandler={this.editRow}
            closeHandler={() => { this.toggleModal(); }}
          />}
      </Fragment>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app'),
);
