export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const colors = {
  // Traffic light theme
  driving: '#DC2626', // Red for driving/parking
  warning: '#F59E0B', // Yellow for warnings/neutral
  eco: '#16A34A', // Green for eco-friendly choices
  
  // UI colors
  background: '#F8FAFC',
  surface: '#FFFFFF',
  border: '#E2E8F0',
  text: {
    primary: '#1E293B',
    secondary: '#64748B',
    light: '#94A3B8',
  },
  
  // Status colors
  success: '#10B981',
  error: '#EF4444',
  info: '#3B82F6',
};

export const textStyles = {
  h1: {
    fontSize: 28,
    fontWeight: '700' as const,
    lineHeight: 36,
    color: colors.text.primary,
  },
  h2: {
    fontSize: 24,
    fontWeight: '600' as const,
    lineHeight: 32,
    color: colors.text.primary,
  },
  h3: {
    fontSize: 20,
    fontWeight: '600' as const,
    lineHeight: 28,
    color: colors.text.primary,
  },
  body: {
    fontSize: 16,
    fontWeight: '400' as const,
    lineHeight: 24,
    color: colors.text.primary,
  },
  bodySecondary: {
    fontSize: 16,
    fontWeight: '400' as const,
    lineHeight: 24,
    color: colors.text.secondary,
  },
  caption: {
    fontSize: 14,
    fontWeight: '400' as const,
    lineHeight: 20,
    color: colors.text.secondary,
  },
  small: {
    fontSize: 12,
    fontWeight: '400' as const,
    lineHeight: 16,
    color: colors.text.light,
  },
};

export const borderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
};

export const shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
};