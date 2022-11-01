/* ************************************************************************

   Copyright: 2022 ООО "НПП "ЮГПРОМАВТОМАТИЗАЦИЯ"

   License: MIT license

   Authors: Dmitrii Zolotov (goldim) zolotovdy@yandex.ru

************************************************************************ */

qx.Class.define("ugpa.timefield.Input", {
    extend: qx.ui.form.TextField,

    construct(maxValue){
        super("00");
        this.set({
            width       : 25,
            appearance  : "widget",
            textAlign   : "center",
            liveUpdate  : true,
            readOnly    : true,
            filter      : /[0-9]/
        });
        this.initMaxValue(maxValue);
        this.addListener("changeValue", this._onChangeValue, this);
    },

    properties: {
        maxValue: {
            deferredInit: true,
            check: "Integer"
        },

        prevValue: {
            init: "00"
        }
    },

    statics: {
        /**
         * Pad left leading zeros and removes not needed
         * @param value {Number|String} value
         * @return padded value
         */
        toValidString(value){
            value = String(Number(value));
            const twoZeros = value.length === 2;
            const lessTen = Number(value) < 10;
            return (lessTen && !twoZeros) ? `0${value}`: `${value}`;
        }
    },

    members: {
        hasValidValue(){
            return this.isValidValue(this.getValue());
        },

        _onChangeValue(e){
            const value = e.getData();

            if (this.isValidValue(value)) {
                const padded = this.constructor.toValidString(value);
                this.setPrevValue(padded);
                this.setValue(padded);
            }
            else {
              const prevValue = this.getPrevValue();
              this.setValue(prevValue);
            }
        },

        isValidValue(time){
            time = Number(time);
            return time >= 0 && time <= this.getMaxValue();
        }
    }
});