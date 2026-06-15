import db from '../../db.js'

export const search = (req, res) => {
  const texto = `%${req.params.text}%`
  const albumes = db
    .prepare('SELECT * FROM albumes WHERE titulo LIKE ? OR artista LIKE ? OR genero LIKE ?')
    .all(texto, texto, texto)
  res.json(albumes)
}
