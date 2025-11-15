const fs = require('fs');
const fetch = require('node-fetch');

const API_KEY = '5d9c4a1a8b7b8e6a9f8e2d3c4b5a6f7e'; // chave pública
const BASE_URL = 'http://ws.audioscrobbler.com/2.0/';

const artistas = [
  { nome: "Daft Punk", genero: "Eletrônica", origem: "França", album: "Discovery", spotify: "https://open.spotify.com/artist/4tZwfgrHOc3mvqYlEYSvVi" },
  { nome: "Beyoncé", genero: "R&B", origem: "Estados Unidos", album: "Lemonade", spotify: "https://open.spotify.com/artist/6vWDO969PvNqNYVdv6VJ9d" },
  { nome: "The Beatles", genero: "Rock", origem: "Reino Unido", album: "Abbey Road", spotify: "https://open.spotify.com/artist/3WrFJ7ztbogyGnTHbHJFl2" },
  { nome: "Billie Eilish", genero: "Pop", origem: "Estados Unidos", album: "When We All Fall Asleep, Where Do We Go?", spotify: "https://open.spotify.com/artist/6qqNVTkY8uBg9cP3Jd7DAH" },
  { nome: "Chico Buarque", genero: "MPB", origem: "Brasil", album: "Construção", spotify: "https://open.spotify.com/artist/4c2W2znMCn5P3k5fuvI1Jw" },
  { nome: "Miles Davis", genero: "Jazz", origem: "Estados Unidos", album: "Kind of Blue", spotify: "https://open.spotify.com/artist/0kbY6mX3f8OaHn1Ft3u5hJ" },
  { nome: "Anitta", genero: "Pop", origem: "Brasil", album: "Kisses", spotify: "https://open.spotify.com/artist/7FNnA9vBm6EKce9Gxyh898" },
  { nome: "Queen", genero: "Rock", origem: "Reino Unido", album: "A Night at the Opera", spotify: "https://open.spotify.com/artist/1dfeR4oJnrC0nK7f9az4bU" }
];

async function buscarImagem(artista) {
  const url = `${BASE_URL}?method=artist.getinfo&artist=${encodeURIComponent(artista)}&api_key=${API_KEY}&format=json`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    const image = data.artist?.image?.find(img => img.size === 'mega')?.['#text'] || 
                  data.artist?.image?.find(img => img.size === 'extralarge')?.['#text'] || 
                  'https://via.placeholder.com/300?text=Sem+Imagem';
    return image;
  } catch (err) {
    console.error(`Erro ao buscar ${artista}:`, err.message);
    return 'https://via.placeholder.com/300?text=Erro';
  }
}

async function gerarJSON() {
  console.log('Buscando imagens...');
  const artistasComImagem = await Promise.all(
    artistas.map(async (a) => {
      const imagem = await buscarImagem(a.nome);
      return {
        artista: a.nome,
        genero: a.genero,
        origem: a.origem,
        albumPrincipal: a.album,
        linkStreaming: a.spotify,
        rating: (4.5 + Math.random() * 0.5).toFixed(1),
        imagem
      };
    })
  );

  fs.writeFileSync('artists.json', JSON.stringify(artistasComImagem, null, 2), 'utf-8');
  console.log('artists.json gerado com sucesso!');
}

gerarJSON();