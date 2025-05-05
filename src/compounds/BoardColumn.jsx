import { useState } from 'react';
import Card from './card';

function BoardColumn({ column, setColumns, columns, colIndex }) {
  const [cardInput, setCardInput] = useState('');

  const addCard = () => {
    const updated = [...columns];
    updated[colIndex].cards.push(cardInput);
    setColumns(updated);
    setCardInput('');
  };

  return (
    <div className="column">
      <h3>{column.title}</h3>

      {column.cards.map((card, i) => (
        <Card key={i} text={card} />
      ))}

      <input
        value={cardInput}
        onChange={(e) => setCardInput(e.target.value)}
        placeholder="Add card"
      />
      <button onClick={addCard}>+ Add a card</button>
    </div>
  );
}

export default BoardColumn;
