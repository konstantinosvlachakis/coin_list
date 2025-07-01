import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import getCoinDetails from '../api/getCoinDetails';

function CoinDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [coin, setCoin] = useState(null);

  useEffect(() => {
    getCoinDetails(id).then(data => setCoin(data));
  }, [id]);

  if (!coin) return <p>Loading...</p>;

  return (
    <div>
      <h1>{coin.name}</h1>
      <p>{coin.description}</p>
      <p>Current price: ${coin.current_price}</p>
      <p>High (24h): ${coin.high_24h}</p>
      <p>Low (24h): ${coin.low_24h}</p>

      <button onClick={() => navigate('/')}>
        Back to Market
      </button>
    </div>
  );
}

export default CoinDetailPage;
