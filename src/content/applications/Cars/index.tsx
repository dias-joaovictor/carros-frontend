// src/content/applications/Cars/index.tsx

import { Helmet } from 'react-helmet-async';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Grid, Container, Snackbar, Alert } from '@mui/material';
import Footer from 'src/components/Footer';
import { useState } from 'react';

import PageHeader from './PageHeader';  // The header with "Include Car"
import CarList from './CarList';        // The component that lists the cars
import CarFormDialog from './CarFormDialog'; // The dialog for creating/updating a car
import { Carro } from 'src/models/Carro';

function CarsApplication() {
  const [openForm, setOpenForm] = useState(false);
  const [selectedCar, setSelectedCar] = useState<Carro | undefined>(undefined);
  const [refreshFlag, setRefreshFlag] = useState(0);

  const [toastOpen, setToastOpen] = useState(true);

  const handleCloseToast = () => {
    setToastOpen(false);
  };

  const handleOpenCreate = () => {
    setSelectedCar(undefined);
    setOpenForm(true);
  };

  const handleOpenEdit = (car: Carro) => {
    setSelectedCar(car);
    setOpenForm(true);
  };

  const handleCloseForm = () => {
    setOpenForm(false);
  };

  const handleCarSaved = () => {
    // Incrementing refreshFlag will signal CarList to re-fetch the data.
    setRefreshFlag((prev) => prev + 1);
  };

  return (
    <>
      <Helmet>
        <title>Cars</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader onAddCar={handleOpenCreate} />
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            {/* Pass the refreshFlag to re-fetch the list after a car is added/updated */}
            <CarList refreshFlag={refreshFlag} onEditCar={handleOpenEdit} />
          </Grid>
        </Grid>
      </Container>
      <Footer />
      <CarFormDialog
        open={openForm}
        onClose={handleCloseForm}
        onCarSaved={handleCarSaved}
        car={selectedCar}
      />
    </>
  );
}

export default CarsApplication;
