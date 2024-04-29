# Welcome to Our Assignment 5 Site!

To get this app running on your machine, run the following script:
`docker compose up --build --detach`

If you want to have logs for nextjs and fastapi, then you can do the following:
`docker compose up --build mysql --detach`
`docker compose up --build fastapi nextjs`

To rent videos, navigate to the RentVideos button on the top bar.  Enter an email into the form.  If the email exists already in the database, you will be able to enter the ids of the videos you want to rent.  If the email does not exist in the database, enter your email into the form and you will then be prompted to enter your information.

Once you have been added to the database, you will be able to rent videos by entering the id numbers.  To rent a single video, enter the id of the video you would like to rent.  If you want to rent multiple videos, enter the ids of each video you would like to rent delimited by commas and without spaces.  For example, if you wanted to rent videos with the ids of 1 and 4 you would enter "1,4" into the video ids form field.

After you have entered in the ids of the videos to rent, click rent videos and there will be a confirmation screen listing the videos you have successfully rented along with the respective prices and due dates for their return.

## To clean:
`docker compose down --remove-orphans --rmi all --volumes`
`./docker-clean.sh`