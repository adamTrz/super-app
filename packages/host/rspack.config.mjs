import path from 'node:path';
import {fileURLToPath} from 'node:url';
import * as Repack from '@callstack/repack';
import rspack from '@rspack/core';
import {getSharedDependencies} from 'super-app-showcase-sdk';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Rspack configuration enhanced with Re.Pack defaults for React Native.
 *
 * Learn about Rspack configuration: https://rspack.dev/config/
 * Learn about Re.Pack configuration: https://re-pack.dev/docs/guides/configuration
 */

export default env => {
  const {mode, platform = process.env.PLATFORM} = env;

  return {
    mode,
    context: __dirname,
    entry: './index.js',
    experiments: {
      incremental: mode === 'development',
    },
    resolve: {
      ...Repack.getResolveOptions(),
    },
    output: {
      uniqueName: 'sas-host',
    },
    module: {
      rules: [
        ...Repack.getJsTransformRules(),
        ...Repack.getAssetTransformRules(),
      ],
    },
    plugins: [
      new Repack.RepackPlugin(),
      new Repack.plugins.ModuleFederationPluginV2({
        name: 'host',
        dts: false,
        remotes: {
          booking: `booking@https://t-dev-ios-test-booking-super-app-adamtrz-ze.zephyrcloud.app/mf-manifest.json`,
          shopping: `shopping@https://t-dev-ios-test-shopping-super-app-adamtrz-ze.zephyrcloud.app/mf-manifest.json`,
          dashboard: `dashboard@https://t-dev-ios-test-dashboard-super-app-adamtrz-ze.zephyrcloud.app/mf-manifest.json`,
          auth: `auth@https://t-dev-ios-test-auth-super-app-adamtrz-ze.zephyrcloud.app/mf-manifest.json`,
        },
        shared: getSharedDependencies({eager: true}),
      }),
      // silence missing @react-native-masked-view optionally required by @react-navigation/elements
      new rspack.IgnorePlugin({
        resourceRegExp: /^@react-native-masked-view/,
      }),
    ],
  };
};
