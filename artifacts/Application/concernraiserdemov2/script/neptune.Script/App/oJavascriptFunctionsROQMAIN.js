function searchForSimilarConcerns() {
    if (oInputComponents.getValue() != "" && oInputPosition.getValue() != "") {

        var input1 = oInputComponents.getValue();
        var input2 = oInputPosition.getValue();

        var input3 = oSelectCategory.getSelectedKey();
        var input4 = oSelectDefect.getSelectedKey();

        var toSend = input1+","+input2+","+input3+","+input4
        var options = {
            data: {"data":toSend},
        };

        apioRestAPIFuzzySearchLevel0(options);

    }
};


function filterDefectList(selectedKey) {
    console.log(selectedKey);
    var defects_and_symptoms_all_data = T_CODE_DAMAGE_LIST;
    
    var defectArray = [];
    for (i = 0; i < defects_and_symptoms_all_data.length; i++) {
        if (defects_and_symptoms_all_data[i].CODEGRUPPETEXT === selectedKey){
            defectArray.push({"symptom":defects_and_symptoms_all_data[i].DAMAGETEXT})
        }
    }

    console.log(defectArray);
    modeloSelectDefect.setData(defectArray);
    oSelectDefect.setEnabled(true);

};

function filterVarientList(selectedKey){
    console.log(selectedKey);
    var defects_and_symptoms_all_data = T_MODELS;
    
    var defectArray = [];
    for (i = 0; i < defects_and_symptoms_all_data.length; i++) {
        if (defects_and_symptoms_all_data[i].SSOLMODEL === selectedKey){
            defectArray.push({
                "varient":defects_and_symptoms_all_data[i].SSOLVARIANT,
                "model":defects_and_symptoms_all_data[i].modelCode
                })
        }
    }

    console.log(defectArray);
    modeloSelectVarient.setData(defectArray);
    oSelectVarient.setEnabled(true);

};

// -----

sap.ui.getCore().attachInit(function (data) {
    oHTMLObjectCameraUpload.setContent('<input type="file" accept="image/*" id="file-input"  style="display:none">');
});

setTimeout(function () {

    modeloModelArrayImageStorage.setData([])

    const fileInput = oFlexBoxCameraUpload.getDomRef();
    fileInput.addEventListener('change', (e) => handleFileSelect(e.target.files[0]));

}, 3000);


function handleFileSelect(f) {
    var reader = new FileReader();

    reader.onload = (function (theFile) {
        return function (e) {
            var binaryData = e.target.result;
            // Converting Binary Data to base 64
            var base64String = window.btoa(binaryData);

            var fullBase64picture = "data:image/png;base64," + base64String;

            var imageToStore = {
                "imageID": Date.now(),
                "image64string": fullBase64picture
            };

            var currentImages = modeloModelArrayImageStorage.getData();
            currentImages.push(imageToStore);
            modeloModelArrayImageStorage.setData(currentImages);
            modeloCarousel.setData(currentImages);

            if (currentImages.length > 0) {
                oButtonDeletePicture.setVisible(true);
            } else {
                oButtonDeletePicture.setVisible(false);
            }

            console.log(modeloModelArrayImageStorage.getData());

            oButtonGoToStepx.setEnabled(true);

        };
    })(f);
    reader.readAsBinaryString(f);

    setTimeout(function () {

        oCarousel.next();

    }, 500);

}

function deleteCurrentPicture() {
    var currentPage = oCarousel.getActivePage();
    var currentPagelastChar = parseInt(currentPage.substr(currentPage.length - 1));
    console.log(currentPagelastChar);

    var currentImages = modeloModelArrayImageStorage.getData();

    currentImages.splice(currentPagelastChar, 1);

    modeloModelArrayImageStorage.setData(currentImages);

    modeloCarousel.setData(currentImages);

    if (currentImages.length > 0) {
        oButtonDeletePicture.setVisible(true);
    } else {
        oButtonDeletePicture.setVisible(false);
    }

    console.log(modeloModelArrayImageStorage.getData());
}


