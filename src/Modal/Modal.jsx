import './Modal.css';

export const Modal = ({ closeModal }) => {
  return (
    <div className="modal">
      <div className="modal-body">
        <h3>Новое название задачи</h3>
        <input type="text" />
        <button onClick={() => {}}>Применить</button>
        <button onClick={() => closeModal()}>Закрыть</button>
      </div>
    </div>
  );
};
