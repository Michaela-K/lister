<a id="readme-top"></a>
<h1 align="center"> Lister </h1>
Lister was created to keep track of Todos in various pre set categories in the Calendar (Today, Next 7 Days and All Days)
<br/>
Users can log in and add their own Categories called Projects and add Todo's under. 
<br />

<h3 align="center">
  <a href=""> *DEMO (WIP)*</a> | <a href="https://github.com/Michaela-K/to_do/issues">* Report a Bug *</a>
</h3>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#features">Features</a></li>
  </ol>
</details>


<!-- ABOUT THE PROJECT -->
## About the Project <a id="about"></a>

![BookMark Demo](public/BookMark-Demo.gif)

### Built With 

- Firebase
- React
- JavaScript
- CSS

<p align="right"><a href="#readme-top">back to top</a></p>


<!-- GETTING STARTED -->
## Getting Started <a id="getting-started"></a>

### Installation <a id="installation"></a>

1. Clone the repo
   ```sh
   git clone git@github.com:Michaela-K/to_do.git
   ```
2. Install NPM packages in the root directory
   ```sh
   cd to_do
   npm install
   ```
3. Create a Firebase Project
    
    - Go to your <a href="https://console.firebase.google.com">Firebase Console</a>
    - Sign In with your Google account
    - Click on 'Add Project' and follow the instructions to create a new Firebase project
    
4. Configure Firebase
    - In the Firebase Console, select your project
    - Navigate to "Project settings" > "General" > "Your apps" and add a new web app.
    - Copy the Firebase config object

5. Set Up Firebase Configuration in React App
    - In your React project, create a ".env" file in the root directory
    - Add your Firebase configuration to this file as environment variables:
    ```sh
    REACT_APP_FIREBASE_API_KEY=your_api_key
    REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
    REACT_APP_FIREBASE_PROJECT_ID=your_project_id      REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
    REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
    REACT_APP_FIREBASE_APP_ID=your_app_id
    ```
    
6. Initialize Firebase in the App
    - In your React app, initialize Firebase using the config stored in the .env file. 
    - Enter this in the firebase.js file.

    ```sh
    const firebaseConfig = {
      apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
      authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
      projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
      storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.REACT_APP_FIREBASE_APP_ID
    };
    ```

7. Start the app
   ```sh
   npm start
   Visit `http://localhost:3000/`
   ```
<p align="right"><a href="#readme-top">back to top</a></p>


## Features <a id="features"></a>
- [ ] Host project (Work in Progress)
- [x] Register user
- [x] Sign In / Sign Out User
- [x] Add New Todo (day, time, project)
- [x] Edit todo
- [x] Delete todo
- [x] Add a Project
- [x] Edit a Project
- [x] Delete Project

<p align="right"><a href="#readme-top">back to top</a></p>