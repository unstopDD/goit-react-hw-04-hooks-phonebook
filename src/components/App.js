import { useState, useEffect } from 'react';
import shortid from 'shortid';

import ContactForm from './ContactForm';
import Filter from './Filter';
import ContactList from './ContactList';
import Section from './Section';

export default function App() {
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(localStorage.getItem('contacts') ?? []);
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = (name, number) => {
    if (checkName(name)) {
      return alert(`${name} is already in contacts`);
    }

    const contact = {
      id: shortid.generate(),
      name,
      number,
    };

    setContacts([contact, ...contacts]);
  };

  const deletContact = contactID => {
    setContacts(contacts.filter(contact => contact.id !== contactID));
  };

  const checkName = name => {
    return contacts.some(
      contact =>
        contact.name.toLowerCase().trim() === name.toLowerCase().trim(),
    );
  };

  const handleChangeFilter = e => {
    setFilter(e.target.value);
  };

  const getVisibleContacts = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase()),
    );
  };

  return (
    <Section title="Phonebook">
      <ContactForm onAddContact={addContact} />

      {contacts.length > 1 && (
        <Filter value={filter} onChangeFilter={handleChangeFilter} />
      )}
      <h2>Contacts</h2>
      <ContactList
        names={getVisibleContacts()}
        onDeleteContact={deletContact}
      />
    </Section>
  );
}
