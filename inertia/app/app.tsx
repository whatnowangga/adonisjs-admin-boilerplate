/// <reference path="../../adonisrc.ts" />
/// <reference path="../../config/inertia.ts" />

import '../css/app.css';
import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from '@adonisjs/inertia/helpers'
import DefaultLayout from '~/components/Layouts/DefaultLayout';

const appName = import.meta.env.VITE_APP_NAME || 'AdonisJS'

createInertiaApp({
  progress: { color: '#5468FF' },

  title: (title) => `${title} - ${appName}`,

  resolve: async (name) => {
    return resolvePageComponent(
      `../pages/${name}.tsx`,
      import.meta.glob('../pages/**/*.tsx'),
    )

    // const page: any = await resolvePageComponent(
    //   `../pages/${name}.tsx`,
    //   import.meta.glob('../pages/**/*.tsx')
    // )

    // page.default.layout = DefaultLayout
    // console.log("page", page)
    // return page
  },

  setup({ el, App, props }) {

    createRoot(el).render(<App {...props} />);

  },
});