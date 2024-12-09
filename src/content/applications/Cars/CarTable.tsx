import { FC } from 'react';
import {
  Table, TableBody, TableCell, TableHead, TableRow,
  IconButton, Tooltip
} from '@mui/material';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import { Carro } from 'src/models/Carro';
import { carroService } from 'src/services/CarroService';

interface CarTableProps {
  cars: Carro[];
  onRefresh: () => void;
  onEditCar?: (car: Carro) => void;
}

const CarTable: FC<CarTableProps> = ({ cars, onRefresh, onEditCar }) => {
  const handleDelete = async (id: number) => {
    try {
      await carroService.delete(id);
      onRefresh();
    } catch (error) {
      console.error('Failed to delete car:', error);
    }
  };

  return (
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
                  onClick={() => car.id && handleDelete(car.id)}
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
  );
};

export default CarTable;
