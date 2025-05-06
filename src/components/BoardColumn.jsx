import React, { useState } from 'react';
import { Droppable, Draggable } from '@hello-pangea/dnd';

function BoardColumn({ column, colIndex, columns, setColumns }) {
  const [cardInput, setCardInput] = useState('');

  const addCard = () => {
    if (cardInput.trim() === '') return;

    const updated = [...columns];
    updated[colIndex].cards.push(cardInput.trim());
    setColumns(updated);
    setCardInput('');
  };

  return (
    <div className="column-wrapper">
      <h3>{column.title}</h3>

      <Droppable droppableId={colIndex.toString()}>
        {(provided) => (
          <div
            className="column"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {column.cards.map((card, index) => (
              <Draggable
                key={`${colIndex}-${index}`}
                draggableId={`${colIndex}-${index}`}
                index={index}
              >
                {(provided) => (
                  <div
                    className="card"
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    {card}
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      <input
        value={cardInput}
        onChange={(e) => setCardInput(e.target.value)}
        placeholder="Add a card"
      />
      <button onClick={addCard}>+ Add</button>
    </div>
  );
}

export default BoardColumn;
