// import './BoardColumn.css';
// import React, { useState } from 'react';
// import { Droppable, Draggable } from '@hello-pangea/dnd';

// function BoardColumn({ column, colIndex, columns, setColumns }) {
//   const [cardInput, setCardInput] = useState('');
//   const [isEditingTitle, setIsEditingTitle] = useState(false);
//   const [editedTitle, setEditedTitle] = useState(column.title);

//   const [editingCardIndex, setEditingCardIndex] = useState(null);
//   const [editedCardText, setEditedCardText] = useState('');

//   const addCard = () => {
//     if (cardInput.trim() === '') return;
//     const updated = [...columns];
//     updated[colIndex].cards.push(cardInput.trim());
//     setColumns(updated);
//     setCardInput('');
//   };

//   const handleTitleBlur = () => {
//     const updated = [...columns];
//     updated[colIndex].title = editedTitle.trim() || column.title;
//     setColumns(updated);
//     setIsEditingTitle(false);
//   };

//   const handleCardBlur = (index) => {
//     const updated = [...columns];
//     updated[colIndex].cards[index] =
//       editedCardText.trim() || columns[colIndex].cards[index];
//     setColumns(updated);
//     setEditingCardIndex(null);
//   };

//   const deleteCard = (index) => {
//     const updated = [...columns];
//     updated[colIndex].cards.splice(index, 1);
//     setColumns(updated);
//   };

//   return (
//     <div className="column-wrapper">
//       <div className="column-header">
//         {isEditingTitle ? (
//           <input
//             value={editedTitle}
//             onChange={(e) => setEditedTitle(e.target.value)}
//             onBlur={handleTitleBlur}
//             autoFocus
//           />
//         ) : (
//           <div>
//             <h3 onClick={() => setIsEditingTitle(true)}>{column.title}  <span
//               onClick={() => setIsEditingTitle(true)}
//                className='pencil'
//             >
//               ✏️
//             </span></h3>
          
//           </div>
//         )}
//       </div>

//       <Droppable droppableId={colIndex.toString()}>
//         {(provided) => (
//           <div
//             className="column"
//             {...provided.droppableProps}
//             ref={provided.innerRef}
//           >
//             {column.cards.map((card, index) => (
//               <Draggable
//                 key={`${colIndex}-${index}`}
//                 draggableId={`${colIndex}-${index}`}
//                 index={index}
//               >
//                 {(provided) => (
//                   <div
//                     className="card"
//                     ref={provided.innerRef}
//                     {...provided.draggableProps}
//                     {...provided.dragHandleProps}
//                   >
//                     <div className="card-content">
//                       {editingCardIndex === index ? (
//                         <input
//                           value={editedCardText}
//                           onChange={(e) => setEditedCardText(e.target.value)}
//                           onBlur={() => handleCardBlur(index)}
//                           autoFocus
//                         />
//                       ) : (
//                         <span
//                           onClick={() => {
//                             setEditingCardIndex(index);
//                             setEditedCardText(card);
//                           }}
//                         >
//                           {card}
//                         </span>
//                       )}
//                       <button
//                         className="delete-button"
//                         onClick={() => deleteCard(index)}
//                       >
//                         🗑️
//                       </button>
//                     </div>
//                   </div>
//                 )}
//               </Draggable>
//             ))}
//             {provided.placeholder}
//           </div>
//         )}
//       </Droppable>

//       <input
//         value={cardInput}
//         onChange={(e) => setCardInput(e.target.value)}
//         placeholder="Add a card" 
//       />

//       <button className="add-button"onClick={addCard}>+ Add</button>
//     </div>
//   );
// }

// export default BoardColumn;
import './BoardColumn.css';
import React, { useState } from 'react';
import { Droppable, Draggable } from '@hello-pangea/dnd';
import { FixedSizeList as List } from 'react-window';

function BoardColumn({ column, colIndex, columns, setColumns }) {
  const [cardInput, setCardInput] = useState('');
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [editedTitle, setEditedTitle] = useState(column.title);

  const [editingCardIndex, setEditingCardIndex] = useState(null);
  const [editedCardText, setEditedCardText] = useState('');

  const addCard = () => {
    if (cardInput.trim() === '') return;
    const updated = [...columns];
    updated[colIndex].cards.push({ content: cardInput.trim() }); // ✅ Push object
    setColumns(updated);
    setCardInput('');
  };

  const handleTitleBlur = () => {
    const updated = [...columns];
    updated[colIndex].title = editedTitle.trim() || column.title;
    setColumns(updated);
    setIsEditingTitle(false);
  };

  const handleCardBlur = (index) => {
    const updated = [...columns];
    updated[colIndex].cards[index].content = editedCardText; // ✅ Fix typo
    setColumns(updated);
    setEditingCardIndex(null); // ✅ Exit editing mode
  };

  const deleteCard = (index) => {
    const updated = [...columns];
    updated[colIndex].cards.splice(index, 1);
    setColumns(updated);
  };

  return (
    <div className="column-wrapper">
      <div className="column-header">
        {isEditingTitle ? (
          <input
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            onBlur={handleTitleBlur}
            autoFocus
          />
        ) : (
          <div>
            <h3 onClick={() => setIsEditingTitle(true)}>
              {column.title}
              <span onClick={() => setIsEditingTitle(true)} className="pencil">
                ✏️
              </span>
            </h3>
          </div>
        )}
      </div>

      <Droppable droppableId={colIndex.toString()}>
        {(provided) => (
          <div
            className="column"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            <List
              height={300}
              itemCount={column.cards.length}
              itemSize={80}
              width="100%"
            >
              {({ index, style }) => {
                const card = column.cards[index];
                return (
                  <Draggable
                    key={`${colIndex}-${index}`}
                    draggableId={`${colIndex}-${index}`}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        className="card"
                        style={style}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <div className="card-content">
                          {editingCardIndex === index ? (
                            <input
                              value={editedCardText}
                              onChange={(e) =>
                                setEditedCardText(e.target.value)
                              }
                              onBlur={() => handleCardBlur(index)}
                              autoFocus
                            />
                          ) : (
                            <span
                              onClick={() => {
                                setEditingCardIndex(index);
                                setEditedCardText(card.content);
                              }}
                            >
                              {card.content}
                            </span>
                          )}
                          <button
                            className="delete-button"
                            onClick={() => deleteCard(index)}
                          >
                            🗑️
                          </button>
                        </div>
                      </div>
                    )}
                  </Draggable>
                );
              }}
            </List>
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      <input
        value={cardInput}
        onChange={(e) => setCardInput(e.target.value)}
        placeholder="Add a card"
      />
      <button className="add-button" onClick={addCard}>
        + Add
      </button>
    </div>
  );
}

export default BoardColumn;
