# Project Atelier (FEC)

# Overview
> This web application is a complete redesign of the Atelier retail web-portal. The goals are to create a modernized user interface for customers and increase sales through a customer-friendly design approach.

# Table of Contents
1. [Description](#description)
2. [Installation](#installation)
3. [Usage](#usage)
4. [Team](#usage)

# Description
> The redesigned Atelier user interface will allow customers to browse and search products, add desired products to their cart, and finally checkout the products in the cart. The interface consists of a ‘Product Details’ page, which contains three main features:
Overview
Ratings & reviews
Related items & comparison section.
Maintenance of the product catalog and inventory is not under the scope of the current application version. Product information is obtained through the [Atelier API](https://app-hrsei-api.herokuapp.com/api/fec2/:CAMPUS_CODE/)

# Installation
**Requirements**
* [Node 16.16.0](https://nodejs.org/en/)

**Dependencies**
* [React + ReactDOM](https://reactjs.org/)
* [MaterialUI](https://mui.com/)
* [Axios](https://axios-http.com/)
* [ExpressJS](https://expressjs.com/)
* [MongoDB](https://www.mongodb.com/)
* [Mongoose](https://mongoosejs.com/)

**Dev Dependencies**
* [Jest](https://jestjs.io/)
* [Webpack](https://webpack.js.org/)
* [Babel](https://babeljs.io/)
* [Dotenv](https://www.npmjs.com/package/dotenv)
* [ESLint](https://eslint.org/)

# Usage
## Production
1. Run `npm install` from the root directory to install dependencies
2. Copy `example.env`, rename copied file to `.env` and fill out accordingly
3. Run `npm build` from the root directory to generate `bundle.js`
4. Run `npm start` from the root directory to launch server
5. In browser, open localhost:`env.SV_PORT` (default: 3000) to view client

## Development
1. Run `npm install` from the root directory to install dependencies
2. Copy `example.env`, rename copied file to `.env` and fill out accordingly
3. Run `npm run dev` from the root directory
4. In browser, open localhost:`env.CL_PORT` (default: 3001) to view client

## Environment File (`.env`) Configuration
* `SV_PORT`: Server port (default: 3000)
* `DB_HOST`: MongoDB database host (default: “localhost”)
* `DB_PORT`: MongoDB database port (default: 4500)
* `DB_USER`: MongoDB username (default: “root”)
* `DB_PASS`: MongoDB password (default: “”)
* `DB_NAME`: MongoDB database name
* `CL_PORT`: Webpack client dev server port (default: 3001)

## Scripts
**Production**
* `npm start`: [node] Starts Express server on port `env.SV_PORT`
* `npm build`: [webpack] Generates bundle.js for production

**Development**
* `npm run client-dev`: [webpack] Serves client files to dev server on port `env.CL_PORT`
* `npm run server-dev`: [nodemon] Starts Express server on port `env.SV_PORT`
* `npm run dev`: Runs client-dev and server-dev scripts in parallel, for use when developing both client and server features

**Testing**
* `npm run test`: [jest] Runs test files

# Team
* [Ryan Nelson](https://github.com/rnels)
* [Yong Tang](https://github.com/yota88)
* [Daniel Shin](https://github.com/dshinny)
