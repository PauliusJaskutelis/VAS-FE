import { Box, Card, CardContent, Typography, Button } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { results, imagePreview } = location.state || {
    results: [],
    imagePreview: null,
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: 'background.default',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: 4,
      }}
    >
      <Typography variant="h4" gutterBottom color="text.primary">
        Classification Results
      </Typography>

      {imagePreview && (
        <Box mb={3}>
          <img
            src={imagePreview}
            alt="Preview"
            style={{ maxWidth: 300, borderRadius: 8 }}
          />
        </Box>
      )}

      <Card sx={{ width: 400, backgroundColor: 'background.paper' }}>
        <CardContent>
          {results.length > 0 ? (
            results.map((r: any, i: number) => (
              <Box key={i} display="flex" justifyContent="space-between" py={1}>
                <Typography variant="body1">{r.label}</Typography>
                <Typography variant="body1">
                  {(r.confidence * 100).toFixed(1)}%
                </Typography>
              </Box>
            ))
          ) : (
            <Typography>No results received.</Typography>
          )}
        </CardContent>
      </Card>

      <Button variant="outlined" sx={{ mt: 4 }} onClick={() => navigate('/')}>
        Back to Upload
      </Button>
    </Box>
  );
};

export default Results;
