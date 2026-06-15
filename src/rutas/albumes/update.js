import db from '../../db.js'
import { AlbumUpdateSchema } from '../../esquemas/album.js'

export const update = (req, res) => {
  const album = db.prepare('SELECT * FROM albumes WHERE slug = ?').get(req.params.slug)
  if (!album) return res.status(404).json({ error: 'Álbum no encontrado' })

  const resultado = AlbumUpdateSchema.safeParse(req.body)
  if (!resultado.success) return res.status(400).json({ error: resultado.error.flatten() })

  const actualizado = { ...album, ...resultado.data }

  db.prepare(`
    UPDATE albumes SET titulo=@titulo, artista=@artista, genero=@genero, anio=@anio,
    sello=@sello, pistas=@pistas, imagen=@imagen, resumen=@resumen, descripcion=@descripcion
    WHERE slug=@slug
  `).run(actualizado)

  res.json(actualizado)
}
