import React from "react";
import "./styles.css";
import api from "../../services/api";



function DevItem({ dev }) {
  
  async function eraseDev() {
    await api.delete(`/devs?github_username=${dev.github_username}`);
    console.log(dev.github_username);
  }

  return (
    <li className="dev-item">
      <button onClick={eraseDev} className="btnErase">
        X
      </button>
      <header>
        <img src={dev.avatar_url} alt={dev.name} />
        <div className="user-info">
          <strong>{dev.name}</strong>
          <span>{dev.techs.join(", ")}</span>
        </div>
      </header>
      <p>{dev.bio}</p>
      <a href={`https://github.com/${dev.github_username}`}>
        Acessar Perfil no Github
      </a>
    </li>
  );
}
export default DevItem;
