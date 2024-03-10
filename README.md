# Address Updater Assessment Project by LenDen

## Overview

A graphical user interface application called Address Updater was created with the goal of effectively managing addresses. It provides functions for updating, deleting, and adding address data. This review assesses the user interface, error management functionality, and other factors of the project.

## Functionality of project

### Add

- **Completeness of Information:** Users can add new addresses with all necessary details, including street address, city, state, and zip code.
- **Input Validation:** The system validates user inputs for completeness and format. It  validates `Length of street`, `length of city`, and `ZipCode` formats for `India` through `Regex`.
  !<img width="956" alt="image" src="https://github.com/Shubhampatel-22/Address-Dashboard/assets/96970274/292cab82-37f4-4695-adba-c821f0d81a50">


### Edit/Update

- **Editing:** Users can edit existing addresses and save changes effectively in the Database.
- **Real-time Updates:** Users can update existing addresses, and changes are reflected immediately.
- **Editable Fields:** All form fields are editable.
- **Data Validation:** The system prevents invalid data during editing.
  !<img width="545" alt="image" src="https://github.com/Shubhampatel-22/Address-Dashboard/assets/96970274/bcb7a0cd-d8fe-47a8-98ea-85a7ebf1303a">


### Delete

- **Deletion Capability:** Users can delete unwanted addresses.
- **Confirmation Step:** There is a confirmation step before permanent deletion, which enhances data safety.
  !<img width="569" alt="image" src="https://github.com/Shubhampatel-22/Address-Dashboard/assets/96970274/b8d2105f-cb1d-4e3e-be13-34abb42f2ea2">



## Setup Instructions

To set up the Address Updater project locally on your machine, follow these steps:

1. **Clone the Repository**

   - Open your terminal.
   - Navigate to the directory where you want to clone the project.
   - Run https://github.com/Shubhampatel-22/Address-Dashboard.git.
   - Navigate into the cloned directory.

2. **To Set Up Backend**

   - Ensure MongoDB is running on your machine. If not, download and install MongoDB.
   - Navigate to the backend directory by: `cd server`.
   - Install dependencies: `npm install`.
   - To start the backend server: `npm start`.

3. **To Set Up Frontend**

   - Open a new terminal tab or window.
   - Navigate to the frontend directory from the project root: `cd client`.
   - Install dependencies: `npm install`.
   - Start the frontend application: `npm start`.

4. **Set Environment**:

   - create a .env file in your project
   - create variable MONGODB_URI = provide your MongoDB-URI
   - create variable PORT = 8000 

## Conclusion

The Address Updater project demonstrates solid capabilities in managing address information with an intuitive UI and effective error handling. 
