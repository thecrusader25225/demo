import {
  CircularProgressbar,
  buildStyles
} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export default function ConfidenceMeter({ value }) {
  return (
    <div className="w-24 h-24">
      <CircularProgressbar
        value={value}
        text={`${value}%`}
        styles={buildStyles({
          textSize: '16px',
          pathColor: value > 85 ? '#22c55e' : value > 60 ? '#facc15' : '#ef4444',
          textColor: '#fff',
          trailColor: '#374151', // Tailwind gray-700
          backgroundColor: '#1f2937' // Tailwind gray-800
        })}
      />
    </div>
  );
};
