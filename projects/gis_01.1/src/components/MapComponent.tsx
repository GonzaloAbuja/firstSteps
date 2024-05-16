import React, { useEffect } from 'react';
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import Card from '@mui/material/Card';
import { blue } from '@mui/material/colors'; 

interface Layer {
  id: string;
  title: string;
  visible: boolean;
  geojson?: unknown;
}

const MapComponent: React.FC<{ layers: Layer[] }> = ({ layers }) => {
  useEffect(() => {
    const map = new Map({
      target: 'map',
      layers: [
        new TileLayer({
          source: new OSM(),
          visible: layers[0].visible
        }),
        ...layers
          .filter(layer => layer.geojson)
          .map(layer => {
            const vectorSource = new VectorSource({
              features: new GeoJSON(
                { featureProjection: 'EPSG:3857' }
              ).readFeatures(layer.geojson),
            });

            return new VectorLayer({
              source: vectorSource,
              visible: layer.visible,
            });
          }),
      ],
      view: new View({
        center: [0, 0],
        zoom: 2,
      }),
    });

    return () => {
      map.setTarget('');
    };
  }, [layers]);

  return (
    <Card sx={{ border: '3px solid ' + blue[300] }}> 
      <div id="map" style={{ width: '1000px', height: '600px' }}></div>
    </Card>
  );
};

export default MapComponent;
