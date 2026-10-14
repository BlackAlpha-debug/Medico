import sharp from 'sharp';

const pairs = [
  {
    source: 'stitch_hospital_management/medico_doctor_dashboard/screen.png',
    implementation: 'docs/redesign/doctor-dashboard-desktop.png',
    output: 'docs/redesign/doctor-dashboard-comparison.png',
  },
  {
    source: 'stitch_hospital_management/medico_doctor_patient_consultation_detail/screen.png',
    implementation: 'docs/redesign/doctor-report-desktop.png',
    output: 'docs/redesign/doctor-report-comparison.png',
  },
];

const normalizedWidth = 600;
const gap = 24;

for (const pair of pairs) {
  const sourceMetadata = await sharp(pair.source).metadata();
  const implementationMetadata = await sharp(pair.implementation).metadata();
  const sourceHeight = Math.round((sourceMetadata.height / sourceMetadata.width) * normalizedWidth);
  const implementationHeight = Math.round((implementationMetadata.height / implementationMetadata.width) * normalizedWidth);
  const height = Math.max(sourceHeight, implementationHeight);
  const source = await sharp(pair.source).resize({ width: normalizedWidth }).png().toBuffer();
  const implementation = await sharp(pair.implementation).resize({ width: normalizedWidth }).png().toBuffer();

  await sharp({
    create: { width: normalizedWidth * 2 + gap, height, channels: 4, background: '#effcfb' },
  }).composite([
    { input: source, left: 0, top: 0 },
    { input: implementation, left: normalizedWidth + gap, top: 0 },
  ]).png().toFile(pair.output);

  console.log(JSON.stringify({
    ...pair,
    sourceSize: `${sourceMetadata.width}x${sourceMetadata.height}`,
    implementationSize: `${implementationMetadata.width}x${implementationMetadata.height}`,
    normalizedWidth,
  }));
}
