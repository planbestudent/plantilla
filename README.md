# Academia Flow — PWA + Chatbot conectado

Este paquete incluye:
- **index.html** (PWA, horario, tareas, resumen, drag&drop, zoom, recurrencias, chatbot)
- **service-worker.js** (cache-first)
- **manifest.webmanifest**
- **icons/** (192/512)
- **api/server.js** (proxy Express para conectar el chatbot a OpenAI; usa `OPENAI_API_KEY`)

## Cómo arrancar el chatbot conectado
1. Instala dependencias del proxy:
   ```bash
   cd api
   npm install
   OPENAI_API_KEY=sk-... npm start
   ```
   Esto levanta `http://localhost:3000/api/chat`.

2. Abre `index.html` directamente en navegador **o** sirvelo estáticamente (por ejemplo con `npx serve`).
   El front apunta por defecto a `http://localhost:3000/api/chat` (configurable con `CHAT_API_URL` en el `localStorage`).

## PWA
- Se registra `service-worker.js` correctamente (antes apuntaba a `sw.js`).
- Disponible botón “Instalar app”.
- Funciona offline (cache-first).

## Drag & drop
- Arrastra cualquier bloque (incluidos los de estudio). 
- **Reglas especiales** para profesores **Nuria** y **Juan Carlos**:
  - Solo se permiten **Martes/Jueves** a **18:00, 19:00, 20:00**.
  - **Sábado/Domingo** a **16:00, 17:00, 18:00**.
  - Si sueltas en otra franja, se **auto-ajusta** a la más cercana válida de ese día.

## Zoom
- Control en la barra del Horario (0.9× a 1.5×). Se guarda en `localStorage`.

## Recurrencias
- Selector por días + “todas las semanas”.
- Botón **Reaplicar recurrencias** sobrescribe (confirmación).

## Exportación
- CSV por semana.
- ICS con eventos (apoya tareas con due‑date).

---

© Academia Flow
