# React Native Super App Template

This project provides a foundation for building a Super App using micro-frontend architecture in React Native with [Re.Pack](https://re-pack.dev).

## What is a Super App?

A Super App is a mobile application that combines multiple mini-apps (micro-frontends) into a single cohesive platform. This architecture allows for:

- Independent development and deployment of features
- On-demand loading of functionality
- Reduced app size for users who only need specific features
- Better separation of concerns and codebase organization

Learn more about Super Apps in the [Re.Pack documentation](https://re-pack.dev/docs/getting-started/super-app).

## Repository Structure

The repository follows a modular architecture:

- `host` - The main Super App container that manages and coordinates all mini-apps
- Mini-apps (micro-frontends):
  - `booking` - Example mini-app template
  - `shopping` - Example mini-app template
  - `dashboard` - Example mini-app template
  - `auth` - Shared authentication module template

<img src="images/super-app-showcase-scheme.png" />

Each mini-app can be developed and deployed independently or as part of the Super App. The host app acts as the entry point and provides navigation between mini-apps.

For detailed information about setting up module federation, see the [Re.Pack Module Federation guide](https://re-pack.dev/docs/module-federation/module-federation).

## Development Requirements

Before getting started, ensure you have:

- Node.js version 22 or higher
- [pnpm](https://pnpm.io/installation) package manager
- Basic React Native development environment ([setup guide](https://reactnative.dev/docs/environment-setup))

## Running the Applications

1. Install all dependencies:

```bash
pnpm install
```

2. Install iOS pods (required for iOS development):

```bash
pnpm pods
```

3. Start the development server:

```bash
pnpm start
```

4. Run the application on your preferred platform:

```bash
# For iOS
pnpm run:host:ios

# For Android
pnpm run:host:android
```

## Developing New Features

When developing new features in mini-apps, there are some important considerations to keep in mind:

### Native Dependencies

If you add a new package with native dependencies to a mini-app, you must also add it to the host app. This is because the host app needs to be aware of all native dependencies to properly bundle and run the application.

Additionally, you need to add the package to the `dependencies.json` file in the host app. This file serves as a central registry of all native dependencies used across the super app, ensuring consistent versions and preventing conflicts between different mini-apps.

For example, if you add a new native package to the booking mini-app:

1. Add the package to the booking mini-app's dependencies
2. Add the same package to the host app's dependencies
3. Add an entry to `dependencies.json`:

```json
{
  "name": "package-name",
  "version": "package-version"
}
```

This approach helps maintain consistency across the super app and prevents potential runtime issues that could arise from mismatched native dependencies.

### Best Practices

- Keep native dependencies at a minimum to reduce bundle size
- Use shared dependencies when possible to maintain consistency
- Test changes thoroughly in both standalone and super app contexts
- Follow the established module federation patterns for exposing new features

## Quality Assurance

The project includes several quality checks to ensure code quality and maintainability:

### Running Tests

Run tests for all apps:

```bash
pnpm test
```

### Code Quality Checks

Run the linter to check for code style and potential issues:

```bash
pnpm lint
```

Run type checking to ensure type safety:

```bash
pnpm typecheck
```

These checks help maintain code quality and catch potential issues early in the development process. It's recommended to run these checks before committing changes and as part of your CI/CD pipeline.

## Deployment

For instructions on how to deploy mini apps and the host app to Zephyr Cloud, see the [Deployment Guide](/DEPLOYMENT.md).
