<section id="welcome">
    <div class="row">
        <div class="grid-12">
            <div class="color-bg-green draggable-example">
                <p class="text-center bpad-20 tpad-20 rpad-20 lpad-20 ">Draggable</p>
            </div>
        </div>
    </div>
</section>
<script>
    function demoEvent(event, container, lastMousePos, currMousePos) {
        console.log(event);
    }

    var myDraggableExample = new Draggable({
        containerSelector: '.draggable-example',
        callback: demoEvent
    });
</script>
