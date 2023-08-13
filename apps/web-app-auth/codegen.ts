import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'http://localhost:5000/graphql',
  documents: ['./src/app/**/*.{ts, tsx}', './src/lib/**/*.{ts, tsx}'],
  ignoreNoDocuments: true,
  generates: {
    './app/lib/gql/': {
      preset: 'client',
      plugins: [],
    },
  },
};

export default config;
