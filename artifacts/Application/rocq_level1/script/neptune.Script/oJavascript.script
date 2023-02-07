if (sap.n) {
    sap.n.Shell.attachBeforeDisplay(function (startParams) {
        console.log(startParams);

        var options = {
            parameters: {
                "where": JSON.stringify({"Reference": startParams.data.Reference}) // Optional 
            }
        };

        apioRestAPIGetConcernData(options);

    });
}