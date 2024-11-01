export async function CreateID(collection) {
  const ultimoDocumento = await collection.findOne({}, { sort: { _id: -1 } });
  if (!ultimoDocumento) {
    return 1;
  } else {
    return ultimoDocumento._id + 1;
  }
}