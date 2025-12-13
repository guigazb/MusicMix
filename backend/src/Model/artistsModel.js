import { db } from '../database/db.js';

export const getAllArtists = async (search = '') => {
  const query = search.trim().toLowerCase();
  if (query) {
    return await db.all(
      `SELECT * FROM artists 
       WHERE LOWER(artista) LIKE ? 
       ORDER BY artista`,
      [`%${query}%`]
    );
  }
  return await db.all(`SELECT * FROM artists ORDER BY artista`);
};

export const getArtistById = async (id) => {
  return await db.get(`SELECT * FROM artists WHERE id = ?`, [id]);
};

export const insertArtist = async (artista) => {
  const result = await db.run(
    `INSERT INTO artists (artista, genero, origem, albumPrincipal, rating, linkStreaming)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [
      artista.artista,
      artista.genero,
      artista.origem,
      artista.albumPrincipal || null,
      artista.rating || 0,
      artista.linkStreaming || null
    ]
  );
  return { id: result.lastID, ...artista };
};

export const updateArtist = async (id, artista) => {
  await db.run(
    `UPDATE artists SET 
      artista = ?, genero = ?, origem = ?, 
      albumPrincipal = ?, rating = ?, linkStreaming = ? 
     WHERE id = ?`,
    [
      artista.artista,
      artista.genero,
      artista.origem,
      artista.albumPrincipal || null,
      artista.rating || 0,
      artista.linkStreaming || null,
      id
    ]
  );
  return getArtistById(id);
};

export const deleteArtist = async (id) => {
  const artista = await getArtistById(id);
  if (!artista) return false;
  await db.run(`DELETE FROM artists WHERE id = ?`, [id]);
  return true;
};