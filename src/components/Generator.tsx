import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography, Container, Grid, Paper } from '@mui/material';

interface Meme {
  id: string;
  name: string;
  url: string;
  width: number;
  height: number;
}

export const Generator: React.FC = () => {
  const [memes, setMemes] = useState<Meme[]>([]);
  const [selectedMeme, setSelectedMeme] = useState<Meme | null>(null);
  const [topText, setTopText] = useState<string>('');
  const [bottomText, setBottomText] = useState<string>('');

  useEffect(() => {
    fetch('https://api.imgflip.com/get_memes')
      .then(res => res.json())
      .then(data => setMemes(data.data.memes));
  }, []);

  const handleSelectMeme = (meme: Meme) => {
    setSelectedMeme(meme);
    setTopText('');
    setBottomText('');
  };

  const handleRefreshPage = () => {
    window.location.reload();
  };

  return (
    <Container maxWidth="md" sx={{ marginTop: '20px' }}>
      <Typography variant="h4" align="center" gutterBottom>
        Meme Generator
      </Typography>

      {selectedMeme ? (
        <Paper elevation={3} sx={{ padding: '16px', textAlign: 'center' }}>
          <Box position="relative" display="inline-block" mb={2}>
            <img
              src={selectedMeme.url}
              alt={selectedMeme.name}
              width="100%"
              style={{ maxWidth: '400px', borderRadius: '8px' }}
            />
            <Typography
              style={{
                position: 'absolute',
                top: '5%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                color: 'white',
                fontSize: '1.5em',
                fontWeight: 'bold',
                textShadow: '2px 2px 4px black',
              }}
            >
              {topText}
            </Typography>
            <Typography
              style={{
                position: 'absolute',
                bottom: '5%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                color: 'white',
                fontSize: '1.5em',
                fontWeight: 'bold',
                textShadow: '2px 2px 4px black',
              }}
            >
              {bottomText}
            </Typography>
          </Box>

          <Box mt={3}>
            <TextField
              label="Top Text"
              value={topText}
              onChange={(e) => setTopText(e.target.value)}
              fullWidth
              variant="outlined"
              sx={{ mb: 2 }}
            />
            <TextField
              label="Bottom Text"
              value={bottomText}
              onChange={(e) => setBottomText(e.target.value)}
              fullWidth
              variant="outlined"
            />
          </Box>

          {/* Button Group */}
          <Box display="flex" justifyContent="center" gap={2} mt={3}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setSelectedMeme(null)}
            >
              Select Another Meme
            </Button>
            <Button
              variant="outlined"
              color="primary"
              onClick={handleRefreshPage}
            >
              Back to Homepage
            </Button>
          </Box>
        </Paper>
      ) : (
        <Paper elevation={3} sx={{ padding: '16px', textAlign: 'center' }}>
          <Typography variant="h6" gutterBottom>Select a Meme Template</Typography>
          <Grid container spacing={2} justifyContent="center">
            {memes.slice(0, 10).map((meme) => (
              <Grid item key={meme.id}>
                <img
                  src={meme.url}
                  alt={meme.name}
                  width="150"
                  style={{ borderRadius: '8px', cursor: 'pointer' }}
                  onClick={() => handleSelectMeme(meme)}
                />
              </Grid>
            ))}
          </Grid>
        </Paper>
      )}
    </Container>
  );
};
