import React, { useState, useEffect } from 'react';
import './List.css'; 

function List({ onUserSelect, selectedUserId }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          'https://raw.githubusercontent.com/netology-code/ra16-homeworks/master/hooks-context/use-effect/data/users.json'
        );
        
        if (!response.ok) {
          throw new Error('Ошибка загрузки списка пользователей');
        }
        
        const data = await response.json();
        setUsers(data);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <div className="list-loading">Загрузка списка пользователей...</div>;
  }

  if (error) {
    return <div className="list-error">Ошибка: {error}</div>;
  }

  return (
    <div className="list">
      <h2>Пользователи</h2>
      <ul className="user-list">
        {users.map((user) => (
          <li
            key={user.id}
            className={`user-item ${selectedUserId === user.id ? 'active' : ''}`}
            onClick={() => onUserSelect(user)}
          >
            {user.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default List;