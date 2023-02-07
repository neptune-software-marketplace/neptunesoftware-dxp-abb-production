oButtonCreateQN.setEnabled(false);

if (sap.n) {
    sap.n.Shell.attachBeforeDisplay(function (startParams) {
        console.log(startParams);

        var options = {
            parameters: {
                "where": JSON.stringify({ "Reference": startParams.data.Reference }) // Optional 
            }
        };

        apioRestAPIGetConcernData(options);

    });
}
// ^^^ triggers vvv
function processGetConcernDataResponse() {

    oApp.setBusy(false);

    var data = modeloModelArrayData.getData();


    var dataSubset = data[0]
    console.log("DataSubset:");
    console.log(dataSubset);

    var QNreferenceID = dataSubset.QNreferenceID;

    console.log("QNreferenceID:");
    console.log(QNreferenceID);

    if (QNreferenceID === "" || QNreferenceID === null){

        console.log("--- Can create QN ---")
        // --- Can create QN ---
        oSimpleFormQNDetails.setVisible(true);
        oHBoxButton.setVisible(true);

        oSimpleFormQNData.setVisible(false);

        // --- MockSwitch
        //oSwitch.setEnabled(true);

    } else {

        console.log("--- QN ASSIGNED ---")
        // --- QN ASSIGNED ---
        oSimpleFormQNDetails.setVisible(false);
        oHBoxButton.setVisible(false);
        // --- View QN data
        oSimpleFormQNData.setVisible(true);
        oTitleQNReference.setText("QN ID: " + QNreferenceID)

        // GET SAP QN DATA
        var options = {
            parameters: {
                "where": JSON.stringify({ "QNID": dataSubset.QNreferenceID})
            }
        };
        
        apioRestAPICallSAPforQNdetailsMOCK(options);
        //******
        // Add real SAP QN /GET in here
        sap.m.MessageToast.show("Calling SAP to retrieve QN details...");
    }
}

function readyToSubmitQN() {
    var readyFlag = true;


    if (oComboBoxIssueType.getSelectedKey() === "") {
        var readyFlag = false;
    }
    if (oComboBoxSourceOfConcern.getSelectedKey() === "") {
        var readyFlag = false;
    }
    if (readyFlag === true){
        oButtonCreateQN.setEnabled(true);
    }


}


function TDLINEify(str) {
    //var str = 'abcdef \t\r\nghijkl';
    var parts = str.match(/[\s\S]{1,132}/g) || [];
    //["abc","def"," \t\r","\ngh","ijk", "l"]

    var finalArray = [];
    parts.forEach(element => finalArray.push({"TDLINE":element}));
    
    console.log(finalArray);
    return(finalArray);
}

function getQNdata() {

    var data = modeloModelArrayData.getData();
    var dataSubset = data[0];

    var concernHeader = dataSubset.Title +" - "+ dataSubset.Position +" - "+ dataSubset.Category +" - "+ dataSubset.Defect;
    console.log("concernHeader:");
    console.log(concernHeader);

    T_TEXT_CONCERN_array = TDLINEify(dataSubset.Details)
    T_TEXT_GAP_array = T_TEXT_CONCERN_array

    T_TEXT_SPECIFICATION_array = TDLINEify(dataSubset.QualityStandardPackRef)

    var dataForQN = {
            "S_CREATE_INFORMATION": {
                "ISSUE_TYPE": oComboBoxIssueType.getSelectedKey(),
                "CONCERN_SOURCE": oComboBoxSourceOfConcern.getSelectedKey(),
                "MATERIAL": "",
                "PLANT": "",
                "FAULT_CODE": "",
                "DAMAGE_CODE": "",
                "QUANTITY": 0,
                "PRIORITY": dataSubset.Priority,
                "VIN": dataSubset.PhotographedProd,
                "MODEL": dataSubset.Model,  
                "VARIANT": dataSubset.Varient,  
                "CONCERN_HEADER": concernHeader, // Component - Position - Cateorgy - SubCategory
                "SPEC_HEADER": dataSubset.QualityStandardPackRef,
                "NO_STANDARD_SPEC": "", // "X" if no QualityStandardPackRef available
                "GAP_HEADER": concernHeader, // = Concern Header
                "MILEAGE": 0,
                "MILEAGE_UNIT": ""
            },
            "T_TEXT_CONCERN": T_TEXT_CONCERN_array,
            "T_TEXT_GAP": T_TEXT_GAP_array, // === T_TEXT_CONCERN_array
            "T_TEXT_SPECIFICATION": T_TEXT_SPECIFICATION_array
        };
    return dataForQN;
}

// REAL SAP API
//"Concern: 000100042460 generated"
function createQN() {

    oApp.setBusy(true);
    
    sap.m.MessageToast.show("Creating QN...");

    var dataForQN = getQNdata();
    console.log("dataForQN:");
    console.log(dataForQN);
    
    var options = {
        parameters: {
            "sap-client": "500"
        },
        data: dataForQN
    };

    apioRestAPICreateQN(options);

};

// MOCK SAP API
function mockCreateQN() {

    oApp.setBusy(true);

    var dataForQN = getQNdata();
    console.log("dataForQN:");
    console.log(dataForQN);

    var stringifiedDataForQN = JSON.stringify(dataForQN)
    
    sap.m.MessageToast.show("Creating QN...");

    var randomEndOfID = Math.floor(Math.random() * (999 - 100 + 1) + 100);
    var fullMockQNID = "000100042"+randomEndOfID;

    var options = {
        data: {
            "QNID": fullMockQNID,
            "StringifiedData": stringifiedDataForQN
        }
    };

    apioRestAPICreateQNMOCK(options);

    modeloMultiModelQNReferenceResponseMOCK.setData({"mockQNID":fullMockQNID});
};


function showNextAddRolePartnerInput() {
    if (oLabelRolePartner5.getVisible() != true){
        oLabelRolePartner5.setVisible(true);
        oComboBoxRole5.setVisible(true);
        oComboBoxPartner5.setVisible(true);
        return;
    }
    if (oLabelRolePartner4.getVisible() != true){
        oLabelRolePartner4.setVisible(true);
        oComboBoxRole4.setVisible(true);
        oComboBoxPartner4.setVisible(true);
        return;
    }
    if (oLabelRolePartner3.getVisible() != true){
        oLabelRolePartner3.setVisible(true);
        oComboBoxRole3.setVisible(true);
        oComboBoxPartner3.setVisible(true);
        oButtonAddNewPerson.setVisible(false);
        return;
    }
};