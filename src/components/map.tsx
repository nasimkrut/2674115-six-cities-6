import React from 'react';
import { useRef, useEffect } from 'react';
import { Icon, Marker, layerGroup } from 'leaflet';
import 'leaflet/dist/leaflet.css';

import { MarkerURL } from '../const';
import { type City } from '../types/city';
import { type Offer } from '../types/offer';
import useMap from '../hooks/use-map';

type MapProps = {
  city: City;
  offers: Offer[];
  selectedPoint: Offer | undefined;
};

const defaultCustomIcon = new Icon({
  iconUrl: MarkerURL.Default,
  iconSize: [30, 40],
  iconAnchor: [15, 40]
});

const currentCustomIcon = new Icon({
  iconUrl: MarkerURL.Current,
  iconSize: [30, 40],
  iconAnchor: [15, 40]
});

function Map({ city, offers, selectedPoint }: MapProps): JSX.Element {

  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  useEffect(() => {
    if (map) {
      map.setView([city.location.latitude, city.location.longitude], city.location.zoom);
    }
  }, [map, city]);

  useEffect(() => {
    if (map) {
      const markerLayer = layerGroup().addTo(map);
      offers.forEach((offer) => {
        const marker = new Marker({
          lat: offer.location.latitude,
          lng: offer.location.longitude
        });

        marker
          .setIcon(
            selectedPoint !== undefined
              && offer.location.latitude === selectedPoint.location.latitude
              && offer.location.longitude === selectedPoint.location.longitude
              ? currentCustomIcon
              : defaultCustomIcon
          )
          .addTo(markerLayer);
      });

      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, offers, selectedPoint]);

  return <div style={{ height: '100%' }} ref={mapRef}></div>;
}

const MemoizedMap = React.memo(
  Map,
  (prev, next) =>
    prev.city === next.city &&
    prev.selectedPoint?.id === next.selectedPoint?.id &&
    prev.offers.length === next.offers.length &&
    prev.offers.every((o, i) => o.id === next.offers[i].id)
);
MemoizedMap.displayName = 'Map';

export default MemoizedMap;
