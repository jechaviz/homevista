# HomeVista

HomeVista is a comprehensive e-commerce platform for home decor and interior design services. It provides a seamless experience for users to browse, purchase products, and book professional services for their home improvement needs.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

## Features

HomeVista offers a wide range of features for both customers and service providers. For a detailed list of features, please refer to the [FEATURES.md](FEATURES.md) file.

Key highlights include:
- Product browsing and purchasing
- Service booking and quotation requests
- User authentication and profile management
- Admin and vendor dashboards
- Responsive design for mobile and desktop

## Getting Started

To get started with HomeVista, follow these steps:

1. Clone the repository:
   ```
   git clone https://github.com/your-username/homevista.git
   ```

2. Install dependencies:
   ```
   cd homevista
   npm install
   ```

3. Set up environment variables:
   Copy the `.env.example` file to `.env` and fill in the required values.

4. Start the development server:
   ```
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:5173` to view the application.

For more detailed instructions on using and contributing to the project, please refer to the [USER_MANUAL.md](USER_MANUAL.md) and [CONTRIBUTING.md](CONTRIBUTING.md) files.

## Project Structure

```mermaid
graph TD
  A[src] --> B[components]
  A --> C[contexts]
  A --> D[hooks]
  A --> E[pages]
  A --> F[utils]
  A --> G[data]
  A --> H[firebase]
  B --> I[UI Components]
  C --> J[Auth Context]
  C --> K[Demo Context]
  C --> L[Location Context]
  D --> M[Custom Hooks]
  E --> N[Page Components]
  F --> O[Utility Functions]
  G --> P[Demo Data]
  H --> Q[Firebase Config]
```

## Technologies Used

- React
- TypeScript
- Vite
- Tailwind CSS
- Firebase (Authentication and Firestore)
- React Router
- React Hook Form
- Lucide React (Icons)

## Contributing

We welcome contributions to HomeVista! Please read our [CONTRIBUTING.md](CONTRIBUTING.md) file for guidelines on how to contribute to the project.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.#   h o m e v i s t a  
 