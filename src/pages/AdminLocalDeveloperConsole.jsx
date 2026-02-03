import React from 'react';
import LocalDeveloperConsole from './LocalDeveloperConsole';

/**
 * AdminLocalDeveloperConsole
 *
 * Simple wrapper around the existing `LocalDeveloperConsole`.
 * - No route is registered here.
 * - Not rendered inside `AdminDashboard` directly.
 *
 * You can import and mount this component manually from any custom
 * `App.jsx` or sandbox entrypoint where you want to run the console.
 */
const AdminLocalDeveloperConsole = () => {
  return <LocalDeveloperConsole />;
};

export default AdminLocalDeveloperConsole;

