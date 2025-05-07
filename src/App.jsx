// import React, { useState } from 'react';
// import { DragDropContext } from '@hello-pangea/dnd';
// import BoardColumn from './components/BoardColumn';
// import './App.css';
// import { initialColumns } from './components/data';

// function App() {
//   const [columns, setColumns] = useState(initialColumns);

//   // Function to handle drag-and-drop
//   const handleDragEnd = (result) => {
//     const { source, destination } = result;
//     if (!destination) return;

//     const sourceColIndex = parseInt(source.droppableId);
//     const destColIndex = parseInt(destination.droppableId);

//     const sourceCards = [...columns[sourceColIndex].cards];
//     const [movedCard] = sourceCards.splice(source.index, 1);

//     const updatedCols = [...columns];
//     if (sourceColIndex === destColIndex) {
//       updatedCols[sourceColIndex].cards.splice(source.index, 1);
//       updatedCols[destColIndex].cards.splice(destination.index, 0, movedCard);
//     } else {
//       updatedCols[sourceColIndex].cards = sourceCards;
//       updatedCols[destColIndex].cards.splice(destination.index, 0, movedCard);
//     }

//     setColumns(updatedCols);
//   };

//   // Function to add a new column
//   const addNewColumn = () => {
    
//     const newColumn = {
//       id: `column-${columns.length + 1}`,
//       title: `New Column ${columns.length + 1}`,
//       cards: []
//     };
//     setColumns([...columns, newColumn]);
//   };

//   // Function to add a new card to a specific column
//   const addNewCard = (columnIndex) => {
//     const newCard = {
//       id: `card-${columns[columnIndex].cards.length + 1}`,
//       content: `New Card ${columns[columnIndex].cards.length + 1}`
//     };
//     const updatedColumns = [...columns];
//     updatedColumns[columnIndex].cards.push(newCard);
//     setColumns(updatedColumns);
//   };

//   return (
//     <div className="App">
//       <h1>Trello Clone</h1>
//       <button onClick={addNewColumn}>Add New Column</button>
//       <DragDropContext onDragEnd={handleDragEnd}>
//         <div className="board">
//           {columns.map((col, index) => (
//             <BoardColumn
//               key={index}
//               colIndex={index}
//               column={col}
//               columns={columns}
//               setColumns={setColumns}
//               addNewCard={addNewCard}
//             />
//           ))}
//         </div>
//       </DragDropContext>
//     </div>
//   );
// }

// export default App;
import React, { useState } from 'react';
import { DragDropContext } from '@hello-pangea/dnd';
import BoardColumn from './components/BoardColumn';
import './App.css';
import { initialColumns } from './components/data';
import { FixedSizeList as List } from 'react-window';

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

  const addNewColumn = () => {
    const newColumn = {
      id: `column-${columns.length + 1}`,
      title: `New Column ${columns.length + 1}`,
      cards: []
    };
    setColumns([...columns, newColumn]);
  };

  const addNewCard = (columnIndex) => {
    const newCard = {
      id: `card-${columns[columnIndex].cards.length + 1}`,
      content: `New Card ${columns[columnIndex].cards.length + 1}`
    };
    const updatedColumns = [...columns];
    updatedColumns[columnIndex].cards.push(newCard);
    setColumns(updatedColumns);
  };

  return (
    <div className="App">
      <h1>Trello Clone</h1>
      <button onClick={addNewColumn}>Add New Column</button>
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="board">
          <List
            height={500}
            itemCount={columns.length}
            itemSize={320} // column width including margin
            layout="horizontal"
            width={window.innerWidth - 60}
          >
            {({ index, style }) => (
              <div style={style}>
                <BoardColumn
                  key={index}
                  colIndex={index}
                  column={columns[index]}
                  columns={columns}
                  setColumns={setColumns}
                  addNewCard={addNewCard}
                />
              </div>
            )}
          </List>
        </div>
      </DragDropContext>
    </div>
  );
}

export default App;
