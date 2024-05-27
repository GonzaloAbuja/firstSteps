import React, { useState } from 'react';
import MapComponent from './components/MapComponent';
import TOComponent from './components/TOComponent';
import geoJSON from './assets/data/countries.ts';
import Switch from '@mui/material/Switch';
import './App.css';

// Interfaz para definir las capas del mapa
interface Layer {
  id: string;
  title: string;
  visible: boolean;
  geojson?: unknown;
}

const App: React.FC = () => {
  const [layers, setLayers] = useState<Layer[]>([
    { id: '1', title: 'Capa Física', visible: true },
    { id: '2', title: 'Capa Polítca', visible: false, geojson: geoJSON },
    { id: '3', title: 'Francia', visible: false },
    { id: '4', title: 'Madrid', visible: false },
    { id: '5', title: 'Espana', visible: false },
    { id: '6', title: 'Barrios', visible: false }
  ]);
  const [showDetails, setShowDetails] = useState(true);

  // Función para manejar detalles
  const handleToggleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setShowDetails(event.target.checked);
  };

  return (
    <div className='app-container'>
      <div style={{ marginBottom: '10px' }}>
        <Switch
          checked={showDetails}
          onChange={handleToggleChange}
          inputProps={{ 'aria-label': 'controlled' }}
        />
        Mostrar detalles del mapa político
      </div>
      <TOComponent 
        mapComponent={
          <MapComponent 
            layers={layers} 
            setLayers={setLayers} 
            showDetails={showDetails} 
          />
        } 
      />
    </div>
  );
};

export default App;
