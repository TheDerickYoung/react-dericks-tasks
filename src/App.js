import './App.css';
import React, { useState, useEffect } from 'react';

function App() {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    // Load cards from localStorage on component mount
    const storedCards = localStorage.getItem('cards');
    if (storedCards) {
      setCards(JSON.parse(storedCards));
    }
  }, []);

  const addCard = (text) => {
    const newCards = [...cards, text];
    setCards(newCards);
    // Save cards to localStorage
    localStorage.setItem('cards', JSON.stringify(newCards));
  };

  const deleteCard = (index) => {
    const newCards = [...cards];
    newCards.splice(index, 1);
    setCards(newCards);
    // Save updated cards to localStorage
    localStorage.setItem('cards', JSON.stringify(newCards));
  };

  return (
    <div className="App">
      <h1 className="app-title">My Tasks</h1>
      <Form addCard={addCard} />
      <CardList cards={cards} deleteCard={deleteCard} />
    </div>
  );
}

const Form = ({ addCard }) => {
  const [inputText, setInputText] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (inputText.trim() !== '') {
      addCard(inputText);
      setInputText('');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="form-input"
          placeholder="Enter a to-do item..."
          value={inputText}
          onChange={(event) => setInputText(event.target.value)}
        />
        <input type="submit" className="form-submit" value="Add Task" />
      </form>
    </div>
  );
};

const CardList = ({ cards, deleteCard }) => {
  return (
    <div>
      {cards.map((text, index) => (
        <Card key={index} text={text} index={index} deleteCard={deleteCard} />
      ))}
    </div>
  );
};

const Card = ({ text, index, deleteCard }) => {
  const [checked, setChecked] = useState(false);

  const handleCheckboxChange = () => {
    setChecked(!checked);
  };

  const handleDelete = () => {
    deleteCard(index);
  };

  return (
    <div className="card">
      <Checkbox checked={checked} onChange={handleCheckboxChange} />
      <p>{text}</p>
      <button onClick={handleDelete} className='delete btn'>Delete</button>
    </div>
  );
};

const Checkbox = ({ checked, onChange }) => {
  return (
    <input
      type="checkbox"
      checked={checked}
      onChange={onChange}
      className="checkbox"
    />
  );
};

export default App;
