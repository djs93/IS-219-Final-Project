# Final Project Update:
## JWT tokens for API requests:
Unauthorized API requests (denied access):
![Unauthorized API requests](images/JWT Update/Not%20authed%20request.png)
Authorized API requests (data received):
![Authorized API requests](images/JWT Update/Authed%20and%20requesting.png)
## Front-End Editing Tools:
Creating an entry:
![Creating an entry](images/Front end editing/Create%20entry.png)
Entry created:
![Entry created](images/Front end editing/Entry%20created.png)

Editing an entry:
![Editing an entry](images/Front end editing/Editing%20entry.png)
Entry edited:
![Entry edited](images/Front end editing/Entry%20edited.png)

Deleting an entry:
![Deleting an entry](images/Front end editing/Create%20entry.png)
Entry deleted:
![Entry deleted](images/Front end editing/Entry%20deleted.png)
---
# Auth0 Update:
## Landing Page:
![Landing Page](images/Landing%20Page.png)
## Auth0 Prompt:
![Auth0 Prompt](images/Auth0%20prompt.png)
Signing in with Google:
![Signing in with Google](images/signing%20in%20with%20google.png)
##Sign In Successful
![Sign In Successful](images/Signed%20in%20successfully.png)
*Logging out brings you back to the landing page, there is no way to get to the table display without being signed in*
---
# CRUD Update:
## Create:
Response to POST:
![Create image](images/POST%20response.png)
Proof of addition:
![Create image verification](images/POST%20proof%20of%20change.png)
## Read:
Response to GET (all entries):
![Read all image](images/GET%20all.png)
Response to GET (single entry):
![Read one image](images/GET%20single.png)
## Update:
Response to PUT:
![Create image](images/PUT%20response.png)
Proof of change:
![Create image verification](images/PUT%20proof%20of%20change.png)
## Delete:
Response to DELETE:
![Create image](images/DELETE%20response.png)
Proof of change:
![Create image verification](images/DELETE%20proof%20of%20change.png)
___
Prerequisites:
Install Node:
https://nodejs.org/en/download/


Install Webpack Globally by running this command on your terminal / command prompt

npm install --global webpack

Webpack Documentation: https://webpack.js.org/

To Use:

1.  Clone the Repo
2.  Run npm install
3.  Run webpack serve to live reload your project, so you can see changes without refreshing the browser
4.  Once it's running you can go to the dev server and see your changes: http://localhost:9000/
5.  **run "webpack build" to bundle your code and put it in the docs folder so github pages can serve it**

Press Control C to stop the server or the builder

Turn on github pages and put a link to your site in the readme when you turn in the github repo link.

Working site here:

http://www.webizly.com/BasicWebPack/
