import React, { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Home from './Home';
import TrafficReport from './TrafficReport';
import Weather from './Weather';
import Units from './Units';
import Occurrences from './occurrences/Occurrences';
import EmergencyContacts from './EmergencyContacts';
import VulnerabilityMap from './VulnerabilityMap';
import MonitoringAlarm from './MonitoringAlarm';
import PowerBIReport from './PowerBIReport';

const Dashboard = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(location.pathname.slice(1) || 'home');

  return (
    <div className="flex h-screen bg-gray-900">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex-1 overflow-auto">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/traffic" element={<TrafficReport />} />
          <Route path="/weather" element={<Weather />} />
          <Route path="/units" element={<Units />} />
          <Route path="/occurrences" element={<Occurrences />} />
          <Route path="/emergency" element={<EmergencyContacts />} />
          <Route path="/vulnerability" element={<VulnerabilityMap />} />
          <Route path="/monitoring" element={<MonitoringAlarm />} />
          <Route path="/reports" element={<PowerBIReport />} />
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;