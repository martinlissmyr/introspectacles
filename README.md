## What is it?

Create personal top lists based on your Foursquare/Swarm data.

## Use

1. Run `npm install`
2. Rename `config.example.json` to `config.json` and add [your Foursquare token](https://developer.foursquare.com/overview/auth#token).
3. Run `npm run sync`. This will sync your checkins with local storage.
4. Run `npm run stats`.
5. Profit.

## Customising the statistics

You can customise the outputted statistics by manipulating `stats` in your `config.json`. 

### Properties

`title` => What is this particular top list called?  
`type` => What type of venue to include?  
`count` => How many in the list?

## Available venue types

* `breakfast-spot` A food place you visited in the morning
* `lunch-restaurant` A restaurant you visited during the day
* `dinner-restaurant` A restaurant you visited in the evening
* `cafe` Coffee shops and cafés
* `bar` Any type of bar
* `airport` An airport

### Example

```json
"stats": [
  {
    "title": "Top Cafés",
    "type": "cafe",
    "count": 20
  }
]
```

## Venue category overrides

Sometimes you may not agree with how venues on Foursquare are categorised. That is fine. If you want to override the category for a specific venue you can specify that in `venueCategoryOverrides` in your `config.json`. You'll find all available categories in `data` after your first sync. The overrides takes effect after a sync. You can resync at any time.

### Example

```json
"venueCategoryOverrides": [
  {
    "venueId": "4b62c747f964a52055522ae3",
    "category": {
      "id": "4bf58dd8d48988d111941735",
      "name": "Japanese Restaurant",
      "pluralName": "Japanese Restaurants",
      "shortName": "Japanese"
    }
  }
]
```
