import React from 'react';
import { inputStyles } from './Input.module.scss';

const Input = props => (
  <input className={inputStyles} {...props} />
);

export default Input;
