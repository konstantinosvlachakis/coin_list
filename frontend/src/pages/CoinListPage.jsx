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
  CircularProgress,
} from "@mui/material";
import { useSnackbar } from "notistack";

function CoinListPage() {
  const [coins, setCoins] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const fetchCoins = async () => {
      setLoading(true);
      try {
        const data = await getCoinList(page);
        setCoins(data);
      } catch (err) {
        console.error("Failed to fetch coins:", err);
        const message =
          err.response?.status === 429
            ? "Too many requests – please wait and try again."
            : "An error occurred while fetching coins.";
        enqueueSnackbar(message, { variant: "error" });
        setCoins([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCoins();
  }, [page, enqueueSnackbar]);

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default", py: 6 }}>
      <Container>
        <Typography variant="h3" align="center" fontWeight="bold" gutterBottom>
          Top Coins
        </Typography>

        {loading && (
          <Stack alignItems="center" my={4}>
            <CircularProgress />
          </Stack>
        )}

        <Grid container spacing={3} alignItems="stretch" justifyContent="center" mt={3}>
          {coins.map((coin) => (
            <Grid item key={coin.id} xs={12} sm={6} md={3}>
              <CoinCard coin={coin} />
            </Grid>
          ))}
        </Grid>

        <Stack direction="row" spacing={2} justifyContent="center" mt={5}>
          <Button
            variant="contained"
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={loading}
          >
            Prev
          </Button>
          <Button
            variant="contained"
            onClick={() => setPage((p) => p + 1)}
            disabled={loading}
          >
            Next
          </Button>
        </Stack>
      </Container>
    </Box>
  );
}

export default CoinListPage;
