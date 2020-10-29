import React from 'react';
import classNames from 'classnames';

import './TextInput.css';

const TextInput = ({ title, isRequired, placeholder, grow, ...inputProps }) => {

  const [currentValue, setValue] = React.useState('');

  return <div className={classNames("flex flex-col input-field-outer", { grow: !!grow })}>
          <span className="input-title">{title} {isRequired ? <sup style={{ color: 'red', fontSize: '1.1em' }}>*</sup>: null}</span>
          <input
            className="input-field"
            value={currentValue} 
            onChange={({target: {value}}) => setValue(value)}
            placeholder={placeholder || title}
            {...inputProps} /** in case we want to make this a `number` field, etc */
          />
        </div>
}

export default TextInput;