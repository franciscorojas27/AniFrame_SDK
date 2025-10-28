# AniFrame SDK

SDK/servidor para obtener listados, detalles, horarios y enlaces de streaming de anime vía Socket.IO. Incluye un servidor HTTP con WebSocket que expone eventos específicos para consumir desde tus apps.

Estado: estable. Requiere Playwright instalado por el propio paquete y Deno para construir el binario opcional.

## Requisitos

- Node.js 18+ (recomendado 20+)
- pnpm
- Windows (desarrollo probado) — otros SO pueden funcionar
- Deno 1.45+ solo si compilas el ejecutable `.exe` (paso de build)

## Instalación

```pwsh
pnpm install
```

## Desarrollo

Inicia el servidor en modo desarrollo (TypeScript):

```pwsh
pnpm dev
```

Por defecto el servidor HTTP+Socket.IO escucha en el puerto 8080. Al iniciarse, crea un archivo `config.json` temporal con el PID y puerto.

## Build (distribución)

Genera la carpeta `dist/` y compila un ejecutable Windows opcional:

```pwsh
pnpm build
```

Qué hace el build:
- Empaqueta `src/index.ts` con `@vercel/ncc` en `dist/`.
- Ajusta rutas internas (`__dirname` -> `import.meta.url`).
- Compila con Deno a `dist/animeav1.exe` (requiere Deno).

## Ejecución (JavaScript)

```pwsh
pnpm start
# o
node dist/scraper.js
```

El servidor levanta Socket.IO con CORS abierto y los siguientes eventos:

### Eventos soportados

- getHomePageListAnime
	- Sin payload. Devuelve listas de la portada.
- getSearchAnime
	- Payload: `{ args: { query: string, page?: number, genres?: string[], status?: string, category?: string } }`
- getCatalogListAnime
	- Payload: `{ genres?: string[], status?: string, category?: string, page?: number }`
- getEpisodeList
	- Payload: `{ slug: string }`
- getAnimeDetails
	- Payload: `{ slug: string }`
- getAnimeSchedule
	- Sin payload. Devuelve programación por día.
- getAnimeStreamingLinks
	- Payload: `{ url: string[], delay?: number }` — devuelve fuentes M3U8.
- getManifest
	- Sin payload. Devuelve metadatos del scraper (filtros soportados, etc.).

Los callbacks reciben `{ success: boolean, content?: any, error?: any }`.

### Ejemplo de cliente (Node)

```ts
import { io } from 'socket.io-client'

const socket = io('http://localhost:8080')

socket.emit('getSearchAnime', {
	args: { query: 'naruto', page: 1, genres: ['accion'], status: 'emision', category: 'serie' }
}, (resp) => {
	if (!resp.success) return console.error(resp.error)
	console.log(resp.content)
})
```

## Manifest y filtros

Revisa `src/manifest.ts` para ver los valores admitidos de `status`, `genres` y `type`.

## Pruebas

```pwsh
pnpm test
```

## Aviso legal y responsabilidad

- Este proyecto se distribuye bajo la licencia MIT. Consulta el archivo `LICENSE`.
- Uso bajo tu propio riesgo. El autor no asume responsabilidad alguna por el uso, mal uso o daños derivados.
- Respeta los términos y condiciones de los sitios web objetivo. Solo scrapea contenido para el que tengas derecho de acceso y uso.
- No se incluye ni se alienta la distribución de contenido protegido por derechos de autor.

## Licencia

MIT © 2025 Francisco Rojas
