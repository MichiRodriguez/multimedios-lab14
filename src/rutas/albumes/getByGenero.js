import db from '../../db.js'

export const getByGenero = (req, res) => {
  const albumes = db
    .prepare('SELECT slug FROM albumes WHERE LOWER(genero) = LOWER(?)')
    .all(req.params.genero)
  res.json(albumes.map(a => a.slug))
}
