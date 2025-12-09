import { Router } from 'express';
import * as artistController from '../Controller/artistsController.js';

const router = Router();

/**
 *
 * /api/artists:
 *   get:
 *     summary: Retorna todos os artistas
 *     tags: [Artistas]
 *     responses:
 *       200:
 *         description: Lista todos os artistas
  */
router.get('/', artistController.getAllArtists);

/**
 * 
 * /api/artists/:id:
 *   get:
 *     summary: Retorna um artista pelo id
 *     tags: [Artistas]
 *     responses:
 *       200:
 *         description: retorna um artista pelo id especificado
  */
router.get('/:id', artistController.getArtistById);

/**
 * 
 * /api/artists/:
 *   post:
 *     summary: Insere um artista
 *     tags: [Artistas]
 *     responses:
 *       201:
 *         description: Insere um novo artista
  */
router.post('/', artistController.insertArtist);          

/**
 * 
 * /api/artists/:id:
 *   put:
 *     summary: Atualiza um artista pelo id
 *     tags: [Artistas]
 *     responses:
 *       200:
 *         description: Atualiza um artista pelo id especificado
  */
router.put('/:id', artistController.updateArtist);      

/**
 * 
 * /api/artists/:id:
 *   delete:
 *     summary: Exclui um artista pelo id
 *     tags: [Artistas]
 *     responses:
 *       204:
 *         description: Exclui um artista pelo id especificado
  */
router.delete('/:id', artistController.deleteArtist);  

export default router;