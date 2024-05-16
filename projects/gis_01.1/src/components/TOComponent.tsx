import React from 'react';
import { Radio } from '@mui/material';
import { pink, blue, grey } from '@mui/material/colors';
import Card from '@mui/material/Card';

interface Layer {
  id: string;
  title: string;
  visible: boolean;
}

interface Mapa {
  layers: Layer[];
}

const TOComponent = ({ mapa, setLayers }: { mapa: Mapa, setLayers: React.Dispatch<React.SetStateAction<Layer[]>> }) => {
  const handleLayerChange = (layerId: string) => {
    const updatedLayers = mapa.layers.map(layer => ({
      ...layer,
      visible: layer.id === layerId
    }));
    setLayers(updatedLayers);
  };

  return (
    <Card sx={{ bgcolor: grey[200], border: `3px solid #ff1493` }}>
      <div>
        {mapa.layers.map(layer => (
          <div key={layer.id}>
            <Radio
              id={layer.id}
              checked={layer.visible}
              onChange={() => handleLayerChange(layer.id)}
              sx={{
                color: layer.visible ? pink[800] : blue[800],
                '&.Mui-checked': {
                  color: layer.visible ? pink[600] : blue[600],
                },
              }}
            />
            <label htmlFor={layer.id}>{layer.title}</label>
          </div>
        ))}
      </div>
    </Card>
  );
};

export {TOComponent} ;
