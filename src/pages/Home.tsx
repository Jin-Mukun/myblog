import { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Avatar,
  Button,
  Fade,
  Grow,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  AccessTime as AccessTimeIcon,
  TrendingUp as TrendingUpIcon,
} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { articles, getCategories } from '../data/articles';

const Home = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const categories = getCategories();
  const featuredArticles = articles.slice(0, isMobile ? 2 : 3);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          backgroundColor: '#1976D2',
          color: 'white',
          py: { xs: 4, sm: 6, md: 8 },
          mb: { xs: 4, md: 6 },
        }}
      >
        <Container maxWidth="lg">
          {/* 小屏幕：头像在上，文字在下 */}
          {isTablet && (
            <Fade in={mounted} timeout={600}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 2,
                  mb: 3,
                }}
              >
                <Avatar
                  sx={{
                    width: { xs: 80, sm: 100 },
                    height: { xs: 80, sm: 100 },
                    border: '3px solid white',
                  }}
                  src="/images/jinmukun-avatar.jpg"
                />
                <Typography variant="h6" fontWeight={600}>
                  Jiwac
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.8, textAlign: 'center' }}>
                  业余开发爱好者 | F1爱好者
                </Typography>
              </Box>
            </Fade>
          )}

          <Grid container spacing={{ xs: 3, md: 4 }} alignItems="center">
            <Grid size={{ xs: 12, md: 8 }}>
              <Fade in={mounted} timeout={600}>
                <Box>
                  <Typography
                    variant={isMobile ? 'h4' : 'h3'}
                    component="h1"
                    gutterBottom
                    fontWeight={700}
                  >
                    无限进步
                  </Typography>
                  <Typography
                    variant={isMobile ? 'body1' : 'h6'}
                    sx={{ mb: { xs: 2, md: 3 }, opacity: 0.9 }}
                  >
                    写自己想写的东西，做自己想做的事情
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                    <Button
                      variant="contained"
                      size={isMobile ? 'medium' : 'large'}
                      component={Link}
                      to="/articles"
                      sx={{
                        backgroundColor: '#ffffff',
                        color: '#1976D2',
                        fontWeight: 600,
                        px: { xs: 3, md: 4 },
                        '&:hover': {
                          backgroundColor: '#f5f5f5',
                        },
                      }}
                    >
                      浏览文章
                    </Button>
                    <Button
                      variant="outlined"
                      size={isMobile ? 'medium' : 'large'}
                      component={Link}
                      to="/about"
                      sx={{
                        borderColor: '#ffffff',
                        color: '#ffffff',
                        fontWeight: 600,
                        px: { xs: 3, md: 4 },
                        '&:hover': {
                          borderColor: '#ffffff',
                          backgroundColor: 'rgba(255,255,255,0.1)',
                        },
                      }}
                    >
                      关于我
                    </Button>
                  </Box>
                </Box>
              </Fade>
            </Grid>
            {/* 大屏幕：头像在右侧 */}
            <Grid size={{ xs: 12, md: 4 }} sx={{ display: { xs: 'none', md: 'block' } }}>
              <Fade in={mounted} timeout={800}>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 2,
                  }}
                >
                  <Avatar
                    sx={{
                      width: { md: 100, lg: 120 },
                      height: { md: 100, lg: 120 },
                      border: '4px solid white',
                    }}
                    src="/images/jinmukun-avatar.jpg"
                  />
                  <Typography variant="h6" fontWeight={600}>
                    Jiwac
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.8, textAlign: 'center' }}>
                    业余开发爱好者 | F1爱好者
                  </Typography>
                </Box>
              </Fade>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3 } }}>
        {/* Categories */}
        <Fade in={mounted} timeout={500}>
          <Box sx={{ mb: { xs: 4, md: 6 } }}>
            <Typography variant={isMobile ? 'h6' : 'h5'} gutterBottom fontWeight={600}>
              文章分类
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {categories.map((category, index) => (
                <Grow
                  in={mounted}
                  timeout={400 + index * 100}
                  key={category.name}
                >
                  <Chip
                    label={`${category.name} (${category.count})`}
                    component={Link}
                    to={`/articles?category=${encodeURIComponent(category.name)}`}
                    clickable
                    size={isMobile ? 'small' : 'medium'}
                    sx={{
                      px: { xs: 0.5, md: 1 },
                      py: { xs: 2, md: 2.5 },
                      fontSize: { xs: '0.875rem', md: '0.95rem' },
                      '&:hover': {
                        backgroundColor: 'primary.main',
                        color: 'white',
                      },
                    }}
                  />
                </Grow>
              ))}
            </Box>
          </Box>
        </Fade>

        {/* Latest Articles */}
        <Box sx={{ mb: { xs: 4, md: 6 } }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: { xs: 2, md: 3 } }}>
            <TrendingUpIcon sx={{ mr: 1, color: 'secondary.main', fontSize: { xs: 20, md: 24 } }} />
            <Typography variant={isMobile ? 'h6' : 'h5'} fontWeight={600}>
              最新文章
            </Typography>
          </Box>
          <Grid container spacing={{ xs: 2, md: 2 }}>
            {featuredArticles.map((article, index) => (
              <Grow
                in={mounted}
                timeout={500 + index * 100}
                key={article.id}
              >
                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                  <Card
                    component={Link}
                    to={`/articles/${article.id}`}
                    sx={{
                      textDecoration: 'none',
                      display: 'flex',
                      flexDirection: 'column',
                      height: '100%',
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                      },
                    }}
                  >
                    <CardMedia
                      component="img"
                      height={isMobile ? 140 : 160}
                      image={article.image}
                      alt={article.title}
                    />
                    <CardContent sx={{ flexGrow: 1, p: { xs: 1.5, md: 2 } }}>
                      <Chip
                        label={article.category}
                        size="small"
                        color="primary"
                        sx={{ mb: 1, fontSize: { xs: '0.7rem', md: '0.75rem' } }}
                      />
                      <Typography
                        variant="subtitle1"
                        gutterBottom
                        fontWeight={600}
                        sx={{ fontSize: { xs: '0.9rem', md: '1rem' } }}
                      >
                        {article.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          mb: 1.5,
                          fontSize: { xs: '0.8rem', md: '0.875rem' },
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                        }}
                      >
                        {article.excerpt}
                      </Typography>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1,
                          color: 'text.secondary',
                          fontSize: { xs: '0.7rem', md: '0.75rem' },
                        }}
                      >
                        <AccessTimeIcon fontSize="small" sx={{ fontSize: { xs: 12, md: 14 } }} />
                        {article.date}
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              </Grow>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default Home;
