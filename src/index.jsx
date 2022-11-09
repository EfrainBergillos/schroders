import React from 'react';
import { createRoot } from 'react-dom/client';
import { SchrodersApp } from '@modules/components';
import { SchStoreProvider } from '@modules/store';

const root = createRoot(document.getElementById('schroders-app'));
root.render(
  <SchStoreProvider>
    <SchrodersApp></SchrodersApp>
  </SchStoreProvider>
);
