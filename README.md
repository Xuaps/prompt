# Prompt Manager

A Progressive Web Application (PWA) that helps users store, organize, search, and use prompt templates across different AI platforms like Claude and ChatGPT.

## Features

- Store and organize prompt templates
- Search through prompts efficiently
- Use prompts across different AI platforms
- Progressive Web App capabilities
- Modern, responsive UI

## Project Structure

The project follows Domain-Driven Design (DDD) and Hexagonal Architecture principles:

```
src/
├── domain/         # Core business logic and entities
├── application/    # Use cases and application services
├── infrastructure/ # External dependencies and implementations
├── presentation/   # UI components and pages
└── utils/          # Utility functions and helpers
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm (v7 or higher)

### Installation

1. Clone the repository:
   ```bash
   git clone [repository-url]
   cd prompt-manager
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm run test` - Run tests

## Development

### Code Style

This project uses ESLint and Prettier for code formatting and linting. The configuration ensures consistent code style across the project.

### Architecture

The application follows a hexagonal architecture pattern, separating concerns into different layers:

- **Domain Layer**: Contains business logic and entities
- **Application Layer**: Implements use cases and orchestrates domain objects
- **Infrastructure Layer**: Handles external dependencies and implementations
- **Presentation Layer**: Manages UI components and user interactions

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
