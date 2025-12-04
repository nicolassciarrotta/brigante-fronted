# Configuración de Google Maps

## Opción 1: Usar sin API Key (Implementado actualmente - GRATIS)

El mapa funciona **sin necesidad de API Key** usando Google Maps Embed básico. Esta es la configuración actual y no requiere ninguna configuración adicional.

**Ventajas:**
- ✅ Completamente gratis
- ✅ No requiere cuenta de Google Cloud
- ✅ No hay límites de uso
- ✅ Funciona inmediatamente

**Limitaciones:**
- ⚠️ Menos opciones de personalización
- ⚠️ Puede tener restricciones en el futuro

---

## Opción 2: Usar con Google Maps API Key (Recomendado para producción)

Si necesitas más control y quieres asegurar que el mapa siempre funcione, puedes obtener una API Key gratuita.

### Pasos para obtener la API Key:

1. **Ir a Google Cloud Console**
   - Visita: https://console.cloud.google.com/

2. **Crear un proyecto nuevo**
   - Click en "Select a project" → "New Project"
   - Nombre: "Estudio Brigante" (o el que prefieras)
   - Click en "Create"

3. **Habilitar la API de Maps**
   - En el menú, ve a "APIs & Services" → "Library"
   - Busca "Maps Embed API"
   - Click en "Enable"

4. **Crear una API Key**
   - Ve a "APIs & Services" → "Credentials"
   - Click en "Create Credentials" → "API Key"
   - Copia la API Key generada

5. **Restringir la API Key (Seguridad)**
   - Click en la API Key recién creada
   - En "Application restrictions":
     - Selecciona "HTTP referrers"
     - Agrega: `localhost:8080/*`, `tu-dominio.com/*`
   - En "API restrictions":
     - Selecciona "Restrict key"
     - Marca solo "Maps Embed API"
   - Click en "Save"

6. **Configurar en el proyecto**
   - Abre el archivo `.env`
   - Agrega la línea:
     ```
     VUE_APP_GOOGLE_MAPS_API_KEY='tu-api-key-aqui'
     ```
   - Reinicia el servidor de desarrollo: `yarn serve`

7. **Actualizar el código** (Ya preparado en PropertyDetail.vue)
   - El código ya está configurado para usar la API Key automáticamente si existe
   - Solo descomenta las líneas en el computed `mapEmbedUrl`

### Límites del plan gratuito:

- **$200 USD de crédito gratis cada mes**
- Equivale a aproximadamente:
  - 28,000 cargas de mapa por mes
  - O ~900 cargas por día
- Más que suficiente para la mayoría de proyectos

### Código a descomentar en PropertyDetail.vue:

```javascript
mapEmbedUrl() {
  if (!this.property.address || !this.property.city) return null;
  
  // Opción 1: Con Google Maps API Key (más preciso) - DESCOMENTAR ESTO
  const apiKey = process.env.VUE_APP_GOOGLE_MAPS_API_KEY;
  if (apiKey) {
    const query = encodeURIComponent(`${this.property.address}, ${this.property.city}, ${this.property.state}, Argentina`);
    return `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${query}`;
  }
  
  // Opción 2: Sin API Key (fallback)
  const query = encodeURIComponent(`${this.property.address}, ${this.property.city}, ${this.property.state}, Argentina`);
  return `https://maps.google.com/maps?q=${query}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
}
```

---

## Opción 3: Alternativa 100% Gratuita - OpenStreetMap + Leaflet

Si prefieres no usar Google, puedes usar Leaflet con OpenStreetMap (sin límites):

### Instalación:

```bash
yarn add leaflet vue2-leaflet
```

### Ventajas:
- ✅ 100% gratis, sin límites
- ✅ Open source
- ✅ No requiere API Key
- ✅ Muy ligero y rápido

### Desventajas:
- ⚠️ Requiere instalación de paquetes
- ⚠️ Geocoding (convertir dirección a coordenadas) requiere servicio adicional

---

## ¿Qué opción elegir?

| Característica | Sin API Key | Con Google API Key | Leaflet |
|----------------|-------------|-------------------|---------|
| Costo | Gratis | $200 USD/mes gratis | Gratis ilimitado |
| Setup | ✅ Inmediato | ⚠️ 10 minutos | ⚠️ 15 minutos |
| Geocoding | ✅ Incluido | ✅ Incluido | ❌ Requiere servicio adicional |
| Personalización | ⚠️ Limitada | ✅ Completa | ✅ Completa |
| Confiabilidad | ✅ Alta | ✅ Muy Alta | ✅ Alta |

**Recomendación:** 
- **Para desarrollo/testing:** Usar sin API Key (actual) ✅
- **Para producción pequeña:** Usar sin API Key (actual) ✅
- **Para producción profesional:** Obtener API Key de Google (15 minutos de setup)
- **Si quieres total independencia:** Usar Leaflet

---

## Estado Actual del Proyecto

✅ **Implementación actual:** Sin API Key (funciona inmediatamente)

El mapa ya está funcionando y mostrará la ubicación de cada propiedad basándose en:
- `property.address`
- `property.city`
- `property.state`

**No requiere ninguna configuración adicional para funcionar.**
