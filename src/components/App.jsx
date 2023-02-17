import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
export const App = () => {
  const [contacts, setContacts] = useState([
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);

  const [filter, setFilter] = useState('');

  const prevTabLength = useRef(contacts.length);
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
    if (contacts.length !== prevTabLength.current) {
      const newContactLocalStorage = JSON.stringify(contacts);
      window.localStorage.setItem('ContactLocalList', newContactLocalStorage);
      prevTabLength.current = contacts.length;
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
