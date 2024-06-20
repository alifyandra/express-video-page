# AngularLoginVideo Backend

## Installation

Be sure to have `yarn` installed on your machine and run `yarn install` to install all the node dependencies for this project.

The database for this application is containerized through docker. To get the database ready, run `docker compose up`.

## Firebase Storage

This uses Firebase storage to store file uploads. To allow this application to work, create your own Firebase project and supply your own Firebase project credentials for this application.

## .env file

To make sure the app runs properly, be sure to have a `.env` file on the top level of this repo with these variables.

```
API_KEY=
AUTH_DOMAIN=
PROJECT_ID=
STORAGE_BUCKET=
MESSAGING_SENDER_ID=588345030286
APP_ID=
MEASUREMENT_ID=
JWT_KEY=
```

## Build

To build the application run `yarn run build`.

## Running

To run the application, make sure you have previously ran `docker compose up` to make sure the database is running, then, run `yarn run start`.

## Further enquiries

For further enquiries, feel free to hit me up through my socials.
[email](alifyandra@gmail.com)
[linkedin](linkedin.com/in/alifyandra)
