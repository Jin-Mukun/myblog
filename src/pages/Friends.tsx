import { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Avatar,
  Button,
  Fade,
  Grow,
  useTheme,
  useMediaQuery,
  Link as MuiLink,
} from '@mui/material';
import {
  Link as LinkIcon,
  Launch as LaunchIcon,
} from '@mui/icons-material';
import { friendLinks } from '../data/friends';

const Friends = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Fade in={mounted} timeout={400}>
      <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3 } }}>
        {/* Header */}
        <Box sx={{ mb: { xs: 3, md: 4 } }}>
          <Typography variant={isMobile ? 'h4' : 'h3'} component="h1" gutterBottom fontWeight={700}>
            友情链接
          </Typography>
          <Typography variant="body1" color="text.secondary">
            共 {friendLinks.length} 位好友
          </Typography>
        </Box>

        {/* Friend Links Grid */}
        <Grid container spacing={{ xs: 2, md: 3 }}>
          {friendLinks.map((friend, index) => (
            <Grow in={mounted} timeout={300 + index * 100} key={friend.id}>
              <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <Card
                  sx={{
                    height: '100%',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                    },
                  }}
                >
                  <CardContent sx={{ p: { xs: 2, md: 3 } }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                      <Avatar
                        sx={{
                          width: { xs: 48, md: 56 },
                          height: { xs: 48, md: 56 },
                          bgcolor: 'primary.main',
                        }}
                        src={friend.avatar}
                      >
                        <LinkIcon />
                      </Avatar>
                      <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Typography
                          variant="h6"
                          fontWeight={600}
                          sx={{
                            fontSize: { xs: '1rem', md: '1.125rem' },
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {friend.name}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{
                            fontSize: { xs: '0.75rem', md: '0.875rem' },
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {friend.url}
                        </Typography>
                      </Box>
                    </Box>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        mb: 2,
                        fontSize: { xs: '0.875rem', md: '0.9375rem' },
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        minHeight: { xs: 40, md: 44 },
                      }}
                    >
                      {friend.description}
                    </Typography>
                    <Button
                      variant="outlined"
                      size="small"
                      fullWidth
                      component={MuiLink}
                      href={friend.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      endIcon={<LaunchIcon />}
                      sx={{
                        textTransform: 'none',
                        borderRadius: 2,
                      }}
                    >
                      访问网站
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            </Grow>
          ))}
        </Grid>

        {/* Empty State */}
        {friendLinks.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h6" color="text.secondary">
              暂无友链
            </Typography>
          </Box>
        )}
      </Container>
    </Fade>
  );
};

export default Friends;
