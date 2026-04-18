// Компонент для поиска новостей. Принимает функцию onSearch, которая будет вызвана при успешном поиске.

import React, { useState } from 'react';

/**
 * NewsSearch - компонент для ввода поискового запроса и запуска поиска.
 * @param {function} onSearch - callback-функция, которая получает строку запроса.
 */
const NewsSearch = ({ onSearch }) => {
  // useState для управления состоянием поля ввода.
  // query хранит текущий текст, введённый пользователем.
const [query, setQuery] = useState('');

/**
   * handleSearch - обработчик нажатия на кнопку "Поиск".
   * Проверяет, что введённый текст не пустой (после удаления пробелов),
   * и вызывает переданную функцию onSearch с текущим запросом.
   */
const handleSearch = () => {
    if (query.trim()) {
    onSearch(query);
    }
};

return (
    <div className="news-search">
      {/* Поле ввода для поискового запроса. */}
      {/* value связано с состоянием query, чтобы контролировать ввод. */}
      {/* onChange обновляет состояние при каждом изменении текста. */}
    <input
        type="text"
        placeholder="Введите тему, например: sport"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
    />
      {/* Кнопка для запуска поиска. При нажатии вызывается handleSearch. */}
    <button onClick={handleSearch}>Поиск</button>
    </div>
);
};

export default NewsSearch;