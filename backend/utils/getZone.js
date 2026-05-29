const southernZoneGroupA = [
  "Abia",
  "Akwa Ibom",
  "Anambra",
  "Cross River",
  "Delta",
  "Edo",
  "Ekiti",
  "Imo",
  "Lagos",
  "Ondo"
];

const southernZoneGroupB = [
  "Bayelsa",
  "Ebonyi",
  "Enugu",
  "Kwara",
  "Ogun",
  "Osun",
  "Oyo",
  "Rivers"
];

const northernZoneGroupA = [
  "Adamawa",
  "Borno",
  "Gombe",
  "Kaduna",
  "Kogi",
  "Nasarawa",
  "Niger",
  "Taraba",
  "Yobe",
  "Zamfara"
];

const northernZoneGroupB = [
  "Bauchi",
  "Benue",
  "FCT Abuja",
  "Jigawa",
  "Kano",
  "Katsina",
  "Kebbi",
  "Plateau",
  "Sokoto"
];

function getZone(state, gender, grade) {

  // Only MALE + Grade ONE
  if (
    gender !== "Male" ||
    grade !== "One"
  ) {
    return "";
  }

  if (southernZoneGroupA.includes(state)) {
    return "Southern Zone Group A";
  }

  if (southernZoneGroupB.includes(state)) {
    return "Southern Zone Group B";
  }

  if (northernZoneGroupA.includes(state)) {
    return "Northern Zone Group A";
  }

  if (northernZoneGroupB.includes(state)) {
    return "Northern Zone Group B";
  }

  return "";
}

function getFemaleZone(state, gender, grade) {

  // Only MALE + Grade ONE
  if (
    gender !== "Female" ||
    grade !== "One"
  ) {
    return "";
  }

  if (southernZoneGroupA.includes(state) || southernZoneGroupB.includes(state) ) {
    return "Female Southern Zone";
  }

  if (northernZoneGroupA.includes(state) || northernZoneGroupB.includes(state)) {
    return "Female Northern Zone";
  }

  return "";
}



module.exports = {
    getZone,
    getFemaleZone
} ;