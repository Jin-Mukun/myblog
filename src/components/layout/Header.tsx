import { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  useMediaQuery,
  useTheme,
  Container,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  Home as HomeIcon,
  Article as ArticleIcon,
  Category as CategoryIcon,
  Person as PersonIcon,
} from '@mui/icons-material';
import { Link, useLocation } from 'react-router-dom';

const navItems = [
  { label: '首页', path: '/', icon: HomeIcon },
  { label: '文章', path: '/articles', icon: ArticleIcon },
  { label: '分类', path: '/categories', icon: CategoryIcon },
  { label: '关于', path: '/about', icon: PersonIcon },
];

const Header = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleMobileMenuOpen = () => {
    setMobileMenuOpen(true);
  };

  const handleMobileMenuClose = () => {
    setMobileMenuOpen(false);
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
          <Box sx={{ flexGrow: 1 }}>
            <Typography
              variant="h5"
              component={Link}
              to="/"
              sx={{
                display: 'inline-block',
                textDecoration: 'none',
                color: 'primary.main',
                fontWeight: 700,
                letterSpacing: '-0.02em',
              }}
            >
              Jiwac's Blog
            </Typography>
          </Box>

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

            {/* Mobile Menu Button */}
            {isMobile && (
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
            )}
          </Box>
        </Toolbar>
      </Container>

      {/* Mobile Drawer Menu */}
      <Drawer
        anchor="right"
        open={mobileMenuOpen}
        onClose={handleMobileMenuClose}
        PaperProps={{
          sx: {
            width: 280,
            backgroundColor: 'background.paper',
          }
        }}
      >
        <Box sx={{ py: 2, px: 2 }}>
          <Typography
            variant="h6"
            component={Link}
            to="/"
            onClick={handleMobileMenuClose}
            sx={{
              textDecoration: 'none',
              color: 'primary.main',
              fontWeight: 700,
              display: 'block',
              mb: 1,
            }}
          >
            Jiwac's Blog
          </Typography>
          <Typography variant="body2" color="text.secondary">
            无限进步
          </Typography>
        </Box>
        
        <Divider />
        
        <List sx={{ pt: 1 }}>
          {navItems.map((item) => {
            const IconComponent = item.icon;
            const active = isActive(item.path);
            return (
              <ListItem key={item.path} disablePadding>
                <ListItemButton
                  component={Link}
                  to={item.path}
                  onClick={handleMobileMenuClose}
                  selected={active}
                  sx={{
                    py: 1.5,
                    px: 2,
                    borderRadius: 0,
                    '&.Mui-selected': {
                      backgroundColor: 'primary.main',
                      color: 'primary.contrastText',
                      '&:hover': {
                        backgroundColor: 'primary.dark',
                      },
                      '& .MuiListItemText-primary': {
                        fontWeight: 600,
                      },
                      '& .MuiSvgIcon-root': {
                        color: 'primary.contrastText',
                      },
                    },
                  }}
                >
                  <IconComponent 
                    sx={{ 
                      mr: 2, 
                      color: active ? 'inherit' : 'text.secondary',
                      fontSize: 22,
                    }} 
                  />
                  <ListItemText 
                    primary={item.label}
                    primaryTypographyProps={{
                      fontSize: '1rem',
                      fontWeight: active ? 600 : 500,
                    }}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Drawer>
    </AppBar>
  );
};

export default Header;
