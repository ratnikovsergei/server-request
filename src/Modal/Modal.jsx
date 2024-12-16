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
        <h3 className="modal-title">Новое название задачи</h3>
        <input
          type="text"
          className="rename-input"
          placeholder={oldTodoName}
          onChange={({ target }) => {
            setNewTodoName(target.value);
          }}
        />
        <button className="modal-btn" onClick={() => handleRename(currentId)}>
          Применить
        </button>
        <button className="modal-btn" onClick={() => close()}>
          Закрыть
        </button>
      </div>
    </div>
  );
};
