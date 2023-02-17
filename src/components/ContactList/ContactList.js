import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import css from './ContactList.module.css';

export const ContactList = ({ contactTab, search, onClick }) => {
  const readID = event => {
    const readElement = event.target;

    onClick(readElement);
  };

  return (
    <ul className={clsx(css.contactList)}>
      {contactTab
        .filter(contact =>
          contact.name.toLowerCase().includes(search.toLowerCase())
        )
        .map(contact => {
          return (
            <>
              <li
                className={clsx(css.contactListItem)}
                key={contact.id}
                id={contact.id}
                name={contact.name}
              >
                <span>
                  {contact.name}: {contact.number}
                </span>
                <button
                  className={clsx(css.contactListBtn)}
                  id={contact.id}
                  onClick={readID}
                >
                  Delete
                </button>
              </li>
            </>
          );
        })}
    </ul>
  );
};

ContactList.propTypes = {
  contactTab: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      number: PropTypes.string,
    })
  ),
  search: PropTypes.string,
};
