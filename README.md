# groupomania

node version 18.15.0


This problem still exist in WebStorm 2022.3.1, I was trying to Debug my Vue app. So I did two changes after running app using npm:

Go to the WebStorm preference > Tools > Web Browsers and Preview >
click on '+' to Add a new Chrome profile > Give Name ChromeVueDev >
Click Edit and input Command Line Options
--remote-allow-origins=* and Enable checkbox Use custom user data directory > Apply changes Step1

Next you have to create a new Run/Debug Configurations > Click on '+' to Add > Select JavaScript Debug > Give name and URL where your Vue app is running > Select newly created browser profile (i.e ChromeVueDev) from the Browser dropdown. Step2

After that you will be able to run your configuration in debug mode. Once you run, it will open a new instance of Chrome where your application will be rendered

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```
