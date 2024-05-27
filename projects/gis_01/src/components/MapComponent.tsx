import React, { useEffect, useRef, useState } from 'react';
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import TileWMS from 'ol/source/TileWMS';
import WMTS from 'ol/source/WMTS';
import WMTSTileGrid from 'ol/tilegrid/WMTS';
import { bbox as bboxStrategy } from 'ol/loadingstrategy';
import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style';
import Select from 'ol/interaction/Select';
import { click } from 'ol/events/condition';
import Card from '@mui/material/Card';
import { blue } from '@mui/material/colors';
import DetallesComponent from './Detalles';
import { Geometry } from 'ol/geom';
import { Feature } from 'ol';

// Interfaz para definir las capas del mapa
interface Layer {
  id: string;
  title: string;
  visible: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  geojson?: any;
}

// Interfaz para las propiedades del componente de mapa
interface MapComponentProps {
  showDetails: boolean;
  layers: Layer[];
  setLayers: (layers: Layer[]) => void;
}

const MapComponent: React.FC<MapComponentProps> = ({ showDetails, layers, setLayers }) => {
  const mapRef = useRef<Map | null>(null);
  const [selectedFeature, setSelectedFeature] = useState<any>(null);
  const [clickCoordinates, setClickCoordinates] = useState<[number, number] | null>(null);

  useEffect(() => {
    // Capa  mapa base de OpenStreetMap
    const tileLayer = new TileLayer({ 
      source: new OSM(),
      visible: layers[0].visible,
    });

    // Capa WMS
    const wmsLayer = new TileLayer({
      source: new TileWMS({
        url: 'https://www.ign.es/wms-inspire/camino-santiago',
        params: { 'LAYERS': 'caminos_francia', 'TILED': true, 'CRS': 'EPSG:3857' },
        serverType: 'geoserver',
        transition: 0,
      }),
      visible: layers.find(layer => layer.id === '3')?.visible,
    });

    // Capa WMTS
    const wmtsLayer = new TileLayer({
      source: new WMTS({
        url: 'https://www.ign.es/wmts/planos',
        layer: 'MancelliMadrid',
        matrixSet: 'GoogleMapsCompatible',
        format: 'image/png',
        projection: 'EPSG:3857',
        style: 'default',
        tileGrid: new WMTSTileGrid({
          origin: [-20037508, 20037508],
          resolutions: [...Array(21).keys()].map(i => 156543.03392804097 / Math.pow(2, i)),
          matrixIds: [...Array(21).keys()].map(i => i.toString()),
        }),
      }),
      visible: layers.find(layer => layer.id === '4')?.visible,
    });

    // Capas vectoriales geojson
    const vectorLayers = layers.filter(layer => layer.geojson).map(layer => {
      const vectorSource = new VectorSource({
        features: new GeoJSON({ featureProjection: 'EPSG:3857' }).readFeatures(layer.geojson),
      });
      return new VectorLayer({
        source: vectorSource,
        visible: layer.visible,
      });
    });

    // Capa de vectores wfs
    const featureLayer = new VectorLayer({
      source: new VectorSource({
        format: new GeoJSON(),
        url: extent => `https://www.ign.es/wfs/redes-geodesicas?service=WFS&version=1.1.0&request=GetFeature&typename=RED_ROI&outputFormat=application/json&srsname=EPSG:3857&bbox=${extent.join(',')},EPSG:3857`,
        strategy: bboxStrategy,
      }),
      style: new Style({
        image: new CircleStyle({
          radius: 10,
          fill: new Fill({ color: 'rgba(255, 0, 0, 0.7)' }),
          stroke: new Stroke({ color: 'rgba(0, 0, 0, 0.7)', width: 2 }),
        }),
      }),
      visible: layers.find(layer => layer.id === '5')?.visible,
    });

    // Capa WMS desde GeoServer
    const geoLayer = new TileLayer({
      source: new TileWMS({
        url: 'http://localhost:8085/geoserver/ne/wms?service=WMS&version=1.1.0&request=GetMap&layers=ne%3Abarrios&bbox=227071.8572857892%2C3901876.695336829%2C772928.1427142108%2C8942165.537905218&width=330&height=768&srs=EPSG%3A25830&styles=&format=image%2Fpng', 
        params: {
          'LAYERS': 'ne:barrios', 
          'CRS': 'EPSG:25830', 
        },
        serverType: 'geoserver',
        transition: 0,
      }),
      visible: layers.find(layer => layer.id === '6')?.visible,
    });

    // Creación del mapa
    const map = new Map({
      target: 'map',
      layers: [tileLayer, ...vectorLayers, wmsLayer, wmtsLayer, featureLayer, geoLayer],
      view: new View({ center: [0, 0], zoom: 2 }),
    });

    // Interacción para seleccionar características en el mapa
    const select = new Select({
      condition: click,
      style: new Style({
        fill: new Fill({
          color: 'rgba(255, 255, 255, 0.7)',
        }),
        stroke: new Stroke({
          color: 'rgba(0, 0, 0, 0.7)',
          width: 2,
        }),
      }),
    });

    map.addInteraction(select);

    // Manejo del evento de clic en el mapa
    map.on('click', (event) => {
      const [longitude, latitude] = event.coordinate;
      setClickCoordinates([longitude, latitude]);

      select.getFeatures().clear();
      map.forEachFeatureAtPixel(event.pixel, (featureLike) => {
        const feature = featureLike as Feature<Geometry>; 
        select.getFeatures().push(feature);
        setSelectedFeature(feature.getProperties());
      });
    });

    mapRef.current = map;

    return () => {
      map.setTarget('');
    };
  }, [layers]);

  return (
    <div style={{ position: 'relative' }}>
      <Card sx={{ border: '3px solid ' + blue[300] }}>
        <div id="map" style={{ width: '1000px', height: '600px' }}></div>
      </Card>
      {showDetails && selectedFeature && clickCoordinates && (
        <DetallesComponent
          {...selectedFeature}
          coordinates={clickCoordinates}
        />
      )}
    </div>
  );
};

export default MapComponent;
