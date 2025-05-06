import React, { useState } from 'react';
import { DragDropContext } from '@hello-pangea/dnd';
import BoardColumn from './components/BoardColumn';
import './App.css';
import { initialColumns } from './components/data';

function App() {
  const [columns, setColumns] = useState(initialColumns);

  const handleDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;

    const sourceColIndex = parseInt(source.droppableId);
    const destColIndex = parseInt(destination.droppableId);

    const sourceCards = [...columns[sourceColIndex].cards];
    const [movedCard] = sourceCards.splice(source.index, 1);

    const updatedCols = [...columns];
    if (sourceColIndex === destColIndex) {
      updatedCols[sourceColIndex].cards.splice(source.index, 1);
      updatedCols[destColIndex].cards.splice(destination.index, 0, movedCard);
    } else {
      updatedCols[sourceColIndex].cards = sourceCards;
      updatedCols[destColIndex].cards.splice(destination.index, 0, movedCard);
    }

    setColumns(updatedCols);
  };

  return (
    <div className="App">
      <h1>Trello Clone</h1>
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="board">
          {columns.map((col, index) => (
            <BoardColumn
              key={index}
              colIndex={index}
              column={col}
              columns={columns}
              setColumns={setColumns}
            />
          ))}
        </div>
      </DragDropContext>
    </div>
  );
}

export default App;
