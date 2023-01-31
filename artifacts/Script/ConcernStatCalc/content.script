await tables.concern_stats.destroy({});

const table = entities.ccar_data_approved;
const data_approved = await table.find({
    select: ["Priority"]
});

var low = 0;
var medium = 0;
var high = 0;

for (i = 0; i < data_approved.length; i++) {
    if (data_approved[i].Priority === "5"){
        low++
    }
    if (data_approved[i].Priority === "3"){
        medium++
    }
    if (data_approved[i].Priority === "1"){
        high++
    }
}

var obj = {
    "Priority":"Low",
    "Count":low,
}
await entities.concern_stats.insert(obj)
var obj = {
    "Priority":"Medium",
    "Count":medium,
}
await entities.concern_stats.insert(obj)
var obj = {
    "Priority":"High",
    "Count":high,
}
await entities.concern_stats.insert(obj)


complete();