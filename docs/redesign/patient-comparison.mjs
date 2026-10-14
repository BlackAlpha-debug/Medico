import sharp from 'sharp';

const sourcePath = 'stitch_hospital_management/medico_patient_dashboard/screen.png';
const implementationPath = 'docs/redesign/patient-dashboard-desktop.png';
const outputPath = 'docs/redesign/patient-dashboard-comparison-current.png';
const normalizedWidth = 600;
const gap = 24;

const sourceMetadata = await sharp(sourcePath).metadata();
const implementationMetadata = await sharp(implementationPath).metadata();
const sourceHeight = Math.round((sourceMetadata.height / sourceMetadata.width) * normalizedWidth);
const implementationHeight = Math.round((implementationMetadata.height / implementationMetadata.width) * normalizedWidth);
const height = Math.max(sourceHeight, implementationHeight);
const source = await sharp(sourcePath).resize({ width: normalizedWidth }).png().toBuffer();
const implementation = await sharp(implementationPath).resize({ width: normalizedWidth }).png().toBuffer();

await sharp({ create: { width: normalizedWidth * 2 + gap, height, channels: 4, background: '#effcfb' } })
  .composite([
    { input: source, left: 0, top: 0 },
    { input: implementation, left: normalizedWidth + gap, top: 0 },
  ])
  .png()
  .toFile(outputPath);

console.log(JSON.stringify({ sourcePath, implementationPath, outputPath, normalizedWidth }));
