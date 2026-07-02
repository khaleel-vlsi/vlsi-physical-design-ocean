import { StandardFonts } from 'pdf-lib';

export const TEMPLATES = {
  professional: {
    font: StandardFonts.Helvetica,
    fontBold: StandardFonts.HelveticaBold,
    fontItalic: StandardFonts.HelveticaOblique,
    primary: '#1E40AF', // Blue
    secondary: '#4B5563', // Gray
    text: '#111827', // Black
    heading: '#1E3A8A' // Dark Blue
  },
  modern: {
    font: StandardFonts.TimesRoman,
    fontBold: StandardFonts.TimesRomanBold,
    fontItalic: StandardFonts.TimesRomanItalic,
    primary: '#047857', // Emerald
    secondary: '#4B5563',
    text: '#111827',
    heading: '#064E3B'
  },
  minimal: {
    font: StandardFonts.Courier,
    fontBold: StandardFonts.CourierBold,
    fontItalic: StandardFonts.CourierOblique,
    primary: '#111827', // Almost black
    secondary: '#6B7280',
    text: '#111827',
    heading: '#111827'
  }
};
