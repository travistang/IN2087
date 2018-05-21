# IN2087
For group 42

## How to set up the backend (on your machine)
- install `docker-compose`
- in the directory (where docker-compose.yml is), run `docker-compose up --build` (if that doesnt work, try with `sudo`)
- wait for docker to finish doing its stuffs (until you see something like `API is running in port 3000`
- try to type `localhost:3000/test/register` on your browser, a user should be created and you should receive a token as a response. If you do it again, you should get an error saying this user has been registered.
- try to type `localhost:1234` on your browser, then add `mongodb://mongo:27017/finda`, and press `connect`, then you should be able to see the internal structure of the Mongo.
- try to type `localhost:3000/test/populate` on your browser, the info of the user you just registered should have returned as json in the result
