import * as React from 'react';
import Grid from '@mui/material/Grid';

interface ButtonUsageProps {
  style: React.CSSProperties; // Definindo o tipo para CSSProperties
}

export default function ButtonUsage({ style }: ButtonUsageProps) {
  return (
    <main id="app" style={style}>
      <Grid item>
        <button>
          <span className="text">Abrir Portão</span>
          <span className="shimmer"></span>
        </button>
      </Grid>
    </main>
  );
}
