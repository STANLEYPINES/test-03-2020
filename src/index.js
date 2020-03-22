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
      tableRows: JSON.parse(localStorage.getItem('tableRows')) || [],
    };
  }

  saveState = (key) => {
    localStorage.setItem(key, JSON.stringify(this.state[key]));
  }

  deleteRow = (index) => {
    this.setState({
      tableRows: this.state.tableRows.filter((_, itemIndex) => itemIndex !== index),
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
    const { tableRows, editingRowIndex } = this.state;
    const updatedRows = tableRows.map((item, itemIndex) => {
      if (itemIndex === editingRowIndex) return newData;
      return item;
    });
    this.setState({ tableRows: [...updatedRows] }, () => {
      this.saveState('tableRows');
      this.toggleModal();
    });
  }

  toggleModal = (options) => {
    this.setState(prevState => ({
      modalIsOpen: !prevState.modalIsOpen,
      editingRowIndex: options ? options.rowIndex : null,
    }));
  }

  render() {
    return (
      <Fragment>
        <Button
          action={() => { this.toggleModal(); }}
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
            options={{ fieldsTemplate, values: this.state.tableRows[this.state.editingRowIndex] }}
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
