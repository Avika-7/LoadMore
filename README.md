# Load More Products

A simple and responsive React project that demonstrates how to fetch products from an API and progressively load more products using a **Load More** button.


https://github.com/user-attachments/assets/0d321ed0-bcdb-4737-a6f2-d2a68ec7312f


The project uses the [DummyJSON API](https://dummyjson.com/) to fetch product data.

## Features

- Fetches products from an external REST API
- Displays **20 products initially**
- Loads **20 additional products** on each button click
- Uses API pagination with `limit` and `skip`
- Displays product images, titles, prices, and ratings
- Shows loading state while fetching products
- Handles API errors
- Automatically detects when all products have been loaded
- Responsive product grid
- Styled with Tailwind CSS

## Tech Stack

- **React**
- **JavaScript**
- **Tailwind CSS**
- **DummyJSON API**


The application uses:

- `limit=20` → fetch 20 products at a time
- `skip` → determine where the next batch starts
