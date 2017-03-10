<section id="welcome">
    <div class="container mobile-wall-pad">
        <div class="row flex-hcenter">
            <div class="grid-6 text-center">
                <p><span class="tpad-10 bpad-10 rpad-30 lpad-30 color-text-blue modal-open clickable btn">Open Modal</span></p>
            </div>
        </div>
        <div class="hidden modal-content row flex-hcenter">
            <div class="grid-6 bordered color-bg-blue  color-text-white text-center tpush-10 bpush-50 clickable">
                <p class="tpad-10 bpad-10 lpad-10 rpad-10 text-right clickable close">close</p>
                <h1 class="tpush-100">HELLO WORLD!</h1>
                <p>This modal content is hidden in the page, then positioned <code>fixed</code> in the window.</p>
            </div>
        </div>
    </div>
</section>
<script>
    var modalExample = new VS.modal({
        triggerSelector: '.modal-open',
        contentSelector: '.modal-content',
        hideSelector: 'close',
        clickToClose: true
    });
</script>
