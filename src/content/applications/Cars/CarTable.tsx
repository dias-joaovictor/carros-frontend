import { FC, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button, Typography, Grid
} from '@mui/material';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import { Carro } from 'src/models/Carro';
import { carroService } from 'src/services/CarroService';
import { useToast } from '../../../components/Toast';

interface CarTableProps {
  cars: Carro[];
  onRefresh: () => void;
  onEditCar?: (car: Carro) => void;
}

const CarTable: FC<CarTableProps> = ({ cars, onRefresh, onEditCar }) => {
  const { showToast } = useToast();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [carToDelete, setCarToDelete] = useState<Carro | null>(null);

  const openDeleteDialog = (car: Carro) => {
    setCarToDelete(car);
    setDeleteDialogOpen(true);
  };

  const closeDeleteDialog = () => {
    setDeleteDialogOpen(false);
    setCarToDelete(null);
  };

  const handleDelete = (id: number) => {
    carroService
      .delete(id)
      .then(() => {
        onRefresh();
        showToast('Car deleted successfully!', 'warning');
        closeDeleteDialog();
      })
      .catch((error) => {
        console.error('Failed to delete car:', error);
        showToast('Failed to delete car. Please try again.', 'error');
      });
  };

  return (
    <>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Modelo</TableCell>
            <TableCell>Fabricante</TableCell>
            <TableCell>Ano</TableCell>
            <TableCell>Cor</TableCell>
            <TableCell>Potência (CV)</TableCell>
            <TableCell>País</TableCell>
            <TableCell align="right">Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cars.map((car) => (
            <TableRow hover key={car.id}>
              <TableCell>{car.id}</TableCell>
              <TableCell>{car.modelo}</TableCell>
              <TableCell>{car.fabricante}</TableCell>
              <TableCell>{car.ano}</TableCell>
              <TableCell>{car.cor}</TableCell>
              <TableCell>{car.cavalosDePotencia}</TableCell>
              <TableCell>{car.pais}</TableCell>
              <TableCell align="right">
                <Tooltip title="Edit Car">
                  <IconButton
                    color="primary"
                    onClick={() => onEditCar && onEditCar(car)}
                  >
                    <EditTwoToneIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete Car">
                  <IconButton
                    color="error"
                    onClick={() => openDeleteDialog(car)}
                  >
                    <DeleteTwoToneIcon />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
          {cars.length === 0 && (
            <TableRow>
              <TableCell colSpan={8} align="center">
                No cars found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={closeDeleteDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography variant="h6" gutterBottom>
            Are you sure you want to delete this car?
          </Typography>
          <Typography variant="body2" color="textSecondary" gutterBottom>
            This action cannot be undone.
          </Typography>
          <Grid container spacing={2} mt={2}>
            <Grid item xs={4}>
              <Typography variant="body1" fontWeight="bold">
                ID:
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography variant="body1">{carToDelete?.id}</Typography>
            </Grid>

            <Grid item xs={4}>
              <Typography variant="body1" fontWeight="bold">
                Fabricante:
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography variant="body1">{carToDelete?.fabricante}</Typography>
            </Grid>

            <Grid item xs={4}>
              <Typography variant="body1" fontWeight="bold">
                Modelo:
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography variant="body1">{carToDelete?.modelo}</Typography>
            </Grid>

            <Grid item xs={4}>
              <Typography variant="body1" fontWeight="bold">
                Ano:
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography variant="body1">{carToDelete?.ano}</Typography>
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions>
          <Button onClick={closeDeleteDialog} color="inherit">
            Cancel
          </Button>
          <Button
            onClick={() => carToDelete && handleDelete(carToDelete.id)}
            color="error"
            variant="contained"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CarTable;
