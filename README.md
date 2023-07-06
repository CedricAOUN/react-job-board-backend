# react-job-board-backend
Back-end of my react-job-board project, designed to work with: [react-job-board-ui](https://github.com/CedricAOUN/react-job-board-ui)

It requires a MySQL DB server, and a node server. For that reason, Docker has been setup to provide just that within 2 containers.
## Install guide: 

- Download & Install [Docker Desktop](https://www.docker.com/) if you don't have it already. (Restart potentially required)
- Pull/Download & Extract this repository. [Direct download link](https://github.com/CedricAOUN/react-job-board-backend/archive/refs/heads/main.zip)
- Open terminal/CMD and direct it to where you extracted the repository. (../react-job-board-backend)
- Run ```docker-compose up``` in the terminal.
- While the sql is booting up, the application will keep retrying to connect. This is normal and only happens the first time you boot up this composition. You will know it's ready when ```api-server  | Connected to MySQL``` is displayed in green inside of your Terminal/CMD.


You may now enjoy the full capabilities if you vist my [React Job Board Application Website](https://react-job-board-ui.vercel.app/). The website should now be querying data from your docker containers,  the login/signup feature is acttive, and you will have a list of jobs displayed on the main page.
### Tips: 
- Signup as a "Recruiter" account so you can access ALL features
- Add a job via the menu icon on the top left.
- Add a CV to your account via the "Profile" menu.
- Search for that job in the main page. Apply to it! Alternatively, logout and sign up with a different account and apply to it with that one!
- Re-sign in to your recruiter account and check out "My Jobs". Your job should be listed there with all the "candidates" that have applied to it.
- You have the option to delete your account in the profile tab.

When done, simply press CTRL + C/CMD + C in your terminal/CMD to stop the process. 
