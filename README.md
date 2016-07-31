# Katy Player

## How to use

### Using docker and docker-compose
Clone the repository and run
```
docker-compose up
```
Then open a browser on http://localhost:3000

### Using the pre-built bundle
* Install `python3` if you don't have it already
* Download and extract [this pre-built bundle](/)
* Run the youtube-dl bridge: `python3 api_server/server.py`
* Run a simple web server for the client app, e.g.: `cd app && python3 -m http.server 3000`
* Open a browser on http://localhost:3000
