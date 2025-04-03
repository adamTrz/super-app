# Despliegue de Mini Aplicaciones en Zephyr Cloud

Esta guía proporciona instrucciones paso a paso para desplegar mini aplicaciones en Zephyr cloud.

## Pasos de Configuración

### 1. Configuración de Mini Aplicación

Cada mini aplicación necesita estar configurada con el plugin de Zephyr. La configuración se realiza en el archivo `rspack.config.mjs`:

```javascript
import { withZephyr } from "zephyr-repack-plugin";

const USE_ZEPHYR = Boolean(process.env.ZC);

const mainConfig = (env) => {
  // ... otra configuración
};

export default USE_ZEPHYR ? withZephyr()(mainConfig) : mainConfig;
```

### 2. Configuración de Federación de Módulos

Cada mini aplicación necesita estar configurada con Module Federation para exponer sus componentes y compartir dependencias:

```javascript
new Repack.plugins.ModuleFederationPluginV2({
  name: "nombre-de-tu-mini-app",
  filename: "tu-mini-app.container.js.bundle",
  dts: false,
  exposes: {
    // Expón tus componentes aquí
    "./App": "./src/navigation/MainNavigator",
  },
  remotes: {
    // Referencia a otras mini aplicaciones
    auth: `auth@https://tu-dominio-zephyr.zephyrcloud.app/mf-manifest.json`,
  },
  shared: getSharedDependencies({ eager: false }),
});
```

### 3. Dependencias

Asegúrate de que tu `package.json` incluya las dependencias necesarias:

```json
{
  "dependencies": {
    "@module-federation/enhanced": "0.7.1",
    "zephyr-repack-plugin": "0.0.38"
    // ... otras dependencias
  }
}
```

## Proceso de Despliegue

### 1. Construir y Desplegar Mini Aplicaciones

Para cada mini aplicación, ejecuta los siguientes comandos con Zephyr cloud habilitado:

```bash
# Empaquetar y desplegar para iOS
ZC=1 pnpm bundle:ios

# Empaquetar y desplegar para Android
ZC=1 pnpm bundle:android
```

> **Nota:** Cuando ejecutes el comando bundle por primera vez, se te pedirá que inicies sesión en la consola de Zephyr. Sigue el proceso de autenticación para completar el despliegue.

> **Consejo:** Se recomienda usar etiquetas al desplegar tus mini aplicaciones. De esta manera, puedes mantener múltiples versiones y cambiar fácilmente entre ellas sin modificar las URLs remotas en la aplicación host. Para más información sobre versionado y etiquetas, consulta la [Guía de Versionado de Zephyr Cloud](https://zephyrcloud.com/docs/versioning).

### 2. Configuración de la Aplicación Host

La aplicación host necesita estar configurada para consumir las mini aplicaciones desplegadas. Puedes obtener las URLs remotas correctas desde la Consola de Zephyr Cloud después de desplegar tus mini aplicaciones:

```javascript
new Repack.plugins.ModuleFederationPluginV2({
  name: "host",
  dts: false,
  remotes: {
    booking: `booking@https://tu-dominio-booking.zephyrcloud.app/mf-manifest.json`,
    shopping: `shopping@https://tu-dominio-shopping.zephyrcloud.app/mf-manifest.json`,
    dashboard: `dashboard@https://tu-dominio-dashboard.zephyrcloud.app/mf-manifest.json`,
    auth: `auth@https://tu-dominio-auth.zephyrcloud.app/mf-manifest.json`,
  },
  shared: getSharedDependencies({ eager: true }),
});
```

## Ejecutar la Aplicación localmente con Mini Aplicaciones alojadas remotamente

> **Advertencia:** Debido a un error en React ([facebook/react#32030](https://github.com/facebook/react/issues/32030)), mezclar entornos de desarrollo y producción de React puede causar problemas. Al probar cambios localmente, asegúrate de empaquetar las mini aplicaciones con la bandera `--dev true`:
>
> ```diff
> # en package.json de cada mini aplicación:
> -     "bundle:ios": "react-native bundle --platform ios --entry-file index.js --dev false",
> +     "bundle:ios": "react-native bundle --platform ios --entry-file index.js --dev true",
> -     "bundle:android": "react-native bundle --platform android --entry-file index.js --dev false",
> +     "bundle:android": "react-native bundle --platform android --entry-file index.js --dev true",
> ```
>
> Este problema está siendo abordado en [facebook/react#32341](https://github.com/facebook/react/pull/32341) y debería ser corregido en una futura versión de React.

1. Aplica los cambios anteriores al archivo `package.json` a nivel raíz
2. Empaqueta las mini aplicaciones con el comando `ZC=1 pnpm bundle:<platform>`
3. Prueba si las mini aplicaciones se han desplegado correctamente - inicia la Aplicación Host en modo desarrollo:

---

---

# Desplegando la Aplicación Host

[Pendiente]

## Recursos Adicionales

- [Documentación de Zephyr Cloud](https://zephyrcloud.com/docs)
- [Documentación de React Native](https://reactnative.dev/docs/getting-started)
- [Documentación de Module Federation](https://module-federation.io/)