function show3DOptions() {

    var is3dReady = true;

    //if (oInputProdNumber.getValue() === "") { is3dReady = false }

    //if (oSelectModel.getSelectedKey() === "") { is3dReady = false }
    //if (oSelectVarient.getSelectedKey() === "") { is3dReady = false }

    if (oInputComponents.getValue() === "") { is3dReady = false }
    if (oInputPosition.getValue() === "") { is3dReady = false }

    if (is3dReady === true) {
        //sap.m.MessageToast.show("3D Model Available");
        oButtonViewIn3d.setVisible(true);
        //oButtonViewInAR.setVisible(true);
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            // true for mobile device
            //oButtonViewInAR.setVisible(true);
            oButtonViewInAR.setEnabled(true);
            oButtonViewIn3d.setEnabled(true);
            //oButtonViewIn3d.setType("Accept");
            //oButtonViewInAR.setType("Accept");

        } else {
            // false for not mobile device
            //oButtonViewInAR.setVisible(false);
            //oButtonViewInAR.setEnabled(false);
            //oButtonViewInAR.setType("Reject");
            oButtonViewIn3d.setEnabled(true);
            oButtonViewIn3d.setType("Accept");
        }
    }
}


function calculateRPNpriority() {

    var MPAScore = oSegmentedButtonMPAScore.getSelectedKey();
    if (MPAScore === "100s"){
        MPAScore = 100;
    }
    var ReworkState = oSegmentedButtonReworkState.getSelectedKey();
    var TimeImpact = oSegmentedButtonTimeImpact.getSelectedKey();
    var CurrentFPV = oSliderCurrentFPV.getValue();

    var toSend = MPAScore+","+ReworkState+","+CurrentFPV/100+","+TimeImpact;

    var options = {
        data: {"data":toSend},
    };

    console.log(options);

    apioRestAPIGetPriority(options);

    

};

function returnRPNPriority(value) {
    var RPNConfig = modeloModelArrayRPNConfig.getData();
    //RPNConfig[0].HigherBound
    //RPNConfig[0].LowerBound

    if (value > RPNConfig[0].HigherBound) {
        var priority = "High";
        oMessageStripPriority.setType("Error");
        oMessageStripPriority.setText("This concern will be marked as: "+priority+" Priority. Score: "+value);
        oHBoxPriority.setVisible(true);
        oLabelPriority.setText(1);
        oTextPriority.setText(1);
    } else {
        if (value > RPNConfig[0].LowerBound) {
            var priority = "Medium";
            oMessageStripPriority.setType("Warning");
            oMessageStripPriority.setText("This concern will be marked as: "+priority+" Priority. Score: "+value);
            oHBoxPriority.setVisible(true);
            oLabelPriority.setText(3);
            oTextPriority.setText(3);
        } else {
            var priority = "Low";
            oMessageStripPriority.setType("Success");
            oMessageStripPriority.setText("This concern will be marked as: "+priority+" Priority. Score: "+value);
            oHBoxPriority.setVisible(true);
            oLabelPriority.setText(5);
            oTextPriority.setText(5);
        }
    }
    console.log(priority);

}


function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}


