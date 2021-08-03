// material
import { Box, Grid, Container, Typography } from '@material-ui/core';
// components
import Page from '../components/Page';
import { KeyStatisticsSumPieChart, KeyStatsBarChart, CountryWithMostRoadDeaths } from '../components/_dashboard/app';

// ----------------------------------------------------------------------

export default function DashboardApp() {
  return (
    <Page title="Dashboard | EU Road Safety Facts and Figures Charts">
      <Container maxWidth="xl">
        <Box sx={{ pb: 3 }}>
          <Typography variant="h5">European Union Road Safety Facts and Figures Charts</Typography>
        </Box>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12} lg={12}>
            <KeyStatsBarChart />
          </Grid>
          <Grid item xs={12} md={6} lg={8}>
            <CountryWithMostRoadDeaths />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
             <KeyStatisticsSumPieChart />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
