import { useState, useEffect, useMemo } from 'react';
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

const ARTICLES_PER_PAGE = 6;

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

  const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const filteredArticles = useMemo(() => {
    let result = articles.filter((article) => {
      const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === '全部' || article.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    // 排序
    result = [...result].sort((a, b) => {
      if (sortBy === 'newest') {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      } else {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      }
    });

    return result;
  }, [searchQuery, selectedCategory, sortBy]);

  // 分页数据
  const paginatedArticles = useMemo(() => {
    const startIndex = (page - 1) * ARTICLES_PER_PAGE;
    return filteredArticles.slice(startIndex, startIndex + ARTICLES_PER_PAGE);
  }, [filteredArticles, page]);

  // 总页数
  const totalPages = Math.ceil(filteredArticles.length / ARTICLES_PER_PAGE);

  // 当筛选条件变化时重置页码
  useEffect(() => {
    setPage(1);
  }, [searchQuery, selectedCategory, sortBy]);

  return (
    <Fade in={mounted} timeout={400}>
      <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3 } }}>
        {/* Header */}
        <Box sx={{ mb: { xs: 3, md: 4 } }}>
          <Typography variant={isMobile ? 'h4' : 'h3'} component="h1" gutterBottom fontWeight={700}>
            搜索文章
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
                  <InputAdornment position="start" sx={{ mr: 0.5 }}>
                    <IconButton
                      size="small"
                      sx={{
                        width: { xs: 36, sm: 40 },
                        height: { xs: 36, sm: 40 },
                        background: 'rgba(25,118,210,0.06)',
                        color: 'primary.main',
                        '&:hover': {
                          background: 'rgba(25,118,210,0.12)',
                        },
                      }}
                    >
                      <SearchIcon fontSize="small" />
                    </IconButton>
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end" sx={{ ml: 0.5 }}>
                    <IconButton
                      size="small"
                      onClick={handleClearSearch}
                      disabled={!searchQuery}
                      sx={{
                        width: { xs: 32, sm: 36 },
                        height: { xs: 32, sm: 36 },
                        visibility: searchQuery ? 'visible' : 'hidden',
                        opacity: searchQuery ? 1 : 0,
                        transition: 'all 200ms ease',
                        color: 'text.secondary',
                        '&:hover': {
                          background: 'rgba(0,0,0,0.04)',
                        },
                      }}
                    >
                      <ClearIcon fontSize="small" />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 999,
                  paddingRight: 1,
                  backgroundColor: 'background.paper',
                  transition: 'box-shadow 200ms ease, transform 200ms ease',
                  height: { xs: 48, sm: 'auto' },
                },
                '& .MuiOutlinedInput-root.Mui-focused': {
                  boxShadow: '0 8px 30px rgba(13,71,161,0.08)',
                  transform: 'translateY(-2px)',
                },
                '& .MuiInputBase-input': {
                  fontSize: { xs: '1rem', sm: '0.875rem' },
                  py: { xs: 1.5, sm: 1 },
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
          {paginatedArticles.map((article, index) => (
            <Grow in={mounted} timeout={300 + index * 100} key={article.id}>
              <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <Card
                  component={Link}
                  to={`/posts/${article.id}`}
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
                      <Box sx={{ position: 'relative', bgcolor: 'grey.100' }}>
                        <CardMedia
                          component="img"
                          image={article.cover}
                          alt={article.title}
                          loading={index < 3 ? 'eager' : 'lazy'}
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none';
                          }}
                          sx={{
                            height: { xs: 140, md: 160 },
                            objectFit: 'cover',
                            display: 'block',
                          }}
                        />
                      </Box>
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
        {totalPages > 1 && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: { xs: 4, md: 6 } }}>
            <Pagination
              count={totalPages}
              page={page}
              onChange={handlePageChange}
              color="primary"
              size={isMobile ? 'small' : 'medium'}
              showFirstButton
              showLastButton
            />
          </Box>
        )}
      </Container>
    </Fade>
  );
};

export default Articles;
