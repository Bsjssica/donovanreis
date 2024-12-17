import React from 'react';
import { Phone, AlertTriangle, Heart, Shield, Flame } from 'lucide-react';

const EmergencyContacts = () => {
  const contacts = [
    {
      name: 'Polícia Militar',
      number: '190',
      icon: Shield,
      description: 'Emergências policiais',
    },
    {
      name: 'SAMU',
      number: '192',
      icon: Heart,
      description: 'Emergências médicas',
    },
    {
      name: 'Bombeiros',
      number: '193',
      icon: Flame,
      description: 'Incêndios e resgates',
    },
    {
      name: 'Defesa Civil',
      number: '199',
      icon: AlertTriangle,
      description: 'Desastres e acidentes',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-green-500 mb-8">
        Contatos de Emergência
      </h2>

      <div className="grid md:grid-cols-2 gap-6">
        {contacts.map((contact) => {
          const Icon = contact.icon;
          return (
            <div
              key={contact.name}
              className="bg-gray-800 rounded-lg p-6 shadow-lg border border-green-600/20"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-green-600/20 rounded-full">
                  <Icon className="h-6 w-6 text-green-500" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white">
                    {contact.name}
                  </h3>
                  <p className="text-gray-400">{contact.description}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2 text-2xl font-bold text-green-500">
                <Phone className="h-5 w-5" />
                <span>{contact.number}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EmergencyContacts;