# Todo App на React

## Описание проекта
Необходимо создать полнофункциональное React-приложение для управления списком задач. Приложение должно обеспечивать полный цикл работы с задачами: создание, редактирование, удаление, отметку как выполненных, фильтрацию и сохранение данных.

## Технологический стек
- **React** (функциональные компоненты с хуками)
- **useState/useEffect** (для управления состоянием и побочными эффектами)
- **localStorage API** (для сохранения данных)
- **CSS** (для стилизации)

## Функциональные требования

### Управление задачами
- Добавление новых задач через форму ввода
- Отметка задач как выполненных/невыполненных
- Удаление задач из списка
- Редактирование текста существующих задач (по двойному клику)

### Фильтрация и отображение
- Фильтрация задач по статусу: "Все", "Активные", "Завершенные"
- Отображение статистики (общее количество, активные, завершенные)
- Состояние "пустого списка" при отсутствии задач
- Визуальное различие между активными и завершенными задачами

### Сохранение данных
- Автоматическое сохранение в localStorage при изменениях
- Восстановление данных при перезагрузке страницы
- Сохранение состояния фильтров

### Пользовательский интерфейс
- Современный и привлекательный дизайн
- Плавные анимации и переходы
- Адаптивный дизайн для мобильных устройств
- Индикация текущего активного фильтра

## Пошаговое выполнение

### Шаг 1: Подготовка и настройка

**Что делать:**
- Создать новый React-проект с помощью Vite
- Создать структуру папок для компонентов
- Настроить базовые стили приложения
- Создать основной компонент App

**Примеры кода для понимания:**

Создание проекта:
```bash
npm create vite@latest todo-app -- --template react
cd todo-app
npm install
```

Базовая структура App компонента:
```javascript
import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all');

  return (
    <div className="app">
      <div className="container">
        <header className="header">
          <h1>Todo App</h1>
        </header>
        {/* остальные компоненты */}
      </div>
    </div>
  );
}

export default App;
```

Структура данных для задачи:
```javascript
const todoExample = {
  id: Date.now(), // или используйте crypto.randomUUID()
  text: "Изучить React",
  completed: false,
  createdAt: new Date().toISOString()
};
```

### Шаг 2: Создание основного состояния и localStorage

**Что делать:**
- Настроить состояние для списка задач и текущего фильтра
- Реализовать загрузку данных из localStorage при инициализации
- Реализовать сохранение данных в localStorage при изменениях
- Добавить функции для работы с задачами

**Примеры кода для понимания:**

Инициализация состояния из localStorage:
```javascript
const [todos, setTodos] = useState(() => {
  const savedTodos = localStorage.getItem('todos');
  return savedTodos ? JSON.parse(savedTodos) : [];
});
```

Сохранение в localStorage при изменениях:
```javascript
useEffect(() => {
  localStorage.setItem('todos', JSON.stringify(todos));
}, [todos]);
```

Основные функции для работы с задачами:
```javascript
const addTodo = (text) => {
  const newTodo = {
    id: Date.now(),
    text: text.trim(),
    completed: false,
    createdAt: new Date().toISOString()
  };
  setTodos(prev => [...prev, newTodo]);
};

const toggleTodo = (id) => {
  setTodos(prev => 
    prev.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    )
  );
};

const deleteTodo = (id) => {
  setTodos(prev => prev.filter(todo => todo.id !== id));
};

const updateTodo = (id, newText) => {
  setTodos(prev =>
    prev.map(todo =>
      todo.id === id ? { ...todo, text: newText } : todo
    )
  );
};
```

### Шаг 3: Компонент добавления задач

**Что делать:**
- Создать компонент AddTodo с формой ввода
- Реализовать контролируемый инпут
- Добавить валидацию ввода (нельзя добавить пустую задачу)
- Обработать отправку формы и очистку поля

**Примеры кода для понимания:**

Структура компонента AddTodo:
```javascript
import { useState } from 'react';

const AddTodo = ({ onAdd }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const text = inputValue.trim();
    
    if (text) {
      onAdd(text);
      setInputValue('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add-todo-form">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Добавить новую задачу..."
        className="todo-input"
      />
      <button type="submit" className="add-button">
        Добавить
      </button>
    </form>
  );
};

export default AddTodo;
```

