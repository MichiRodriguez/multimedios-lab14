import db from '../../db.js'

export const getBySlug = (req, res) => {
  const album = db.prepare('SELECT * FROM albumes WHERE slug = ?').get(req.params.slug)
  if (!album) return res.status(404).json({ error: 'Álbum no encontrado' })
  res.json(album)
}
