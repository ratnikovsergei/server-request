import './Modal.css';

export const Modal = ({
  currentId,
  handleRename,
  newTodoName,
  setNewTodoName,
  close,
}) => {
  return (
    <div className="modal">
      <div className="modal-body">
        <h3>Новое название задачи</h3>
        <input
          type="text"
          onChange={({ target }) => {
            setNewTodoName(target.value);
            console.log(newTodoName);
          }}
        />
        <button onClick={() => handleRename(currentId)}>Применить</button>
        <button onClick={() => close()}>Закрыть</button>
      </div>
    </div>
  );
};
