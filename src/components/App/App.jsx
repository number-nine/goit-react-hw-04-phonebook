import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import ContactEditor from 'components/ContactEditor';
import Filter from 'components/Filter';
import ContactsList from 'components/ContactsList';
import Section from 'components/Section';

import getUsers from '../../controllers/data-controller';

import { Container } from 'components/App/App.styled';
import { Button } from 'components/common.styled';

const App = () => {

  const getFromLocalStorage = param => {
    if (!window.localStorage.getItem(param)) {
      return [];
    }
    try {
      const contacts = JSON.parse(window.localStorage[param]);
      return contacts;
    } catch (error) {
      Notify.failure(`Can't read from Local Storage. ${error.message}`);
      return [];
    }
  };

  const [filter, setFilter] = useState('');
  const [contacts, setContacts] = useState(() => getFromLocalStorage('contacts'));

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);



  const addContact = ({ name, number }) => {
    return new Promise((resolve, reject) => {
      if (isNameUniq(name)) {
        setContacts(state => [
          ...state,
          {
            id: nanoid(),
            name: name.trim(),
            number: number.trim(),
          },
        ]);
        resolve(`New contact ${name} successfully added`);
      } else {
        reject(new Error(`${name} is already in contacts`));
      }
    });
  };

  const handleFillPhonebook = () =>
    getUsers().then(result =>
      result.forEach(contact => {
        addContact(contact)
          .then(result => Notify.success(result))
          .catch(({ message }) => {
            Notify.failure(message);
          });
      })
    );

  const isNameUniq = nameToAdd =>
    !contacts
      .map(({ name }) => name.toLowerCase())
      .includes(nameToAdd.toLowerCase());

  const onFilterChange = e => {
    const { value } = e.target;
    setFilter(value);
  };

  const handleDeleteContact = idToRemove => {
    setContacts(state => state.filter(({ id }) => id !== idToRemove));
    Notify.success('Contact succesfully removed');
  };

  const handleResetFilter = () => {
    setFilter('');
  };

  const filterContacts = (contacts, filter) => {
    if (!filter.trim()) {
      return contacts;
    }
    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(filter.trim().toLowerCase())
    );
  };

  return (
    <Container>
      <Button type="button" onClick={handleFillPhonebook}>
        Randomise Data
      </Button>

      <Section title="Add Contact">
        <ContactEditor onSubmit={addContact} />
      </Section>

      <Section title="Filter by Name">
        <Filter
          filter={filter}
          onChange={onFilterChange}
          onReset={handleResetFilter}
        />
      </Section>
      <Section title="Contacts List">
        <ContactsList
          contacts={filterContacts(contacts, filter)}
          onClick={handleDeleteContact}
        />
      </Section>
    </Container>
  );
};


export default App;
