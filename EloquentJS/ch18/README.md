# Content Negotiation
Retrieving data from https://eloquentjavascript.net/author in 4 media types:

1. text/plain
1. text/html
1. application/json
1. application/rainbows+unicorns (Code: 406)

# A JavaScript Workbench
Directly running JS in the box.

# Conway's Game of Life
I got the first draft: However, it is for one square at a time, not for a whole grid.

## Some notes about the book.
GET /18.html HTTP/1.1 <br />
Host: eloquentjavascript.net <br />
User-Agent: <browser's name>

HTTP/1.1 200 OK <br />
Content-Length: 65349 <br />
Content-Type: text/html <br />
Last-Modified: Thu, 14 May 2019 14:05:30 GMT

<!doctype HTML>
bla bla bla...

POST /example/message.html HTTP/1.1 <br />
Content-Length: 24  <br />
Content-Type: application/x-www-form-urlencoded

name=Son&message=anime%3F
