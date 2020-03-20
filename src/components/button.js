import React from 'react';

function Button(props) {
  return (
    <button
      type={props.type || 'button'}
      onClick={props.action}
      className={props.className}
      disabled={props.disabled || false}>
      {props.children}
    </button>);
}

export default Button;
