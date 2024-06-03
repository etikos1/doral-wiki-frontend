import React from 'react';
import { Card, CardContent, CardMedia, Typography, Box } from '@mui/material';

interface ContentCardProps {
  title: string;
  thumbnail: string;
  excerpt: string;
  url: string;
  isRead: boolean;
  onClick: () => void;
}

const ContentCard: React.FC<ContentCardProps> = ({ title, thumbnail, excerpt, url, isRead, onClick }) => {
  return (
    <Card onClick={onClick} style={{ backgroundColor: isRead ? '#f0f0f0' : '#ffffff' }}>
      {thumbnail && <CardMedia component="img" alt={title} height="140" image={thumbnail} />}
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {excerpt}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ContentCard;
