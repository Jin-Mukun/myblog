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
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Pagination,
  ToggleButtonGroup,
  ToggleButton,
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
  ViewList as ViewListIcon,
  ViewModule as ViewModuleIcon,
  AccessTime as AccessTimeIcon,
} from '@mui/icons-material';
import { Link, useSearchParams } from 'react-router-dom';
import { articles, getCategories } from '../data/articles';

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
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [page, setPage] = useState(1);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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

  const handleViewModeChange = (
    _event: React.MouseEvent<HTMLElement>,
    newMode: 'grid' | 'list' | null
  ) => {
    if (newMode !== null) {
      setViewMode(newMode);
    }
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
        <Paper sx={{ display: 'flex', flexWrap: 'wrap', gap: { xs: 1.5, md: 2 }, mb: { xs: 3, md: 4 }, p: { xs: 1.5, md: 2 }, alignItems: 'center' }}>
          {/* Search */}
          <TextField
            placeholder="搜索文章..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" color="action" />
                </InputAdornment>
              ),
              endAdornment: searchQuery && (
                <InputAdornment position="end">
                  <IconButton size="small" onClick={handleClearSearch} edge="end">
                    <ClearIcon fontSize="small" />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{ width: { xs: '100%', sm: 220 } }}
          />

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
          <ToggleButtonGroup
            value={viewMode}
            exclusive
            onChange={handleViewModeChange}
            aria-label="view mode"
            size="small"
            sx={{ ml: { xs: 0, md: 'auto' } }}
          >
            <ToggleButton value="grid" aria-label="grid view">
              <ViewModuleIcon fontSize="small" />
            </ToggleButton>
            <ToggleButton value="list" aria-label="list view">
              <ViewListIcon fontSize="small" />
            </ToggleButton>
          </ToggleButtonGroup>
        </Paper>

        {/* Articles Grid/List */}
        <Grid container spacing={{ xs: 2, md: 2 }}>
          {filteredArticles.map((article, index) => (
            <Grow in={mounted} timeout={300 + index * 100} key={article.id}>
              <Grid size={{ xs: 12, sm: viewMode === 'grid' ? 6 : 12, md: viewMode === 'grid' ? 4 : 12 }}>
                <Card
                  component={Link}
                  to={`/articles/${article.id}`}
                  sx={{
                    textDecoration: 'none',
                    display: 'flex',
                    flexDirection: viewMode === 'list' ? 'row' : 'column',
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
                    image={article.image}
                    alt={article.title}
                    sx={{
                      width: viewMode === 'list' ? { xs: 120, sm: 200, md: 280 } : '100%',
                      height: viewMode === 'list' ? { xs: 100, sm: 140, md: 180 } : { xs: 140, sm: 160, md: 160 },
                      objectFit: 'cover',
                    }}
                  />
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
