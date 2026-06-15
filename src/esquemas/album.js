import { z } from 'zod'

export const AlbumSchema = z.object({
  titulo: z.string().min(1),
  artista: z.string().min(1),
  genero: z.string().min(1),
  anio: z.number().int().min(1900).max(new Date().getFullYear()),
  sello: z.string().min(1),
  pistas: z.number().int().min(1),
  imagen: z.string().min(1),
  resumen: z.string().min(1),
  descripcion: z.string().min(1)
})

export const AlbumUpdateSchema = AlbumSchema.partial()
