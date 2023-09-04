# LA Vibes - Free Summer Concerts App

## Demo

Demo @ http://lavibes.surge.sh

**username:** `demotester`
**password:** `demopassword`

*Note:* There may be a delay when logging in as the database is initializing.

## Project API
The API utilized in the app is sourced from Los Angeles County Arts and provided in CSV format. To make it compatible with the app's front-end, the data was converted to JSON. Since the original data cannot be fetched directly from the LA County website, the JSON file was placed in the back-end and can now be accessed by the front-end for displaying data. The API is solely used for data display purposes.

~~https://data.lacounty.gov/datasets/lacounty::arts-free-concerts-in-la-county-public-sites/about~~

**Note:** API has been moved, but the data does not include 2023 dates despite having an update.

https://data.lacounty.gov/datasets/lacounty::arts-and-culture-free-concerts-history/about

## Description
LA Vibes is a comprehensive full-stack app that allows users to easily access information on all free summer concerts happening in Los Angeles County, CA. With its user-friendly interface, the app provides a complete listing of events, including detailed information on each concert.

## User Flow
Upon launching the app, users are presented with a main page that displays information about the app's features and functionalities. The page includes buttons that allow users to navigate to different sections of the app. While anyone can view the events, registering for a user account is required to save events.

Once registered, users are directed to a user-friendly events listings page where they can browse events categorized by summer months (June, July, August). By clicking the left or right arrow, they can easily navigate between months.

Clicking on an event card brings users to the event's details page, where they have the option to save the event to their personal list of saved events. All saved events can be viewed and edited from the user's saved events page. The event's details page also has a link, for the address, that will open up the location in Google Maps.

In addition, users can update their user information as needed in their settings page.

For added convenience, the app offers a dark mode feature for those who prefer a darker interface and the app is responsive to suit any device.

Overall, the app provides a seamless and intuitive experience for users to discover and save events according to their interests.

## Technology Stack
The following were used to build LA Vibes:

- React.js
- JavaScript
- Node.js
- Express.js
- PostgreSQL
- ChakraUI
- Embla Carousel
- JWT
- Axios
- Heroku
