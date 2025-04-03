# Plantilla de Super App en React Native

Este proyecto proporciona una base para construir una Super App utilizando arquitectura de micro-frontends en React Native con [Re.Pack](https://re-pack.dev).

## ¿Qué es una Super App?

Una Super App es una aplicación móvil que combina múltiples mini-aplicaciones (micro-frontends) en una única plataforma cohesiva. Esta arquitectura permite:

- Desarrollo y despliegue independiente de características
- Carga bajo demanda de funcionalidades
- Tamaño de aplicación reducido para usuarios que solo necesitan características específicas
- Mejor separación de responsabilidades y organización del código

Aprende más sobre Super Apps en la [documentación de Re.Pack](https://re-pack.dev/docs/getting-started/super-app).

## Estructura del Repositorio

El repositorio sigue una arquitectura modular:

- `host` - El contenedor principal de la Super App que gestiona y coordina todas las mini-aplicaciones
- Mini-aplicaciones (micro-frontends):
  - `booking` - Plantilla de ejemplo de mini-aplicación
  - `shopping` - Plantilla de ejemplo de mini-aplicación
  - `dashboard` - Plantilla de ejemplo de mini-aplicación
  - `auth` - Plantilla de módulo de autenticación compartido

<img src="images/super-app-showcase-scheme.png" />

Cada mini-aplicación puede desarrollarse y desplegarse de forma independiente o como parte de la Super App. La aplicación host actúa como punto de entrada y proporciona navegación entre mini-aplicaciones.

Para información detallada sobre la configuración de la federación de módulos, consulta la [guía de Federación de Módulos de Re.Pack](https://re-pack.dev/docs/module-federation/module-federation).

## Requisitos de Desarrollo

Antes de comenzar, asegúrate de tener:

- Node.js versión 22 o superior
- [pnpm](https://pnpm.io/installation) como gestor de paquetes
- Entorno básico de desarrollo de React Native ([guía de configuración](https://reactnative.dev/docs/environment-setup))

## Ejecutar las Aplicaciones

1. Instalar todas las dependencias:

```bash
pnpm install
```

2. Instalar pods de iOS (requerido para desarrollo en iOS):

```bash
pnpm pods
```

3. Iniciar el servidor de desarrollo:

```bash
pnpm start
```

4. Ejecutar la aplicación en tu plataforma preferida:

```bash
# Para iOS
pnpm run:host:ios

# Para Android
pnpm run:host:android
```

## Desarrollar Nuevas Características

Al desarrollar nuevas características en mini-aplicaciones, hay algunas consideraciones importantes a tener en cuenta:

### Dependencias Nativas

Si agregas un nuevo paquete con dependencias nativas a una mini-aplicación, también debes agregarlo a la aplicación host. Esto es porque la aplicación host necesita ser consciente de todas las dependencias nativas para empaquetar y ejecutar la aplicación correctamente.

Además, necesitas agregar el paquete al archivo `dependencies.json` en la aplicación host. Este archivo sirve como registro central de todas las dependencias nativas utilizadas en la super app, asegurando versiones consistentes y previniendo conflictos entre diferentes mini-aplicaciones.

Por ejemplo, si agregas un nuevo paquete nativo a la mini-aplicación de reservas:

1. Agregar el paquete a las dependencias de la mini-aplicación de reservas
2. Agregar el mismo paquete a las dependencias de la aplicación host
3. Agregar una entrada a `dependencies.json`:

```json
{
  "name": "package-name",
  "version": "package-version"
}
```

Este enfoque ayuda a mantener la consistencia en toda la super app y previene posibles problemas en tiempo de ejecución que podrían surgir de dependencias nativas incompatibles.

### Mejores Prácticas

- Mantener las dependencias nativas al mínimo para reducir el tamaño del bundle
- Utilizar dependencias compartidas cuando sea posible para mantener la consistencia
- Probar los cambios exhaustivamente tanto en contexto independiente como en super app
- Seguir los patrones establecidos de federación de módulos para exponer nuevas características

## Control de Calidad

El proyecto incluye varias verificaciones de calidad para asegurar la calidad del código y su mantenibilidad:

### Ejecutar Tests

Ejecutar tests para todas las aplicaciones:

```bash
pnpm test
```

### Verificaciones de Calidad de Código

Ejecutar el linter para verificar el estilo de código y posibles problemas:

```bash
pnpm lint
```

Ejecutar la verificación de tipos para asegurar la seguridad de tipos:

```bash
pnpm typecheck
```

Estas verificaciones ayudan a mantener la calidad del código y detectar posibles problemas temprano en el proceso de desarrollo. Se recomienda ejecutar estas verificaciones antes de confirmar cambios y como parte de tu pipeline de CI/CD.
