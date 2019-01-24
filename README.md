# Incident Board

This simple StatEngine application demonstrates how to utilize webhooks.
The application listens for incoming webhooks, verifies the sender, and relays the message via Socket.io to the browser.

# Running
```
npm i
node index.js
```

Now visit http://localhost:3100


# Deploying to Heroku
```
heroku create
git push heroku master
heroku ps:scale web=1
heroku open
```