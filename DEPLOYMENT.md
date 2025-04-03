# Deploying Mini Apps to Zephyr Cloud

This guide provides step-by-step instructions for deploying mini apps to Zephyr cloud.

## Configuration Steps

### 1. Mini App Configuration

Each mini app needs to be configured with the Zephyr plugin. The configuration is done in the `rspack.config.mjs` file:

```javascript
import { withZephyr } from "zephyr-repack-plugin";

const USE_ZEPHYR = Boolean(process.env.ZC);

const mainConfig = (env) => {
  // ... other config
};

export default USE_ZEPHYR ? withZephyr()(mainConfig) : mainConfig;
```

### 2. Module Federation Setup

Each mini app needs to be configured with Module Federation to expose its components and share dependencies:

```javascript
new Repack.plugins.ModuleFederationPluginV2({
  name: "your-mini-app-name",
  filename: "your-mini-app.container.js.bundle",
  dts: false,
  exposes: {
    // Expose your components here
    "./App": "./src/navigation/MainNavigator",
  },
  remotes: {
    // Reference other mini apps
    auth: `auth@https://your-zephyr-domain.zephyrcloud.app/mf-manifest.json`,
  },
  shared: getSharedDependencies({ eager: false }),
});
```

### 3. Dependencies

Ensure your `package.json` includes the required dependencies:

```json
{
  "dependencies": {
    "@module-federation/enhanced": "0.7.1",
    "zephyr-repack-plugin": "0.0.38"
    // ... other dependencies
  }
}
```

## Deployment Process

### 1. Build and Deploy Mini Apps

For each mini app, run the following commands with Zephyr cloud enabled:

```bash
# Bundle and deploy for iOS
ZC=1 pnpm bundle:ios

# Bundle and deploy for Android
ZC=1 pnpm bundle:android
```

> **Note:** When running the bundle command for the first time, you will be prompted to log in to the Zephyr console. Follow the authentication process to complete the deployment.

> **Tip:** It's recommended to use tags while deploying your mini apps. This way, you can maintain multiple versions and easily switch between them without changing the remote URLs in the host app. For more information about versioning and tags, see the [Zephyr Cloud Versioning Guide](https://zephyrcloud.com/docs/versioning).

### 2. Host App Configuration

The host app needs to be configured to consume the deployed mini apps. You can obtain the correct remote URLs from the Zephyr Cloud Console after deploying your mini apps:

```javascript
new Repack.plugins.ModuleFederationPluginV2({
  name: "host",
  dts: false,
  remotes: {
    booking: `booking@https://your-booking-domain.zephyrcloud.app/mf-manifest.json`,
    shopping: `shopping@https://your-shopping-domain.zephyrcloud.app/mf-manifest.json`,
    dashboard: `dashboard@https://your-dashboard-domain.zephyrcloud.app/mf-manifest.json`,
    auth: `auth@https://your-auth-domain.zephyrcloud.app/mf-manifest.json`,
  },
  shared: getSharedDependencies({ eager: true }),
});
```

## Running the Application

### Development Mode

1. To test if mini apps have been corectly deployed start the host app in dev mode:

```bash
pnpm --filter host start
```

> **Warning:** Due to a React bug ([facebook/react#32030](https://github.com/facebook/react/issues/32030)), mixing development and production React runtimes can cause issues. When testing changes locally, make sure to bundle mini applications with `--dev true` flag:
>
> ```diff
> # in package.json of each mini app:
> -     "bundle:ios": "react-native bundle --platform ios --entry-file index.js --dev false",
> +     "bundle:ios": "react-native bundle --platform ios --entry-file index.js --dev true",
> -     "bundle:android": "react-native bundle --platform android --entry-file index.js --dev false",
> +     "bundle:android": "react-native bundle --platform android --entry-file index.js --dev true",
> ```
>
> This issue is being addressed in [facebook/react#32341](https://github.com/facebook/react/pull/32341) and should be fixed in a future React release.

Then bundle mini apps normally and deploy to Zephyr as described above.

---

---

# Deploying Host App

[TBD]

## Additional Resources

- [Zephyr Cloud Documentation](https://zephyrcloud.com/docs)
- [React Native Documentation](https://reactnative.dev/docs/getting-started)
- [Module Federation Documentation](https://module-federation.io/)
