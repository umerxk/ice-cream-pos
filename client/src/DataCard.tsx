import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

export default function DataCard({ dateData }: any) {
  return (
    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', marginBottom: 2 }}>
      <Box sx={{ my: 3, mx: 2 }}>
      <Typography color="text.secondary" variant="body2">
        </Typography>
        <Grid sx={{mt: 2}} container alignItems="center">
          <Grid item xs>
            <Typography gutterBottom variant="h4" component="div">
              {dateData?.searchedDate}
            </Typography>
          </Grid>
          <Grid item>
            <Typography gutterBottom variant="h6" component="div">
              PKR {dateData?.totalSale?.totalPrice}
            </Typography>
          </Grid>
        </Grid>
     
      </Box>
      <Divider variant="middle" />
    </Box>
  );
}