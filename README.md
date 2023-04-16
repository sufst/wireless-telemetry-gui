# Wireless Telemetry GUI

The Wireless Telemetry GUI used to graph and show telemetry data coming from the car in real-time.

This is through an interactive web-application using the following technologies:

- TypeScript
- React.js
- Redux
- Material-UI

## Building & Running

To get up-and-running with development follow the steps outlined below.

### 1. Prerequisites

The following tools need to be installed before you work on this project:

- `git`
- `node.js` version 16.

If you use macOS or Linux, `git` will probably already be installed on your machines. If you use Microsoft Windows, `git` can be installed from [here](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git).

Regardless of OS, you can download `node.js` from its website [here](https://nodejs.org/en/). **Make sure to download version 16!**

For the GUI to fully function, you need a running version of the following servers on your machine:

- [Back-end Server](https://github.com/sufst/back-end)
- [Intermediate Server](https://github.com/sufst/intermediate-server/)

You can find building & running instructions for both on their respective repositories linked above.

### 2. Cloning the Repo

Clone the repository on your local machine using the following command:

```
git clone https://github.com/sufst/wireless-telemetry-gui.git
```

### 3. Install Dependencies

Open a terminal window, navigate to the folder the repository was cloned and run the following command to install all dependencies:

```
npm install --legacy-peer-deps
```

_Note: Some dependency versions listed in the package.json file are outdated, thus it's important to specify the `--legacy-peer-deps` flag when using the command above._

### 4. Update `config.ts`

You now need to update the back-end API URL on `config.ts` under `scr/config.ts`. Open that file and update the `url` variable on line 30 with your own back-end API URL.

### 5. Starting the application

Once all dependencies are installed and all servers are running, you can start the web-app by running the following command from the root of the application:

```
npm start
```

This runs the app in the development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Known Issues:

1. Currently, the version of `material-ui` used in `v4` instead of the latest major release `v5`. This doesn't cause any known issues and is in the roadmap to be updated in the future. For now, development should docs the `v4` version of the `material-ui` documentation available [here](https://v4.mui.com/).

2. Currently, the version of `node.js` known to be able to build the project is `Node version 16`. If you happen to have a latest version, you'll need to use `v16` until this issue is fixed.

3. As mentioned above, the `npm install` command currently fails unless the `--legacy-peer-deps` flag is used with it.

## Create-React-App Docs

This project was created using `create-react-app`. Documentation for this can be found [here](https://facebook.github.io/create-react-app/docs).
