import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';

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

  return (
    <Box textAlign="center">
      <Typography variant="h4" gutterBottom>Meme Generator</Typography>

      {selectedMeme ? (
        <Box>
          <Box position="relative" display="inline-block">
            <img
              src={selectedMeme.url}
              alt={selectedMeme.name}
              width="300"
              style={{ position: 'relative' }}
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
                textShadow: '2px 2px 4px black'
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
                textShadow: '2px 2px 4px black'
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
            />
            <TextField
              label="Bottom Text"
              value={bottomText}
              onChange={(e) => setBottomText(e.target.value)}
              fullWidth
              style={{ marginTop: '1em' }}
            />
          </Box>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setSelectedMeme(null)}
            style={{ marginTop: '2em' }}
          >
            Select Another Meme
          </Button>
        </Box>
      ) : (
        <Box>
          <Typography variant="h6" gutterBottom>Select a Meme Template</Typography>
          <Box display="flex" flexWrap="wrap" justifyContent="center">
            {memes.slice(0, 10).map((meme) => (
              <img
                key={meme.id}
                src={meme.url}
                alt={meme.name}
                width="150"
                style={{ margin: '10px', cursor: 'pointer' }}
                onClick={() => handleSelectMeme(meme)}
              />
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
};


