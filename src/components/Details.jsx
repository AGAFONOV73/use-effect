import React, { useState, useEffect } from "react";
import "./Details.css";

function Details({ info }) {
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!info) {
      setUserDetails(null);
      return;
    }
    const fetchUserDetails = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          `https://raw.githubusercontent.com/netology-code/ra16-homeworks/master/hooks-context/use-effect/data/${info.id}.json`,
        );
        if (!response.ok) {
          throw new Error("Ошибка загрузки данных пользователя");
        }
        const data = await response.json();
        setUserDetails(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [info]);

  if (!info) {
    return (
      <div className="details-placeholder">
        <p>Выберите пользователя из списка</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="details-loading">
        <div className="spinner"></div>
        <p>Загрузка данных пользователя...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="details-error">
        <p>Ошибка: {error}</p>
        <p>Попробуйте выбрать другого пользователя</p>
      </div>
    );
  }

  if (!userDetails) {
    return null;
  }

  return (
    <div className="details">
      <div className="details-header">
        <img className="avatar" src={userDetails.avatar} alt={`${userDetails.name} avatar`} />
        <div>
          <h2>{userDetails.name}</h2>
          <p className="position">{userDetails.details?.position}</p>
        </div>
      </div>
      <div className="details-content">
        <div className="detail-item">
          <span className="detail-label">Город:</span>
          <span className="detail-value">{userDetails.details?.city}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Компания:</span>
          <span className="detail-value">{userDetails.details?.company}</span>
        </div>
      </div>
    </div>
  );
}

export default Details;
