import React from 'react';
import { Building2, MapPin, Phone, Clock } from 'lucide-react';
import { BBraunUnit } from '../../types/units';

interface UnitCardProps {
  unit: BBraunUnit;
  onSelect: () => void;
  isSelected: boolean;
}

const UnitCard: React.FC<UnitCardProps> = ({ unit, onSelect, isSelected }) => {
  return (
    <div 
      className={`bg-gray-800 rounded-lg p-6 shadow-lg border-2 transition-all cursor-pointer
        ${isSelected 
          ? 'border-green-500 shadow-green-500/20' 
          : 'border-green-600/20 hover:border-green-500/50'}`}
      onClick={onSelect}
    >
      <div className="flex items-center gap-3 mb-4">
        <Building2 className="h-6 w-6 text-green-500 flex-shrink-0" />
        <h3 className="text-lg md:text-xl font-semibold text-white">{unit.name}</h3>
      </div>
      
      <div className="space-y-3 text-sm md:text-base text-gray-300">
        <div className="flex items-start gap-2">
          <MapPin className="h-5 w-5 text-green-500 flex-shrink-0 mt-1" />
          <p className="flex-1">{unit.address}</p>
        </div>
        
        <div className="flex items-center gap-2">
          <Phone className="h-5 w-5 text-green-500 flex-shrink-0" />
          <p>{unit.phone}</p>
        </div>
        
        <div className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-green-500 flex-shrink-0" />
          <p>{unit.hours}</p>
        </div>
      </div>
    </div>
  );
};

export default UnitCard;