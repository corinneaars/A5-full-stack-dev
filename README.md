# Welcome to Our Assignment 5 Site!

To get this app running on your machine, open a new terminal and either navigate to the folder on your local machine or open the folder in PyCharm/VS Code and open a new terminal.  Then run the following script:
`docker compose up --build --detach`

If you want to have logs for nextjs and fastapi, and not for mysql, then you can run the following:
`docker compose up --build mysql --detach`
`docker compose up --build fastapi nextjs`

You can get to the logs with:
 `docker compose logs mysql`

 You can even run the logs through grep if you know what you are looking for:
 `docker compose logs nextjs | grep 'RentVideos.js |`
 This will return only log messages that you have printed "RentVideos.js |" for logging and debugging purposes.

## Navigating the Site (Renting Videos)

To rent videos, navigate to the RentVideos button on the top bar.  Enter an email into the form.  If the email exists already in the database, you will be able to enter the ids of the videos you want to rent.  If the email does not exist in the database, enter your email into the form and you will then be prompted to enter your information.

Once you have been added to the database, you will be able to rent videos by entering the id numbers.  To rent a single video, enter the id of the video you would like to rent.  If you want to rent multiple videos, enter the ids of each video you would like to rent delimited by commas and without spaces.  For example, if you wanted to rent videos with the ids of 1 and 4 you would enter "1,4" into the video ids form field.

After you have entered in the ids of the videos to rent, click rent videos and there will be a confirmation screen listing the videos you have successfully rented along with the respective prices and due dates for their return.  Please note that the confirmation table does take a few seconds to load, depending on how many ids are being rented.


## Design Documentation

### Part 1: Front Page Redesign


The ‘index.js’ or initial home page was redesigned to reflect the aesthetic and functional needs of a DVD Rental Business. With updated colors and formatting, the site is clearer in purpose. 
Three buttons are found in the top tab of the page. The buttons are white text against the black upper tab. The Home button references the home page. The CA Customers button references the previous assignment with the table of Canadian customers. The Rent Videos tab is an alternate path to the Log In screen.
The center of the screen includes a welcome message and instructions to press the “LOG IN” button to access the site.
These design choices provide a simple but aesthetically pleasing means of navigating the site. The framework of design for the front page was then applied to the rest of the site’s pages.

### Part 2: Customer and Rental Management

The “RentVideos” page allows the store to add a new customer and assign video rentals to them. This page covers three screen options including:
Log In Screen
Registration Screen
Video Rental Screen/ Confirmation Screen

The Log In Screen is the initial screen that requires a user to enter their email address and then press the “NEXT” button. If the email address already exists within the database (such that the user already has an account), they will be taken to the Video Rental Screen. If the email address does not exist (such that the user is new), they will be taken to the Registration Screen.

The Registration Screen requires customers to fill in their information in order to create an account. This is the form to add new customers to the database. Clicking the “SUBMIT” button will submit their information and take them to the Video Rental Screen. 

The Video Rental Screen will show a user’s name and email address, then permit them to submit video rentals by typing in Video IDs. Video IDs must be comma-separated with no spaces. Pressing the “SUBMIT RENTAL” button will bring up the Confirmation Screen which relays the customer information as well as information about the requested videos. The confirmation screen displays the post submission detailing the new customer addition, a successful transaction, and due dates for the rented video(s).


### Debugging:
The app may revert to an old version, if changes are made.  To remove orphans and clean the cache of the application, run the scripts below in addition to purging Docker Desktop.
`docker compose down --remove-orphans --rmi all --volumes`
`./docker-clean.sh`