import dummyImage from "../../assets/dummy.jpg";

const oldData = [
  {
    index: 1,
    storeName: "McDonald's",
    storeImage: dummyImage,
    coordinate: {
      latitude: -6.127354534872745,
      longitude: 106.7137397980536,
    },
    desc: "50% off Big Mac with min. purchase of $50",
    validity: "10 August 2022",
  },
  {
    index: 2,
    storeName: "Carrefour",
    storeImage: dummyImage,
    coordinate: {
      latitude: -6.139254303207878,
      longitude: 106.73203398803673,
    },
    desc: "10% discount with min. purchase of $50",
    validity: "10 August 2022",
  },
  {
    index: 3,
    storeName: "Starbucks",
    storeImage: dummyImage,
    coordinate: {
      latitude: -6.127111701983852,
      longitude: 106.71275667709567,
    },
    desc: "Free upsize to Venti",
    validity: "10 August 2022",
  },
];

export default Data;

const Data = [
  {
    id: 1,
    storeName: "KFC",
    storeImage: dummyImage,
    locations: [
      { latitude: 1.32739293228269, longitude: 103.722555899924 },
      { latitude: 1.35401758299676, longitude: 103.731583676724 },
      { latitude: 1.31392187010373, longitude: 103.763059354915 },
      { latitude: 1.32899985815476, longitude: 103.81073793297 },
      { latitude: 1.37763789658784, longitude: 103.846740124562 },
      { latitude: 1.34602328236013, longitude: 103.84625360846 },
      { latitude: 1.35818279840408, longitude: 103.874958058513 },
      { latitude: 1.34164584171234, longitude: 103.870092897487 },
      { latitude: 1.32754070202728, longitude: 103.864741220358 },
      { latitude: 1.32754070202728, longitude: 103.842847995741 },
      { latitude: 1.31732658507538, longitude: 103.855497414409 },
      { latitude: 1.31538103423194, longitude: 103.833604189792 },
      { latitude: 1.30662603669669, longitude: 103.845280576254 },
      { latitude: 1.30905798352599, longitude: 103.857929994922 },
      { latitude: 1.29008873604186, longitude: 103.845767092357 },
      { latitude: 1.28960234321212, longitude: 103.816089610099 },
      { latitude: 1.29787100864774, longitude: 103.806845804149 },
      { latitude: 1.28182004531855, longitude: 103.796142449892 },
      { latitude: 1.27355132789413, longitude: 103.823387351638 },
      { latitude: 1.31003076159749, longitude: 103.882742316154 },
    ]
  },
];
