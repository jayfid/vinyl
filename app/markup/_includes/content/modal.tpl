<section id="welcome">
    <div class="container mobile-wall-pad">
        <div class="row flex-hcenter">
            <div class="grid-6 text-center">
                <p>Lorem ipsum dolor sit <span class="color-text-blue modal-open">amet nunc.</span></p>
            </div>
        </div>
        <div class="visibly-hidden modal-content">
            <h1>HELLO WORLD!</h1>
        </div>
    </div>
</section>
<script>
    var modalExample = new VinylModal({
        triggerSelector: ['.modal-open'],
        contentSelector: '.modal-content'
    });
</script>
