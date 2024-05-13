import React, { useState } from 'react';
import MapComponent from './components/MapComponent';
import {TOComponent} from './components/TOComponent';
import geoJSON from './assets/data/countries.ts'; // Esto depende de cómo esté definido tu archivo de datos
import './App.css';

interface Layer {
  id: string;
  title: string;
  visible: boolean;
  geojson?: unknown;
}

const App: React.FC = () => {
  const [layers, setLayers] = useState<Layer[]>([
    {
      id: '1',
      title: 'Capa Física',
      visible: true,
    },
    {
      id: '2',
      title: 'Capa Polítca',
      visible: false,
      geojson: geoJSON, // Asumiendo que geoJSON es un objeto válido
    },
  ]);

  const mapa = {
    layers: layers,
  };

  return (
    <div className='app-container'>
      <MapComponent layers={mapa.layers} />
      <TOComponent mapa={mapa} setLayers={setLayers} />
    </div>
  );
};

export default App;
