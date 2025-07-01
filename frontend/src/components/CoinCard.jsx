import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
  Box,
  useTheme,
} from "@mui/material";

export default function CoinCard({ coin }) {
  const theme = useTheme();

  const priceChangeColor =
    coin.price_change_percentage_24h >= 0 ? "success.main" : "error.main";

  return (
    <Box component={Link} to={`/coin/${coin.id}`} sx={{ textDecoration: "none" }}>
      <Card
        sx={{
          minWidth: 250,
          maxWidth: 250,
          borderRadius: 3,
          boxShadow: 3,
          transition: "0.3s",
          "&:hover": {
            boxShadow: 6,
            transform: "scale(1.03)",
          },
        }}
      >
        <CardContent>
          <Typography variant="h6" fontWeight="bold">
            {coin.name} ({coin.symbol.toUpperCase()})
          </Typography>

          <Typography variant="body2" sx={{ mt: 1 }}>
            Current Price:{" "}
            <Box component="span" sx={{ color: "success.main" }}>
              ${coin.current_price}
            </Box>
          </Typography>

          <Typography variant="caption" color="text.secondary">
            24h High: ${coin.high_24h} / Low: ${coin.low_24h}
          </Typography>

          <Typography
            variant="caption"
            sx={{ mt: 1, display: "block", color: priceChangeColor }}
          >
            {coin.price_change_percentage_24h?.toFixed(2)}%
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
