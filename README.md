# react-style-boilerplate [![Build Status](https://travis-ci.org/Tinitto/react-style-boilerplate.svg?branch=master)](https://travis-ci.org/Tinitto/react-style-boilerplate)
This is a boiler plate for styling Reactjs apps for developers using Visual Studio Code.
The react app is created using the [create-react-app](https://github.com/facebookincubator/create-react-app) developer CLI tool.

# Features
1. Styling guide reinforcement by [ESlint](https://eslint.org/) based on [Airbnb Eslint style guide](https://github.com/airbnb/javascript)
2. Automattic formatting of JavaScript code by Prettier on saving a ```.js``` or ```.json``` file
3. Automattic JavaScript static type checking by [flow](https://flow.org/). Started by running the command ``` npm run flow start ```

# Instructions
**Note: This boilerplate is for developers using Visual Studio Code. It has only been tested on Linux**
1. Install [Visual Code (VS code)](https://code.visualstudio.com/download) if you haven't already
2. Open VS code and click on the extensions button in the activity bar. Install the following extensions.
    - ESLint
    - Prettier JavaScript Formatter
    - Flow Language Support
    - Babel ES6/ES7
3. Click on the view menu item in the menu bar of VS code and select 'Integrated Terminal' in dropdown to open it.
4. To start the flow static type checker server, run ``` npm run flow start ```.
    
    Some other terminal commands for flow are
    - ``` npm run flow stop ``` to stop the flow server
    - ``` npm run flow status ``` to check the flow status
    - ``` npm run flow coverage ``` to check the flow coverage percentage
5. To have a file checked by the flow server, add ``` // @flow``` at the top of it.



# Acknowledgements
The styling of this boilerplate is based on the [nice tutorial](https://github.com/Tinitto/react-style-boilerplate.git) by Sean Groff.

It is also based on the [style rules by Airbnb](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb#eslint-config-airbnb-1).
