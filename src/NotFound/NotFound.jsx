import { Link } from 'react-router-dom';

export const NotFound = () => {
  return (
    <div>
      <h2>Ошибка! Страница не найдена</h2>
      <Link to="/">На главную</Link>
    </div>
  );
};
