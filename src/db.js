import Database from 'better-sqlite3'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))

const db = new Database(join(__dirname, '..', 'disco.db'))

db.pragma('journal_mode = WAL')
db.pragma('foreign_keys = ON')

db.exec(`
  CREATE TABLE IF NOT EXISTS albumes (
    slug       TEXT PRIMARY KEY,
    titulo     TEXT NOT NULL,
    artista    TEXT NOT NULL,
    genero     TEXT NOT NULL,
    anio       INTEGER NOT NULL,
    sello      TEXT NOT NULL,
    pistas     INTEGER NOT NULL,
    imagen     TEXT NOT NULL,
    resumen    TEXT NOT NULL,
    descripcion TEXT NOT NULL
  )
`)

const count = db.prepare('SELECT COUNT(*) AS total FROM albumes').get()

if (count.total === 0) {
  const rutaDatos = join(__dirname, '..', 'datos', 'albumes.json')
  const albumes = JSON.parse(readFileSync(rutaDatos, 'utf-8'))

  const insertar = db.prepare(`
    INSERT INTO albumes (slug, titulo, artista, genero, anio, sello, pistas, imagen, resumen, descripcion)
    VALUES (@slug, @titulo, @artista, @genero, @anio, @sello, @pistas, @imagen, @resumen, @descripcion)
  `)

  const insertarMuchos = db.transaction((lista) => {
    for (const album of lista) insertar.run(album)
  })

  insertarMuchos(albumes)
  console.log(`Base de datos poblada con ${albumes.length} álbumes.`)
}

export default db
