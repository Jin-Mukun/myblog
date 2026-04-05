import {
  Container,
  Typography,
  Box,
  Grid,
  Avatar,
  Chip,
  Paper,
  useTheme,
  useMediaQuery,
  Grow,
} from '@mui/material';
import { useState, useEffect } from 'react';
import {
  GitHub as GitHubIcon,
  YouTube as YouTubeIcon,
  Twitter as TwitterIcon,
  Code as CodeIcon,
} from '@mui/icons-material';

const skills = [
  'React', 'TypeScript', 'JavaScript', 'Node.js', 'Python',
  'Git'
];

const socialLinks = [
  { icon: <GitHubIcon />, label: 'GitHub', url: 'https://github.com/mukunjin' },
  { icon: <YouTubeIcon />, label: 'YouTube', url: 'https://www.youtube.com/channel/UCRCqq4pyu9V1D_ms7KrVauA' },
  { icon: <TwitterIcon />, label: 'X', url: 'https://x.com/mukunjin' },
];

const About = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <Container
      maxWidth="lg"
      sx={{
        px: { xs: 2, sm: 3 },
        // page-level CSS variables for consistent accents
        '--accent': '#1976D2',
        '--accent-dark': '#0D47A1',
      } as any}
    >
      {/* Profile Section */}
      <Grow in={mounted} timeout={500}>
        <Paper
          elevation={0}
          sx={{
            position: 'relative',
            p: { xs: 3, sm: 4, md: 6 },
            mb: { xs: 4, md: 6 },
            borderRadius: 3,
            color: 'white',
            textAlign: 'center',
            backgroundImage: `radial-gradient(1200px 400px at 10% 10%, rgba(255,255,255,0.03), transparent), linear-gradient(135deg, var(--accent) 0%, var(--accent-dark) 100%)`,
            overflow: 'hidden',
            '&:before': {
              content: '""',
              position: 'absolute',
              right: -80,
              top: -60,
              width: 220,
              height: 220,
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.06)',
              transform: 'rotate(20deg)',
            },
          }}
        >
          <Avatar
            src="/images/jinmukun-avatar.jpg"
            sx={{
              width: { xs: 100, sm: 120, md: 150 },
              height: { xs: 100, sm: 120, md: 150 },
              mx: 'auto',
              mb: { xs: 2, md: 3 },
              border: '4px solid rgba(255,255,255,0.9)',
              boxShadow: '0 8px 30px rgba(13,71,161,0.28)',
              transition: 'transform 300ms ease, box-shadow 300ms ease',
              '&:hover': {
                transform: 'translateY(-6px) scale(1.03)',
                boxShadow: '0 14px 40px rgba(13,71,161,0.36)',
              },
            }}
          />
          <Typography variant={isMobile ? 'h4' : 'h3'} gutterBottom fontWeight={800} letterSpacing={-0.5}>
            Jiwac
          </Typography>
          <Typography variant={isMobile ? 'body1' : 'h6'} sx={{ mb: { xs: 2, md: 3 }, opacity: 0.95 }}>
            业余开发爱好者 | F1爱好者
          </Typography>
          <Typography
            variant="body1"
            sx={{
              maxWidth: 680,
              mx: 'auto',
              opacity: 0.95,
              lineHeight: 1.85,
              fontSize: { xs: '0.9rem', md: '1.02rem' },
            }}
          >
            在读中学生，热衷于前端工程与性能优化，喜欢把小想法变成可玩的项目。欢迎通过下方方式联系我。
          </Typography>
        </Paper>
      </Grow>

      <Grid container spacing={{ xs: 2, md: 4 }}>
        {/* Skills Section */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Grow in={mounted} timeout={600}>
            <Paper
              elevation={0}
              sx={{
                p: { xs: 2.5, md: 4 },
                height: '100%',
                borderRadius: 2,
                boxShadow: '0 6px 22px rgba(3,18,40,0.04)',
                transition: 'transform 240ms ease',
                '&:hover': { transform: 'translateY(-6px)' },
              }}
            >
              <Typography variant={isMobile ? 'h6' : 'h5'} gutterBottom fontWeight={700}>
                技能标签
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {skills.map((skill) => (
                  <Chip
                    key={skill}
                    label={skill}
                    icon={<CodeIcon />}
                    size={isMobile ? 'small' : 'medium'}
                    variant="outlined"
                    sx={{
                      borderRadius: 1.5,
                      borderColor: 'divider',
                      fontWeight: 600,
                      '&:hover': {
                        background: 'linear-gradient(90deg,var(--accent),var(--accent-dark))',
                        color: 'white',
                        borderColor: 'transparent',
                      },
                    }}
                  />
                ))}
              </Box>
            </Paper>
          </Grow>
        </Grid>

        {/* Contact Info */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Grow in={mounted} timeout={700}>
            <Paper
              elevation={0}
              sx={{
                p: { xs: 2.5, md: 4 },
                height: '100%',
                borderRadius: 2,
                boxShadow: '0 6px 22px rgba(3,18,40,0.04)',
                transition: 'transform 240ms ease',
                '&:hover': { transform: 'translateY(-6px)' },
              }}
            >
              <Typography variant={isMobile ? 'h6' : 'h5'} gutterBottom fontWeight={700}>
                联系方式
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 1.5, md: 2 } }}>
                {socialLinks.map((link) => (
                  <Box
                    key={link.label}
                    component="a"
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: { xs: 1.5, md: 2 },
                      color: 'text.primary',
                      textDecoration: 'none',
                      p: 1,
                      borderRadius: 1,
                      transition: 'background 200ms ease, transform 200ms ease',
                      '&:hover': {
                        background: 'linear-gradient(90deg, rgba(25,118,210,0.06), rgba(13,71,161,0.06))',
                        transform: 'translateX(6px)'
                      },
                    }}
                  >
                    <Box sx={{ color: 'primary.main', fontSize: { xs: 20, md: 24 } }}>{link.icon}</Box>
                    <Typography sx={{ fontSize: { xs: '0.875rem', md: '1rem' }, fontWeight: 600 }}>{link.label}</Typography>
                  </Box>
                ))}
              </Box>
            </Paper>
          </Grow>
        </Grid>

        {/* Experience */}
        <Grid size={{ xs: 12 }}>
          <Grow in={mounted} timeout={800}>
            <Paper
              elevation={0}
              sx={{
                p: { xs: 2.5, md: 4 },
                boxShadow: '0 6px 22px rgba(3,18,40,0.04)',
                borderRadius: 2,
              }}
            >
              <Typography variant={isMobile ? 'h6' : 'h5'} gutterBottom fontWeight={700}>
                经历
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 2, md: 3 } }}>
                <Box>
                  <Typography variant={isMobile ? 'subtitle1' : 'h6'} fontWeight={700}>
                    学生 — 正在上中学
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    目前仍在读书，利用业余时间进行开发
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </Grow>
        </Grid>
      </Grid>
    </Container>
  );
};

export default About;
