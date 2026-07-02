import { ExportEngine } from './src/utils/exportEngine.js';

const dummyData = {
  personal: { name: 'Test User' },
  objective: { objective: 'Test objective' }
};

ExportEngine.exportDOCX(dummyData)
  .then(() => console.log('DOCX SUCCESS'))
  .catch(e => console.error('DOCX ERROR:', e));
