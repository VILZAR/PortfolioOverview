import { useSelector } from "react-redux";
import AssetsList from "./AssetsList";
import { memo } from "react";

function Assets() {
  const { myCrypto } = useSelector((state) => state.cryptos);

  const List = memo(() =>
    myCrypto.map((i) => <AssetsList tag={i.symbol.toLowerCase()} key={i.id} />)
  );

  return (
    <main>
      <ul className="main__titles">
        <li className="main__titles_item">Актив</li>
        <li className="main__titles_item">Количество</li>
        <li className="main__titles_item">Цена</li>
        <li className="main__titles_item">Общая стоимость</li>
        <li className="main__titles_item">Изм. за 24 ч.</li>
        <li className="main__titles_item">% портфеля</li>
      </ul>
      <ul className="currency__list">
        <List />
      </ul>
    </main>
  );
}

export default Assets;
