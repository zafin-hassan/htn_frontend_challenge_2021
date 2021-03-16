# Hack the North Front End Challenge
Try it here: [https://htn-frontend-challenge-2021.vercel.app/](https://htn-frontend-challenge-2021.vercel.app/)  
Video WalkThrough: [https://www.loom.com/share/091406fa2eb04757a2f48529351b8dcf](https://www.loom.com/share/091406fa2eb04757a2f48529351b8dcf)
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

--- 
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

### Design Decisions
- I took inspiration for the color profile for the event from [my.hackthenorth.com](https://my.hackthenorth.com/schedule). 
- I was considering adding the speakers to the modal but then I realised some events did not have images for speakers which would make the design inconsistent. 
- Kind of proud of the state management for the project. Using `useReducer` + `useContext` made state handling very simple and intuitive. 


### Improvements
- Using SCSS or some other css preprocessor will allow us to use variables and some other tweeks which will improve the development experience.  
- Developing custom styled components or some other interanal library instead of using ChakraUI. This would give the page a more unique look
- It would be useful to develop a feature which will allow users to toggle between calendar, list, and grid view. 
- Exporting event to google/apple calendar
- Storing login state in localStorage so that it is persistent after a user refreshes. I wanted to do it but I had already spent a lot of time making it look nice and had a midterm the next day so decided against it 
- Adding animation to the cards when the user hovers over the card, since it isn't intuitive right now that the cards are clickable
- Allowing users to favourite/star events and show all the starred events in a filter
- Having a modal pop up for the login instead of having the input fields in the page itself
