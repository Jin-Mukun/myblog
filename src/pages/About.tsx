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
} from '@mui/material';
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
  { icon: <GitHubIcon />, label: 'GitHub', url: 'https://github.com/Jin-Mukun' },
  { icon: <YouTubeIcon />, label: 'YouTube', url: 'https://www.youtube.com/channel/UCRCqq4pyu9V1D_ms7KrVauA' },
  { icon: <TwitterIcon />, label: 'X', url: 'https://x.com/mukunjin' },
];

const About = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3 } }}>
      {/* Profile Section */}
      <Paper
        elevation={0}
        sx={{
          p: { xs: 3, sm: 4, md: 6 },
          mb: { xs: 4, md: 6 },
          background: 'linear-gradient(135deg, #1976D2 0%, #0D47A1 100%)',
          color: 'white',
          textAlign: 'center',
        }}
      >
        <Avatar
          src="/images/jinmukun-avatar.jpg"
          sx={{
            width: { xs: 100, sm: 120, md: 150 },
            height: { xs: 100, sm: 120, md: 150 },
            mx: 'auto',
            mb: { xs: 2, md: 3 },
            border: '4px solid white',
            boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
          }}
        />
        <Typography variant={isMobile ? 'h4' : 'h3'} gutterBottom fontWeight={700}>
          Jiwac
        </Typography>
        <Typography variant={isMobile ? 'body1' : 'h6'} sx={{ mb: { xs: 2, md: 3 }, opacity: 0.9 }}>
          业余开发爱好者 | F1爱好者
        </Typography>
        <Typography
          variant="body1"
          sx={{
            maxWidth: 600,
            mx: 'auto',
            opacity: 0.85,
            lineHeight: 1.8,
            fontSize: { xs: '0.875rem', md: '1rem' },
          }}
        >
          在读中学生，业余开发爱好者
        </Typography>
      </Paper>

      <Grid container spacing={{ xs: 2, md: 4 }}>
        {/* Skills Section */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper
            elevation={0}
            sx={{
              p: { xs: 2.5, md: 4 },
              height: '100%',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            }}
          >
            <Typography variant={isMobile ? 'h6' : 'h5'} gutterBottom fontWeight={600}>
              技能标签：
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {skills.map((skill) => (
                <Chip
                  key={skill}
                  label={skill}
                  icon={<CodeIcon />}
                  size={isMobile ? 'small' : 'medium'}
                  sx={{
                    '&:hover': {
                      backgroundColor: 'primary.main',
                      color: 'white',
                    },
                  }}
                />
              ))}
            </Box>
          </Paper>
        </Grid>

        {/* Contact Info */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper
            elevation={0}
            sx={{
              p: { xs: 2.5, md: 4 },
              height: '100%',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            }}
          >
            <Typography variant={isMobile ? 'h6' : 'h5'} gutterBottom fontWeight={600}>
              联系方式：
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
                    '&:hover': {
                      backgroundColor: 'action.hover',
                    },
                  }}
                >
                  <Box sx={{ color: 'primary.main', fontSize: { xs: 20, md: 24 } }}>{link.icon}</Box>
                  <Typography sx={{ fontSize: { xs: '0.875rem', md: '1rem' } }}>{link.label}</Typography>
                </Box>
              ))}
            </Box>
          </Paper>
        </Grid>

        {/* Experience */}
        <Grid size={{ xs: 12 }}>
          <Paper
            elevation={0}
            sx={{
              p: { xs: 2.5, md: 4 },
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            }}
          >
            <Typography variant={isMobile ? 'h6' : 'h5'} gutterBottom fontWeight={600}>
              工作经历：
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 2, md: 3 } }}>
              <Box>
                <Typography variant={isMobile ? 'subtitle1' : 'h6'} fontWeight={600}>
                  想什么呢还在读书
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default About;
