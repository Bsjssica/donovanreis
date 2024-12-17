import React from 'react';
import { Satellite, Globe2 } from 'lucide-react';

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 opacity-90" />

      {/* Content */}
      <div className="relative z-10 text-center">
        <div className="flex items-center justify-center gap-3 mb-6">
          <Satellite className="h-12 w-12 text-green-500" />
          <Globe2 className="h-12 w-12 text-green-500" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Sistema de Monitoramento BBraun
        </h1>
        <p className="text-xl text-gray-300 mb-8 max-w-2xl">
          Monitoramento em tempo real via satélite para máxima segurança e eficiência
        </p>
      </div>

      {/* Main Image */}
      <div className="relative w-full max-w-4xl mt-8">
        <img
          src="https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=1200&q=80"
          alt="Satélites em órbita"
          className="w-full h-auto rounded-lg shadow-2xl"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 relative z-10">
        <div className="bg-gray-800/50 p-6 rounded-lg backdrop-blur-sm">
          <div className="text-3xl font-bold text-green-500 mb-2">24/7</div>
          <div className="text-gray-300">Monitoramento Contínuo</div>
        </div>
        <div className="bg-gray-800/50 p-6 rounded-lg backdrop-blur-sm">
          <div className="text-3xl font-bold text-green-500 mb-2">100%</div>
          <div className="text-gray-300">Cobertura Territorial</div>
        </div>
        <div className="bg-gray-800/50 p-6 rounded-lg backdrop-blur-sm">
          <div className="text-3xl font-bold text-green-500 mb-2">Real-time</div>
          <div className="text-gray-300">Atualização de Dados</div>
        </div>
      </div>
    </div>
  );
};

export default Home;