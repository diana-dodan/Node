Using the code that I'm sharing, you must perform the following tasks:

1. Create all CRUD operations for `users` and `posts`, that is, you need to add create the POST, GET (all and by id), PATCH, DELETE methods. Store the data in memory.

2. Make sure to always return the correct HTTP status code for each operation; in this link you can find a list of the most used ones and their description: https://developer.mozilla.org/en-US/docs/Web/HTTP/Status.

3. After completing task 1, switch to managing data in memory and also in the file system, storing the data in a directory called `data` in the app root directory, and within this directory, a file called `users.json` and `posts.json` , you must read the content. of these files to your program's memory when the application starts; any changes made to data in memory, for example POST, PATCH or DELETE must be saved to the corresponding files.
