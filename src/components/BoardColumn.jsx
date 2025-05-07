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
    updated[colIndex].cards.push(cardInput.trim());
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
    updated[colIndex].cards[index] = editedCardText.trim() || column.cards[index];
    setColumns(updated);
    setEditingCardIndex(null);
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
          <h3 onClick={() => setIsEditingTitle(true)}>
            {column.title}
            <span onClick={() => setIsEditingTitle(true)} className="pencil"> ✏️</span>
          </h3>
        )}
      </div>

      <Droppable
  droppableId={colIndex.toString()}
  mode="virtual"
  renderClone={(provided, snapshot, rubric) => {
    const card = column.cards[rubric.source.index];
    return (
      <div
        className="card"
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        style={provided.draggableProps.style}
      >
        <div className="card-content">{card}</div>
      </div>
    );
  }}
>
  {(provided, snapshot) => {
    const itemCount = column.cards.length;
    const height = Math.min(5, itemCount) * 70 || 140;

    return (
      <List
        height={height}
        itemCount={itemCount}
        itemSize={50}
        width="100%"
        outerRef={provided.innerRef}
        itemData={{ cards: column.cards, provided }}
      >
        {({ index, style, data }) => {
          const card = data.cards[index];
          return (
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
                  style={{ ...style, ...provided.draggableProps.style }}
                >
                  <div className="card-content">
                    {editingCardIndex === index ? (
                      <input
                        value={editedCardText}
                        onChange={(e) => setEditedCardText(e.target.value)}
                        onBlur={() => handleCardBlur(index)}
                        autoFocus
                      />
                    ) : (
                      <span
                        onClick={() => {
                          setEditingCardIndex(index);
                          setEditedCardText(card);
                        }} className='innercard'
                      >
                        {card}
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
    );
  }}
</Droppable>


      <input
        value={cardInput}
        onChange={(e) => setCardInput(e.target.value)}
        placeholder="Add a card"
      />
      <button className="add-button" onClick={addCard}>+ Add</button>
    </div>
  );
}

export default BoardColumn;
