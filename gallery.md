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
                "front": "scene1.jpg",
                "side": "scene2.jpg"
            },
            "default": "side" // optionally set the first focused content.
        },
        {
            "id": "bar",
            "content": {
                "front": "scene3.jpg",
                "side": "scene2.jpg"
            }
        }
      ],
    "media": [// Gallery view reference media by ID
        {
            "id": "scene1.jpg",
            "alt": "alt text",
            "type": "image",
            "thumbnail": "https://path.to.img/scene1_small.jpg",
            "normal": "https://path.to.img/scene1_medium.jpg",
            "large": "https://path.to.img/scene1_large.jpg"
        },
        {
            "id": "scene2.jpg",
            "alt": "alt text",
            "type": "image",
            "thumbnail": "https://path.to.img/scene2_small.jpg",
            "normal": "https://path.to.img/scene2_medium.jpg",
            "large": "https://path.to.img/scene2_large.jpg"
        },
        {
            "id": "scene3.jpg",
            "alt": "alt text",
            "type": "image",
            "thumbnail": "https://path.to.img/scene3_small.jpg",
            "normal": "https://path.to.img/scene3_medium.jpg",
            "large": "https://path.to.img/scene3_large.jpg"
        }
    ]
}
```

## Concerns
1) Variable Height Media

