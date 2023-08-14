import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'http://localhost:5000/graphql',
  documents: ['./src/app/**/*.{ts, tsx}', './src/lib/**/*.{ts, tsx}'],
  ignoreNoDocuments: true,
  hooks: {
    afterOneFileWrite: ['prettier --write'],
  },
  generates: {
    './__generated__/': {
      preset: 'client',
      presetConfig: {
        gqlTagName: 'gql',
      },
    },
  },
};

export default config;
