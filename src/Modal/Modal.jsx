import './Modal.css';

export const Modal = ({
  currentId,
  handleRename,
  oldTodoName,
  setNewTodoName,
  close,
}) => {
  return (
    <div className="modal">
      <div className="modal-body">
        <h3>Новое название задачи</h3>
        <input
          type="text"
          placeholder={oldTodoName}
          onChange={({ target }) => {
            setNewTodoName(target.value);
          }}
        />
        <button onClick={() => handleRename(currentId)}>Применить</button>
        <button onClick={() => close()}>Закрыть</button>
      </div>
    </div>
  );
};
