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
2. Download the needed npm package by following command.

```
npm install
```
3. start the program.
```
npm start
```
*******
- If succeed, you can go to *loaclhost:3000*, it should be a blank page.
Then open the page source (maybe press F12), choose **Network**, and click **localhost**. 
Now, you can see the X-RateLimit-Remaining and X-RateLimit-Reset.
![](https://i.imgur.com/zjBdbHm.png)

## Definition:
**X-RateLimit-Remaining:** The remain time to visit the page for **this IP address**. If it becomes 0, then you'll got a 429 status code(Too many requests).
 
**X-RateLimit-Reset:** The remain time to reset X-RateLimit-Remaining. (one hour at first)
