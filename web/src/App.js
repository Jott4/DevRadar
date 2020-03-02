import React, { useEffect, useState } from "react";
import "./global.css";
import "./App.css";
import "./sidebar.css";
import "./main.css";
import api from "./services/api";
import DevItem from "./components/DevItem";
import DevForm from "./components/DevForm";

// Componente: Bloco isolado de HTML/CSS/JS o qual nao interfere no restante da aplicação
// Propriedade: Info que um componente pai passa para um componente filho
// Estado: Info mantidas pelo componente

function App() {
  const [devs, setDevs] = useState([]);

  useEffect(() => {
    async function loadDevs() {
      const response = await api.get("/devs");
      setDevs(response.data);
    }
    loadDevs();
  }, []);

  async function handleAddDev(data) {
    const response = await api.post("/devs", data);
    setDevs([...devs, response.data]);
  }

  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <DevForm onSubmit={handleAddDev} />
      </aside>

      <main>
        <ul className="ul">
          {devs.map(dev => (
            <DevItem key={dev._id} dev={dev} />
          ))}
        </ul>
      </main>
    </div>
  );
}
export default App;
