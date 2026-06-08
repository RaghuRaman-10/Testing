# Playwright OrangeHRM Tests

Automated test suite for OrangeHRM using Playwright.

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn

## Installation

```bash
npm install
```

## Configuration

Configure test settings in the appropriate config files before running tests.

## Running Tests

### Run all tests
```bash
npm test
```

### Run tests in headed mode
```bash
npm test -- --headed
```

### Run specific test file
```bash
npm test tests/filename.spec.js
```

### Run tests in debug mode
```bash
npm test -- --debug
```

## Project Structure

```
├── tests/              # Test files
├── pages/              # Page object models
├── utils/              # Utility functions
├── config/             # Configuration files
└── README.md           # This file
```

## Test Report

Test results are generated in the `test-results/` directory.

## Contributing

1. Create a feature branch
2. Make your changes
3. Submit a pull request

## License

MIT

## Author

Raghu
