import { Card, CardContent, Skeleton, Box } from '@mui/material';

interface ArticleCardSkeletonProps {
  viewMode?: 'grid' | 'list';
}

const ArticleCardSkeleton = ({ viewMode = 'grid' }: ArticleCardSkeletonProps) => {
  const isList = viewMode === 'list';

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: isList ? 'row' : 'column',
        height: '100%',
      }}
    >
      <Skeleton
        variant="rectangular"
        sx={{
          width: isList ? { xs: 120, sm: 200, md: 280 } : '100%',
          height: isList ? { xs: 100, sm: 140, md: 180 } : { xs: 140, sm: 160, md: 160 },
          flexShrink: 0,
        }}
      />
      <CardContent sx={{ flexGrow: 1, p: { xs: 1.5, md: 2 } }}>
        <Skeleton variant="rounded" width={60} height={24} sx={{ mb: 1, borderRadius: 1 }} />
        <Skeleton variant="text" height={28} sx={{ mb: 1 }} />
        <Skeleton variant="text" height={20} sx={{ mb: 0.5 }} />
        <Skeleton variant="text" height={20} width="80%" sx={{ mb: 1.5 }} />
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Skeleton variant="circular" width={16} height={16} />
          <Skeleton variant="text" width={80} height={16} />
        </Box>
      </CardContent>
    </Card>
  );
};

export default ArticleCardSkeleton;
