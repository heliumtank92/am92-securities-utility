# @am92/securities-utility

[![npm version](https://img.shields.io/npm/v/@am92/securities-utility?style=for-the-badge)](https://www.npmjs.com/package/@am92/securities-utility)&nbsp;
[![ECMAScript Module](https://img.shields.io/badge/ECMAScript-Module%20Only-red?style=for-the-badge)](https://nodejs.org/api/esm.html)&nbsp;
[![License: MIT](https://img.shields.io/npm/l/@am92/securities-utility?color=yellow&style=for-the-badge)](https://opensource.org/licenses/MIT)&nbsp;
[![Vulnerabilities: Snyk](https://img.shields.io/snyk/vulnerabilities/npm/@am92/securities-utility?style=for-the-badge)](https://security.snyk.io/package/npm/@am92%2Fsecurities-utility)&nbsp;
[![Downloads](https://img.shields.io/npm/dy/@am92/securities-utility?style=for-the-badge)](https://npm-stat.com/charts.html?package=%40m92%2Fsecurities-utility)
[![Bundle Size](https://img.shields.io/bundlephobia/minzip/@am92/securities-utility?style=for-the-badge)](https://bundlephobia.com/package/@am92/securities-utility)

<br />

## Table of Content

- [Installation](#installation)
- [Contributors](#contributors)
- [Resources](#resources)
- [License](#license)

<br />

## Installation

```bash
$ npm install --save @am92/securities-utility
```

<br />

## Initialization

The initialization step downloads the security master (sec master) from the specified URL and applies optimizations to enhance the performance of subsequent functionalities. This step runs on the main thread, and the package internally manages the worker for parallel execution. You only need to include a dedicated TypeScript/JavaScript file in your index.html

<br />

### Instructions

1. #### Create a New File: <br>
   Create a new TypeScript/JavaScript file (e.g., `initializeSecMaster.ts`) containing the initialization code.

`initializeSecMaster.ts`

```typescript
import { initialize } from '@am92/securities-utility'

const SEC_MASTER_URL = process.env.SEC_MASTER_URL // URL for downloading the sec master (can be environment-specific)

// Initialize the sec master
try {
  initialize(SEC_MASTER_URL)
  console.log('Sec master initialization successful.')
} catch (error) {
  console.error('Sec master initialization failed:', error)
}
```

2. #### Include the File in `index.html`
   Add the following script tag to your index.html to include the file:

```typescript
<script type='module' src='./initializeSecMaster.ts'></script>
```

<br />
<br />

### Initialized Security Master With Search Module

`initializeSecMaster.ts`

1. #### Add { requireSearchModule: true } flag to initialize function

```typescript
import { initialize } from '@am92/securities-utility'

const SEC_MASTER_URL = process.env.SEC_MASTER_URL // URL for downloading the sec master (can be environment-specific)

// Initialize the sec master
try {
  initialize(SEC_MASTER_URL, {
    requireSearchModule: true
  })
  console.log('Sec master initialization successful.')
} catch (error) {
  console.error('Sec master initialization failed:', error)
}
```

<br />

### Using Search Function When Required

```typescript
import { searchManager } from '@am92/securities-utility'

const handleSearch = async (searchString: string) => {
  const searchResult = await searchManager.search(searchString)
}
```

### Notes:

- The package automatically handles the use of a web worker for parallel execution, ensuring the main thread remains unblocked.
- Ensure the `SEC_MASTER_URL` environment variable is correctly configured for your deployment environment.

This streamlined approach keeps your application setup simple while leveraging the package's internal optimizations.

<br />

## Contributors

<table>
  <tbody>
    <tr>
      <td align="center">
        <a href='https://github.com/ankitgandhi452'>
          <img src="https://avatars.githubusercontent.com/u/8692027?s=400&v=4" width="100px;" alt="Ankit Gandhi"/>
          <br />
          <sub><b>Ankit Gandhi</b></sub>
        </a>
      </td>
      <td align="center">
        <a href='https://github.com/agarwalmehul'>
          <img src="https://avatars.githubusercontent.com/u/8692023?s=400&v=4" width="100px;" alt="Mehul Agarwal"/>
          <br />
          <sub><b>Mehul Agarwal</b></sub>
        </a>
      </td>
      <td align="center">
        <a href='https://github.com/jsuyash'>
          <img src="https://avatars.githubusercontent.com/u/18147118?v=4" width="100px;" alt="Suyash Jadhav"/>
          <br />
          <sub><b>Suyash Jadhav</b></sub>
        </a>
      </td>
    </tr>
  </tbody>
</table>

<br />

## Resources

<br />

## License

- [MIT](https://opensource.org/licenses/MIT)

<br />
<br />
