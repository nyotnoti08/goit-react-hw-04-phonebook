import { useState, useEffect } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';

const initialContacts = [
 { id: 'id-1', name: 'Edna Mode', number: '200-40-02' },
 { id: 'id-2', name: 'Wednesday Addams', number: '199-11-993' },
 { id: 'id-3', name: 'Wanda Maximoff', number: '645-17-79' },
 { id: 'id-4', name: 'Captain Jack Sparrow', number: '227-91-26' },
 { id: 'id-5', name: 'Steve Rogers', number: '201-14-01' },
 { id: 'id-6', name: 'Ace Ventura', number: '649-98-132' },
 { id: 'id-7', name: 'Bruce Lee', number: '998-82-123' },
];

export const App = () => {
  const savedContacts = localStorage.getItem('contacts');
  const [contacts, setContacts] = useState(
    savedContacts !== null ? JSON.parse(savedContacts) : initialContacts
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = newContact => {
    setContacts(prevState => [...prevState, newContact]);
  };

  const deleteContact = id => {
    setContacts(prevState => prevState.filter(contact => contact.id !== id));
  };

  const filterContact = () => {
    const filterLowerCase = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filterLowerCase)
    );
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm addContact={addContact} contacts={contacts} />

      <h2>Contacts</h2>
      <Filter filter={filter} setFilter={setFilter} />
      <ContactList
        filterContact={filterContact}
        deleteContact={deleteContact}
      />
    </div>
  );
};
