// 博客色彩系统

export const colors = {
  // 主色调
  primary: {
    main: '#1976D2',
    light: '#42A5F5',
    dark: '#0D47A1',
    contrastText: '#FFFFFF',
  },
  // 次色调
  secondary: {
    main: '#FFA000',
    light: '#FFCA28',
    dark: '#FF6F00',
    contrastText: '#000000',
  },
  // 背景色
  background: {
    default: '#F5F7FA',
    paper: '#FFFFFF',
    dark: '#121212',
  },
  // 文字色
  text: {
    primary: '#212121',
    secondary: '#757575',
    disabled: '#BDBDBD',
    hint: '#9E9E9E',
  },
  // 边框色
  border: {
    light: '#E0E0E0',
    main: '#BDBDBD',
    dark: '#9E9E9E',
  },
  // 状态色
  error: {
    main: '#D32F2F',
    light: '#EF5350',
    dark: '#C62828',
  },
  warning: {
    main: '#FF9800',
    light: '#FFB74D',
    dark: '#F57C00',
  },
  success: {
    main: '#388E3C',
    light: '#66BB6A',
    dark: '#2E7D32',
  },
  info: {
    main: '#1976D2',
    light: '#42A5F5',
    dark: '#1565C0',
  },
  // 渐变
  gradients: {
    primary: 'linear-gradient(135deg, #1976D2 0%, #42A5F5 100%)',
    secondary: 'linear-gradient(135deg, #FFA000 0%, #FFCA28 100%)',
    background: 'linear-gradient(180deg, #F5F7FA 0%, #FFFFFF 100%)',
    hero: 'linear-gradient(135deg, #1976D2 0%, #0D47A1 100%)',
  },
  // 阴影色
  shadow: {
    light: 'rgba(0, 0, 0, 0.08)',
    medium: 'rgba(0, 0, 0, 0.12)',
    dark: 'rgba(0, 0, 0, 0.16)',
  },
} as const;

export type Colors = typeof colors;
