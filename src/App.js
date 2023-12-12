import { useCallback, useEffect, useState } from "react";
import "./styles.css";

export default function App() {
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  const [speed, setSpeed] = useState(0);

  const parsePosition = useCallback(
    (position) => {
      if (position.coords.speed || position.coords.speed === 0) {
        setSpeed(position.coords.speed);
      }

      if (position.coords.latitude || position.coords.latitude === 0) {
        setLat(position.coords.latitude);
      }

      if (position.coords.longitude || position.coords.longitude === 0) {
        setLng(position.coords.longitude);
      }
    },
    [setLat, setLng, setSpeed]
  );

  useEffect(() => {
    const options = {
      enableHighAccuracy: true,
    };
    const watchId = navigator.geolocation.watchPosition(
      parsePosition,
      null,
      options
    );

    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, []);

  return (
    <div className="App">
      <div>Lat: {lat.toFixed(4)}</div>
      <div>Lng: {lng.toFixed(4)}</div>
      <div>Speed: {speed.toFixed(4)}</div>
    </div>
  );
}
