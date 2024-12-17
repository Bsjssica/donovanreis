import React, { useState, useEffect } from 'react';
import { Bell, BellRing, Shield, AlertTriangle, Siren, MapPin } from 'lucide-react';
import { useAlarmStore } from '../stores/alarmStore';

const MonitoringAlarm = () => {
  const { isActive, type, location, activatedAt, activateAlarm, deactivateAlarm } = useAlarmStore();
  const [selectedType, setSelectedType] = useState<'flood' | 'fire' | 'chemical' | 'earthquake'>('flood');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Alarm sound effect
  useEffect(() => {
    const audio = new Audio('/alarm.mp3');
    if (isActive) {
      audio.loop = true;
      audio.play().catch(() => console.log('Audio playback failed'));
      return () => {
        audio.pause();
        audio.currentTime = 0;
      };
    }
  }, [isActive]);

  const handleAlarmActivation = () => {
    if (!selectedLocation) {
      alert('Por favor, selecione uma localização');
      return;
    }
    setShowConfirmation(true);
  };

  const confirmAlarmActivation = () => {
    activateAlarm(selectedType, selectedLocation);
    setShowConfirmation(false);
  };

  const getAlarmTypeInfo = (type: string) => {
    switch (type) {
      case 'flood':
        return { label: 'Inundação', color: 'blue' };
      case 'fire':
        return { label: 'Incêndio', color: 'red' };
      case 'chemical':
        return { label: 'Acidente Químico', color: 'yellow' };
      case 'earthquake':
        return { label: 'Terremoto', color: 'orange' };
      default:
        return { label: 'Desconhecido', color: 'gray' };
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-green-500 mb-8 flex items-center gap-3">
        <BellRing className="h-8 w-8" />
        Sistema de Alarme de Emergência
      </h2>

      {isActive ? (
        <div className="bg-red-500/10 border-2 border-red-500 rounded-lg p-6 mb-6 animate-pulse">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Siren className="h-8 w-8 text-red-500" />
              <h3 className="text-2xl font-bold text-red-500">
                ALARME ATIVO - {getAlarmTypeInfo(type).label}
              </h3>
            </div>
            <button
              onClick={deactivateAlarm}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              Desativar Alarme
            </button>
          </div>
          <div className="grid gap-4 text-gray-300">
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-red-500" />
              <span>Localização: {location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-red-500" />
              <span>Ativado em: {new Date(activatedAt!).toLocaleString()}</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid gap-6">
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Disparar Alarme</h3>
            <div className="grid gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Tipo de Emergência
                </label>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value as any)}
                  className="w-full bg-gray-700 border-gray-600 rounded-lg text-white p-2"
                >
                  <option value="flood">Inundação</option>
                  <option value="fire">Incêndio</option>
                  <option value="chemical">Acidente Químico</option>
                  <option value="earthquake">Terremoto</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Localização
                </label>
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full bg-gray-700 border-gray-600 rounded-lg text-white p-2"
                >
                  <option value="">Selecione uma localização</option>
                  <option value="Zona Norte">Zona Norte</option>
                  <option value="Zona Sul">Zona Sul</option>
                  <option value="Zona Leste">Zona Leste</option>
                  <option value="Zona Oeste">Zona Oeste</option>
                  <option value="Centro">Centro</option>
                </select>
              </div>
              <button
                onClick={handleAlarmActivation}
                className="w-full mt-4 px-4 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center gap-2"
              >
                <Siren className="h-5 w-5" />
                Ativar Alarme de Emergência
              </button>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Status do Sistema</h3>
            <div className="grid gap-4">
              <div className="flex items-center justify-between p-3 bg-gray-900 rounded-lg">
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-green-500" />
                  <span className="text-gray-300">Sistema</span>
                </div>
                <span className="text-green-500">Operacional</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-900 rounded-lg">
                <div className="flex items-center gap-2">
                  <Bell className="h-5 w-5 text-green-500" />
                  <span className="text-gray-300">Sirenes</span>
                </div>
                <span className="text-green-500">Prontas</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-gray-800 rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-semibold text-white mb-4">Confirmar Ativação</h3>
            <p className="text-gray-300 mb-6">
              Você está prestes a ativar o alarme de emergência para {getAlarmTypeInfo(selectedType).label} na região: {selectedLocation}. 
              Esta ação irá acionar todas as sirenes da região. Deseja continuar?
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowConfirmation(false)}
                className="px-4 py-2 text-gray-300 hover:text-white"
              >
                Cancelar
              </button>
              <button
                onClick={confirmAlarmActivation}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Confirmar Ativação
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MonitoringAlarm;