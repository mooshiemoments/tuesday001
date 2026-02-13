import React, { useState } from 'react';
import { ChevronLeft, Check } from 'lucide-react';
import { COLORS, MASCOTS } from '../../constants';

/**
 * EditChildProfile - Edit child's name and age band
 * 
 * Props:
 * - profile: { childName, ageBand, birthday }
 * - setProfile: function to update profile
 * - onBack: function to navigate back to profile
 */
const EditChildProfile = ({ profile, setProfile, onBack }) => {
  const [name, setName] = useState(profile.childName || '');
  const [ageBand, setAgeBand] = useState(profile.ageBand || '1-2 years');
  const [day, setDay] = useState(profile.birthday?.day || '');
  const [month, setMonth] = useState(profile.birthday?.month || '');
  const [year, setYear] = useState(profile.birthday?.year || '');
  
  const ageBands = ['6-12 months', '1-2 years', '2-3 years', '3-4 years'];
  
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const months = [
    { value: 0, label: 'January' },
    { value: 1, label: 'February' },
    { value: 2, label: 'March' },
    { value: 3, label: 'April' },
    { value: 4, label: 'May' },
    { value: 5, label: 'June' },
    { value: 6, label: 'July' },
    { value: 7, label: 'August' },
    { value: 8, label: 'September' },
    { value: 9, label: 'October' },
    { value: 10, label: 'November' },
    { value: 11, label: 'December' },
  ];
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 6 }, (_, i) => currentYear - i);
  
  const isValid = name.trim().length > 0;
  
  const handleSave = () => {
    if (!isValid) return;
    
    setProfile(p => ({
      ...p,
      childName: name.trim(),
      ageBand,
      birthday: day && month !== '' && year ? { day, month, year } : p.birthday,
    }));
    if (onBack) onBack();
  };
  
  return (
    <div 
      className="min-h-screen pb-32"
      style={{ 
        background: `linear-gradient(180deg, ${COLORS.cream} 0%, #FFF5E6 100%)`,
        fontFamily: "system-ui, -apple-system, sans-serif"
      }}
    >
      {/* Header */}
      <div className="px-5 pt-4 pb-2">
        <button 
          onClick={onBack}
          className="flex items-center gap-1 mb-4"
          style={{ color: COLORS.text }}
        >
          <ChevronLeft size={20} />
          <span className="font-medium">Back</span>
        </button>
        
        <h1 className="text-2xl font-black" style={{ color: COLORS.purple }}>
          Edit Profile
        </h1>
        <p className="text-sm mt-1" style={{ color: COLORS.text }}>
          Update your child's information
        </p>
      </div>
      
      {/* Mascot */}
      <div className="flex justify-center py-4">
        <img 
          src={MASCOTS.adultThinking}
          alt="Mooshie thinking"
          className="h-24 object-contain"
          style={{ filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.15))' }}
        />
      </div>
      
      {/* Form Card */}
      <div className="px-5">
        <div 
          className="rounded-3xl p-5 relative"
          style={{ 
            background: '#fff',
            border: `3px solid ${COLORS.purple}`,
            boxShadow: `0 6px 0 ${COLORS.coral}`
          }}
        >
          {/* Child's Name */}
          <div className="mb-5">
            <label 
              className="block text-sm font-bold mb-2"
              style={{ color: COLORS.purple }}
            >
              Child's Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter name..."
              className="w-full p-4 rounded-xl text-base font-medium outline-none transition-all"
              style={{ 
                border: `2px solid ${name ? COLORS.gold : '#E5E5E5'}`,
                color: COLORS.text,
                background: name ? `${COLORS.gold}10` : '#FAFAFA'
              }}
            />
          </div>
          
          {/* Age Band */}
          <div className="mb-5">
            <label 
              className="block text-sm font-bold mb-2"
              style={{ color: COLORS.purple }}
            >
              Age Band
            </label>
            <div className="grid grid-cols-2 gap-2">
              {ageBands.map((band) => (
                <button
                  key={band}
                  onClick={() => setAgeBand(band)}
                  className="p-3 rounded-xl font-bold text-sm transition-all"
                  style={{
                    background: ageBand === band ? COLORS.purple : '#F5F5F5',
                    color: ageBand === band ? '#fff' : COLORS.text,
                    border: `2px solid ${ageBand === band ? COLORS.purple : '#E5E5E5'}`
                  }}
                >
                  {band}
                </button>
              ))}
            </div>
          </div>
          
          {/* Birthday (Optional) */}
          <div>
            <label 
              className="block text-sm font-bold mb-2"
              style={{ color: COLORS.purple }}
            >
              Birthday <span className="font-normal" style={{ color: COLORS.text }}>(optional)</span>
            </label>
            <div className="grid grid-cols-3 gap-2">
              {/* Day */}
              <select
                value={day}
                onChange={(e) => setDay(e.target.value)}
                className="p-3 rounded-xl text-sm font-medium outline-none"
                style={{ 
                  border: `2px solid ${day ? COLORS.gold : '#E5E5E5'}`,
                  color: day ? COLORS.text : COLORS.text + '80',
                  background: day ? `${COLORS.gold}10` : '#FAFAFA'
                }}
              >
                <option value="">Day</option>
                {days.map(d => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
              
              {/* Month */}
              <select
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                className="p-3 rounded-xl text-sm font-medium outline-none"
                style={{ 
                  border: `2px solid ${month !== '' ? COLORS.gold : '#E5E5E5'}`,
                  color: month !== '' ? COLORS.text : COLORS.text + '80',
                  background: month !== '' ? `${COLORS.gold}10` : '#FAFAFA'
                }}
              >
                <option value="">Month</option>
                {months.map(m => (
                  <option key={m.value} value={m.value}>{m.label}</option>
                ))}
              </select>
              
              {/* Year */}
              <select
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="p-3 rounded-xl text-sm font-medium outline-none"
                style={{ 
                  border: `2px solid ${year ? COLORS.gold : '#E5E5E5'}`,
                  color: year ? COLORS.text : COLORS.text + '80',
                  background: year ? `${COLORS.gold}10` : '#FAFAFA'
                }}
              >
                <option value="">Year</option>
                {years.map(y => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
      
      {/* Privacy note */}
      <p 
        className="text-center text-xs mt-4 px-5"
        style={{ color: COLORS.text }}
      >
        🔒 This information stays private on your device
      </p>
      
      {/* Save Button - Fixed at bottom */}
      <div className="fixed bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-white via-white to-transparent">
        <button
          onClick={handleSave}
          disabled={!isValid}
          className="w-full py-4 rounded-2xl font-black text-lg flex items-center justify-center gap-2 transition-all"
          style={{
            background: isValid ? COLORS.gold : '#E5E5E5',
            color: isValid ? COLORS.purple : '#999',
            boxShadow: isValid ? `0 4px 0 ${COLORS.coral}` : 'none',
            opacity: isValid ? 1 : 0.7
          }}
        >
          <Check size={20} />
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default EditChildProfile;
