function Card({ text, provided }) {
  return (
    <div
      className="card"
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
    >
      {text}
    </div>
  );
}

export default Card;
