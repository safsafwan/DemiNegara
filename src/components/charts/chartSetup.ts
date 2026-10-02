import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Filler,
} from 'chart.js';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Filler
);

// Global styling defaults for clean dashboard aesthetic
ChartJS.defaults.font.family = "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif";
ChartJS.defaults.color = '#64748B';
ChartJS.defaults.plugins.tooltip.backgroundColor = '#0F172A';
ChartJS.defaults.plugins.tooltip.titleColor = '#FFFFFF';
ChartJS.defaults.plugins.tooltip.bodyColor = '#E2E8F0';
ChartJS.defaults.plugins.tooltip.padding = 10;
ChartJS.defaults.plugins.tooltip.cornerRadius = 8;
