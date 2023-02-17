import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import css from './Filter.module.css';

export const Filter = ( onChange ) => {
  const changeInput = event => {
    const input = event.currentTarget.value;

    onChange(input);
  };

  return (
    <>
      <div className={clsx(css.filter)}>
        <label>Search contacts</label>
        <input
          className={clsx(css.filterInput)}
          onChange={changeInput}
          type="text"
          name="name"
          required
        />
      </div>
    </>
  );
};

Filter.propTypes = {
  input: PropTypes.string,
};
