/* ************************************************************************

   Copyright: 2022 ООО "НПП "ЮГПРОМАВТОМАТИЗАЦИЯ"

   License: MIT license

   Authors: Dmitrii Zolotov (goldim) zolotovdy@yandex.ru

************************************************************************ */

qx.Class.define("ugpa.timefield.SliderPopup", {
    extend: qx.ui.popup.Popup,

    construct() {
        // noinspection JSAnnotator
        super(new qx.ui.layout.HBox());
        this._createChildControl("slider");
    },

    events: {
        "stopScrolling": "qx.event.type.Event"
    },

    members: {
        setCurrentInput(input) {
            const slider = this.getChildControl("slider");
            slider.setUserData("input", input);
            slider.setMaximum(input.getMaxValue());
            slider.setValue(Number(input.getValue()));
            this.placeToWidget(input);
        },

        _createChildControlImpl(id, hash) {
            let control;
            
            switch (id) {
                case "slider":
                    control = new ugpa.timefield.Slider();
                    control.addListener("scrollStop", function() {
                        this.fireEvent("stopScrolling");
                    }, this);
                    this._add(control);
                break;
            }
    
            return control || super._createChildControlImpl(id);
        }
    }
});
