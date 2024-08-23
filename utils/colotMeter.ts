export const getColorForVote = (measure: number): string => {
  if (measure <= 1) {
    return '#CC0000'; // Rojo oscuro
  } else if (measure <= 2) {
    return '#CC3700'; // Naranja rojizo oscuro
  } else if (measure <= 3) {
    return '#CC513A'; // Rojo tomate oscuro
  } else if (measure <= 4) {
    return '#CC7300'; // Naranja oscuro
  } else if (measure <= 5) {
    return '#CC8400'; // Ámbar oscuro
  } else if (measure <= 6) {
    return '#CCAC00'; // Dorado oscuro
  } else if (measure <= 7) {
    return '#89CC0D'; // Verde amarillo oscuro
  } else if (measure <= 8) {
    return '#65A800'; // Verde oscuro
  } else if (measure <= 9) {
    return '#289B1A'; // Lima oscuro
  } else {
    return '#004B00'; // Verde oscuro profundo
  }
};
