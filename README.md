# InTown-Application
How to use intown main 

step 1: Downloads needed. 
1.	Install node.js https://nodejs.org/en/download/prebuilt-installer.

2.	Install MySQL community server https://dev.mysql.com/downloads/mysql/ (make sure for user “root” the password is “password”).

3.	Install MySQL Workbench https://dev.mysql.com/downloads/workbench/.

4.	If you are using windows, download the main branch of the repository. If you are using mac OS , download the mac-os-version branch. The reason there are two versions is because we use “bcrypt” for password encryption and the bcrypt version is a little bit different for windows and mac.


step 2: Data base set up

1.	Open your system’s settings and make sure the MySQL server is running

2.	Open MySQL Workbench and open connection to “localhost:3306” (it might be called “Local instance 3306”), it will ask for your user “root” password which should be set to “password” in step 1 part 2.

3.	Go to the “Administration” tab. Click “Data Import/Restore”. Select “Import from Self-Contained File”, and select the “intowndb.sql” file in the InTown-Application folder you downloaded earlier . Click “Start Import”. 

4.	Now if you refresh the “Schemas” tab, you should see our database schema “intowndb”.

Step 3: Starting the webserver
	
1.	Go to a code editor such as VS Code and open the downloaded InTown-Application folder.

2.	Open a new terminal in the code editor and enter “node app.js”.

3.	If you got an error ‘ERR_DLOPEN_FAILED’ it might be because your computer does not trust “bcrypt” and refused to run it. To fix this try going to InTown-Application folder -> “node_modules” -> “bcrypt” -> “lib” -> “binding” -> “napi-v3”, open the “bcrypt_lib.node” file in a text editor. Repeat Step 3 part 2.

Step 4: Use the website

1.	Go to http://localhost:3000/ in your web browser.
