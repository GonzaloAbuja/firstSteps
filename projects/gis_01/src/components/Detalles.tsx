import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

// Definición de las propiedades que acepta el componente
interface FeatureProperties {
  name: string;
  iso_a2: string;
  coordinates: [number, number];
}

const DetallesComponent: React.FC<FeatureProperties> = ({ name, iso_a2, coordinates }) => {
  
  // Estado para controlar la visibilidad del componente
  const [isVisible, setIsVisible] = useState(true);

  // Función para manejar el cierre del componente
  const handleClose = () => {
    setIsVisible(false);
  };

  // Si no es visible, no renderiza nada
  if (!isVisible) {
    return null;
  }

  return (
    <div className="detalles-container">
      <Card className="detalles-card">
        {/* Botón para cerrar el componente */}
        <IconButton
          sx={{ position: 'absolute', right: 8, top: 8 }}
          onClick={handleClose}
        >
          <CloseIcon />
        </IconButton>
        <CardContent>
          <Typography variant="h5" component="div">
            {name}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            ISO A2: {iso_a2}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Coordenadas: {coordinates[0].toFixed(6)}, {coordinates[1].toFixed(6)}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default DetallesComponent;
