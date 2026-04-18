// Основной компонент приложения. Управляет состоянием (стейтом), выполняет запросы к API и
// координирует работу дочерних компонентов NewsSearch и NewsList.

import React, { useState } from 'react';
import axios from 'axios'; // Библиотека для выполнения HTTP-запросов.
import NewsSearch from './components/NewsSearch'; // Компонент для ввода поискового запроса.
import NewsList from './components/NewsList'; // Компонент для отображения списка новостей.
import './App.css';

const API_KEY = '61651c43-0f3e-499b-b4b1-75ea88122346';

/**
 * App - корневой компонент приложения.
 * Содержит всю бизнес-логику: состояние статей, текущую страницу, поиск и пагинацию.
 */
function App() {
  // --- СОСТОЯНИЕ (STATE) ---

  // Массив статей, полученных от API. Изначально пустой.
  const [articles, setArticles] = useState([]);

  // Номер текущей страницы для пагинации. Начинаем с первой.
  const [currentPage, setCurrentPage] = useState(1);

  // Текущий поисковый запрос. Нужен для запоминания того, что искал пользователь.
  const [query, setQuery] = useState('');


  // --- ФУНКЦИИ ---

  /**
   * fetchNews - асинхронная функция для загрузки новостей с API.
   * @param {string} searchQuery - строка поиска, которую ввел пользователь.
   * @param {number} page - номер страницы для пагинации (по умолчанию 1).
   */
  const fetchNews = async (searchQuery, page = 1) => {
    try {
      // Выполняем GET-запрос к API The Guardian.
      // Параметры: поисковый запрос (q), номер страницы (page) и ключ доступа (api-key).
      const response = await axios.get(
        `https://content.guardianapis.com/search?q=${searchQuery}&page=${page}&api-key=${API_KEY}`
      );

      // Обновляем состояние:
      // 1. Сохраняем массив статей из ответа сервера.
      // 2. Запоминаем текущий поисковый запрос.
      // 3. Обновляем номер текущей страницы.
      setArticles(response.data.response.results);
      setQuery(searchQuery);
      setCurrentPage(page);

    } catch (error) {
      // В случае ошибки (например, нет интернета или неверный ключ API) выводим сообщение в консоль.
      console.error('Ошибка при загрузке новостей:', error);
    }
  };

  /**
   * handlePageChange - обработчик кликов по кнопкам пагинации.
   * @param {number} direction - направление перехода: -1 (назад) или +1 (вперед).
   */
  const handlePageChange = (direction) => {
    const nextPage = currentPage + direction;

    // Проверяем, что номер страницы больше нуля, чтобы не уйти в "отрицательные" страницы.
    if (nextPage > 0) {
      // Загружаем новости для новой страницы, используя текущий поисковый запрос.
      fetchNews(query, nextPage);
    }
  };

  // --- JSX (ВОЗВРАЩАЕМОЕ СОДЕРЖИМОЕ) ---

  return (
    <div className="app">
      <h1>Новости The Guardian</h1>

      {/* Рендерим компонент для поиска. Передаем ему функцию onSearch,
          которая будет вызвана из дочернего компонента с текстом запроса. */}
      <NewsSearch onSearch={(query) => fetchNews(query)} />

      {/* Рендерим компонент со списком новостей, передавая ему массив статей из состояния. */}
      <NewsList articles={articles} />

      {/* Блок пагинации отображается только если есть хотя бы одна статья. */}
      {articles.length > 0 && (
        <div className="pagination">
          {/* Кнопка "Назад". При клике вызывает handlePageChange с аргументом -1. */}
          <button onClick={() => handlePageChange(-1)} disabled={currentPage === 1}>
            Предыдущая
          </button>

          {/* Отображаем текущий номер страницы. */}
          <span>Страница: {currentPage}</span>

          {/* Кнопка "Вперед". При клике вызывает handlePageChange с аргументом +1. */}
          <button onClick={() => handlePageChange(1)}>Следующая</button>
        </div>
      )}
    </div>
  );
}

export default App;
