Hello Team,

As we’re now moving into learning Next.js, I’ve prepared an assignment for you to practice and enhance your skills. The project focuses on building an E-Commerce Storefront using the Fake Store API. Below are the detailed requirements and features for the project:
Project Overview: E-Commerce Storefront
Objective:
To create an e-commerce web application using Next.js with features like product listing, pagination, cart functionality, and product details page.
API to Use:
•	Fake Store API
This API provides dummy data for e-commerce products, including titles, prices, descriptions, categories, and images. 
o	Endpoint for Products List: https://fakestoreapi.com/products 
o	Endpoint for Product Details: https://fakestoreapi.com/products/:id 
Features to Implement
1. Products Listing Page (SSR)
•	Route: /products?page=1
•	Use server-side rendering (SSR) via getServerSideProps to dynamically fetch and display products based on the current page (?page query parameter).
•	Display products in a grid with the following details:
o	Product image
o	Title
o	Price
o	An "Add to Cart" button
•	Pagination:
o	Implement "Next" and "Previous" buttons to navigate through pages of products.
o	Update the products displayed dynamically based on the page number.
2. Product Details Page (Dynamic Routing)
•	Route: /products/[id]
•	Use dynamic routing and server-side rendering to fetch the details of a specific product.
•	Display the following details on this page: 
o	Product image
o	Title
o	Description
o	Price
o	Category
o	An "Add to Cart" button
3. Add to Cart Functionality
•	Use Context API to manage the cart state globally.
•	The cart should store:
o	Product IDs
o	Quantities
o	Prices
•	Add to Cart Button:
o	Clicking this button should add the selected product to the cart.
o	Show a confirmation toast/notification when a product is added.
4. Cart Popup
•	Trigger:
o	Add a cart icon in the header. Clicking this icon should open a popup showing the current cart items.
•	Popup Details:
o	List of cart items (title, quantity, price).
o	Total cart value.
o	Options to proceed to the cart page.
5. Dedicated Cart Page
•	Route: /cart
•	Display all items in the cart with the following details: 
o	Product title, price, quantity, and total price.
o	Buttons to increase/decrease the quantity or remove the item from the cart.
•	Show the total amount at the bottom of the page.
Pages Directory should look like below

/pages  
  /products  
    index.js        // Product listing with pagination  
    [id].js         // Product details page  
  /cart.js           // Dedicated cart page  
  _app.js            // Global app wrapper  

Note: Use your logic to have multiple reusable components like
-	Navbar: Includes site logo, cart icons etc
-	ProductCard: A reusable component to display products information
-	CartPopup: Component to display cart items in popup
-	Pagination: A reusable pagination component
-	ProductDetails: product details page with all product information
-	Cart Page: A component to display all cart items on this separate page
