import { useState } from 'react';
import BoardColumn from './components/BoardColumn';

function App() {
  const [columns, setColumns] = useState([
    { title: 'To Do', cards: [] },
    { title: 'Doing', cards: [] }
  ]);

  const addColumn = () => {
    setColumns([...columns, { title: 'New Column', cards: [] }]);
  };

  return (
    <div className="board">
      {columns.map((col, index) => (
        <BoardColumn key={index} colIndex={index} column={col} setColumns={setColumns} columns={columns} />
      ))}
      <button onClick={addColumn}>+ Add a Column</button>
    </div>
  );
}

export default App;
