# Spotter

Spotter is an application with a lot of firsts for me; it's my first mobile, my first "real", and my first NativeScript application I built during my first week at Progress Software. It's a proof-of-concept application that allows its users to see the best areas to park in Palo Alto and Newcastle, Australia, at the time at which they open the app. They can also see the closest unoccupied spots to the user in #realtime.

The application sends requests to a [Node/Express server](www.github.com/antonybello/spotter-engine), which then queries the VIMOC Technologies [Landscape Computing API](http://www.vimoctechnologies.com/technology.html) for parking data in Palo Alto and Newcastle. The user can see parking areas sorted by their vacancy percentage within the last hour and can view unoccupied parking spots sorted by distance away from the user. (Getting the user's last known location requires the location to be updated by other applications, and since this was tested on an emulator with no Location Services applications, I just used Telerik's address. I had my server return the GPS coordinates of the spot, which can be used with the Google Maps API.) 

There are a *ton* of extensions that I'd want to add: getting your location for an open spot near you, querying VIMOC for vacancy percentages at specified times, collecting the data to *predict* the vacancy percentages for the parking areas at a given date and time. All of these additions would be incredibly useful and would make for a killer application.
