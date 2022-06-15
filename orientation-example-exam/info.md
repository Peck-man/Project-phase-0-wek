Hello! :)

Packages:
npm install expres mysql dotenv nodemon --save-dev

You can start the server with:
npx nodemon server.js

You can find the fetch parts in index.js
It's using the endpoints from routes.js
.env file creates the connection with the mySQL database, update it with yours

To create the mySQL database and table:

CREATE DATABASE aliaser;
CREATE TABLE `aliaser`.`url_alias` (
  `id` INT NULL AUTO_INCREMENT,
  `url` VARCHAR(100) NULL,
  `alias` VARCHAR(45) NULL,
  `hitCount` INT NULL,
  `secretCode` INT NULL,
  PRIMARY KEY (`id`));

Check the Task description folder javascript.md file for more infos.
Description on Github: https://github.com/green-fox-academy/orientation-example-exam/blob/master/javascript.md