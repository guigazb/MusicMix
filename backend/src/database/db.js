import sqlite3 from 'sqlite3';
import { promisify } from 'util';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.join(__dirname, '../artists.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Erro ao conectar no banco:', err);
  } else {
    console.log('Conectado ao SQLite:', dbPath);
  }
});

// Promisify para usar async/await
db.get = promisify(db.get.bind(db));
db.all = promisify(db.all.bind(db));
db.run = promisify(db.run.bind(db));

export { db };

async function initializeDatabase() {
  try {
    await db.run(`
      CREATE TABLE IF NOT EXISTS artists (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        artista TEXT NOT NULL,
        genero TEXT,
        origem TEXT,
        albumPrincipal TEXT,
        rating REAL DEFAULT 0,
        linkStreaming TEXT
      )
    `);
    console.log('Tabela "artists" garantida.');

    // Só agora faz o seed
    await seedIfEmpty();
  } catch (err) {
    console.error('Erro ao criar tabela:', err);
  }
}

async function seedIfEmpty() {
  try {
    const row = await db.get('SELECT COUNT(*) as count FROM artists');
    
    if (row.count > 0) {
      console.log(`Banco já possui ${row.count} artistas. Seed ignorado.`);
      return;
    }

    const jsonPath = path.join(__dirname, '../data/artists.json');
    if (!fs.existsSync(jsonPath)) {
      console.error('Arquivo artists.json não encontrado em /data/');
      return;
    }

    const data = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
    console.log(`Iniciando seed com ${data.length} artistas...`);

    await db.run('BEGIN TRANSACTION');

    const stmt = db.prepare(`
      INSERT INTO artists (artista, genero, origem, albumPrincipal, rating, linkStreaming)
      VALUES (?, ?, ?, ?, ?, ?)
    `);

    for (const a of data) {
      await new Promise((resolve, reject) => {
        stmt.run(
          a.artista,
          a.genero || null,
          a.origem || null,
          a.albumPrincipal || null,
          parseFloat(a.rating) || 0,
          a.linkStreaming || null,
          (err) => err ? reject(err) : resolve()
        );
      });
    }

    await new Promise((resolve, reject) => {
      stmt.finalize((err) => err ? reject(err) : resolve());
    });

    await db.run('COMMIT');
    console.log(`${data.length} artistas inseridos com sucesso!`);
  } catch (err) {
    await db.run('ROLLBACK');
    console.error('Erro no seed:', err);
  }
}

// Executa a inicialização (tabela + seed)
initializeDatabase();

export default db;