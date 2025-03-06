const { withModuleFederation } = require('@module-federation/nextjs-mf');

module.exports = {
  webpack: (config, options) => {
    const { isServer } = options;

    config.plugins.push(
      new withModuleFederation({
        name: 'nextjsHost',
        remotes: {
          angularMicrofrontend: `angularMicrofrontend@http://localhost:4200/remoteEntry.js`,
        },
        shared: {
          react: { singleton: true, eager: true },
          'react-dom': { singleton: true, eager: true },
        },
      })
    );

    return config;
  },
};