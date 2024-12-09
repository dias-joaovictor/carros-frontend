import { useEffect, useState } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import { Carro } from 'src/models/Carro';
import { carroService } from 'src/services/CarroService';
import CarTable from './CarTable';

interface CarListProps {
  refreshFlag?: number;
  onEditCar?: (car: Carro) => void;
}

function CarList({ refreshFlag, onEditCar }: CarListProps) {
  const [cars, setCars] = useState<Carro[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCars = () => {
    setLoading(true);
    carroService.getAll()
      .then(data => {
        setCars(data);
        setError(null);
      })
      .catch(err => {
        console.error(err);
        setError('Failed to load cars');
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchCars();
  }, [refreshFlag]); // Re-fetch cars when refreshFlag changes

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography variant="body1" color="error">
        {error}
      </Typography>
    );
  }

  return <CarTable cars={cars} onRefresh={fetchCars} onEditCar={onEditCar} />;
}

export default CarList;
