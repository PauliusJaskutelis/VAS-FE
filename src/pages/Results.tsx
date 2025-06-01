import { Box, Typography, Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import { useResults } from '../context/ResultsContext';

const Results = () => {
  const { images, clearResults } = useResults();
  const navigate = useNavigate();

  const handleBack = () => {
    clearResults();
    navigate('/');
  };

  if (images.length === 0) {
    return (
      <Box p={4} textAlign="center">
        <Typography variant="h6">No results available.</Typography>
        <Button variant="outlined" onClick={handleBack} sx={{ mt: 2 }}>
          Back to Upload
        </Button>
      </Box>
    );
  }

  const modelData = images[0].models || {
    'Default Model': images[0].results || [],
  };
  const modelNames = Object.keys(modelData);

  const columns = [
    {
      field: 'image',
      headerName: 'Image',
      width: 160,
      renderCell: (params: any) => (
        <Box display="flex" flexDirection="column" alignItems="center">
          <img
            src={params.row.preview}
            alt={params.row.filename}
            style={{ width: 100, height: 'auto', borderRadius: 8 }}
          />
          <Typography variant="caption">{params.row.filename}</Typography>
        </Box>
      ),
      sortable: false,
      filterable: false,
    },
    ...modelNames.map((modelName) => ({
      field: modelName,
      headerName: modelName,
      width: 180,
      renderCell: (params: any) => {
        const modelData = params.row.models || {
          'Default Model': params.row.results || [],
        };
        const results = modelData[modelName];
        return results?.length > 0 ? (
          <Box>
            {results.map((res: any, idx: number) => (
              <Typography key={idx} variant="body2">
                {res.label} ({(res.confidence * 100).toFixed(1)}%)
              </Typography>
            ))}
          </Box>
        ) : (
          <Typography variant="body2">-</Typography>
        );
      },
    })),
    {
      field: 'description',
      headerName: 'LLM Description',
      width: 300,
      renderCell: (params: any) => (
        <Typography variant="body2">{params.row.description}</Typography>
      ),
    },
  ];

  const rows = images.map((img: any, index: number) => ({
    id: index,
    ...img,
  }));

  return (
    <Box sx={{ height: '100vh', p: 4, backgroundColor: 'background.default' }}>
      <Typography variant="h4" textAlign="center" mb={4}>
        Classification Results
      </Typography>

      <Box sx={{ height: 600, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          disableRowSelectionOnClick
          pageSizeOptions={[5, 10]}
        />
      </Box>

      <Box mt={4} textAlign="center">
        <Button variant="outlined" onClick={handleBack}>
          Back to Upload
        </Button>
      </Box>
    </Box>
  );
};

export default Results;