function submitConcern() {

    var reference = uuidv4();
    modeloModelObjectReference.setData({ "reference": reference })

    var images = modeloModelArrayImageStorage.getData();



    var temp1 = oSelectCategory.getSelectedKey();
    var temp2 = oSelectDefect.getSelectedKey();
    for (i = 0; i < T_CODE_DAMAGE_LIST.length; i++) {

        if (T_CODE_DAMAGE_LIST[i].CODEGRUPPETEXT === temp1 && T_CODE_DAMAGE_LIST[i].DAMAGETEXT === temp2){
            var codeGroup = T_CODE_DAMAGE_LIST[i].CODEGRUPPE;
            var damageCode = T_CODE_DAMAGE_LIST[i].DAMAGECODE;
        }

    }

    //if (oInputMileage.getValue() === ""){
        //oInputMileage.setValue(0)
    //}

    var submissionObject = {
         "Reference": reference,
         "Title": oInputComponents.getValue(),
         "Position": oInputPosition.getValue(),
         "Category": oSelectCategory.getSelectedKey(),
         "Defect": oSelectDefect.getSelectedKey(),
         "PhotographedProd": oInputProdNumber.getValue(),
         "Model": oSelectModel.getSelectedKey(),
         "Varient": oSelectVarient.getSelectedKey(),
         "QualityStandardPackRef": oInputQualityStandardPackRef.getValue(),
         "MPAScore": oSegmentedButtonMPAScore.getSelectedKey(),
         
         "ReworkState": oSegmentedButtonReworkState.getSelectedKey(),
         "CurrentFPV": oSliderCurrentFPV.getValue(),
         "TimeImpact":oSegmentedButtonTimeImpact.getSelectedKey(),
         "Priority":oTextPriority.getText(),
         "Details": oTextArea.getValue(),
         "Images": JSON.stringify(images),

         "codeGroup":codeGroup,
         "damageCode":damageCode,

        "whenDetected":oComboBoxWhenDetected.getSelectedKey(),
         //"whereDetected":oComboBoxinitalLocations.getSelectedKey(), //where = initial
         //"PointOfDetection":oComboBoxInitialSensor.getSelectedKey(),
         //"howDetected":oComboBoxHowDetected.getSelectedKey(),
         "whosAffected":JSON.stringify(oMultiComboBoxAffected.getSelectedKeys()),
         //"milage":oInputMileage.getValue(),

         "location":oTextLocation.getText()
    }

    var options = {
        data: submissionObject
    };

    apioRestAPISaveConcern(options);
    console.log(submissionObject)
}

function saveConcernSuccess() {
    sap.m.MessageToast.show("Concern Saved!");

    if (sap.n) {
        oLayoutMain.to(localViewID + '--oPageSubmitted');
    } else {
        oLayoutMain.to('oPageSubmitted');
    }

    var referenceData = modeloModelObjectReference.getData();
    console.log(referenceData)

    apioRestAPIPush();

    var wfData = {
        //"id": "976725BF-1D09-476A-8C3F-11D8312E0A80",
        "id":  "04567FAE-FD42-EC11-981F-0050F2794553",
        "objectType": "",
        "objectKey": referenceData.reference,
        "amount": "",
        "currency": "",
        "approver": ""
    }
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "/api/functions/WorkflowInbox/Start",
        headers: { // Needed when triggered externally
            "Authorization": "Basic xxxx ", // Or use Bearer + token (JWT from user)
            "X-Requested-With": "XMLHttpRequest",
        },
        data: JSON.stringify(wfData),
        success: function (data) {
            setTimeout(function () {
                sap.m.MessageToast.show("Concern Submitted!");
            }, 1000);
        },
        error: function (result, status) {
            // Error Handler
        }
    });
}

function clearEverything() {

    oInputComponents.setValue("");
    oComboBoxWhenDetected.setValue("");
    oSelectCategory.setSelectedKey("");
    oSelectDefect.setSelectedKey("");
    oInputProdNumber.setValue("");
    oSelectModel.setSelectedKey("");
    oSelectVarient.setSelectedKey("");
    oInputQualityStandardPackRef.setValue("");
    oSegmentedButtonMPAScore.setSelectedKey("5");
    oInputPosition.setSelectedKey("");
    oSegmentedButtonReworkState.setSelectedKey("In line rework");
    oSliderCurrentFPV.setValue(0);
    oLabelCurrentFPV.setText("Current FPV - 0.00");
    oSegmentedButtonTimeImpact.setSelectedKey("< 10mins / Ontime TAKT");
    oTextArea.setValue("");
    oMessageStripSimilarConcerns.setVisible(false);
    oHBoxPriority.setVisible(false);
    oTextPriority.setText("");
    oMultiComboBoxAffected.clearSelection();
    
    oButtonGoToStepx.setVisible(true);
    oButtonSubmit.setVisible(false);


    var currentImages = modeloModelArrayImageStorage.getData();

    currentImages = [];

    modeloModelArrayImageStorage.setData(currentImages);
    modeloCarousel.setData(currentImages);

    oButtonDeletePicture.setVisible(false);

}