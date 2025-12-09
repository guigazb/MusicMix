import * as artistsModel from '../Model/artistsModel.js';

export const getAllArtists = async (req, res) => {
  try {
    const search = req.query.q || '';
    const artists = await artistsModel.getAllArtists(search);
    res.json(artists);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getArtistById = async (req, res) => {
  try {
    const artist = await artistsModel.getArtistById(req.params.id);
    if (!artist) return res.status(404).json({ message: 'Artista não encontrado' });
    res.json(artist);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const insertArtist = async (req, res) => {
  try {
    const artist = await artistsModel.insertArtist(req.body);
    res.status(201).json(artist);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const updateArtist = async (req, res) => {
  try {
    const artist = await artistsModel.updateArtist(req.params.id, req.body);
    if (!artist) return res.status(404).json({ message: 'Artista não encontrado' });
    res.json(artist);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteArtist = async (req, res) => {
  try {
    const deleted = await artistsModel.deleteArtist(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Artista não encontrado' });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};