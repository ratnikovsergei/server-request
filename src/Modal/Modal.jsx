import { useRef } from 'react';
import './Modal.css';

export const Modal = ({ handleRename, oldTodoName, close }) => {
  const inputRef = useRef(null);
  return (
    <div className="modal">
      <div className="modal-body">
        <h3 className="modal-title">Новое название задачи</h3>
        <input
          ref={inputRef}
          type="text"
          className="rename-input"
          defaultValue={oldTodoName}
        />
        <button
          className="modal-btn"
          onClick={() => handleRename(inputRef.current.value)}
        >
          Применить
        </button>
        <button className="modal-btn" onClick={close}>
          Закрыть
        </button>
      </div>
    </div>
  );
};
