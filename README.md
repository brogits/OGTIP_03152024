# Video Demo
Project Structure

The project is contains  two folder
    1. gbsc-api - This folder contains the backend code, written in node and express
    2. gbsc-video - This folder contains the frontend code, written in angular version 15.

Rund and Build Instruction

BackEnd:

    1. Using Visual Studio Code or text Editor update `firebaseConf.json` file located in `api` folder of `gbsc-api`. 
       The content was provided in the email. This was not added to repository for security reason.
       
    2. Using a terminal of your choice go to `gbsc-api` folder.
    
    3. Install the dependencies by executing: `npm install`
    
    4. Run the API using `npm run start`


FronEnd
    1. Using a terminal of your choice go to `gbsc-video` folder.
    
    2. Install the dependencies by executing: `npm install`
    
    3. Run the using `npm run start` or `ng serve`

The FrontEnd will run in http://localhost:4200. If for some reason the port is not available take note of the new port and update the `CLIENT_ORIGIN_URL` in the BackEnd `.env` file

Important Notes: Update `CLIENT_ORIGIN_URL` in `.env` file of `gbsc-api` ONLY if the Front End uses a different port other than 4200







