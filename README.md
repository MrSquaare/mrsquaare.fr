# mrsquaare.fr

MrSquaare's personal website (lite version)

## Table of Contents

- [About](#about)
- [Getting started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Using](#using)
- [Contributing](#contributing)
- [License](#license)

## About

This repository is a [monorepo](https://en.wikipedia.org/wiki/Monorepo), powered by [Turborepo](https://turborepo.org/).

It is only composed of one main project for the lite version:

- the [Web App](web-app), powered by [Next.js](https://nextjs.org/)

## Getting started

### Prerequisites

1. [Install Node.js](https://nodejs.org/en/download/)
2. [Install pnpm](https://pnpm.io/installation)

### Installation

1. Clone the repository:

```shell script
git clone https://github.com/MrSquaare/mrsquaare.fr.git
cd mrsquaare.fr
git checkout lite
```

2. Install dependencies:

```shell script
pnpm install
```

3. Build the project:

```shell script
pnpm build
```

## Using

Start the servers:

```shell script
pnpm start
```

## Contributing

Bug reports, feature requests, other issues and pull requests are welcome.
See [CONTRIBUTING.md](CONTRIBUTING.md) for more information.

## License

Distributed under the [GNU GPLv3](https://choosealicense.com/licenses/gpl-3.0/) License.
See [LICENSE](LICENSE) for more information.
