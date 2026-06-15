import db from '../../db.js'

export const getAll = (req, res) => {
  const albumes = db.prepare('SELECT * FROM albumes').all()
  res.json(albumes)
}
