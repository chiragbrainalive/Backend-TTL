module.exports = {
  apps: [
    {
      name: 'nest-dev',
      script: 'src/main.ts',
      watch: true,
      ignore_watch: ['node_modules', 'logs'], // Exclude unnecessary folders
      interpreter: './node_modules/.bin/ts-node',
      interpreter_args: '-r tsconfig-paths/register',
    },
    {
      name: 'nest-app',
      script: 'dist/src/main.js',
      watch: true,
      ignore_watch: ['node_modules', 'logs'], // Exclude unnecessary folders
    },
  ],
};
