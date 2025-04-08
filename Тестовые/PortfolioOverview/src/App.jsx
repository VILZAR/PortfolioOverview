import "./css/main.css";
import { Provider } from "react-redux";
import store from "./redux/store";
import ModalCryptoForm from "./Comonents//Modal/ModalCryptoForm";
import Assets from "./Comonents/Assets/Assets";

function App() {
  const handleOpen = () => {
    const modal = document.querySelector(".cryptos__form");
    modal.style.display = "flex";
  };

  return (
    <Provider store={store}>
      <header className="main__header">
        <h2 className="main__header_title">Portfolio Overview</h2>
        <button className="main__header_button" onClick={handleOpen}>
          Добавить актив
        </button>
      </header>
      <Assets />
      <ModalCryptoForm />
    </Provider>
  );
}

export default App;
