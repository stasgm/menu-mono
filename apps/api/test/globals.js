// For the debug mode timeout set to 5 minutes
if (process.env.VSCODE_INSPECTOR_OPTIONS) {
  jest.setTimeout(60 * 1000 * 5);
}
