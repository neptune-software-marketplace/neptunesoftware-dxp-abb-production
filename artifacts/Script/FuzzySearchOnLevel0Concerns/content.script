const body = req.body;

//{"data":"Door,Left,Damage,Unknown Damage"}
//Title,Position,Category,Defect

var dataArray = body.data.split(",");

var Fuse = modules.fusejs;

const table = entities.ccar_data_approved;
const data = await table.find({
    select: ["Title","Position","Category","Defect"]
});

const options = {
    useExtendedSearch: true,
    keys: ["Title","Position","Category","Defect"]
}

const fuse = new Fuse(data, options)

var searchTerm = dataArray[0]+" "+dataArray[1];

log.info(searchTerm);
const results = fuse.search(searchTerm)
log.info(results);
var numberOfHits = results.length;

if (numberOfHits != ""){
    result = numberOfHits;
} else {
    result = 0;
}



complete();