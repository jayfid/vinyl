<form action="#" method="get">
    <div>
    <h5 class="heading">Fieldsets</h5>
        <fieldset>
            <legend>Fieldset 1</legend>
            <div class="input">
                <label for="fset-text-1">Text Field</label>
                <input type="text" id="fset-text-1" tabindex="0" />
            </div>
        </fieldset>
        <fieldset disabled>
            <legend>Disabled Fieldset</legend>
            <div class="input">
                <label for="fset-text-2">Disabled Fieldset Text Field</label>
                <input type="text" id="fset-text-2" tabindex="1"/>
            </div>
        </fieldset>
    </div>
    <div>
        <h5 class="heading">Text Fields</h5>
        <div class="input">
            <label for="textinput-default">Text Field</label>
            <input type="text" id="textinput-default" />
        </div>
        <div class="input">
            <label for="textinput-default-dis">Disabled Text Field</label>
            <input type="text" id="textinput-default-dis" disabled />
        </div>
        <div class="input">
            <label for="text-button">Text Field with Button</label>
            <input type="text" id="text-button" />
            <button class="btn">ENTER</button>
        </div>
    </div>
    <div>
        <h5 class="heading">Selects</h5>
        <div class="input">
            <label for="s1a">Select</label>
            <select id="s1a">
                <option value="1">Option 1</option>
                <option value="2">Option 2</option>
                <option value="3">Option 3</option>
                <option value="4">Option 4</option>
                <option value="5" disabled>Option 5</option>
                <option value="6">Option 6</option>
            </select>
        </div>
        <div class="input">
            <label for="s1b">Optgroup Select</label>
            <select id="s1b">
                <optgroup label="Group 1">
                    <option value="1">Option 1</option>
                    <option value="2">Option 2</option>
                </optgroup>
                <optgroup label="Group 2">
                    <option value="3">Option 3</option>
                    <option value="4">Option 4</option>
                </optgroup>
                <optgroup label="Group 3">
                    <option value="5" disabled>Option 5</option>
                    <option value="6">Option 6</option>
                </optgroup>
            </select>
        </div>
    </div>
    <div>
        <h5 class="heading">Radio Buttons</h5>
        <div>

        </div>
    </div>
</form>
