requirejs.config({
  baseUrl: 'js',
  paths: {
    react: 'https://unpkg.com/react@15.6.2/dist/react',
    'react-dom': 'https://unpkg.com/react-dom@15.6.2/dist/react-dom',
  },
});

requirejs(['./main']);
