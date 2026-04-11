import { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Chip,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Pagination,
  
  Fade,
  Grow,
  IconButton,
  Paper,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Search as SearchIcon,
  Clear as ClearIcon,
  AccessTime as AccessTimeIcon,
} from '@mui/icons-material';
import { Link, useSearchParams } from 'react-router-dom';
import { articles, getCategories, preloadArticle } from '../data/articles';

const sortOptions = [
  { value: 'newest', label: '最新发布' },
  { value: 'oldest', label: '最早发布' },
];

const Articles = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category') || '全部';

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(categoryParam);
  const [sortBy, setSortBy] = useState('newest');
  
  const [page, setPage] = useState(1);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // 预加载文章
  useEffect(() => {
    if (mounted) {
      articles.forEach((article) => {
        preloadArticle(article.id);
      });
    }
  }, [mounted]);

  useEffect(() => {
    const category = searchParams.get('category');
    if (category) {
      setSelectedCategory(category);
    }
  }, [searchParams]);

  const categories = getCategories();
  const categoryNames = ['全部', ...categories.map(c => c.name)];

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    if (value === '全部') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', value);
    }
    setSearchParams(searchParams);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  

  const filteredArticles = articles.filter((article) => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === '全部' || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <Fade in={mounted} timeout={400}>
      <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3 } }}>
        {/* Header */}
        <Box sx={{ mb: { xs: 3, md: 4 } }}>
          <Typography variant={isMobile ? 'h4' : 'h3'} component="h1" gutterBottom fontWeight={700}>
            文章列表
          </Typography>
          <Typography variant="body1" color="text.secondary">
            共 {filteredArticles.length} 篇文章
          </Typography>
        </Box>

        {/* Filters */}
        <Paper sx={{ display: 'flex', flexWrap: 'wrap', gap: { xs: 1.5, md: 2 }, mb: { xs: 3, md: 4 }, p: { xs: 1.5, md: 2 }, alignItems: 'center', borderRadius: 2, boxShadow: '0 6px 22px rgba(3,18,40,0.04)', backgroundColor: 'background.paper' }}>
          {/* Search */}
          <Box sx={{ flex: '1 1 auto', minWidth: { xs: '100%', sm: 220 }, maxWidth: { md: 420 } }}>
            <TextField
              placeholder="搜索文章..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              variant="outlined"
              size={isMobile ? 'medium' : 'small'}
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start" sx={{ mr: 1 }}>
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '50%',
                        background: 'rgba(25,118,210,0.06)',
                        color: 'primary.main',
                        mr: 0.5,
                      }}
                    >
                      <SearchIcon fontSize="small" />
                    </Box>
                  </InputAdornment>
                ),
                endAdornment: searchQuery && (
                  <InputAdornment position="end">
                    <IconButton size="small" onClick={handleClearSearch} edge="end" sx={{ borderRadius: '50%', overflow: 'hidden', position: 'relative' }}>
                      <ClearIcon fontSize="small" />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 999,
                  paddingRight: 0,
                  backgroundColor: 'background.paper',
                  transition: 'box-shadow 200ms ease, transform 200ms ease',
                },
                '& .MuiOutlinedInput-root.Mui-focused': {
                  boxShadow: '0 8px 30px rgba(13,71,161,0.08)',
                  transform: 'translateY(-2px)',
                },
              }}
            />
          </Box>

          {/* Category Filter */}
          <FormControl size="small" sx={{ minWidth: { xs: 100, sm: 120 } }}>
            <InputLabel>分类</InputLabel>
            <Select
              value={selectedCategory}
              label="分类"
              onChange={(e) => handleCategoryChange(e.target.value)}
            >
              {categoryNames.map((cat) => (
                <MenuItem key={cat} value={cat}>
                  {cat}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Sort */}
          <FormControl size="small" sx={{ minWidth: { xs: 100, sm: 120 } }}>
            <InputLabel>排序</InputLabel>
            <Select
              value={sortBy}
              label="排序"
              onChange={(e) => setSortBy(e.target.value)}
            >
              {sortOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* View Mode */}
          
        </Paper>

        {/* Articles Grid/List */}
        <Grid container spacing={{ xs: 2, md: 2 }}>
          {filteredArticles.map((article, index) => (
            <Grow in={mounted} timeout={300 + index * 100} key={article.id}>
              <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <Card
                  component={Link}
                  to={`/articles/${article.id}`}
                  sx={{
                    textDecoration: 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    overflow: 'hidden',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                    },
                  }}
                >
                    {article.cover && (
                      <CardMedia
                        component="img"
                        image={article.cover}
                        alt={article.title}
                        sx={{ height: { xs: 140, md: 160 }, objectFit: 'cover' }}
                      />
                    )}
                  <CardContent sx={{ flexGrow: 1, p: { xs: 1.5, md: 2 } }}>
                    <Chip
                      label={article.category}
                      size="small"
                      color="primary"
                      sx={{ mb: 1, fontSize: { xs: '0.7rem', md: '0.75rem' } }}
                    />
                    <Typography variant="subtitle1" gutterBottom fontWeight={600} sx={{ fontSize: { xs: '0.9rem', md: '1rem' } }}>
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
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'text.secondary', fontSize: { xs: '0.7rem', md: '0.75rem' } }}>
                      <AccessTimeIcon fontSize="small" sx={{ fontSize: { xs: 12, md: 14 } }} />
                      {article.date}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            </Grow>
          ))}
        </Grid>

        {/* Empty State */}
        {filteredArticles.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h6" color="text.secondary">
              没有找到相关文章
            </Typography>
          </Box>
        )}

        {/* Pagination */}
        {filteredArticles.length > 0 && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: { xs: 4, md: 6 } }}>
            <Pagination count={1} page={page} onChange={(_e, value) => setPage(value)} color="primary" size={isMobile ? 'small' : 'medium'} />
          </Box>
        )}
      </Container>
    </Fade>
  );
};

export default Articles;
