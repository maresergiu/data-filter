# data-filter
design: as a best practice it's recommended to have design. I have made a wireframe in photoshop. Please check the design folder.

test: the app has unit test and integration test

technology : vue.js + vuex + vue router

app name: Smart Search

app functionality:
  - see a paginated list of people.
  - do a full text search to dynamically filter the results.
  - select an item and see the details in the same page.
  - be able to search by a specific field.

App's components:

- input component
- the slider component
- the checkbox group
- the radiobox group
- pagination component
- the list component
- the list element detailer component

App's pages:
 - home
 - 404


Search by:
1. name
2. filters:
   2.1 age
   2.2 eyeColor
   2.3 gender
   2.4 prefered animals
   2.5 prefered fruit


Obj structure
[
  {
    "_id": "5d5d7ad6b0518f619b88c330",
    "age": 34,
    "eyeColor": "brown",
    "name": "Berry Fletcher",
    "gender": "male",
    "location": {
      "latitude": -86.393021,
      "longitude": -140.02685
    },
    "preferences": {
      "pet": "dog",
      "fruit": "banana"
    }
  }
]

The application has the following flow:
- a form that is made out of two fieldsets.
  The first one has an input type text and a search CTA.
  The second fieldset holds the filter. The filter offers the possibility the filter the data by  age, eyeColor ,gender ,prefered animals
  and prefered fruit.
  The form triggers a validation when the search CTA is clicked. The validation is triggered only on the first fieldset.
  The emitted data from both fieldset are stored when the user interacts with the inputs and are used to filter the data.

- a list of users that behaves like an accordion. When a list element is selected the data related that user is shown in a slide animation.
  The list of users is going to be reactive to the filters.

- a pagination that is showing the current page. The pagination is responsible of showing and changing the page. When the page is changed
  the list data is changed as well. The pagination is going to be reactive based on the user array.
  If page number 1 is active the first page cta is disabled.
  If the last page is active the last  page cta is disabled.

JSON data: https://updates.suade.org/files/people.json

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your unit tests
```
npm run test:unit
```