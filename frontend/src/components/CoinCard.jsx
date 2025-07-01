import { Link } from "react-router-dom";
import { Card, CardContent, Typography, Box, useTheme } from "@mui/material";

/** CoinCard component displays individual coin information */
export default function CoinCard({ coin }) {
  const priceChangeColor =
    coin.price_change_percentage_24h >= 0 ? "success.main" : "error.main";

  return (
    <Box
      component={Link}
      to={`/coin/${coin.id}`}
      sx={{ textDecoration: "none", display: "block", height: "100%" }}
    >
      <Card
        sx={{
          width: 300, // uniform width
          height: 200, // fixed height for consistency
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          borderRadius: 3,
          boxShadow: 3,
          transition: "0.3s",
          "&:hover": {
            boxShadow: 6,
            transform: "scale(1.03)",
          },
        }}
      >
        <CardContent sx={{ overflow: "hidden" }}>
          <Typography
            variant="h6"
            fontWeight="bold"
            noWrap
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              maxWidth: "100%",
            }}
          >
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
