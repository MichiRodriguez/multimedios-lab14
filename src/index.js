import express from 'express'
import 'dotenv/config'
import { getAll } from './rutas/albumes/getAll.js'
import { getBySlug } from './rutas/albumes/getBySlug.js'
import { getByGenero } from './rutas/albumes/getByGenero.js'
import { search } from './rutas/albumes/search.js'
import { create } from './rutas/albumes/create.js'
import { update } from './rutas/albumes/update.js'
import { remove } from './rutas/albumes/remove.js'

const app = express()
const HOST = process.env.HOST ?? 'localhost'
const PORT = process.env.PORT ?? 3000

app.use(express.json())
app.use('/imagenes', express.static('public/imagenes'))

app.get('/', (req, res) => {
  res.json({
    nombre: 'DiscoStore API',
    version: '1.0.0',
    rutas: [
      'GET  /albumes',
      'GET  /albumes/:slug',
      'GET  /albumes/genero/:genero',
      'GET  /albumes/search/:text',
      'POST /albumes',
      'PUT  /albumes/:slug',
      'DELETE /albumes/:slug',
      'GET  /imagenes/*'
    ]
  })
})

app.get('/albumes', getAll)
app.get('/albumes/genero/:genero', getByGenero)
app.get('/albumes/search/:text', search)
app.get('/albumes/:slug', getBySlug)
app.post('/albumes', create)
app.put('/albumes/:slug', update)
app.delete('/albumes/:slug', remove)

app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' })
})

app.listen(PORT, HOST, () => {
  console.log(`Servidor en http://${HOST}:${PORT}`)
})
