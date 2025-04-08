import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { List } from "react-virtualized";
import {
  getCrypto,
  setCurrentCrypto,
  setFilterCrypto,
} from "../../redux/cryptoSlice";

function CryptoList() {
  const dispatch = useDispatch();
  const { filterCrypto, currencies } = useSelector((state) => state.cryptos);
  let list;
  let leng;

  useEffect(() => {
    dispatch(getCrypto());
    dispatch(setFilterCrypto());
  }, [dispatch]);

  if (filterCrypto.length > 0) {
    leng = filterCrypto.length;
    list = filterCrypto.map((item) => {
      const symbol = item.symbol;
      const change = Number(item.priceChangePercent);
      const price = Number(item.lastPrice);

      return {
        symbol: symbol,
        price: price.toFixed(5),
        change: change.toFixed(2),
      };
    });
  } else {
    leng = currencies.length;
    list = currencies.map((item) => {
      const symbol = item.symbol;
      const change = Number(item.priceChangePercent);
      const price = Number(item.lastPrice);

      return {
        symbol: symbol,
        price: price.toFixed(5),
        change: change.toFixed(2),
      };
    });
  }

  const handleClick = (e) => {
    dispatch(setCurrentCrypto(e.currentTarget.dataset.symbol));
  };

  const renderRow = ({ index, key, style }) => {
    return (
      <div
        key={key}
        style={style}
        className="item"
        data-symbol={list[index].symbol}
        onClick={handleClick}
      >
        <span className="symbol">{list[index].symbol.replace("USDT", "")}</span>
        <span className="price">${list[index].price}</span>
        <span className="difference" style={list[index].change > 0 ? {color: "green"} : {color: "red"}}>
          {list[index].change > 0
            ? "+" + list[index].change
            : list[index].change}
          %
        </span>
      </div>
    );
  };
  
  return (
    <List
      width={350} // Ширина списка
      height={300} // Высота списка
      rowCount={leng}
      rowHeight={50} // Высота строки
      rowRenderer={renderRow}
      overscanRowCount={10} // Количество строк, которые будут отрисованы заранее
    />
  );
}

export default CryptoList;
