import BinaryHoverText from "@/components/BinaryHoverText";

# Binary Hover Effect Usage

This component creates a Matrix-like effect where text transforms into binary digits (0s and 1s) when you hover over it.

## Basic Usage

```tsx
import BinaryHoverText from "@/components/BinaryHoverText";

<BinaryHoverText>Hover over me!</BinaryHoverText>;
```

## With Custom Speed

The `speed` prop controls how fast the binary digits change (in milliseconds):

```tsx
<BinaryHoverText speed={30}>Fast animation</BinaryHoverText>
<BinaryHoverText speed={100}>Slow animation</BinaryHoverText>
```

## With Custom Classes

You can pass className for additional styling:

```tsx
<BinaryHoverText className="text-2xl font-bold">Styled Text</BinaryHoverText>
```

## Examples in Your App

The binary hover effect has been added to multiple components:

### Navbar

- **Logo text** - "Open Prediction"
- **Category buttons** - "All Markets", "Sports", "Politics", "Crypto", etc.
- **Auth buttons** - "Access", "Initialize Session", "Sign In", "Create", "Disconnect"

### Home Page

- **Section heading** - "Active Markets"

### Market Cards

- **Trade button** - On each market card

### Betting Console (Market Detail Page)

- **Yes/No toggle buttons** - "Buy Yes X%", "Buy No X%"
- **Confirm button** - "Confirm Yes/No Transaction"

### Login Modal

- **Continue with Google** - Google authentication button
- **Launch Session** - Email authentication button
- **Connect Digital Wallet** - Wallet connection button

### Create Market Modal

- **Initialize Forecasting Node** - Submit button to create a new market

## How It Works

- When you hover over text, it immediately transforms into binary digits (0s and 1s)
- The binary digits change continuously while hovering (customizable speed via `speed` prop)
- Returns to original text smoothly when you move your mouse away
- Works with any text length and styling
- Maintains the parent element's text color automatically
- Perfect for creating a futuristic, tech-focused, Matrix-like aesthetic
