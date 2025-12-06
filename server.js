const path = require('path');
const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');

dotenv.config({ path: path.join(__dirname, 'env.local') });

const { SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, SUPABASE_ANON_KEY } = process.env;

if (!SUPABASE_URL) {
  throw new Error('SUPABASE_URL doit être défini dans le fichier env.local.');
}

const supabaseKey = SUPABASE_SERVICE_ROLE_KEY || SUPABASE_ANON_KEY;

if (!supabaseKey) {
  throw new Error('Une clé Supabase (SUPABASE_SERVICE_ROLE_KEY ou SUPABASE_ANON_KEY) est requise dans env.local.');
}

const supabase = createClient(SUPABASE_URL, supabaseKey);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(__dirname));

app.post('/api/opinions', async (req, res) => {
  const { age, opinion } = req.body || {};

  if (typeof age !== 'number' || Number.isNaN(age)) {
    return res.status(400).json({ error: 'Merci de fournir un âge numérique valide.' });
  }

  if (!['positive', 'negative'].includes(opinion)) {
    return res.status(400).json({ error: "L'opinion doit être 'positive' ou 'negative'." });
  }

  try {
    const { data, error } = await supabase.from('opinions').insert([{ age, opinion }]).select().single();

    if (error) {
      throw error;
    }

    return res.status(201).json({ message: 'Opinion enregistrée avec succès.', opinion: data });
  } catch (error) {
    console.error('Supabase insert error', error);
    return res.status(500).json({
      error: "Une erreur est survenue lors de l'enregistrement. Veuillez réessayer plus tard.",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
