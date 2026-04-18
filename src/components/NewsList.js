// Компонент для отображения списка новостей. Принимает массив статей через проп 'articles'.

import React from 'react';

/**
 * NewsList - компонент, который рендерит список новостей.
 * @param {Array} articles - массив объектов со статьями. Каждый объект должен содержать свойства 'webTitle' и 'webUrl'.
 */
const NewsList = ({ articles }) => {

return (
    <div className="news-list">
    {/* Перебираем массив статей с помощью map.
        Для каждого элемента (article) создается отдельный блок новости.
        В качестве ключа (key) используем индекс массива. 
        */}
    {articles.map((article, index) => (
        <div key={index} className="news-item">
          {/* Заголовок статьи, берется из свойства webTitle объекта article */}
        <h3>{article.webTitle}</h3>
        {/* Абзац с ссылкой на полную версию статьи.
            href - ссылка из свойства webUrl.
            target="_blank" - открывает ссылку в новой вкладке.
            rel="noopener noreferrer" - рекомендация по безопасности для target="_blank". */}
        <p>
            <a href={article.webUrl} target="_blank" rel="noopener noreferrer">
            Читать статью
            </a>
        </p>
        </div>
    ))}
    </div>
);
};

export default NewsList;