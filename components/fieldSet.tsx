import React, { ReactNode } from 'react';
import { Box, Typography, Paper } from '@mui/material';

export default function Fieldset ({ legend, children }: {legend: string; children: ReactNode}) {
  return (
    <Paper variant="outlined" sx={{ padding: 2, marginBottom: 4, position: 'relative', borderRadius: '8px', borderColor: 'grey.500', width: '100%' }}>
      <Box sx={{ position: 'absolute', top: -14, left: 16, bgcolor: 'background.paper', padding: '0 8px' }}>
        <Typography variant="caption" component="legend" sx={{ fontWeight: 'bold' }}>
          {legend}
        </Typography>
      </Box>
      <Box mt={2}>
        {children}
      </Box>
    </Paper>
  );
};
