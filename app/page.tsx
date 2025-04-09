'use client';

import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import EXIF from 'exif-js';
import mapboxgl from 'mapbox-gl';
import { motion } from 'framer-motion';

// Fallback values (if process.env doesn't work)
mapboxgl.accessToken =
  process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN ||
  'pk.eyJ1IjoiZGVyZXBlbnRlIiwiYSI6ImNtOWFjejdpMDA0NHcydG9nYmU2b2ZqczUifQ.grOqIV3Cp0nlHLKOSUuAzQ';

const firebaseConfig = {
  apiKey:
    process.env.NEXT_PUBLIC_FIREBASE_API_KEY ||
    'AIzaSyBvv0sR3gp5hBXchYsm2LQWYHo77aOMvhg',
  authDomain:
    process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ||
    'breadcrumbs-db570.firebaseapp.com',
  projectId:
    process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'breadcrumbs-db570',
  storageBucket:
    process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ||
    'breadcrumbs-db570.appspot.com',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

let storage;
try {
  storage = getStorage(app);
} catch (error) {
  console.error('Firebase Storage failed to initialize:', error);
  storage = null;
}

export default function HomePage() {
  const [map, setMap] = useState<mapboxgl.Map | null>(null);
  const [images, setImages] = useState<any[]>([]);
  const [trail, setTrail] = useState<any[]>([]);

  useEffect(() => {
    if (!map && typeof window !== 'undefined') {
      const newMap = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/dark-v10',
        center: [139.6917, 35.6895],
        zoom: 10,
      });
      setMap(newMap);
    }
  }, [map]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!storage) {
      alert('Firebase Storage not available.');
      return;
    }

    const files = Array.from(e.target.files || []);
    const newImages: any[] = [];

    for (let file of files) {
      const buffer = await file.arrayBuffer();
      const tags = EXIF.readFromBinaryFile(buffer);

      if (tags?.GPSLatitude && tags?.GPSLongitude) {
        const lat =
          tags.GPSLatitude[0] + tags.GPSLatitude[1] / 60 + tags.GPSLatitude[2] / 3600;
        const lon =
          tags.GPSLongitude[0] + tags.GPSLongitude[1] / 60 + tags.GPSLongitude[2] / 3600;

        try {
          const fileRef = ref(storage, `images/${file.name}`);
          await uploadBytes(fileRef, file);
          const url = await getDownloadURL(fileRef);

          const photoData = {
            lat,
            lon,
            url,
            timestamp: tags.DateTimeOriginal || new Date().toISOString(),
          };
          newImages.push(photoData);

          if (map) {
            new mapboxgl.Marker().setLngLat([lon, lat]).addTo(map);
          }
        } catch (err) {
          console.error('Upload error:', err);
        }
      }
    }

    const sorted = newImages.sort(
      (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
    );

    setImages(sorted);
    setTrail(sorted);
  };

  const startSlideshow = () => {
    if (!map || trail.length === 0) return;
    let i = 0;

    const play = () => {
      if (i >= trail.length) return;

      const { lat, lon, url } = trail[i];
      new mapboxgl.Popup()
        .setLngLat([lon, lat])
        .setHTML(`<img src="${url}" width="200" style="border-radius:12px;" />`)
        .addTo(map);

      i++;
      setTimeout(play, 2000);
    };

    play();
  };

  return (
    <div className="w-screen h-screen bg-black text-white">
      <div className="absolute top-4 left-4 z-10 space-y-2">
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileUpload}
          className="bg-white text-black rounded px-2 py-1"
        />
        <button
          onClick={startSlideshow}
          className="bg-white text-black rounded px-2 py-1"
        >
          Start Slideshow
        </button>
      </div>

      <div id="map" className="w-full h-full" />
    </div>
  );
}
