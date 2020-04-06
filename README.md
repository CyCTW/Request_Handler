# Request_Handler
## Introduction:
A simple request handling program for practicing.

**Framework:** Node.js with express framework

**Database:** MySQL
## Requestment:
![](https://i.imgur.com/0zQCjmn.png)
## How to use:
1. Clone this repository to your local directory you want.
```
git clone https://github.com/CyCTW/Request_Handler
```
2. move to the directory inside.
```
cd ./Request_Handler/myapp
```
3. Download the needed npm package by following command.

```
npm install
```
4. create databases and table by MySQL

**Create Database:**
```
mysql> CREATE DATABASE 'YOUR_DATABASE_NAME';
```
**Create Table:**
```
mysql> CREATE TABLE connect_info(
    -> id INT AUTO_INCREMENT PRIMARY KEY,
    -> ip VARCHAR(30) not null unique,
    -> expire_time VARCHAR(30) not null,
    -> remain_req INT not null
    -> );
```
5. create .env file in repository root directory

**ex:**
```
HOST = 'localhost'
DATABASE_USER = 'YOUR_USERNAME'
DATABASE_PASSWORD = 'YOUR_PASSWORD'
DATABASE = 'YOUR_DATABASE_NAME'

```
6. start the program.
```
npm start
```
*******
- If succeed, you can go to *loaclhost:3000*, it should be a blank page.
Then open the page source (maybe press F12), choose **Network**, and click **localhost**. 
Now, you can see the X-RateLimit-Remaining and X-RateLimit-Reset.
![](https://i.imgur.com/zjBdbHm.png)

## Definition:
- **X-RateLimit-Remaining:** The remain time to visit the page for **this IP address**. If it becomes 0, then you'll got a 429 status code(Too many requests).
 
- **X-RateLimit-Reset:** The remain time to reset X-RateLimit-Remaining. (one hour at first)

## Testing:
I also write some simple test function (not complete). One function is for testing connection, others are for X-RateLimit-Remaining. 

- Try this command below in CLI to test:
```
npm test
```
Then you should see the result.

![](https://i.imgur.com/6SdfRq4.png)
