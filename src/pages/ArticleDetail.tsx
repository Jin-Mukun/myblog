import { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Chip,
  Avatar,
  Button,
  Paper,
  CircularProgress,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  AccessTime as AccessTimeIcon,
  ArrowBack as ArrowBackIcon,
} from '@mui/icons-material';
import { Link, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import { getArticleById, loadArticleContent } from '../data/articles';
import 'highlight.js/styles/github-dark.css';

const ArticleDetail = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { id } = useParams<{ id: string }>();
  const article = id ? getArticleById(id) : undefined;
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      setLoading(true);
      loadArticleContent(id)
        .then((text) => {
          setContent(text);
          setLoading(false);
        })
        .catch(() => {
          setContent('# 文章加载失败\n\n请稍后重试。');
          setLoading(false);
        });
    }
  }, [id]);

  if (!article) {
    return (
      <Container maxWidth="md" sx={{ px: { xs: 2, sm: 3 } }}>
        <Typography variant={isMobile ? 'h5' : 'h4'} sx={{ mt: 4 }}>
          文章不存在
        </Typography>
        <Button component={Link} to="/posts" sx={{ mt: 2 }}>
          返回文章列表
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ px: { xs: 2, sm: 3 } }}>
      {/* Back Button */}
      <Button
        component={Link}
        to="/posts"
        startIcon={<ArrowBackIcon />}
        sx={{ mb: { xs: 2, md: 3 }, fontSize: { xs: '0.875rem', md: '1rem' } }}
        size={isMobile ? 'small' : 'medium'}
      >
        返回文章列表
      </Button>

      {/* Article Header */}
      <Box sx={{ mb: { xs: 3, md: 4 } }}>
        <Chip
          label={article.category}
          color="primary"
          sx={{ mb: { xs: 1.5, md: 2 }, fontSize: { xs: '0.75rem', md: '0.875rem' } }}
          size={isMobile ? 'small' : 'medium'}
        />
        <Typography 
          variant={isMobile ? 'h5' : 'h4'} 
          component="h1" 
          gutterBottom 
          fontWeight={700}
        >
          {article.title}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: { xs: 2, md: 3 },
            color: 'text.secondary',
            flexWrap: 'wrap',
            fontSize: { xs: '0.875rem', md: '1rem' },
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Avatar 
              src={article.author.avatar} 
              sx={{ width: { xs: 28, md: 32 }, height: { xs: 28, md: 32 } }} 
            />
            <Typography variant="body2">{article.author.name}</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <AccessTimeIcon sx={{ fontSize: { xs: 16, md: 20 } }} />
            <Typography variant="body2">{article.date}</Typography>
          </Box>
        </Box>
      </Box>

      {/* Featured Image */}
      {article.cover && (
        <Box sx={{ mb: { xs: 2, md: 3 } }}>
          <Box
            component="img"
            src={article.cover}
            alt={article.title}
            sx={{ width: '100%', borderRadius: 2, maxHeight: 420, objectFit: 'cover' }}
          />
        </Box>
      )}

      {/* Article Content */}
      <Paper
        elevation={0}
        sx={{
          p: { xs: 2, sm: 3, md: 4 },
          backgroundColor: 'background.paper',
          '& h1': { 
            fontSize: { xs: '1.5rem', md: '2rem' }, 
            fontWeight: 700, 
            mb: { xs: 2, md: 3 }, 
            mt: { xs: 3, md: 4 },
          },
          '& h2': { 
            fontSize: { xs: '1.25rem', md: '1.5rem' }, 
            fontWeight: 600, 
            mb: { xs: 1.5, md: 2 }, 
            mt: { xs: 2, md: 3 },
          },
          '& p': { mb: { xs: 1.5, md: 2 }, lineHeight: 1.8, fontSize: { xs: '0.9375rem', md: '1rem' } },
          '& ul, & ol': { mb: { xs: 1.5, md: 2 }, pl: { xs: 2.5, md: 3 } },
          '& li': { mb: 1 },
          '& code': {
            backgroundColor: 'rgba(0,0,0,0.05)',
            padding: '2px 6px',
            fontFamily: '"Fira Code", "Source Code Pro", monospace',
            fontSize: '0.875em',
          },
          '& pre': {
            backgroundColor: '#1e1e1e',
            padding: { xs: 1.5, md: 2 },
            overflow: 'auto',
            mb: { xs: 1.5, md: 2 },
            '& code': {
              backgroundColor: 'transparent',
              padding: 0,
              fontSize: { xs: '0.8125rem', md: '0.875rem' },
            },
          },
          '& blockquote': {
            borderLeft: '4px solid',
            borderColor: 'primary.main',
            pl: { xs: 2, md: 3 },
            py: 1,
            my: { xs: 2, md: 3 },
            backgroundColor: 'rgba(0,0,0,0.02)',
            borderRadius: '0 8px 8px 0',
            '& p': {
              mb: 0,
              color: 'text.secondary',
              fontStyle: 'italic',
            },
          },
        }}
      >
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
            <CircularProgress size={isMobile ? 32 : 40} />
          </Box>
        ) : (
          <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
            {content}
          </ReactMarkdown>
        )}
      </Paper>
    </Container>
  );
};

export default ArticleDetail;
