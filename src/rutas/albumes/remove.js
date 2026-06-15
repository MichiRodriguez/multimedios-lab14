import db from '../../db.js'

export const remove = (req, res) => {
  const album = db.prepare('SELECT slug FROM albumes WHERE slug = ?').get(req.params.slug)
  if (!album) return res.status(404).json({ error: 'Álbum no encontrado' })

  db.prepare('DELETE FROM albumes WHERE slug = ?').run(req.params.slug)
  res.status(204).send()
}
