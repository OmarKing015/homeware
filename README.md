# Lingerie & Homewear E-commerce Revamp

This project is a premium, unique, conversion-focused e-commerce experience for a lingerie and homewear brand. It includes features like fit intelligence, discreet mode, and a 'Set Composer'.

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm

### Installation

1. Clone the repository.
2. Install the dependencies:
   ```bash
   npm install
   ```
3. Create a `.env.local` file by copying the example:
   ```bash
   cp .env.example .env.local
   ```
4. Fill in the required environment variables in `.env.local` for services like Sanity and Clerk.

### Running the Development Server

To run the development server:

```bash
npm run dev
```

Note: The default `dev` script uses Next.js with Turbopack (`--turbopack`). If you encounter issues, you can try running without it:
```bash
npx next dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Key Features Implemented

- **New Theming System**: A new premium color palette and font system has been implemented using Tailwind CSS v4.
- **Discreet Mode**: A global toggle in the header to mute labels and thumbnails for privacy.
- **Fit Intelligence**:
  - **Fit Twin Quiz**: A multi-step quiz to provide personalized size and style recommendations.
  - **Bra Passport**: A tool to convert bra sizes from other popular brands.
- **Set Composer**: A canvas to build a complete set (bra, brief, robe) and add it to the cart.
- **Enhanced Product Pages**:
  - Sticky Add-to-Cart bar on mobile.
  - Placeholders for Real-Body model toggles and sweat/season ratings.
- **Mini-Cart**: A side-drawer mini-cart with a free shipping progress bar.
- **Post-Purchase Comfort Check-in**: A survey to gather feedback on product fit after purchase.
