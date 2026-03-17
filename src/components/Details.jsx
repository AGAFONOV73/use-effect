import React, { useState, useEffect, use } from "react";
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
      <h2>{userDetails.name}</h2>
      <div className="details-content">
        <div className="detail-item">
          <span className="detail-label">Email:</span>
          <span className="detail-value">{userDetails.email}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Телефон:</span>
          <span className="detail-value">{userDetails.phone}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Компания:</span>
          <span className="detail-value">{userDetails.company?.name}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Адрес:</span>
          <span className="detail-value">
            {userDetails.address && (
              <>
                {userDetails.address.city}, {userDetails.address.street},{" "}
                {userDetails.address.suite}
              </>
            )}
          </span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Веб-сайт:</span>
          <span className="detail-value">{userDetails.website}</span>
        </div>
      </div>
    </div>
  );
}

export default Details;
