import {
  Card,
  CardContent,
  Typography,
  Button,
  Divider,
  Grid,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import getCoinDetails from "../api/getCoinDetails";

// Show the details of a specific coin, including its name, description, current price, and price changes over various periods.
function CoinDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [coin, setCoin] = useState(null);

  useEffect(() => {
    getCoinDetails(id).then((data) => setCoin(data));
  }, [id]);

  if (!coin) return <Typography>Loading...</Typography>;

  const priceChanges = [
    { label: "24h", value: coin.price_changes["24h"] },
    { label: "7d", value: coin.price_changes["7d"] },
    { label: "14d", value: coin.price_changes["14d"] },
    { label: "30d", value: coin.price_changes["30d"] },
    { label: "60d", value: coin.price_changes["60d"] },
    { label: "200d", value: coin.price_changes["200d"] },
    { label: "1y", value: coin.price_changes["1y"] },
  ];

  return (
    <div style={{ padding: "2rem" }}>
      <Button
        variant="contained"
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate("/")}
        sx={{ marginBottom: 2 }}
      >
        Back to Market
      </Button>

      <Card>
        <CardContent>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            {coin.name}
          </Typography>

          <Typography color="text.secondary" paragraph>
            {coin.description || "No description available."}
          </Typography>

          <Divider sx={{ marginY: 2 }} />

          <Typography variant="body1">
            Current Price: ${coin.current_price.usd}
          </Typography>
          <Typography variant="body1">24h High: ${coin.high_24h}</Typography>
          <Typography variant="body1">24h Low: ${coin.low_24h}</Typography>

          <Divider sx={{ marginY: 3 }} />

          <Typography variant="h6" gutterBottom>
            Price Change (%)
          </Typography>

          <Grid container spacing={2} mt={1}>
            {priceChanges.map(({ label, value }) => (
              <Grid item xs={6} sm={4} md={3} key={label}>
                <Card
                  variant="outlined"
                  sx={{
                    borderColor: value >= 0 ? "success.main" : "error.main",
                  }}
                >
                  <CardContent>
                    <Typography variant="subtitle2" color="text.secondary">
                      {label}
                    </Typography>
                    <Typography
                      variant="h6"
                      color={value >= 0 ? "success.main" : "error.main"}
                    >
                      {value?.toFixed(2)}%
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
}

export default CoinDetailPage;
