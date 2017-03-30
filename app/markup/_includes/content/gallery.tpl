<section id="welcome">
    <div class="container mobile-wall-pad">
        <div class="row flex-hcenter">
            <div class="grid-12 border-bottom bpush-50">
                <h1>Product Image Gallery</h1>
                <p>A responsive image gallery that supports:</p>
                <ul>
                    <li>Horizontal Sliding</li>
                    <li>Thumbnails/Paging</li>
                    <li>Switching Product Attribute (like color)</li>
                    <li>Hover to zoom (desktop)</li>
                    <li>Slide to zoom (mobile)</li>
                </ul>
            </div>
            <div class="grid-8 text-center">
                <img src="a" />
            </div>
            <div class="grid-4">
                <p>Zoom hover target</p>
            </div>
        </div>
    </div>
</section>

<!-- build:js scripts/productgallery.js -->
<script src="scripts/productgallery.js"></script>
<!-- endbuild -->

<script>
    var config = {
        'containerSelector': '.product-gallery'
    };
    var data = {
        "galleries": [ // A gallery defines a list of content.
            {
                "id": "square",
                "content": { // A list of named references to media objects.
                    "wide": "wide-square",
                    "square": "square-square",
                    "tall": "tall-square"
                },
            },
            {
                "id": "circle",
                "content": { // A list of named references to media objects.
                    "wide": "wide-circle",
                    "square": "square-circle",
                    "tall": "tall-circle"
                },
            }

        ],
        "media": [ // Gallery view reference media by ID
            {// circle's images
                "id": "square-circle",
                "alt": "alt text",
                "type": "image",
                "lowres": "https://assets.newpointdesigns.com/productimagegallery/sample/square-circle.png",
                "hd": "https://assets.newpointdesigns.com/productimagegallery/sample/square-circle.png"
            },
            {
                "id": "tall-circle",
                "alt": "alt text",
                "type": "image",
                "lowres": "https://assets.newpointdesigns.com/productimagegallery/sample/tall-circle.png",
                "hd": "https://assets.newpointdesigns.com/productimagegallery/sample/tall-circle.png"
            },
            {
                "id": "wide-circle",
                "alt": "alt text",
                "type": "image",
                "lowres": "https://assets.newpointdesigns.com/productimagegallery/sample/wide-circle.png",
                "hd": "https://assets.newpointdesigns.com/productimagegallery/sample/wide-circle.png"
            },

            {// square's images
                "id": "square-square",
                "alt": "alt text",
                "type": "image",
                "lowres": "https://assets.newpointdesigns.com/productimagegallery/sample/square-square.png",
                "hd": "https://assets.newpointdesigns.com/productimagegallery/sample/square-square.png"
            },
            {
                "id": "tall-square",
                "alt": "alt text",
                "type": "image",
                "lowres": "https://assets.newpointdesigns.com/productimagegallery/sample/tall-square.png",
                "hd": "https://assets.newpointdesigns.com/productimagegallery/sample/tall-square.png"
            },
            {
                "id": "wide-square",
                "alt": "alt text",
                "type": "image",
                "lowres": "https://assets.newpointdesigns.com/productimagegallery/sample/wide-square.png",
                "hd": "https://assets.newpointdesigns.com/productimagegallery/sample/wide-square.png"
            }
        ],
        "defaultGallery": "square"
    };

</script>
