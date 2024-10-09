# React and Typescript Project Starter Kit

**init**
```
npm init
git init
```
add .gitignore

```
.idea/
node_modules/
dist/
jest_html_reporters.html
```

## Webpack + React + Typescript
**Webpack**
```
npm i webpack webpack-cli -D
```
```
mkdir src
```
**React**
```
npm i react react-dom
```
**Typescript**
```
npm i typescript @types/react @types/react-dom @types/webpack ts-loader -D
```
[tsconfig.json](https://gist.github.com/KRostyslav/82a25c469ffa6652825d58537ac6bc22)

```
{
 "compilerOptions": {
    "outDir": "./dist",
    "target": "es5",
    "jsx": "react" ,
    "module": "NodeNext",
    "pretty": true ,
    "noImplicitAny": false ,
    "skipLibCheck": true ,
    "allowUnreachableCode": false,
    "traceResolution": false,
    "allowSyntheticDefaultImports": true
  },
  "exclude": [
    "node_modules"
  ]
}
```
[webpack.config.js](https://webpack.js.org/guides/typescript/)
```
const path = require('path');

module.exports = () => {
    return {
        mode: 'none',
        entry: {
            app: path.join(__dirname, 'src', 'index.tsx'),
        },
        target: 'web',
        resolve: {
            extensions: ['.ts', '.tsx', '.js'],
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: 'ts-loader',
                    exclude: '/node_modules/',
                },
            ],
        },
        output: {
            filename: '[name].js',
            path: path.resolve(__dirname, 'dist'),
        },
    };
};

```
**Code**

src/components/Button/Button.tsx
```
import React from 'react';

export enum ButtonColor {
  BLACK = 'black',
  RED = 'red',
  WHITE = 'white'
}

export enum ButtonSize {
  STANDARD = 'standard',
  LARGE = 'large'
}

type IButtonProps = {
  title: string;
  color?: ButtonColor;
  size?: ButtonSize;
};

const Button: React.FC<IButtonProps> = (props) => {
  const {
    title = '',
    color = ButtonColor.BLACK,
    size = ButtonSize.STANDARD,
  } = props;

  const onTitleClick = () => {
    console.log('button click');
  };

  return (
    <button
      type="button"
      onClick={onTitleClick}
      className={`${color} ${size}`}
    >
      {title}
    </button>
  );
}

export default Button;
```
src/App.tsx
```
import React from 'react';
import Button, { ButtonColor, ButtonSize } from './components/Button/Button';

function App()  {
  return (
    <div>
      <h1>TEST</h1>
      <Button title={'Button'} color={ButtonColor.RED} size={ButtonSize.LARGE} />
    </div>
  );
}

export default App;
```


src/index.ts
```
import React from 'react';
import { createRoot } from 'react-dom/client';

import App from './App';

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(<App />);
```


**Run**

package.json -> "scripts"
```
"build": "webpack --config webpack.config.js",
```
Run `npm run build` and see the bundle app.js appear in a directory called dist

**[html-webpack-plugin](https://webpack.js.org/plugins/html-webpack-plugin/)**
```
npm i html-webpack-plugin -D
```
create template src/index.html
```
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>React Typescript Webpack</title>
</head>
<body>
<!-- React app root element -->
<div id="root"></div>
</body>
</html>
```
edit the webpack.config.js
```
...
const HtmlWebpackPlugin = require('html-webpack-plugin');
...
plugins: [
            new HtmlWebpackPlugin({
                template: path.join(__dirname, 'src', 'index.html'),
                minify: {
                    collapseWhitespace: true,
                    removeComments: true,
                    removeRedundantAttributes: true,
                    useShortDoctype: true,
                },
            }),
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
                'process.env.DEBUG': JSON.stringify(process.env.DEBUG),
            }),
        ],
```
Run `npm run build` and see dist/index.html

**[DevServer](https://webpack.js.org/configuration/dev-server/)**
```
npm i webpack-dev-server -D
```
edit the webpack.config.js
```
devServer: {
      static: {
            directory: path.join(__dirname, 'dist'),
      },
      compress: true,
      port: 9000,
},
```
package.json -> "scripts"
```
"start": "webpack-dev-server",
```

run `npm run start`

## SCSS

[sass-loader](https://webpack.js.org/loaders/sass-loader/)
```
npm i sass sass-loader style-loader css-loader -D
npm i classnames -S
```
edit the webpack.config.js
```
 module: {
    rules: [
        {
            test: /\.scss$/i,
            use: [
                // Creates `style` nodes from JS strings
                'style-loader',
                // Translates CSS into CommonJS
                'css-loader',
                // Compiles Sass to CSS
                'sass-loader',
            ],
        },
    ],
},
```
Code
src/components/Button/Button.scss
```
.Button {
  border-radius: 5px;

  &.standard {
    height: 44px;
    min-width: 200px;
  }

  &.large {
    height: 54px;
    min-width: 200px;
  }

  &.black {
    background-color: black;
    color: white;
  }

  &.red {
    background-color: red;
    color: bisque;
  }

  &.white {
    background-color: white;
    color: black;
  }
}

```
src/components/Button/Button.tsx
```
...
import cn from 'classnames';
import './Button.scss';
...
className={cn('Button', color, size)}
```
restart devServer
