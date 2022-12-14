# Starter Application for GPS Demo Team

๐ Boilerplate and Starter for Next.js, Tailwind CSS and TypeScript

Original boilerplate from [Next js templates demo](https://creativedesignsguru.com/demo/Nextjs-Boilerplate/).

## Features

Developer experience first:

- ๐ฆ [Next.js](https://nextjs.org) for Static Site Generator
- ๐ฅ Firebase support (Auth, Firestore, Analytics, Storage, and Functions)
- ๐จ Integrate with [Tailwind CSS](https://tailwindcss.com)
- ๐ Type checking [TypeScript](https://www.typescriptlang.org)
- ๐ Internationalization (i18n) support
- ๐ Theming Engine with CSS variables
- ๐งช Testing with Jest and React Testing Library (`npm run test`)
- โ๏ธ Linter with [ESLint](https://eslint.org) (default NextJS, NextJS Core Web Vitals and Airbnb configuration)
- ๐ก Absolute Imports
- ๐  Code Formatter with [Prettier](https://prettier.io)
- ๐ VSCode configuration: Debug, Settings, Tasks and extension for PostCSS, ESLint, Prettier, TypeScript
- ๐ค SEO metadata, JSON-LD and Open Graph tags with Next SEO
- โ๏ธ [Bundler Analyzer](https://www.npmjs.com/package/@next/bundle-analyzer)
- ๐ฏ Maximized Lighthouse score
- ๐ Firebase App Check (via reCAPTCHA v3)

Built-in feature from Next.js:

- โ Minify HTML & CSS
- ๐จ Live reload
- โ Cache busting

## Philosophy
- Minimal code
- SEO-friendly
- ๐ Production-ready
## Getting started

Run the following command on your local environment:

```bash
git clone --depth=1 git@github.com:GPS-Demos/frontend-starter.git my-project-name
cd my-project-name
rm -rf .git/
git init
npm install
```

Then, you can run locally in development mode with live reload:

```bash
npm run dev
```

Open http://localhost:3000 with your favorite browser to see your project.

### Local Firebase Emulator

- Install the [Firebase CLI](https://firebase.google.com/docs/cli#install-cli-mac-linux)
- You may need to authenticate `firebase login --reauth`
- TODO: Add firebase emulators command

### Project file structure

```bash
.
โโโ __mocks__                # Jest testing mocks
โโโ __tests__                # Testing directory
โโโ README.md                # README file
โโโ next.config.js           # Next JS configuration
โโโ public                   # Public folder
โ   โโโ assets
โ       โโโ images           # Image used by default template
โ   โโโ locales
โ       โโโ en
โ           โโโ common.json  # Default English phrases
โ           โโโ home.json    # Page specific translations
โ       โโโ es
โ           โโโ common.json  # Default Spanish phrases
โ           โโโ home.json    # Page specific translations
โโโ src
โ   โโโ layout               # Atomic layout components
โ   โโโ pages                # Next JS pages
โ   โโโ styles               # PostCSS style folder with Tailwind
โ   โโโ templates            # Default template
โ   โโโ themes               # Theming configuration
โ   โโโ utils                # Utility folder
โโโ tailwind.config.js       # Tailwind CSS configuration
โโโ tsconfig.json            # TypeScript configuration
โโโ .env.development         # Environment file for development
โโโ .env.production          # Environment file for production
```

## Customization

The `src/utils/AppConfig.ts` file will have most options for customizing your demo (Note: the link names reference i18n strings. See the i18n section for more details). Ensure you plug in your config values here. For secrets, add them to the `.env` file, which is not in SCM.

## Firebase
- Head to https://console.firebase.google.com and create a new project
- On the home page, select Web and create your Firebase web app
  - Give the app a name
  - Get your config variables (for your environment variables file mentioned later)
- If you need firestore, enable it
  - Choose `nam5 (us-central)` (multi-region US) as the region
  - Start in `production` mode to ensure your data is publicly read/writable
- Run `cp .env.local.example .env.local` and fill in your firebase variables
  - These can be found in the Firebase Console > Settings > Project Settings > General

### Firebase Authentication
- Navigate to Firebase Console > Authentication
- Click "Get Started"
- Enable the Google OAuth Provider
  - Provide a public facing name and a support email (gps-demo-factory@google.com)


The project also includes config files for Firebase (`storage.rules`, `firestore.rules`, `firestore.indexes.json`). These should be committed to SCM and any changes you make directly in the Firebase Console should be updated in these files.

### Firebase App Check
Secure your application from spammers or other malicious actors.

See the [documentation here](https://firebase.google.com/docs/app-check/web/recaptcha-provider?authuser=0&hl=en) to create a reCAPTCHA app. Add the PRIVATE key to Firebase Console > App Settings > App Check. Add the PUBLIC key to `.env.[development|production]` under `NEXT_PUBLIC_RECAPTCHA_PUBLIC_SITE_KEY`.

### Images

- `public/apple-touch-icon.png`, `public/favicon.ico`, `public/favicon-16x16.png` and `public/favicon-32x32.png`: your website favicon, you can generate from https://favicon.io/favicon-converter/
- `src/templates/Main.tsx`: default theme

### Internationalization (i18n)

i18n can be configured by editing the files in `public/locales/`. 

Sometimes you'll need to load more than one language file for a page. You may need the `common` file as well as a page-specific language file. Simply specify both files as dependencies in your `serverSideTranslations` function and then use use multiple aliased `useTranslation` invocations. See `src/pages/index.ts` for an example.

NextJS prefixes routes with the locale. For example, the About page in the default locale is at `localhost:3000/about` while for a given language it would be at `localhost:3000/[locale]/about` (example `localhost:3000/es/about` for Spanish).

### Theme

This starter has full support for a theming engine and comes with many theme options (see [DaisyUI Theming](https://daisyui.com/docs/themes/)). It's **important** to use [these names](https://daisyui.com/docs/colors/) in your code, otherwise styling will break. 

Do not use explicitly names colors, but instead use the base versions. For example don't use `text-gray-700`. Instead use `text-base-content`. This will ensure when switching to a new theme it is legible (e.g. `text-gray-700` would be unreadable in `dark` mode).

All themese are located in `src/styles/themes.js`. Comment out the themes you don't want to use. This is **important** as it will reduce your overall bundle size.

## Deploy to production

You can see the results locally in production mode with:

```bash
npm run build
npm run start
```

The generated HTML and CSS files are minified (built-in feature from Next js). It will also removed unused CSS from [Tailwind CSS](https://tailwindcss.com).

You can create an optimized production build with:

```bash
npm run build-prod
```

Now, your blog is ready to be deployed. All generated files are located at `out` folder, which you can deploy with any hosting service.

### Deploy to Google App Engine (GAE)
The `app.yaml` file configures GAE and should work as a good default. You want to avoid using env `PORT=8080` as this is reserved by an Nginx proxy layer in GAE. 

GAE will use your `.env.production` or `.env.local` files (that are uploaded) to set the app environment variables.

Configure `gcloud` to use your project: `gcloud config set project $PROJECT_ID`.

Then run `npm run deploy`.

You can check for issues in your app by running `gcloud app logs tail -s default`.

To get Firebase Authentication working, you must add GAE's URL to Firebase's Authorized Domains. Head to Firebase Console > Authentication > Sign-in method and add your GAE domain (should be the format `$PROJECT_ID.uc.r.appspot.com`)
### Deploy to Firebase Hosting

This approach leverages Cloud Functions for Server Side Rendering and Firebase Hosting for static content.
TODO: Currently blocked due Org Policy blocking `roles/cloudFunctions.invoker` to `allUsers`


## VSCode information (optional)

If you are VSCode users, you can have a better integration with VSCode by installing the suggested extension in `.vscode/extension.json`. The starter code comes up with Settings for a seamless integration with VSCode. The Debug configuration is also provided for frontend and backend debugging experience.

Pro tips: if you need a project wide type checking with TypeScript, you can run a build with <kbd>Cmd</kbd> + <kbd>Shift</kbd> + <kbd>B</kbd> on Mac.

## License

Licensed under the MIT License, Copyright ยฉ 2020

See [LICENSE](LICENSE) for more information.

