#### Strap i18n Addon: allow the usage of locale query parameter for all endpoints

By default, Strapi's **i18n plugin** allows us to query only `findMany` routes by `locale` and forces us to populate `localizations`.
This plugin solves that.

## ❗ Requirements

- At least Strapi v4.10.0
- i18n Plugin installed

## 🔧 Installation

You just need to install the package via npm, at the root of your strapi project. Perhaps also rebuild your Admin UI.

```bash
npm i @amicaldo/strapi-plugin-i18n-expanded-query
npm run build
```

After restarting your Strapi app, **Internationalization: Expanded Query** should be listed as one of your plugins.

## 👨‍💻 Manual Installation (not recommended)

Navigate into your Strapi's plugins folder and clone this repository.
Then navigate into this plugin's directory.

```bash
cd ./src/plugins
git clone https://github.com/amicaldo/strapi-plugin-i18n-expanded-query.git
cd ./strapi-plugin-i18n-expanded-query
```

Install the dependencies using npm and compile the server side part.

```bash
npm install
npm run build
```

From your project's root directory, enable the plugin inside `./config/plugins.js`.

```js
module.exports = {
  // ...
  "i18n-expanded-query": {
    enabled: true,
    resolve: "./src/plugins/strapi-plugin-i18n-expanded-query",
  },
  // ...
};
```

Lastly, recompile the admin panel of your Strapi project.

```bash
npm run build
```
