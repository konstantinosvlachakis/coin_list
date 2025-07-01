// CoinListPage.jsx
import  { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import getCoinList from "../api/getCoinList";

function CoinListPage() {
  const [coins, setCoins] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    getCoinList(page).then(data => setCoins(data));
  }, [page]);

  return (
    <div>
      <h1>Top Coins</h1>
      <ul>
        {coins.map((coin) => (
          <li key={coin.id}>
            <Link to={`/coin/${coin.id}`}>
              {coin.name} ({coin.symbol.toUpperCase()}): ${coin.current_price}
            </Link>
          </li>
        ))}
      </ul>
      <button onClick={() => setPage(p => Math.max(p - 1, 1))}>Prev</button>
      <button onClick={() => setPage(p => p + 1)}>Next</button>
    </div>
  );
}

export default CoinListPage;
