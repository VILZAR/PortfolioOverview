import { useState } from "react";
import CryptoList from "./CryptoList";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import {
  setMyCrypto,
  setCurrentCrypto,
  setFilterCrypto,
} from "../../redux/cryptoSlice";

function ModalCryptoForm() {
  const dispatch = useDispatch();
  const [value, setValue] = useState(0);
  const { currentCrypto } = useSelector((state) => state.cryptos);

  const handleChange = (e) => {
    dispatch(setFilterCrypto(e.target.value));
  };

  const handleCount = (e) => {
    setValue(e.target.value);
  };
  
  const handleAdd = () => {
    if (value > 0) {
      dispatch(
        setMyCrypto({
          id: uuidv4(),
          symbol: currentCrypto,
          value: Number(value),
        })
      );
      handleClose();
    }
  };

  const handleClose = () => {
    document.querySelector(".cryptos__form").style.display = "none";
    dispatch(setCurrentCrypto(null));
    setValue(0);
  };

  return (
    <div className="cryptos__form">
      <input
        type="text"
        className="cryptos__form_input"
        onChange={handleChange}
      />
      <CryptoList />
      {currentCrypto && (
        <>
          <span className="cryptos__addform_title">
            {currentCrypto.replace("USDT", "")}
          </span>
          <input
            type="number"
            className="cryptos__addform_input"
            placeholder="Колличество"
            min={0}
            value={value}
            onChange={handleCount}
          />
          <button className="cryptos__addform_button" onClick={handleAdd}>
            Добавить
          </button>
          <button className="cryptos__addform_button" onClick={handleClose}>
            Отмена
          </button>
        </>
      )}
    </div>
  );
}

export default ModalCryptoForm;
