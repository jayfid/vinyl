
<script>
    var config = {
        'thumbnailContainerSelector': '.product-gallery-thumbs',
        'mainContainerSelector': '.product-gallery-main'
    };
    var data = {
        "galleries": [ // A gallery defines a list of content.
            {
                "id": "blue",
                "content": { // A list of named references to media objects.
                    "wide": "wide-blue",
                    "square": "square-blue",
                    "tall": "tall-blue"
                },
            },
            {
                "id": "red",
                "content": { // A list of named references to media objects.
                    "wide": "wide-red",
                    "square": "square-red",
                    "tall": "tall-red"
                },
            }

        ],
        "media": [ // Gallery view reference media by ID
            {// circle's images
                "id": "square-red",
                "alt": "alt text",
                "type": "image",
                "low": "https://assets.newpointdesigns.com/productimagegallery/sample/square-circle.png",
                "high": "https://assets.newpointdesigns.com/productimagegallery/sample/square-circle.png"
            },
            {
                "id": "tall-red",
                "alt": "alt text",
                "type": "image",
                "low": "https://assets.newpointdesigns.com/productimagegallery/sample/tall-circle.png",
                "high": "https://assets.newpointdesigns.com/productimagegallery/sample/tall-circle.png"
            },
            {
                "id": "wide-red",
                "alt": "alt text",
                "type": "image",
                "low": "https://assets.newpointdesigns.com/productimagegallery/sample/wide-circle.png",
                "high": "https://assets.newpointdesigns.com/productimagegallery/sample/wide-circle.png"
            },

            {// square's images
                "id": "square-blue",
                "alt": "alt text",
                "type": "image",
                "low": "https://assets.newpointdesigns.com/productimagegallery/sample/square-square.png",
                "high": "https://assets.newpointdesigns.com/productimagegallery/sample/square-square.png"
            },
            {
                "id": "tall-blue",
                "alt": "alt text",
                "type": "image",
                "low": "https://assets.newpointdesigns.com/productimagegallery/sample/tall-square.png",
                "high": "https://assets.newpointdesigns.com/productimagegallery/sample/tall-square.png"
            },
            {
                "id": "wide-blue",
                "alt": "alt text",
                "type": "image",
                "low": "https://assets.newpointdesigns.com/productimagegallery/sample/wide-square.png",
                "high": "https://assets.newpointdesigns.com/productimagegallery/sample/wide-square.png"
            }
        ],
        "defaultGallery": "blue"
    };

    requirejs(['../plugins/vsgallery.js'], function(vsgallery) {
        //console.log(vsgallery);
        vsgallery.init(config, data);
    });
</script>
