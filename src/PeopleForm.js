import React, { useState, useEffect } from "react";

const PeopleForm = ({ kisiler, submitFn }) => {
  const [isim, setIsim] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    if (kisiler.includes(isim)) {
      setError("Bu isim daha önce eklenmiş");
    } else {
      setError(null);
    }
  }, [isim, kisiler]);

  function handleIsimChange(e) {
    setIsim(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    submitFn(isim);
    setIsim("");
  }

  return (
    <form className="taskForm" onSubmit={handleSubmit}>

      <h2 className="form-title">Kişiler</h2>
       <hr className="form-divider" />
      <ul>
        {kisiler.map((kisi) => (
          <li className="pill" key={kisi}>{kisi}</li>
        ))}
      </ul>
      <hr className="form-divider" />

      {/* İsim alanı */}
      <div className="form-line">
      <h2 className="form-title">Yeni Kişi Ekle</h2>
        <label className="input-label" htmlFor="title">
        </label>
        <input
          className="input-text"
          placeholder="İsim girin"
          id="title"
          name="title"
          type="text"
          onChange={handleIsimChange}
          value={isim}
        />
        <p className="input-error">{error}</p>
      </div>

      <div className="form-line">
        <button
          className="submit-button"
          type="submit"
          disabled={isim.length === 0 || error}
        >
          Ekle
        </button>
      </div>
    </form>
  );
};

export default PeopleForm;
