import { createStitches } from '@stitches/react';

export const {
  styled,
  css,
  globalCss,
  keyframes,
  getCssText,
  theme,
  createTheme,
  config,
} = createStitches({
  theme: {
    colors: {
      gray400: 'gainsboro',
      gray500: 'lightgray',
      white:'#ffffff',
      black:'#000000'
    },
    radius:{
        sm:'2px',
        md:'10px'
    }
  },
  media: {
    bp1: '(min-width: 480px)',
  },
 
});