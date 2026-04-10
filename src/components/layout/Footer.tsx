import {
  Box,
  Container,
  Typography,
  Divider,
  Stack,
  IconButton,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  GitHub as GitHubIcon,
  YouTube as YouTubeIcon,
  Twitter as TwitterIcon,
} from '@mui/icons-material';

const Footer = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const currentYear = new Date().getFullYear();

  // footer links removed

  const socialLinks = [
    { icon: <GitHubIcon />, href: 'https://github.com/mukunjin', label: 'GitHub' },
    { icon: <YouTubeIcon />, href: 'https://www.youtube.com/channel/UCRCqq4pyu9V1D_ms7KrVauA', label: 'YouTube' },
    { icon: <TwitterIcon />, href: 'https://x.com/mukunjin', label: 'X' },
  ];

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: 'background.paper',
        borderTop: '1px solid',
        borderColor: 'divider',
        py: { xs: 3, md: 5 },
        mt: 'auto',
      }}
    >
      <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3 } }}>
        <Box
          sx={{
            display: 'flex',
            gap: 3,
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
          }}
        >
          {/* Left: site title + description + social (narrower) */}
          <Box sx={{ flex: '0 0 260px', display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Typography variant="h6" fontWeight={800} sx={{ color: 'text.primary' }}>
              Jiwac's Blog
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              无限进步
            </Typography>
            {/* social icons moved to right column */}
          </Box>

          {/* Right: links grouped and aligned to right (wider) */}
          <Box sx={{ flex: '1 1 320px', minWidth: 220, display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-start' }}>
            <Stack
              direction="column"
              spacing={0.5}
              sx={{ alignItems: { xs: 'flex-start', sm: 'flex-end' }, width: '100%' }}
            >
              {/* links removed */}

              {/* Social icons aligned with links on the right */}
              <Stack direction="row" spacing={2} sx={{ justifyContent: { xs: 'flex-start', sm: 'flex-end' }, mt: { xs: 1, sm: 2 } }}>
                {socialLinks.map((link) => (
                  <IconButton
                    key={link.label}
                    component="a"
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    size={isMobile ? 'small' : 'medium'}
                    sx={{
                      color: 'text.secondary',
                      '&:hover': { color: 'primary.main' },
                      p: isMobile ? 0.5 : 0.75,
                    }}
                    aria-label={link.label}
                  >
                    {link.icon}
                  </IconButton>
                ))}
              </Stack>

              {/* copyright moved to bottom */}
            </Stack>
          </Box>
        </Box>
        <Divider sx={{ my: { xs: 1.5, md: 2 } }} />

        <Box sx={{ textAlign: 'center', mt: 1 }}>
          <Typography variant="caption" color="text.secondary">
            © {currentYear} Jiwac's Blog。保留所有权利。
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
