const { query } = require('express-validator');
const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

client.connect();

const readSession = async () => {
  try {
    const res = await client.query('SELECT * FROM wa_sessions ORDER BY created_at DESC LIMIT 1')
    if (res.rows.length) return res.rows[0].session;
    return '';
  } catch (err) {
    throw err;
  }
}

const saveSession = (session) => {
  client.query('INSERT INTO wa_sessions (session) VALUES($1)'), [session], (err, result) => {
  if (err){
    console.error('Failed to save Session', err);
  } else {
    console.log('Session Saved!');
  }
  });
}

const removeSession = () => {
 client.query('DELETE FROM wa_sessions', (err, result) => {
   if (err){
    console.error('Failed to remove Session', err);
  } else {
    console.log('Session removed!');
  }
 }); 
}

module.exports = {
  readSession,
  saveSession,
  removeSession
}
