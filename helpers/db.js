const { query } = require('express-validator');
const { Client } = require('pg');

const client = new Client({
  connectionString: 'postgres://qmpccsewgydsmt:6f1bdce3546f3967d75c22b9968835b25c5fac26679373ff580adc0ac1a2183e@ec2-54-74-156-137.eu-west-1.compute.amazonaws.com:5432/dc0bp349ik6u2b',
  ssl: {
    rejectUnauthorized: true
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
  client.query('INSERT INTO wa_sessions (session) VALUES($1)', [session], (err, result) => {
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
