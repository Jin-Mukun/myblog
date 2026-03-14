// 博客排版系统

export const typography = {
  // 字体家族
  fontFamily: {
    primary: "'Noto Sans SC', 'PingFang SC', 'Microsoft YaHei', system-ui, -apple-system, sans-serif",
    code: "'Fira Code', 'Source Code Pro', 'Monaco', 'Consolas', monospace",
  },
  // 字号层级
  fontSize: {
    h1: '2.5rem',      // 40px
    h2: '2rem',        // 32px
    h3: '1.5rem',      // 24px
    h4: '1.25rem',     // 20px
    h5: '1.125rem',    // 18px
    h6: '1rem',        // 16px
    body1: '1rem',     // 16px
    body2: '0.875rem', // 14px
    caption: '0.75rem', // 12px
    overline: '0.75rem', // 12px
  },
  // 字重
  fontWeight: {
    light: 300,
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  // 行高
  lineHeight: {
    tight: 1.2,
    snug: 1.375,
    normal: 1.5,
    relaxed: 1.625,
    loose: 1.75,
  },
  // 字间距
  letterSpacing: {
    tight: '-0.025em',
    normal: '0',
    wide: '0.025em',
    wider: '0.05em',
  },
} as const;

export type Typography = typeof typography;

// MUI Typography 变体配置
export const muiTypography = {
  h1: {
    fontSize: typography.fontSize.h1,
    fontWeight: typography.fontWeight.bold,
    lineHeight: typography.lineHeight.tight,
    letterSpacing: typography.letterSpacing.tight,
  },
  h2: {
    fontSize: typography.fontSize.h2,
    fontWeight: typography.fontWeight.semibold,
    lineHeight: typography.lineHeight.snug,
  },
  h3: {
    fontSize: typography.fontSize.h3,
    fontWeight: typography.fontWeight.semibold,
    lineHeight: typography.lineHeight.normal,
  },
  h4: {
    fontSize: typography.fontSize.h4,
    fontWeight: typography.fontWeight.medium,
    lineHeight: typography.lineHeight.normal,
  },
  h5: {
    fontSize: typography.fontSize.h5,
    fontWeight: typography.fontWeight.medium,
    lineHeight: typography.lineHeight.normal,
  },
  h6: {
    fontSize: typography.fontSize.h6,
    fontWeight: typography.fontWeight.medium,
    lineHeight: typography.lineHeight.normal,
  },
  body1: {
    fontSize: typography.fontSize.body1,
    fontWeight: typography.fontWeight.regular,
    lineHeight: typography.lineHeight.loose,
  },
  body2: {
    fontSize: typography.fontSize.body2,
    fontWeight: typography.fontWeight.regular,
    lineHeight: typography.lineHeight.relaxed,
  },
  button: {
    fontSize: typography.fontSize.body2,
    fontWeight: typography.fontWeight.medium,
    textTransform: 'none' as const,
  },
  caption: {
    fontSize: typography.fontSize.caption,
    fontWeight: typography.fontWeight.regular,
    lineHeight: typography.lineHeight.normal,
  },
  overline: {
    fontSize: typography.fontSize.overline,
    fontWeight: typography.fontWeight.medium,
    lineHeight: typography.lineHeight.normal,
    letterSpacing: typography.letterSpacing.wider,
    textTransform: 'uppercase' as const,
  },
};
