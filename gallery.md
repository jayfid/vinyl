# Product Image Gallery
A responsive image gallery that supports 
- Horizontal sliding
- Thumbnail generation
- Retaining thumbnail selection on product option update.
- Hovering to zoom (desktop)
- Sliding to zoom (mobile)

## Wireframes
![wireframe](https://assets.newpointdesigns.com/productimagegallery/productimagegallery.png)

## Process
1. [Initial data](#config-data) is loaded in.
2. The first gallery is generated
    1. 

## Config Data
```javascript
{
    "galleries": [ // A gallery defines a list of content.
        {
            "id": "foo",
            "content": { // A list of named references to media objects.
                "front": "scene1",
                "side": "scene2"
            },
            "default": "side" // optionally set the first focused content.
        },
        {
            "id": "bar",
            "content": {
                "front": "scene3",
                "side": "scene2"
            }
        }
      ],
    "media": [// Gallery view reference media by ID
        {
            "id": "scene1",
            "alt": "alt text",
            "type": "image",
            "low": "https://path.to.img/scene1_small.jpg",
            "high": "https://path.to.img/scene1_medium.jpg",
        },
        {
            "id": "scene2",
            "alt": "alt text",
            "type": "image",
            "low": "https://path.to.img/scene2_small.jpg",
            "high": "https://path.to.img/scene2_large.jpg"
        },
        {
            "id": "scene3",
            "alt": "alt text",
            "type": "image",
            "low": "https://path.to.img/scene3_small.jpg",
            "high": "https://path.to.img/scene3_large.jpg"
        }
    ]
}
```

## Concerns
1) Variable Height Media

