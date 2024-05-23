import React from 'react';
import { FormControlLabel, Checkbox } from '@mui/material';
import Card from '@mui/material/Card';
import '../App.css';

// Interfaz para definir las capas del mapa
interface Layer {
  id: string;
  title: string;
  visible: boolean;
}

// Interfaz para las propiedades del componente TOC
interface TOComponentProps {
  mapComponent: React.ReactElement;
}

const TOComponent: React.FC<TOComponentProps> = ({ mapComponent }) => {
  const mapComponentProps = mapComponent.props;
  
  const layers: Layer[] = mapComponentProps.layers;
  const setLayers: (layers: Layer[]) => void = mapComponentProps.setLayers;

  // Función para manejar el cambio de visibilidad de una capa
  const handleLayerChange = (layerId: string) => {
    const updatedLayers = layers.map(layer => ({
      ...layer,
      visible: layer.id === layerId ? !layer.visible : layer.visible,
    }));
    setLayers(updatedLayers);
  };

  // Función para manejar el cambio de visibilidad de todas las capas
  const handleAllLayersChange = () => {
    const allVisible = layers.every(layer => layer.visible);
    const updatedLayers = layers.map(layer => ({
      ...layer,
      visible: !allVisible,
    }));
    setLayers(updatedLayers);
  };

  return (
    <div className="container">
      <div className="TOC">
        <Card sx={{ bgcolor: '#f5f5f5', border: '3px solid #ff1493' }}>
          <div>
            <FormControlLabel
              control={
                <Checkbox
                  checked={layers.every(layer => layer.visible)}
                  indeterminate={!layers.every(layer => layer.visible) && layers.some(layer => layer.visible)}
                  onChange={handleAllLayersChange}
                />
              }
              label="Todas"
            />
            {layers.map(layer => (
              <div key={layer.id}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={layer.visible}
                      onChange={() => handleLayerChange(layer.id)}
                    />
                  }
                  label={layer.title}
                />
              </div>
            ))}
          </div>
        </Card>
      </div>
      {mapComponent}
    </div>
  );
};

export default TOComponent;
