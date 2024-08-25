export const getColorForVote = (measure: number): string => {
  if (measure == 0) {
    return '#CC000000';
  } else if (measure <= 1) {
    return '#CC0000';
  } else if (measure <= 2) {
    return '#CC3700';
  } else if (measure <= 3) {
    return '#CC513A';
  } else if (measure <= 4) {
    return '#CC7300';
  } else if (measure <= 5) {
    return '#CC8400';
  } else if (measure <= 6) {
    return '#CCAC00';
  } else if (measure <= 7) {
    return '#89CC0D';
  } else if (measure <= 8) {
    return '#65A800';
  } else if (measure <= 9) {
    return '#289B1A';
  } else {
    return '#004B00';
  }
};
