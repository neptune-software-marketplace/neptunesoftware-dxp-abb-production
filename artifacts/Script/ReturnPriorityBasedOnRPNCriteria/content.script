const data = req.body;
//{"data":"5,In line rework,0.02,5"}
var dataArray = data.data.split(",");
log.info(dataArray);

const fpv_values_table = await entities.fpv_values.createQueryBuilder("alias").getMany();

var FPVvalue = "0-0.2";

for (i = 0; i < fpv_values_table.length; i++) {
    if (fpv_values_table[i].upTo < dataArray[2]){
        FPVvalue = fpv_values_table[i].Value;
    } else {
        FPVvalue = fpv_values_table[i].Value;
        break;
    }
}

console.log(FPVvalue);
//dataArray[0]
//dataArray[1]
//dataArray[3]

const entity = await entities.rpnscorecalculations.findOne(
    {"MPAscore":dataArray[0],
    "ReqdRework":dataArray[1],
    "FPV":FPVvalue,
    "TimeImpact":dataArray[3]
    });

result = entity;

complete();