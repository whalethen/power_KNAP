# fam.ly

Social Video Streaming Application

## Power KNAP

  - [Kory Kilpatrick](https://github.com/kk1024)
  - [Phoebe Mei](https://github.com/sorbae)
  - [Nicholas Morrow](https://github.com/nmorrow11)
  - [Aric Alves](https://github.com/aricalves)

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    1. [Setting up database](#database)
1. [Roadmap](#roadmap)
1. [Contributing](#contributing)

## Usage

Duplicate the `default.env` to setup environmental variables and make sure it is added to gitignore!
> Notes on environmental variables:
- ```DATABASE_URL```: ```postgress://${USERNAME}:${PASSWORD}@localhost:${PORT}/${DATABASE_NAME}```
- ```LOCAL``` variable can be 0 (false for production development) or 1 (true for local development)
- Apply for a [Google oAuth key](https://console.developers.google.com) to receive a ```GOOGLECLIENTID``` and ```GOOGLECLIENTSECRET``` key
  - Upon arriving at the linked site, enable APIs and services and search for Google+ API
  - Create credentials and pass in ```http://localhost:${PORT}``` to Authorized JavaScript origins and ```http://localhost:${PORT}/auth/google/redirect``` to Authorized redirect URIs
- Create a random cookie key (really, what ever string you want) for ```COOKIEKEY```; this is for encryption

References:
- [websockets](https://socket.io/)
- [oAuth](http://www.passportjs.org/docs/)
- [ReactRouter](https://github.com/ReactTraining/react-router)
  - React-routing changes are not pushed to the master branch
  - Refer to the feat/reactRouter branch for previous work done with react router and **_ONLY_** react router (_**Other features in the feat/reactRouter branch are bugged!**_)
- [CSS Grids](https://gridbyexample.com/patterns/)
- [CSS Flex-boxes](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout/Using_CSS_flexible_boxes)

## Requirements

- Node 6.4.x
- npm 5.x.x
- Postgresql 9.1.x

## Development

 - babel-core ^6.26.0
 - babel-loader ^7.1.2
 - babel-preset-es2015 ^6.24.1
 - babel-preset-react ^6.24.1
 - chai ^4.1.2
 - eslint ^4.11.0
 - eslint-config-airbnb ^16.1.0
 - eslint-plugin-import ^2.8.0
 - eslint-plugin-jsx-a11y ^6.0.2
 - eslint-plugin-react ^7.4.0
 - mocha ^4.0.1
 - webpack ^3.8.1

### Installing Dependencies

From within the root directory:

```sh
npm install
```

### Database

Available GUI: 

- Postgres - Easily start your server with your default database.

- Postico - Allows users to view created databases and tables. Please create a postico username and password in order to run database locally (you will need both in your .env file - refer to the default.env file).

## Roadmap

View the project roadmap [here](https://docs.google.com/document/d/1WI0ECKA-4dYaD25FkTV6qtP-UhtHemi-1yFMJ2BsGXM/edit?usp=sharing)

Refer to our user story based current and desired features on Trello [here](https://trello.com/b/Hm6tsJMM/dj-bunny-hop)


## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.
