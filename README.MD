Inventory Management System React Native App
Bluemoon Solutions is a software company tasked with working on an inventory management system, this system allows the users to list, add, edit, and delete inventory items. This React Native app utilises the async storage to store, update, retrieve, and delete data.

Features
Authentication: Users must log in with an email and password to access the app. Auth session is persisted to avoid logging in again.
Inventory Listing: Displays the list of items, including name, price, and total stock. Allows users to add new items and log out.
Create Inventory: Allows users to create new items and add them to the inventory.
Edit Inventory: Allows users to edit existing items in the inventory.
Delete Inventory: Allows users to delete existing items from their inventory after confirming the action.
User-Specific Data: When a new user logs in, a collection of 5 items is created for them. User email saves the data even after logging out and logging back in. However, if a different email logs in after logging out, the async storage resets for the new user.
UI/UX: A dummy image of a shoe has been used to beautify the user interface.

Installation
Clone the repository.
Install dependencies by running npm install or yarn.
Start the app by running yarn start or expo start.
To run the app on a simulator type the command 'a' to open in android or scan qr code to open on physical device,

Usage
To log in, enter any email and password combination. Once logged in, you can access the inventory listing, create new items, edit existing items, and delete items.

Testing
To run the tests, run the command 'npm run test'. This will create snapshots of each screen, ensure the confirmation pop-up is shown when deleting an item, and test CRUD operations for the async storage.

Technologies Used
React Native
Typescript
Async Storage
React Navigation 6
React Context API