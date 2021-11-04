import {createTheme} from '@mui/material/styles';
import colours from '../constants/colours';

declare module '@mui/material/styles' {
    interface Palette {
        tertiary: Palette['secondary'],
    }
    interface PaletteOptions {
        tertiary?: PaletteOptions['secondary'],
    }
}

declare module '@mui/material/Button' {
    interface ButtonPropsColorOverrides {
        tertiary: true,
    }
}

const BrandMaterialTheme = createTheme({
    palette: {
        primary: {
            main: colours.primary,
            contrastText: colours.white,
        },
        secondary: {
            main: colours.secondary,
            contrastText: colours.white,
        },
        tertiary: {
            main: colours.tertiary,
            contrastText: colours.white,
        }
    }
});

export default BrandMaterialTheme;
