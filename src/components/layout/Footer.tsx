import {
  Box,
  Container,
  Typography,
  Link,
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

  const footerLinks = [
    { label: '首页', href: '/' },
    { label: '文章', href: '/articles' },
    { label: '分类', href: '/categories' },
    { label: '关于', href: '/about' },
  ];

  const socialLinks = [
    { icon: <GitHubIcon />, href: 'https://github.com/Jin-Mukun', label: 'GitHub' },
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
        py: { xs: 3, md: 4 },
        mt: 'auto',
      }}
    >
      <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3 } }}>
        {/* Social Links */}
        <Stack
          direction="row"
          spacing={1}
          justifyContent="center"
          sx={{ mb: { xs: 1.5, md: 2 } }}
        >
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
                '&:hover': {
                  color: 'primary.main',
                },
              }}
              aria-label={link.label}
            >
              {link.icon}
            </IconButton>
          ))}
        </Stack>

        {/* Footer Links */}
        <Stack
          direction="row"
          spacing={{ xs: 2, md: 3 }}
          justifyContent="center"
          sx={{ mb: { xs: 1.5, md: 2 }, flexWrap: 'wrap' }}
        >
          {footerLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              underline="hover"
              sx={{
                color: 'text.secondary',
                fontSize: { xs: '0.8125rem', md: '0.875rem' },
                '&:hover': {
                  color: 'primary.main',
                },
              }}
            >
              {link.label}
            </Link>
          ))}
        </Stack>

        <Divider sx={{ my: { xs: 1.5, md: 2 } }} />

        {/* Copyright */}
        <Typography
          variant="caption"
          color="text.secondary"
          align="center"
          display="block"
          sx={{ fontSize: { xs: '0.75rem', md: '0.8125rem' } }}
        >
          © {currentYear} Jiwac's Blog
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
