import { useState } from 'react';
import s from './ContactForm.module.css';
import PropTypes from 'prop-types';

export default function ContactForm({ onAddContact }) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleSubmit = e => {
    e.preventDefault();

    resetInputForm();
    onAddContact(name, number);
  };

  const resetInputForm = () => {
    setName('');
    setNumber('');
  };

  return (
    <form className={s.form} onSubmit={handleSubmit}>
      <label className={s.label}>
        <input
          className={s.name}
          type="text"
          name="name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
      </label>
      <label className={s.label}>
        <input
          className={s.number}
          type="tel"
          name="number"
          value={number}
          onChange={e => setNumber(e.target.value)}
        />
      </label>
      <button className={s.button} type="submit">
        Add contact
      </button>
    </form>
  );
}

ContactForm.propTypes = {
  onAddContact: PropTypes.func.isRequired,
};
