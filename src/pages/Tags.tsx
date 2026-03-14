import {
  Container,
  Typography,
  Box,
  Chip,
  Paper,
} from '@mui/material';
import { Link } from 'react-router-dom';

const tags = [
  { name: 'React', count: 25 },
  { name: 'TypeScript', count: 18 },
  { name: 'JavaScript', count: 32 },
  { name: 'CSS', count: 15 },
  { name: 'HTML', count: 12 },
  { name: 'Node.js', count: 20 },
  { name: 'Webpack', count: 8 },
  { name: 'Vite', count: 10 },
  { name: 'Git', count: 14 },
  { name: 'Docker', count: 6 },
  { name: 'CI/CD', count: 9 },
  { name: 'Testing', count: 11 },
  { name: 'Performance', count: 13 },
  { name: 'Accessibility', count: 7 },
  { name: 'SEO', count: 5 },
  { name: 'PWA', count: 4 },
  { name: 'GraphQL', count: 8 },
  { name: 'REST API', count: 16 },
  { name: 'Microservices', count: 6 },
  { name: 'Serverless', count: 5 },
];

// 根据文章数量计算标签大小
const getTagSize = (count: number) => {
  if (count >= 25) return 'large';
  if (count >= 15) return 'medium';
  return 'small';
};

const getTagStyles = (count: number) => {
  const sizes = {
    large: { fontSize: '1.25rem', py: 1.5, px: 2 },
    medium: { fontSize: '1rem', py: 1, px: 1.5 },
    small: { fontSize: '0.875rem', py: 0.75, px: 1 },
  };
  
  const size = getTagSize(count);
  return sizes[size];
};

const Tags = () => {
  // 按文章数量排序
  const sortedTags = [...tags].sort((a, b) => b.count - a.count);

  return (
    <Container maxWidth="lg">
      {/* Header */}
      <Box sx={{ mb: 6, textAlign: 'center' }}>
        <Typography variant="h3" component="h1" gutterBottom fontWeight={700}>
          标签云
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
          通过标签快速找到相关文章
        </Typography>
      </Box>

      {/* Tags Cloud */}
      <Paper
        elevation={0}
        sx={{
          p: 4,
          borderRadius: 2,
          backgroundColor: 'background.paper',
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 2,
            justifyContent: 'center',
          }}
        >
          {sortedTags.map((tag) => {
            const styles = getTagStyles(tag.count);
            return (
              <Chip
                key={tag.name}
                label={`${tag.name} (${tag.count})`}
                component={Link}
                to={`/tags/${tag.name}`}
                clickable
                sx={{
                  fontSize: styles.fontSize,
                  py: styles.py,
                  px: styles.px,
                  height: 'auto',
                  '& .MuiChip-label': {
                    px: 0,
                  },
                  '&:hover': {
                    backgroundColor: 'primary.main',
                    color: 'white',
                    transform: 'scale(1.05)',
                  },
                  transition: 'all 0.2s ease',
                }}
              />
            );
          })}
        </Box>
      </Paper>

      {/* Stats */}
      <Box
        sx={{
          mt: 4,
          display: 'flex',
          gap: 4,
          justifyContent: 'center',
          flexWrap: 'wrap',
        }}
      >
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h4" fontWeight={700} color="primary">
            {tags.length}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            标签总数
          </Typography>
        </Box>
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h4" fontWeight={700} color="primary">
            {tags.reduce((sum, tag) => sum + tag.count, 0)}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            文章总数
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default Tags;
