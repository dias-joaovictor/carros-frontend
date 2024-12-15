import { Typography, Button, Grid } from '@mui/material';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import { useAuth } from '../../../contexts/AuthContext';

interface PageHeaderProps {
  onAddCar?: () => void;
}

function PageHeader({ onAddCar }: PageHeaderProps) {

  const {userContent} = useAuth();

  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          Cars
        </Typography>
        <Typography variant="subtitle2">
          {userContent.nome}, these are your cars
        </Typography>
      </Grid>
      <Grid item>
        <Button
          sx={{ mt: { xs: 2, md: 0 } }}
          variant="contained"
          startIcon={<AddTwoToneIcon fontSize="small" />}
          onClick={onAddCar}
        >
          Include Car
        </Button>
      </Grid>
    </Grid>
  );
}

export default PageHeader;
