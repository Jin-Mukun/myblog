import { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Chip,
  Fade,
  Grow,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Folder as FolderIcon,
  Article as ArticleIcon,
} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { getCategories, articles } from '../data/articles';

const categoryColors: Record<string, string> = {
  'React': '#61DAFB',
  'TypeScript': '#3178C6',
  '性能优化': '#00D8FF',
};

const categoryDescriptions: Record<string, string> = {
  'React': 'React 生态系统相关文章，包括 Hooks、组件设计、状态管理等',
  'TypeScript': 'TypeScript 类型系统、最佳实践和高级技巧',
  '性能优化': '前端性能优化策略、性能监控、加载优化',
};

const Categories = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const categories = getCategories();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Fade in={mounted} timeout={400}>
      <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3 } }}>
        {/* Header */}
        <Box sx={{ mb: { xs: 4, md: 6 }, textAlign: 'center' }}>
          <Typography variant={isMobile ? 'h4' : 'h3'} component="h1" gutterBottom fontWeight={700}>
            文章分类
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto', fontSize: { xs: '0.875rem', md: '1rem' } }}>
            按主题浏览文章，找到你感兴趣的内容
          </Typography>
        </Box>

        {/* Categories Grid */}
        <Grid container spacing={{ xs: 2, md: 3 }}>
          {categories.map((category, index) => {
            const color = categoryColors[category.name] || '#1976D2';
            const description = categoryDescriptions[category.name] || `${category.name}相关文章`;
            
            return (
              <Grow
                in={mounted}
                timeout={300 + index * 100}
                key={category.name}
              >
                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                  <Card
                    component={Link}
                    to={`/articles?category=${encodeURIComponent(category.name)}`}
                    sx={{
                      textDecoration: 'none',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      position: 'relative',
                      overflow: 'hidden',
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                      },
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: 4,
                        backgroundColor: color,
                      },
                    }}
                  >
                    <CardContent sx={{ flexGrow: 1, p: { xs: 2, md: 3 } }}>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: { xs: 1, md: 1.5 },
                          mb: { xs: 1.5, md: 2 },
                        }}
                      >
                        <Box
                          sx={{
                            width: { xs: 40, md: 48 },
                            height: { xs: 40, md: 48 },
                            backgroundColor: `${color}20`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <FolderIcon sx={{ color: color, fontSize: { xs: 20, md: 24 } }} />
                        </Box>
                        <Box>
                          <Typography variant={isMobile ? 'subtitle1' : 'h6'} fontWeight={600}>
                            {category.name}
                          </Typography>
                          <Chip
                            icon={<ArticleIcon />}
                            label={`${category.count} 篇文章`}
                            size="small"
                            variant="outlined"
                            sx={{ height: { xs: 20, md: 24 }, fontSize: { xs: '0.7rem', md: '0.75rem' } }}
                          />
                        </Box>
                      </Box>
                      <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.8125rem', md: '0.875rem' } }}>
                        {description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grow>
            );
          })}
        </Grid>

        {/* Stats - 底部显示，无阴影 */}
        <Box
          sx={{
            mt: { xs: 4, md: 6 },
            py: { xs: 3, md: 4 },
            textAlign: 'center',
            borderTop: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Typography variant="body1" color="text.secondary" sx={{ fontSize: { xs: '0.875rem', md: '1rem' } }}>
            共 {categories.length} 个分类 · 总计 {articles.length} 篇文章
          </Typography>
        </Box>
      </Container>
    </Fade>
  );
};

export default Categories;
