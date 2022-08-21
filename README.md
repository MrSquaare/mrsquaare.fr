# mrsquaare.fr

MrSquaare's personal website

## Table of Contents

- [About](#about)
  - [Context and motivations](#context-and-motivations)
- [Getting started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Using](#using)
- [Contributing](#contributing)
- [License](#license)

## About

This repository is a [monorepo](https://en.wikipedia.org/wiki/Monorepo), powered by [Turborepo](https://turborepo.org/).

It is composed of two main projects:

- the [Client](client), powered by [Next.js](https://nextjs.org/)
- the [Server](server), powered by [Fastify](https://www.fastify.io/)

The packages common to both projects can be found in [common](common)

### Context and motivations

My goal is to develop a powerful and secure website using modern technologies, while following good practices.

Therefore, if you notice any performance or security issues, or want to make a feedback about the code, please open an issue following the [guidelines](GUIDELINES.md#issue).

Thank you!

## Getting started

### Prerequisites

1. [Install Node.js](https://nodejs.org/en/download/)

### Installation

1. Clone the repository:

```shell script
git clone https://github.com/MrSquaare/mrsquaare.fr.git
```

2. Install dependencies:

```shell script
npm install
```

3. Build the project:

```shell script
npm run build
```

## Using

Start the client and the server:

```shell script
npm run start
```

## Contributing

Bug reports, feature requests, other issues and pull requests are welcome.
See [CONTRIBUTING.md](CONTRIBUTING.md) for more information.

## License

Distributed under the [GNU GPLv3](https://choosealicense.com/licenses/gpl-3.0/) License.
See [LICENSE](LICENSE) for more information.
