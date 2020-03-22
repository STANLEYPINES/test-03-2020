
import React from 'react';
import Button from './button';

const deleteIcon = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M16 9v10H8V9h8m-1.5-6h-5l-1 1H5v2h14V4h-3.5l-1-1zM18 7H6v12c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7z"/></svg>;
const editIcon = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M14.06 9.02l.92.92L5.92 19H5v-.92l9.06-9.06M17.66 3c-.25 0-.51.1-.7.29l-1.83 1.83 3.75 3.75 1.83-1.83a.996.996 0 000-1.41l-2.34-2.34c-.2-.2-.45-.29-.71-.29zm-3.6 3.19L3 17.25V21h3.75L17.81 9.94l-3.75-3.75z"/></svg>;

function Table(props) {
  function renderTableHead() {
    return props.fieldsTemplate.map(template => <th key={template.name}>{template.name}</th>);
  }

  function renderCell(cell, index, row) {
    return (
      <td key={`${cell.name}TableCell${index}`}>{row[cell.name]}</td>
    );
  }

  function renderRow(row, index) {
    return (
      <tr key={`${index}TableRow`}>
        {props.fieldsTemplate.map((cell, cellIndex) => renderCell(cell, cellIndex, row))}
        <td>
          <Button
            action={() => { props.editHandler({ mode: 'edit', rowIndex: index }); }}
            className='tableEditButton'>
            Edit
            {editIcon}
          </Button>
          <Button
            action={() => { props.deleteHandler(index); }}
            className='tableDeleteButton'>
            Delete
            {deleteIcon}
          </Button>
        </td>
      </tr>
    );
  }

  function renderPlaceHolder() {
    return <tr><td collspan={props.fieldsTemplate.length}>Nothing to show</td></tr>;
  }

  function renderRows() {
    return props.tableRows.map((row, index) => renderRow(row, index));
  }

  return (
    <table>
      <thead>
        <tr>
          {renderTableHead()}
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        { (props.tableRows.length && renderRows()) || renderPlaceHolder() }
      </tbody>
    </table>);
}

export default Table;
