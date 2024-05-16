import  { useEffect, useRef } from 'react';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import TileWMS from 'ol/source/TileWMS';
import WMTS from 'ol/source/WMTS';
import WMTSTileGrid from 'ol/tilegrid/WMTS';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import { bbox as bboxStrategy } from 'ol/loadingstrategy';
import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style';

const MapComponent = () => {
  const mapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (mapRef.current) {
      const vectorSource = new VectorSource({
        format: new GeoJSON(), 
        url: function(extent) {
          return 'https://www.ign.es/wfs/redes-geodesicas?service=WFS&' +
            'version=1.1.0&request=GetFeature&typename=RED_ROI&' +
            'outputFormat=application/json&srsname=EPSG:3857&' +
            'bbox=' + extent.join(',') + ',EPSG:3857';
        },
        strategy: bboxStrategy,
      });      
      new Map({
        target: mapRef.current,
        layers: [
          new TileLayer({
            source: new TileWMS({
              url: 'https://www.ign.es/wms-inspire/camino-santiago',
              params: { 
                'LAYERS': 'caminos_francia', 
                'TILED': true, 
                'CRS': 'EPSG:3857' 
              },
              serverType: 'geoserver',
              transition: 0,
            }),
          }),
          new TileLayer({  
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
          }),
          new VectorLayer({
            source: vectorSource,
            style: new Style({
              image: new CircleStyle({
                radius: 10,
                fill: new Fill({ color: 'rgba(255, 0, 0, 0.7)' }),
                stroke: new Stroke({ color: 'rgba(0, 0, 0, 0.7)', width: 2 }),
              }),
            }),
          }),    
        ],
        view: new View({
          center: [0, 0],
          zoom: 2,
        }),
      });
    }
  }, []);

  return <div ref={mapRef} style={{ width: '1000px', height: '500px' }} />;
};

export default MapComponent;
