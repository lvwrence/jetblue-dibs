# jetblue-dibs

```GET``` to ```/api/destinations``` returns a list of all destination objects,
where a destination object has fields:
```
{
  code: "YUL",
  city: "Montreal",
  coordinates: {
    lat: 45.5017,
    lng: 73.5673
  },
  image:"https://scontent-lga3-1.cdninstagram.com/hphotos-xfp1/t51.2885-15/e35/12224431_720653774746321_479880755_n.jpg"
}
```

```GET``` to ```/api/destinations/YUL``` returns the details of the soonest flight to that code.
If there is a query parameter `from` (e.g. `/api/destinations/YUL?from=BOS`), then it finds
the soonest flight to that location from the `from` code.

```
{
  origin: "BOS",
  destination: "YUL",
  hotel: "70 Park Avenue Hotel, a Kimpton Hotel",
  nights: 3,
  check-in: "10/23/2015",
  check-out: "10/30/2015",
  jetblue-price: 1674.87,
  expedia-price: 1684.68
}
```

```GET``` to ```/api/destinations/YUL/feed``` returns the most recent instagram photo geotagged
near that code.
