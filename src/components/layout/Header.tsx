import { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Menu,
  MenuItem,
  useMediaQuery,
  useTheme,
  Container,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Search as SearchIcon,
} from '@mui/icons-material';
import { Link, useLocation } from 'react-router-dom';

const navItems = [
  { label: '首页', path: '/' },
  { label: '文章', path: '/articles' },
  { label: '分类', path: '/categories' },
  { label: '关于', path: '/about' },
];

const Header = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const location = useLocation();
  const [mobileMenuAnchor, setMobileMenuAnchor] = useState<null | HTMLElement>(null);

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMenuAnchor(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMenuAnchor(null);
  };

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <AppBar 
      position="sticky" 
      color="default" 
      elevation={0}
      sx={{
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid',
        borderColor: 'divider',
        borderRadius: 0,
      }}
    >
      <Container maxWidth="lg">
        <Toolbar sx={{ px: { xs: 0 } }}>
          {/* Logo */}
          <Typography
            variant="h5"
            component={Link}
            to="/"
            sx={{
              flexGrow: 1,
              textDecoration: 'none',
              color: 'primary.main',
              fontWeight: 700,
              letterSpacing: '-0.02em',
            }}
          >
            Jiwac's Blog
          </Typography>

          {/* Desktop Navigation */}
          {!isMobile && (
            <Box sx={{ display: 'flex', gap: 0 }}>
              {navItems.map((item) => (
                <Button
                  key={item.path}
                  component={Link}
                  to={item.path}
                  sx={{
                    color: isActive(item.path) ? 'primary.main' : 'text.secondary',
                    fontWeight: isActive(item.path) ? 600 : 500,
                    position: 'relative',
                    borderRadius: 0,
                    minWidth: 'auto',
                    px: 2,
                    py: 1,
                    '&::after': isActive(item.path) ? {
                      content: '""',
                      position: 'absolute',
                      bottom: 0,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: 20,
                      height: 3,
                      backgroundColor: 'primary.main',
                    } : {},
                  }}
                >
                  {item.label}
                </Button>
              ))}
            </Box>
          )}

          {/* Action Buttons */}
          <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
            <IconButton 
              color="inherit" 
              sx={{ 
                color: 'text.secondary',
                borderRadius: 0,
              }}
              component={Link}
              to="/search"
            >
              <SearchIcon />
            </IconButton>

            {/* Mobile Menu */}
            {isMobile && (
              <>
                <IconButton
                  color="inherit"
                  onClick={handleMobileMenuOpen}
                  sx={{ 
                    color: 'text.secondary', 
                    ml: 0.5,
                    borderRadius: 0,
                  }}
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  anchorEl={mobileMenuAnchor}
                  open={Boolean(mobileMenuAnchor)}
                  onClose={handleMobileMenuClose}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  PaperProps={{
                    sx: {
                      borderRadius: 0,
                    }
                  }}
                >
                  {navItems.map((item) => (
                    <MenuItem
                      key={item.path}
                      component={Link}
                      to={item.path}
                      onClick={handleMobileMenuClose}
                      selected={isActive(item.path)}
                      sx={{ borderRadius: 0 }}
                    >
                      {item.label}
                    </MenuItem>
                  ))}
                </Menu>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
