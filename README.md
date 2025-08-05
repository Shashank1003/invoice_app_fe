# InvoiceApp Frontend

A mobile-first, modern invoice management application built with Next.js, Tailwind CSS, Typescript, TanStack React Query, Zod, Shadcn UI, and Context API. Connects seamlessly with a FastAPI backend.

---

## Tech Stack

- **Next.js (App Router)** – including parallel and intercepting routes
- **Tailwind CSS** – responsive, utility-first styling
- **TypeScript & JavaScript**
- **TanStack React Query** – API data management
- **Zod** – schema-based validation
- **Shadcn** – accessible UI components
- **Context API** – global state management
- **Backend:** FastAPI ([repo here](git@github.com:Shashank1003/invoice_app_be.git))

---

## Getting Started

### 1. Clone the repository

    ``` bash
    git clone git@github.com:Shashank1003/invoice_app_fe.git
    cd invoice_app_fe
    ```

### 2. Install dependencies

    ```bash
    npm install
    ```

### 3. Start the development server

    ```bash
    npm run dev
    ```

    Visit [http://localhost:3000](http://localhost:3000) to view the app.

---

## Linting and Formatting

    Check code style and formatting anytime with:

    ```bash
    npm run lint
    ```

---

## Folder Structure

invoice_app_fe/
├── app/ # Next.js app directory (routes, layouts)
├── components/ # UI – Shadcn-based, reusable
├── context/ # React Contexts for global state
├── hooks/ # Custom hooks including react-query
├── lib/ # Utilities, API clients
├── styles/ # Tailwind & global CSS files
├── types/ # TypeScript types/interfaces
├── validators/ # Zod validation schemas
├── public/ # Static assets
├── package.json
└── ...

---

## Project Highlights

- **Mobile-first** design with utility classes and flexible layouts.
- **Modern routing:** Uses Next.js app directory, parallel/intercepting routes for advanced flows.
- **Form validation:** Consistent, central Zod schemas for robust checks.
- **API management:** All server comms and caching handled by TanStack React Query.
- **Design system:** Clean, consistent UI with Shadcn components and Tailwind.
- **Global state:** Lightweight and reliable via React Context API.

---

## Backend

Connects to the backend [here](git@github.com:Shashank1003/invoice_app_be.git), built with FastAPI.

---

## Contributing

- Feature branches recommended.
- Confirm linting and formatting with `npm run lint` before submitting PRs.

---

## License

This project is licensed under the MIT License.  
You are free to use, modify, and distribute this software in your own projects.

---

## 👨‍💻 Author

Shashank Gupta – @Shashank1003 | <guptashashank8975@gmail.com>

---

> _A solution to the Invoice App challenge from [Frontend Mentor](https://www.frontendmentor.io)_
