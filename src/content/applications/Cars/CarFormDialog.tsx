import { useState, ChangeEvent, FC, FormEvent, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid
} from '@mui/material';
import { Carro } from 'src/models/Carro';
import { carroService } from 'src/services/CarroService';

interface CarFormDialogProps {
  open: boolean;
  onClose: () => void;
  onCarSaved: () => void;
  car?: Carro; // If provided, we are editing this car; if not, creating a new one.
}

const CarFormDialog: FC<CarFormDialogProps> = ({ open, onClose, onCarSaved, car }) => {
  const [formData, setFormData] = useState<Carro>({
    id: car?.id,
    modelo: car?.modelo || '',
    ano: car?.ano || 2022,
    cor: car?.cor || '',
    cavalosDePotencia: car?.cavalosDePotencia || 100,
    fabricante: car?.fabricante || '',
    pais: car?.pais || ''
  });

  const [originalData, setOriginalData] = useState<Carro>(formData);
  const [isFormChanged, setIsFormChanged] = useState(false);

  // Whenever 'car' changes (editing a different car or creating a new one)
  useEffect(() => {
    const newOriginal = {
      id: car?.id,
      modelo: car?.modelo || '',
      ano: car?.ano || 2022,
      cor: car?.cor || '',
      cavalosDePotencia: car?.cavalosDePotencia || 100,
      fabricante: car?.fabricante || '',
      pais: car?.pais || ''
    };
    setFormData(newOriginal);
    setOriginalData(newOriginal);
  }, [car]);

  // Check if form has changed compared to original data
  useEffect(() => {
    // Simple shallow comparison
    const changed =
      formData.modelo !== originalData.modelo ||
      formData.ano !== originalData.ano ||
      formData.cor !== originalData.cor ||
      formData.cavalosDePotencia !== originalData.cavalosDePotencia ||
      formData.fabricante !== originalData.fabricante ||
      formData.pais !== originalData.pais;

    setIsFormChanged(changed);
  }, [formData, originalData]);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === 'ano' || name === 'cavalosDePotencia'
          ? parseInt(value, 10) || 0
          : value
    }));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      if (formData.id) {
        // Update existing car
        await carroService.update(formData.id, formData);
      } else {
        // Create new car
        await carroService.create(formData);
      }

      onCarSaved();
      onClose();
    } catch (error) {
      console.error('Failed to save car:', error);
    }
  };

  const isEditMode = !!car;
  const isSaveDisabled = isEditMode ? !isFormChanged : false;
  // For a create scenario, you might also want to validate that required fields are filled,
  // but for simplicity, we just allow the user to save. Add extra validation if needed.

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <form onSubmit={handleSubmit}>
        <DialogTitle>{car ? 'Edit Car' : 'Create Car'}</DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2} mt={1}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="modelo"
                label="Modelo"
                value={formData.modelo}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                fullWidth
                name="ano"
                label="Ano"
                type="number"
                value={formData.ano}
                onChange={handleChange}
                inputProps={{ min: 1900, max: new Date().getFullYear() }}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                fullWidth
                name="cor"
                label="Cor"
                value={formData.cor}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                fullWidth
                name="cavalosDePotencia"
                label="Cavalos de Potência"
                type="number"
                value={formData.cavalosDePotencia}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                fullWidth
                name="fabricante"
                label="Fabricante"
                value={formData.fabricante}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="pais"
                label="País"
                value={formData.pais}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="inherit">
            Cancel
          </Button>
          <Button type="submit" variant="contained" color="primary" disabled={isSaveDisabled}>
            {car ? 'Update' : 'Save'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default CarFormDialog;
