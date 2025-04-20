import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  Divider,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useResults } from '../context/ResultsContext';

const Results = () => {
  const { images, clearResults } = useResults();
  const navigate = useNavigate();

  const handleBack = () => {
    clearResults();
    navigate('/');
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: 'background.default',
        p: 4,
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        color="text.primary"
        textAlign="center"
      >
        Classification Results
      </Typography>

      {images.length === 0 ? (
        <Typography variant="body1" textAlign="center">
          No results available.
        </Typography>
      ) : (
        <Grid container spacing={3} justifyContent="center">
          {images.map((img, index) => (
            <Grid item key={index} xs={12} md={8}>
              <Card
                sx={{ display: 'flex', backgroundColor: 'background.paper' }}
              >
                <Box sx={{ p: 2 }}>
                  <img
                    src={img.preview}
                    alt={img.filename}
                    style={{ width: 200, height: 'auto', borderRadius: 8 }}
                  />
                  <Typography variant="caption" display="block" mt={1}>
                    {img.filename}
                  </Typography>
                </Box>
                <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />
                <CardContent sx={{ flex: 1 }}>
                  {img.results.length > 0 ? (
                    img.results.map((r, i) => (
                      <Box
                        key={i}
                        display="flex"
                        justifyContent="space-between"
                        py={1}
                      >
                        <Typography variant="body1">{r.label}</Typography>
                        <Typography variant="body1">
                          {(r.confidence * 100).toFixed(1)}%
                        </Typography>
                      </Box>
                    ))
                  ) : (
                    <Typography variant="body2">No results found.</Typography>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      <Box mt={4} textAlign="center">
        <Button variant="outlined" onClick={handleBack}>
          Back to Upload
        </Button>
      </Box>
    </Box>
  );
};

export default Results;
