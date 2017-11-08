This is a small project where I am studying node and it's modules.

Script is able to login into a reporting system, open page with reports and figure out, if there is a report for today.
If there is an issue, it sends a slack notification message and email to my email address. 
In order to make this solution run for you, you have to, basically fill in the creds.js file (see example in creds.example.js):
- Add your gmail SMTP credentials
- Add link to your slack space(not mandatory)
- Fill in 'service' field with your reporting system url(works only with my system :) )
- Fill in 'target' fields with your system credentials


Dependencies and requirements:
- Node 8+.
- 150MB of empty space for Chromium.

How to install: `npm install`

How to run: `node index.js`
