function whenDetectedChange() {
    if (oComboBoxWhenDetected.getSelectedKey() === "Z4" || oComboBoxWhenDetected.getSelectedKey() === "Z5") {
        //Show Vin/Prod number
        oButtonScabProdNumber.setVisible(true);
        oInputProdNumber.setVisible(true);
        oMessageStrip.setVisible(true);
    } else {
        oButtonScabProdNumber.setVisible(false);
        oInputProdNumber.setVisible(false);
        oMessageStrip.setVisible(false);
    };
}

function showDamCodes() {


    if (oSelectCategory.getSelectedKey() != "" && oSelectDefect.getSelectedKey() != "") {
        var temp1 = oSelectCategory.getSelectedKey();
        var temp2 = oSelectDefect.getSelectedKey();
        for (i = 0; i < T_CODE_DAMAGE_LIST.length; i++) {

            if (T_CODE_DAMAGE_LIST[i].CODEGRUPPETEXT === temp1 && T_CODE_DAMAGE_LIST[i].DAMAGETEXT === temp2) {
                var codeGroup = T_CODE_DAMAGE_LIST[i].CODEGRUPPE;
                var damageCode = T_CODE_DAMAGE_LIST[i].DAMAGECODE;
            }

            oLabelDamCodes.setVisible(true)
            oTextDamCodes.setText(codeGroup + " / " + damageCode)
            oTextDamCodes.setVisible(true)

        }
    }

    if (oSelectCategory.getSelectedKey() != "" && oSelectDefect.getSelectedKey() === "") {
        oTextDamCodes.setText("")
    }
}

setTimeout(function() {

    getLocation();

}, 100);



function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        sap.m.MessageToast.show("Geolocation is not supported by this browser.");
    }
}


function round(value, decimals) {
    return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
}

function showPosition(position) {

    var location = "Latitude: " + round(position.coords.latitude, 5) +
        "  Longitude: " + round(position.coords.longitude, 5);
    console.log(location)
    oTextLocation.setText(location)
}