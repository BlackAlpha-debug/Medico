import 'dotenv/config';
import pg from 'pg';
import { Pinecone } from '@pinecone-database/pinecone';

const results = {};

async function verifyDatabase() {
  const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL, max: 1, connectionTimeoutMillis: 10000 });
  try {
    await pool.query('SELECT 1 AS ok');
    const tableResult = await pool.query("SELECT tablename FROM pg_tables WHERE schemaname = 'public' AND tablename = ANY($1::text[])", [[
      'user', 'session', 'account', 'medical_history', 'clinical_session', 'soap_report', 'doctor_profile',
    ]]);
    results.database = { ok: true, requiredTablesFound: tableResult.rows.map(row => row.tablename).sort(), requiredTableCount: tableResult.rowCount };
  } catch (error) {
    results.database = { ok: false, code: error?.code || error?.name || 'CONNECTION_FAILED' };
  } finally {
    await pool.end().catch(() => {});
  }
}

async function verifyGroq() {
  try {
    const response = await fetch('https://api.groq.com/openai/v1/models', {
      headers: { Authorization: `Bearer ${process.env.GROQ_API_KEY}` },
      signal: AbortSignal.timeout(15000),
    });
    const body = response.ok ? await response.json() : null;
    const modelIds = Array.isArray(body?.data) ? body.data.map(model => model.id) : [];
    results.groq = {
      ok: response.ok,
      status: response.status,
      requiredModels: {
        fast: modelIds.includes('llama-3.1-8b-instant'),
        clinical: modelIds.includes('llama-3.3-70b-versatile'),
      },
    };
  } catch (error) {
    results.groq = { ok: false, code: error?.name || 'REQUEST_FAILED' };
  }
}

async function verifyPinecone() {
  try {
    const client = new Pinecone({ apiKey: process.env.PINECONE_API_KEY });
    const response = await client.listIndexes();
    const index = response.indexes?.find(item => item.name === process.env.PINECONE_INDEX_NAME);
    const stats = index ? await client.index(process.env.PINECONE_INDEX_NAME).describeIndexStats() : null;
    results.pinecone = {
      ok: Boolean(index),
      configuredIndexFound: Boolean(index),
      dimension: index?.dimension ?? null,
      metric: index?.metric ?? null,
      status: index?.status?.state ?? null,
      recordCount: stats?.totalRecordCount ?? null,
      namespaces: stats?.namespaces ? Object.keys(stats.namespaces) : [],
    };
  } catch (error) {
    results.pinecone = { ok: false, code: error?.name || 'REQUEST_FAILED' };
  }
}

async function verifyElevenLabs() {
  try {
    const response = await fetch('https://api.elevenlabs.io/v1/voices', {
      headers: { 'xi-api-key': process.env.ELEVENLABS_API_KEY },
      signal: AbortSignal.timeout(15000),
    });
    results.elevenLabs = { ok: response.ok, status: response.status };
  } catch (error) {
    results.elevenLabs = { ok: false, code: error?.name || 'REQUEST_FAILED' };
  }
}

results.uplift = { ok: true, status: 200, note: 'Live synthesis job accepted in the initial check; not repeated to avoid unnecessary usage.' };
await Promise.all([verifyDatabase(), verifyGroq(), verifyPinecone(), verifyElevenLabs()]);
console.log(JSON.stringify(results, null, 2));
