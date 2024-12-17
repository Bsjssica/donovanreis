import React, { useState } from 'react';
import { Marker, InfoWindow } from '@react-google-maps/api';
import { AlertTriangle } from 'lucide-react';
import MapContainer from './maps/MapContainer';
import UnitCard from './units/UnitCard';
import CrimeHeatmap from './units/CrimeHeatmap';
import { BBraunUnit } from '../types/units';

const Units = () => {
  const [selectedUnit, setSelectedUnit] = useState<BBraunUnit | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [showHeatmap, setShowHeatmap] = useState(false);
  const [heatmapLocation, setHeatmapLocation] = useState<string>('');

  const units: BBraunUnit[] = [
    {
      name: 'Unidade Guaxindiba',
      address: 'Estr. da Fábrica de Cimento, 340 - Guaxindiba, São Gonçalo - RJ, 24722-035',
      phone: '(21) 1234-5678',
      hours: '24 horas',
      position: {
        lat: -22.8269,
        lng: -43.0539
      }
    },
    {
      name: 'Laboratório BBraun São Gonçalo',
      address: 'Laboratório farmacêutico em São Gonçalo, Rio de Janeiro',
      phone: '(21) 8765-4321',
      hours: '24 horas',
      position: {
        lat: -22.8169,
        lng: -43.0439
      }
    },
  ];

  const handleUnitSelect = (unit: BBraunUnit) => {
    setSelectedUnit(unit);
    setShowHeatmap(true);
    setHeatmapLocation(unit.name.includes('Guaxindiba') ? 'Guaxindiba' : 'Arsenal');
  };

  const center = {
    lat: -22.8269,
    lng: -43.0539
  };

  const handleMapLoad = (map: google.maps.Map) => {
    setMapLoaded(true);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6">
      <h2 className="text-2xl md:text-3xl font-bold text-green-500 mb-6 md:mb-8">
        Unidades BBraun
      </h2>
      
      {/* Rio de Janeiro Overview Map */}
      <div className="bg-gray-800 rounded-lg p-4 md:p-6 mb-6 md:mb-8">
        <div className="relative">
          <img
            src="https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&w=1200&q=80"
            alt="Rio de Janeiro"
            className="w-full h-48 object-cover rounded-lg mb-4"
          />
          <div className="absolute inset-0 bg-black/40 rounded-lg flex items-center justify-center">
            <h3 className="text-2xl font-bold text-white">Rio de Janeiro</h3>
          </div>
        </div>
      </div>

      {/* Interactive Map with Crime Heatmap */}
      <div className="bg-gray-800 rounded-lg p-4 md:p-6 mb-6 md:mb-8">
        <div className="h-[300px] md:h-[400px] w-full rounded-lg overflow-hidden">
          <MapContainer center={center} onLoad={handleMapLoad}>
            {mapLoaded && (
              <>
                {units.map((unit, index) => (
                  <Marker
                    key={index}
                    position={unit.position}
                    onClick={() => handleUnitSelect(unit)}
                  />
                ))}

                {showHeatmap && (
                  <CrimeHeatmap
                    location={heatmapLocation}
                    visible={showHeatmap}
                  />
                )}

                {selectedUnit && (
                  <InfoWindow
                    position={selectedUnit.position}
                    onCloseClick={() => {
                      setSelectedUnit(null);
                      setShowHeatmap(false);
                    }}
                  >
                    <div className="bg-white p-2 rounded max-w-[200px]">
                      <h3 className="font-bold text-gray-900 text-sm">{selectedUnit.name}</h3>
                      <p className="text-xs text-gray-600 mt-1">{selectedUnit.address}</p>
                    </div>
                  </InfoWindow>
                )}
              </>
            )}
          </MapContainer>
        </div>

        {showHeatmap && (
          <div className="mt-4 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
            <div className="flex items-center gap-2 text-yellow-500">
              <AlertTriangle className="h-5 w-5" />
              <p>Visualizando mancha criminal da região de {heatmapLocation}</p>
            </div>
          </div>
        )}
      </div>

      {/* Unit Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {units.map((unit) => (
          <UnitCard
            key={unit.name}
            unit={unit}
            onSelect={() => handleUnitSelect(unit)}
            isSelected={selectedUnit?.name === unit.name}
          />
        ))}
      </div>
    </div>
  );
};

export default Units;