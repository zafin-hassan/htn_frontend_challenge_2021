# Hack the North Front End Challenge

## Installation
To get running with the repository, run
```bash
npm install
```

And then run

```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Features

- Ability to filter events by type
- Displaying events based on authentication status
- Modal Component for each event
- Color Coded events
- Links for public and private events where available

## Design Decisions

### Folder Structure
The project has the following folder structure:
```
└───components
    └───Auth
    └───EventComponent
    └───EventContainer
    └───EventModal
└───context
     └───EventContext
└───pages
    └───api
    └───_app.js
    └───index.js
└───reducers
└───styles
    └───CircleIcon
    └───global.css
└───utils
```

### Tools Used
- NextJS
  - It is a great choice for server side rendering. NextJS also has a lot of really nice features built in such as routing and image caching!
- Javascript
- ChakraUI
  - I really like the aesthetic of the components provided by ChakraUI and they have an easy to understand API.
- ChakraUI Icons
  - They pair up great with ChakraUI
- Axios 
  - Used this for data fetching from the hackthenorth API provided.

