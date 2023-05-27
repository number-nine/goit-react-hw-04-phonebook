import { Component } from 'react';
import { nanoid } from 'nanoid';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import ContactEditor from 'components/ContactEditor';
import Filter from 'components/Filter';
import ContactsList from 'components/ContactsList';
import Section from 'components/Section';

import getUsers from '../../controllers/data-controller';

import { Container } from 'components/App/App.styled';
import { Button } from 'components/common.styled';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  addContact = ({ name, number }) => {
    return new Promise((resolve, reject) => {
      if (this.isNameUniq(name)) {
        this.setState(({ contacts }) => {
          return {
            contacts: [
              ...contacts,
              {
                id: nanoid(),
                name: name.trim(),
                number: number.trim(),
              },
            ],
          };
        });
        resolve(`New contact ${name} successfully added`);
      } else {
        reject(new Error(`${name} is already in contacts`));
      }
    });
  };

  handleFillPhonebook = () =>
    getUsers().then(result =>
      result.forEach(contact => {
        this.addContact(contact)
          .then(result => Notify.success(result))
          .catch(({ message }) => {
            Notify.failure(message);
          });
      })
    );

  isNameUniq = nameToAdd =>
    !this.state.contacts
      .map(({ name }) => name.toLowerCase())
      .includes(nameToAdd.toLowerCase());

  onChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleDeleteContact = idToRemove => {
    this.setState(({ contacts }) => ({
      contacts: contacts.filter(({ id }) => id !== idToRemove),
    }));
    Notify.success('Contact succesfully removed');
  };

  handleResetFilter = () => {
    this.setState({ filter: '' });
  };

  filterContacts = (contacts, filter) => {
    if (!filter.trim()) {
      return this.state.contacts;
    }
    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(filter.trim().toLowerCase())
    );
  };

  componentDidUpdate() {
    localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
  }

  componentDidMount() {
    if (!localStorage.getItem('contacts')) {
      return;
    }
      try {
        const contacts = JSON.parse(localStorage.contacts);
        this.setState({ contacts });
      } catch (error) {
        Notify.failure(`Can't reade from Local Storage. ${error.message}`);
      }
  }

  render() {
    return (
      <Container>
        <Button type="button" onClick={this.handleFillPhonebook}>
          Randomise Data
        </Button>

        <Section title="Add Contact">
          <ContactEditor onSubmit={this.addContact} />
        </Section>

        <Section title="Filter by Name">
          <Filter
            filter={this.state.filter}
            onChange={this.onChange}
            onReset={this.handleResetFilter}
          />
        </Section>
        <Section title="Contacts List">
          <ContactsList
            contacts={this.filterContacts(
              this.state.contacts,
              this.state.filter
            )}
            onClick={this.handleDeleteContact}
          />
        </Section>
      </Container>
    );
  }
}

export default App;
