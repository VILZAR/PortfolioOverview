import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { delMyCrypto } from "../../redux/cryptoSlice";

function AssetsList({ tag }) {
  const { myCrypto } = useSelector((state) => state.cryptos);
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  let total = 0;

  useEffect(() => {
    const binanceWs = new WebSocket(
      `wss://stream.binance.com:9443/stream?streams=${tag}@ticker`
    );
    binanceWs.onopen = () => {
      console.log("Connected to Binance WebSocket");
    };
    
    binanceWs.onmessage = (resp) => {
      const parsedData = JSON.parse(resp.data);
      let symbol = parsedData.data.s;
      let price = parsedData.data.c;
      let change = parsedData.data.P;

      let obj = {
        symbol: symbol,
        price: price,
        change: change,
      };
      
      myCrypto.map((i) => {
        if (i.symbol == obj.symbol) {
          let res = Object.assign(obj, i);
          setData(res);
        }
      });
    };

    return () => {
      binanceWs.onclose = () => {
        console.log("WebSocket connection closed");
      };
    };
  }, [myCrypto, tag]);

  const handleDelete = (id) => {
    dispatch(delMyCrypto(id));
  };

  let el = document.querySelectorAll('.currency__list_item_cells.price')
  if(el.length > 0){
    let value = 0;
    el.forEach(i => {
        value = value + Number(i.textContent.substring(1))
    })
    total = value;
  }

  return data.symbol ? (
    <li
      className="currency__list_item"
      key={data.symbol}
      onClick={() => handleDelete(data.id)}
    >
      <span className="currency__list_item_cells">
        {String(data.symbol).replace("USDT", "")}
      </span>
      <span className="currency__list_item_cells">{data.value}</span>
      <span className="currency__list_item_cells">
        ${Number(data.price).toFixed(3)}
      </span>
      <span className="currency__list_item_cells price">
        ${Number(data.price * data.value).toFixed(3)}
      </span>
      <span
        className="currency__list_item_cells"
        style={Number(data.change) > 0 ? { color: "green" } : { color: "red" }}
      >
        {Number(data.change) > 0 ? "+" : ""}
        {Number(data.change).toFixed(2)}%
      </span>
      <span className="currency__list_item_cells">{(data.price * data.value / total * 100).toFixed(2)}%</span>
    </li>
  ) : (
    <span className="loading">Загрузка...</span>
  );
}

export default AssetsList;
