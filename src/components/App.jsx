import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
export const App = () => {
  const [contacts, setContacts] = useState([]);

  const [filter, setFilter] = useState('');

  const prevTab = useRef(contacts);

  const addContact = values => {
    console.log(values);
    const existingContact = contacts.find(
      contact => contact.name === values.name
    );
    if (existingContact) {
      alert(`${values.name} already in contacts!`);
      return;
    }

    setContacts([...prevTab.current, values]);
    prevTab.current = contacts;
  };

  const showInput = userInput => {
    console.log(userInput);
    setFilter(userInput);
  };

  const deleteUser = readElement => {
    let tabs = [...contacts];
    const findID = tabs.find(contact => contact.id === readElement.id);
    const indexOfID = tabs.findIndex(contact => contact === findID);
    tabs.splice(indexOfID, 1);

    setContacts([...tabs]);
  };

  useEffect(() => {
    const listOfContacts = window.localStorage.getItem('ContactLocalList');
    if (!listOfContacts) return;
    try {
      const parsedListOfContacts = JSON.parse(listOfContacts);
      setContacts(parsedListOfContacts);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    if (contacts.length !== prevTab.current.length) {
      const newContactLocalStorage = JSON.stringify(contacts);
      window.localStorage.setItem('ContactLocalList', newContactLocalStorage);
      prevTab.current = contacts;
    }
  }, [contacts]);
  return (
    <>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={addContact} />
      <h2>Contacts</h2>
      <Filter onChange={showInput} />
      <ContactList contactTab={contacts} search={filter} onClick={deleteUser} />
    </>
  );
};