Использование компонента:
```javascript
// В App.js
import AddTodo from './components/AddTodo';

<AddTodo onAdd={addTodo} />
```

### Шаг 4: Компонент фильтров

**Что делать:**
- Создать компонент FilterButtons для переключения между фильтрами
- Реализовать активное состояние для текущего фильтра
- Добавить обработчики клика для смены фильтра

**Примеры кода для понимания:**

Компонент FilterButtons:
```javascript
const FilterButtons = ({ currentFilter, onFilterChange }) => {
  const filters = [
    { key: 'all', label: 'Все' },
    { key: 'active', label: 'Активные' },
    { key: 'completed', label: 'Завершенные' }
  ];

  return (
    <div className="filters">
      {filters.map(filter => (
        <button
          key={filter.key}
          onClick={() => onFilterChange(filter.key)}
          className={`filter-button ${currentFilter === filter.key ? 'active' : ''}`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
};

export default FilterButtons;
```

Функция фильтрации в App:
```javascript
const getFilteredTodos = () => {
  switch (filter) {
    case 'active':
      return todos.filter(todo => !todo.completed);
    case 'completed':
      return todos.filter(todo => todo.completed);
    default:
      return todos;
  }
};
```

### Шаг 5: Компонент отдельной задачи

**Что делать:**
- Создать компонент TodoItem для отображения одной задачи
- Реализовать отображение чекбокса, текста и кнопки удаления
- Добавить функциональность редактирования по двойному клику
- Обработать различные состояния (обычное, редактирование, завершенное)

**Примеры кода для понимания:**

Компонент TodoItem:
```javascript
import { useState } from 'react';

const TodoItem = ({ todo, onToggle, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleDoubleClick = () => {
    setIsEditing(true);
    setEditText(todo.text);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const text = editText.trim();
    if (text) {
      onUpdate(todo.id, text);
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      setEditText(todo.text);
      setIsEditing(false);
    }
  };

  if (isEditing) {
    return (
      <div className="todo-item editing">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onBlur={handleSubmit}
            onKeyDown={handleKeyDown}
            className="edit-input"
            autoFocus
          />
        </form>
      </div>
    );
  }

  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        className="todo-checkbox"
      />
      <span
        onDoubleClick={handleDoubleClick}
        className="todo-text"
      >
        {todo.text}
      </span>
      <button
        onClick={() => onDelete(todo.id)}
        className="delete-button"
      >
        ✕
      </button>
    </div>
  );
};

export default TodoItem;
```

### Шаг 6: Компонент списка задач

**Что делать:**
- Создать компонент TodoList для отображения списка задач
- Реализовать рендеринг отфильтрованных задач
- Добавить состояние "пустого списка"
- Передать необходимые обработчики событий

**Примеры кода для понимания:**

Компонент TodoList:
```javascript
import TodoItem from './TodoItem';

const TodoList = ({ todos, onToggle, onDelete, onUpdate }) => {
  if (todos.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">📝</div>
        <p>Нет задач для отображения</p>
      </div>
    );
  }

  return (
    <div className="todo-list">
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      ))}
    </div>
  );
};

export default TodoList;
```

Использование в App:
```javascript
const filteredTodos = getFilteredTodos();

<TodoList
  todos={filteredTodos}
  onToggle={toggleTodo}
  onDelete={deleteTodo}
  onUpdate={updateTodo}
/>
```

### Шаг 7: Компонент статистики

**Что делать:**
- Создать компонент Stats для отображения статистики
- Показать общее количество задач, активных и завершенных
- Обновлять статистику при изменении

# Как сдавать
- Создайте форк репозитория в организации 41ISR с названием mobdev3-lab9-вашафамилия
- Используя ветку wip сделайте задание
- Зафиксируйте изменения в вашем репозитории
- Когда документ будет готов - создайте пул реквест из ветки wip (вашей) на ветку main (тоже вашу) и укажите меня (ktkv419) как reviewer

Не мержите сами коммит, это сделаю я после проверки задания
