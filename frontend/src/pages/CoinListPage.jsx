import { useEffect, useState } from "react";
import getCoinList from "../api/getCoinList";
import CoinCard from "../components/CoinCard";
import {
  Box,
  Typography,
  Button,
  Container,
  Grid,
  Stack,
} from "@mui/material";

function CoinListPage() {
  const [coins, setCoins] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    getCoinList(page).then((data) => setCoins(data));
  }, [page]);

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default", py: 6 }}>
      <Container>
        <Typography variant="h3" align="center" fontWeight="bold" gutterBottom>
          Top Coins
        </Typography>

        {/* Grid layout: 4 cards per row on md+, 2 on sm, 1 on xs */}
        <Grid container spacing={3} justifyContent="center" mt={3}>
          {coins.map((coin) => (
            <Grid item key={coin.id} xs={12} sm={6} md={3}>
              <CoinCard coin={coin} />
            </Grid>
          ))}
        </Grid>

        {/* Pagination */}
        <Stack direction="row" spacing={2} justifyContent="center" mt={5}>
          <Button
            variant="contained"
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
          >
            Prev
          </Button>
          <Button
            variant="contained"
            onClick={() => setPage((p) => p + 1)}
          >
            Next
          </Button>
        </Stack>
      </Container>
    </Box>
  );
}

export default CoinListPage;
