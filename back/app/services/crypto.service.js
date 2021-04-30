function encodeMessage(message) {
  //todo: encode message and return
}

function storeVaccine() {

}

function testGetVaccines() {
  let warehouse = db.getWarehouse();
  console.log(warehouse.listVaccinesByTime());
  console.log(getVaccines('CoronaVac', 3));
}

testGetVaccines();

module.exports = {
  getVaccines,
  storeVaccine,
};
