import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Bell, Pause } from 'lucide-react';
import { COLORS } from '../../constants';

/**
 * NotificationSettings - Edit notification/spark schedule
 * 
 * Props:
 * - profile: { notifications: { days, weekdayTime, weekendTime, pausedUntil } }
 * - setProfile: function to update profile
 * - onBack: function to navigate back to profile
 */
const NotificationSettings = ({ profile, setProfile, onBack }) => {
  const defaultNotifications = {
    enabled: false,
    days: { mon: false, tue: false, wed: false, thu: false, fri: false, sat: true, sun: true },
    weekdayTime: '17:30',
    weekendTime: '09:00',
    pausedUntil: null
  };
  
  const currentNotifs = profile.notifications || defaultNotifications;
  const [days, setDays] = useState(currentNotifs.days);
  const [weekdayTime, setWeekdayTime] = useState(currentNotifs.weekdayTime);
  const [weekendTime, setWeekendTime] = useState(currentNotifs.weekendTime);
  const [showPauseOptions, setShowPauseOptions] = useState(false);
  
  const dayLabels = [
    { key: 'mon', label: 'M', full: 'Monday' },
    { key: 'tue', label: 'T', full: 'Tuesday' },
    { key: 'wed', label: 'W', full: 'Wednesday' },
    { key: 'thu', label: 'T', full: 'Thursday' },
    { key: 'fri', label: 'F', full: 'Friday' },
    { key: 'sat', label: 'S', full: 'Saturday' },
    { key: 'sun', label: 'S', full: 'Sunday' },
  ];
  
  const timeOptions = [
    { value: '07:00', label: '7:00 AM' },
    { value: '08:00', label: '8:00 AM' },
    { value: '09:00', label: '9:00 AM' },
    { value: '10:00', label: '10:00 AM' },
    { value: '12:00', label: '12:00 PM' },
    { value: '14:00', label: '2:00 PM' },
    { value: '15:00', label: '3:00 PM' },
    { value: '16:00', label: '4:00 PM' },
    { value: '17:00', label: '5:00 PM' },
    { value: '17:30', label: '5:30 PM' },
    { value: '18:00', label: '6:00 PM' },
    { value: '19:00', label: '7:00 PM' },
  ];
  
  const hasWeekdays = days.mon || days.tue || days.wed || days.thu || days.fri;
  const hasWeekends = days.sat || days.sun;
  const anyDaysSelected = hasWeekdays || hasWeekends;
  
  const isPaused = currentNotifs.pausedUntil && new Date(currentNotifs.pausedUntil) > new Date();
  
  const handleSave = () => {
    setProfile(p => ({
      ...p,
      notifications: {
        enabled: anyDaysSelected,
        days,
        weekdayTime,
        weekendTime,
        pausedUntil: null
      }
    }));
    if (onBack) onBack();
  };
  
  const handlePause = (numDays) => {
    const pauseDate = new Date();
    pauseDate.setDate(pauseDate.getDate() + numDays);
    setProfile(p => ({
      ...p,
      notifications: {
        ...p.notifications,
        pausedUntil: pauseDate.toISOString()
      }
    }));
    setShowPauseOptions(false);
  };
  
  const handleResume = () => {
    setProfile(p => ({
      ...p,
      notifications: {
        ...p.notifications,
        pausedUntil: null
      }
    }));
  };
  
  return (
    <div className="min-h-screen p-6 pb-32" style={{ backgroundColor: COLORS.cream }}>
      <button onClick={onBack} className="flex items-center mb-6" style={{ color: COLORS.text }}>
        <ChevronLeft className="w-5 h-5" />Back
      </button>
      
      {/* Header */}
      <div className="flex items-center gap-3 mb-2">
        <Bell className="w-7 h-7" style={{ color: COLORS.purple }} />
        <h1 className="text-2xl font-bold" style={{ color: COLORS.purple }}>Spark Schedule</h1>
      </div>
      <p className="mb-6" style={{ color: COLORS.text }}>
        Adjust your reminder schedule anytime
      </p>
      
      {/* Paused Banner */}
      {isPaused && (
        <div className="rounded-2xl p-4 mb-4 border-2" style={{ backgroundColor: `${COLORS.coral}10`, borderColor: COLORS.coral }}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Pause className="w-5 h-5" style={{ color: COLORS.coral }} />
              <div>
                <p className="font-bold text-sm" style={{ color: COLORS.coral }}>Notifications Paused</p>
                <p className="text-xs" style={{ color: COLORS.text }}>
                  Until {new Date(currentNotifs.pausedUntil).toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
                </p>
              </div>
            </div>
            <button 
              onClick={handleResume}
              className="px-3 py-1 rounded-lg text-sm font-bold"
              style={{ backgroundColor: COLORS.coral, color: 'white' }}
            >
              Resume
            </button>
          </div>
        </div>
      )}
      
      {/* Quick Pause Options */}
      {!isPaused && anyDaysSelected && (
        <div className="bg-white rounded-2xl p-4 shadow-sm mb-4">
          <button 
            onClick={() => setShowPauseOptions(!showPauseOptions)}
            className="w-full flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <Pause className="w-5 h-5" style={{ color: COLORS.text }} />
              <span className="text-sm font-medium" style={{ color: COLORS.text }}>Need a break?</span>
            </div>
            <ChevronRight className={`w-5 h-5 transition-transform ${showPauseOptions ? 'rotate-90' : ''}`} style={{ color: COLORS.text, opacity: 0.4 }} />
          </button>
          
          {showPauseOptions && (
            <div className="mt-3 pt-3 border-t space-y-2" style={{ borderColor: '#F0F0F0' }}>
              <button 
                onClick={() => handlePause(7)}
                className="w-full p-3 rounded-xl text-left text-sm"
                style={{ backgroundColor: '#F5F5F5', color: COLORS.text }}
              >
                Pause for 1 week
              </button>
              <button 
                onClick={() => handlePause(14)}
                className="w-full p-3 rounded-xl text-left text-sm"
                style={{ backgroundColor: '#F5F5F5', color: COLORS.text }}
              >
                Pause for 2 weeks
              </button>
              <button 
                onClick={() => handlePause(30)}
                className="w-full p-3 rounded-xl text-left text-sm"
                style={{ backgroundColor: '#F5F5F5', color: COLORS.text }}
              >
                Pause for 1 month
              </button>
            </div>
          )}
        </div>
      )}
      
      {/* Day Selector */}
      <div className="bg-white rounded-2xl p-5 shadow-sm mb-4">
        <p className="text-sm font-semibold mb-3" style={{ color: COLORS.text }}>Active days</p>
        <div className="flex justify-between gap-1">
          {dayLabels.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setDays(d => ({ ...d, [key]: !d[key] }))}
              className="w-10 h-10 rounded-full font-bold text-sm transition-all"
              style={{
                backgroundColor: days[key] ? COLORS.purple : '#F0F0F0',
                color: days[key] ? 'white' : COLORS.text
              }}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
      
      {/* Weekday Time */}
      {hasWeekdays && (
        <div className="bg-white rounded-2xl p-5 shadow-sm mb-4">
          <p className="text-sm font-semibold mb-3" style={{ color: COLORS.text }}>Weekday time</p>
          <select
            value={weekdayTime}
            onChange={e => setWeekdayTime(e.target.value)}
            className="w-full p-3 rounded-xl border-2 text-base"
            style={{ borderColor: COLORS.purple + '40', color: COLORS.text }}
          >
            {timeOptions.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
      )}
      
      {/* Weekend Time */}
      {hasWeekends && (
        <div className="bg-white rounded-2xl p-5 shadow-sm mb-4">
          <p className="text-sm font-semibold mb-3" style={{ color: COLORS.text }}>Weekend time</p>
          <select
            value={weekendTime}
            onChange={e => setWeekendTime(e.target.value)}
            className="w-full p-3 rounded-xl border-2 text-base"
            style={{ borderColor: COLORS.gold + '40', color: COLORS.text }}
          >
            {timeOptions.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
      )}
      
      {/* Turn Off All */}
      {anyDaysSelected && (
        <button
          onClick={() => setDays({ mon: false, tue: false, wed: false, thu: false, fri: false, sat: false, sun: false })}
          className="w-full p-3 rounded-xl text-sm mb-4"
          style={{ color: COLORS.coral }}
        >
          Turn off all notifications
        </button>
      )}
      
      {/* Save Button */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-white via-white">
        <button
          onClick={handleSave}
          className="w-full py-4 rounded-2xl font-bold text-lg transition-all"
          style={{ backgroundColor: COLORS.gold, color: COLORS.purple }}
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default NotificationSettings;
