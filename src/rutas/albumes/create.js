import db from '../../db.js'
import { AlbumSchema } from '../../esquemas/album.js'

function slugify(texto) {
  return texto
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

export const create = (req, res) => {
  const resultado = AlbumSchema.safeParse(req.body)
  if (!resultado.success) return res.status(400).json({ error: resultado.error.flatten() })

  const datos = resultado.data
  const slug = slugify(datos.titulo)

  const existente = db.prepare('SELECT slug FROM albumes WHERE slug = ?').get(slug)
  if (existente) return res.status(409).json({ error: 'Ya existe un álbum con ese slug' })

  db.prepare(`
    INSERT INTO albumes (slug, titulo, artista, genero, anio, sello, pistas, imagen, resumen, descripcion)
    VALUES (@slug, @titulo, @artista, @genero, @anio, @sello, @pistas, @imagen, @resumen, @descripcion)
  `).run({ slug, ...datos })

  res.status(201).location(`/albumes/${slug}`).json({ slug, ...datos })
}
