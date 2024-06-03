import React from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

interface ContentGridProps {
  content: any[];
  readStatus: { [key: string]: boolean };
  onCardClick: (id: string, url: string) => void;
}

const ContentGrid: React.FC<ContentGridProps> = ({ content, readStatus, onCardClick }) => {
  return (
    <Grid container spacing={3}>
      {content.map((item, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <Card 
            onClick={() => onCardClick(item.id, item.content_urls.desktop.page)} 
            sx={{ 
              height: '100%', 
              display: 'flex', 
              flexDirection: 'column', 
              cursor: 'pointer', 
              backgroundColor: readStatus[item.id] ? '#87CEEB' : 'white' // Change background color for read items
            }}
          >
            {item.thumbnail && (
              <CardMedia
                component="img"
                height="140"
                image={item.thumbnail.source}
                alt={item.thumbnail.alt || 'Thumbnail'}
              />
            )}
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography gutterBottom variant="h5" component="div">
                {item.titles?.normalized || item.title || 'No Title'}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {item.extract || item.description || 'No Description Available'}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default ContentGrid;
