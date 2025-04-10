export const json = {
    "pages": [
      {
        "name": "page1",
        "elements": [
          {
            "type": "rating",
            "name": "satisfaction-numeric",
            "title": "How satisfied are you with our product?",
            "description": "Numeric rating scale",
            "autoGenerate": false,
            "rateCount": 10,
            "rateValues": [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ]
          },
          {
            "type": "rating",
            "name": "satisfaction-stars",
            "title": "How satisfied are you with our product?",
            "description": "Star rating scale",
            "rateType": "stars",
            "rateCount": 10,
            "rateMax": 10,
            "displayMode": "buttons"
          },
          {
            "type": "rating",
            "name": "satisfaction-smileys-monochrome",
            "title": "How satisfied are you with our product?",
            "description": "Smiley rating with monochrome scale",
            "rateType": "smileys",
            "rateCount": 10,
            "rateMax": 10,
            "displayMode": "buttons"
          },
          {
            "type": "rating",
            "name": "satisfaction-smileys-colored",
            "title": "How satisfied are you with our product?",
            "description": "Smiley rating with colored scale",
            "rateType": "smileys",
            "scaleColorMode": "colored",
            "rateCount": 10,
            "rateMax": 10,
            "displayMode": "buttons"
          }
        ]
      }
    ]
  };