import './Modal.css';

export const Modal = () => {
  return (
    <div className="modal">
      <div className="modal-body">
        <h3>Новое название задачи</h3>
        <input type="text" />
        <button>Применить</button>
      </div>
    </div>
  );
};
