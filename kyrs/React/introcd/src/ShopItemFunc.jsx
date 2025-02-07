function ShopItemFunc({ item }) {
    return (
        <div class="main-content">
            <h2>{item.brand}</h2>
            <h1>{item.title.toUpperCase()}</h1>
            <h3>{item.description.toUpperCase()}</h3>
            <div class="description">
                {item.descriptionFull}
            </div>
            <div class="divider"></div>
            <div class="purchase-info">
              <div class="price">{item.currency}{item.price.toFixed(2)}</div>
              <button>Добавить в корзину</button>
            </div>
        </div>
    );
}

export default ShopItemFunc;