import React from 'react';
import { CalendarRange } from 'lucide-react';

interface DateRangePickerProps {
  startDate: string;
  endDate: string;
  onStartDateChange: (date: string) => void;
  onEndDateChange: (date: string) => void;
}

export const DateRangePicker: React.FC<DateRangePickerProps> = ({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
}) => {
  return (
    <div className="glass-effect p-4 rounded-lg">
      <div className="flex items-center gap-4">
        <CalendarRange className="text-white" />
        <div className="flex gap-4 flex-1">
          <div className="flex-1">
            <label htmlFor="start-date" className="block text-sm font-medium text-white/90 mb-2">
              Start Date
            </label>
            <input
              type="date"
              id="start-date"
              value={startDate}
              onChange={(e) => onStartDateChange(e.target.value)}
              className="input-field"
            />
          </div>
          <div className="flex-1">
            <label htmlFor="end-date" className="block text-sm font-medium text-white/90 mb-2">
              End Date
            </label>
            <input
              type="date"
              id="end-date"
              value={endDate}
              onChange={(e) => onEndDateChange(e.target.value)}
              className="input-field"
            />
          </div>
        </div>
      </div>
    </div>
  );
};