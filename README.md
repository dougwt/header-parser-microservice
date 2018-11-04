# header-parser-microservice

This microservice API accepts requests to /whoami and responds with an object containing the following information it found in the request headers:

- the client’s IP address
- the client’s preferred language
- the software being used by the client

## Getting Started

### Prerequisites

If you would like to run a local instance of this app in developer mode, the easiest method is using [npm](https://docs.npmjs.com/getting-started/installing-node), the package manager included with Node.js.

1.  Install [Node.js](https://nodejs.org)

2.  Install the required JavaScript dependencies using npm

`npm install`

### Running the app

To quickly start up an instance of the microservice:

`npm start`

### Running the tests

To run the included tests:

`npm test`

## License

header-parser-microservice is free software; you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

This software is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with this code. If not, see http://www.gnu.org/licenses/.
