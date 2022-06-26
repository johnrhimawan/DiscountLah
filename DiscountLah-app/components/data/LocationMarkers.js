import boostImage from "../../assets/boostlogo.png";
import coopImage from "../../assets/cooplogo.jpg";
import hmImage from "../../assets/hmlogo.jpg";
import kfcImage from "../../assets/kfclogo.jpg";
import donkiImage from "../../assets/donkilogo.png";

// const LocationMarkers = [
//     {index:1,storeName:'Boost',latitude:1.37995467139748,longitude:103.764129602835,address:'Address',storeImg:boostImage,},
//     {index:2,storeName:'Boost',latitude:1.33305015715937,longitude:103.743538388947,address:'Address',storeImg:boostImage,},
//     {index:3,storeName:'Boost',latitude:1.26405200900252,longitude:103.822350315425,address:'Address',storeImg:boostImage,},
//     {index:4,storeName:'Boost',latitude:1.31104862488131,longitude:103.796148593384,address:'Address',storeImg:boostImage,},
//     {index:5,storeName:'Boost',latitude:1.28644607418018,longitude:103.826673418133,address:'Address',storeImg:boostImage,},
//     {index:6,storeName:'Boost',latitude:1.30418485312808,longitude:103.831872485505,address:'Address',storeImg:boostImage,},
//     {index:7,storeName:'Boost',latitude:1.30394226708228,longitude:103.835615062356,address:'Address',storeImg:boostImage,},
//     {index:8,storeName:'Boost',latitude:1.30098110799206,longitude:103.838402197966,address:'Address',storeImg:boostImage,},
//     {index:9,storeName:'Boost',latitude:1.30060799686999,longitude:103.845003507324,address:'Address',storeImg:boostImage,},
//     {index:10,storeName:'Boost',latitude:1.29949578696872,longitude:103.85546343811,address:'Address',storeImg:boostImage,},
//     {index:11,storeName:'Boost',latitude:1.29393377984531,longitude:103.853235068697,address:'Address',storeImg:boostImage,},
//     {index:12,storeName:'Boost',latitude:1.28915100750262,longitude:103.846733062982,address:'Address',storeImg:boostImage,},
//     {index:13,storeName:'Boost',latitude:1.28415302238084,longitude:103.852050052938,address:'Address',storeImg:boostImage,},
//     {index:14,storeName:'Boost',latitude:1.29507073286702,longitude:103.858323555049,address:'Address',storeImg:boostImage,},
//     {index:15,storeName:'Boost',latitude:1.31124455067882,longitude:103.856657036308,address:'Address',storeImg:boostImage,},
//     {index:16,storeName:'Boost',latitude:1.35017958662126,longitude:103.873279998153,address:'Address',storeImg:boostImage,},
//     {index:17,storeName:'Boost',latitude:1.30535435296748,longitude:103.904781552834,address:'Address',storeImg:boostImage,},
//     {index:18,storeName:'Boost',latitude:1.32432959946394,longitude:103.929864757106,address:'Address',storeImg:boostImage,},
//     {index:19,storeName:'Boost',latitude:1.35368346046089,longitude:103.945236173532,address:'Address',storeImg:boostImage,},
//     {index:20,storeName:'Don Don Donki',latitude:1.33329905202402,longitude:103.7398971928,address:'Address',storeImg:donkiImage,},
//     {index:21,storeName:'Don Don Donki',latitude:1.33266325256339,longitude:103.743208775363,address:'Address',storeImg:donkiImage,},
//     {index:22,storeName:'Don Don Donki',latitude:1.26349910400559,longitude:103.820194858127,address:'Address',storeImg:donkiImage,},
//     {index:23,storeName:'Don Don Donki',latitude:1.27494044168757,longitude:103.843412725074,address:'Address',storeImg:donkiImage,},
//     {index:24,storeName:'Don Don Donki',latitude:1.29316485617235,longitude:103.856775835383,address:'Address',storeImg:donkiImage,},
//     {index:25,storeName:'Don Don Donki',latitude:1.28905805905311,longitude:103.846665173758,address:'Address',storeImg:donkiImage,},
//     {index:26,storeName:'Don Don Donki',latitude:1.30022528509088,longitude:103.840117461374,address:'Address',storeImg:donkiImage,},
//     {index:27,storeName:'Don Don Donki',latitude:1.31139619473103,longitude:103.856590355068,address:'Address',storeImg:donkiImage,},
//     {index:28,storeName:'Don Don Donki',latitude:1.32101890999002,longitude:103.843977940735,address:'Address',storeImg:donkiImage,},
//     {index:29,storeName:'Don Don Donki',latitude:1.40673972112358,longitude:103.902478966483,address:'Address',storeImg:donkiImage,},
//     {index:30,storeName:'Don Don Donki',latitude:1.35387348422328,longitude:103.945447455091,address:'Address',storeImg:donkiImage,},
//     {index:31,storeName:'Don Don Donki',latitude:1.37715278574143,longitude:103.954913813463,address:'Address',storeImg:donkiImage,},
//     {index:32,storeName:'H&M',latitude:1.33308098669627,longitude:103.742938968144,address:'Address',storeImg:hmImage,},
//     {index:33,storeName:'H&M',latitude:1.2647968044391,longitude:103.822278656412,address:'Address',storeImg:hmImage,},
//     {index:34,storeName:'H&M',latitude:1.3046438361612,longitude:103.831900850149,address:'Address',storeImg:hmImage,},
//     {index:35,storeName:'H&M',latitude:1.30145087477954,longitude:103.837256771413,address:'Address',storeImg:hmImage,},
//     {index:36,storeName:'H&M',latitude:1.31726404982937,longitude:103.843579063621,address:'Address',storeImg:hmImage,},
//     {index:37,storeName:'H&M',latitude:1.29326276434823,longitude:103.856699441773,address:'Address',storeImg:hmImage,},
//     {index:38,storeName:'H&M',latitude:1.30306213453393,longitude:103.873826537509,address:'Address',storeImg:hmImage,},
//     {index:39,storeName:'H&M',latitude:1.31753920053605,longitude:103.89286928489,address:'Address',storeImg:hmImage,},
//     {index:40,storeName:'H&M',latitude:1.35073724443544,longitude:103.872376900412,address:'Address',storeImg:hmImage,},
//     {index:41,storeName:'KFC',latitude:1.35296932720941,longitude:103.94035590121,address:'1 Tampines Walk, #01-13/14 Our Tampines Hub, Singapore 528523',storeImg:kfcImage,},
//     {index:42,storeName:'KFC',latitude:1.39226369006231,longitude:103.904448132254,address:'11 Rivervale Crescent, #01-36, Rivervale Mall, Singapore 545082',storeImg:kfcImage,},
//     {index:43,storeName:'KFC',latitude:1.31755503361536,longitude:103.892790989953,address:'10 Paya Lebar Rd, #B1-14 PLQ Mall, Singapore 409057',storeImg:kfcImage,},
//     {index:44,storeName:'KFC',latitude:1.30500448703393,longitude:103.881370181751,address:'190 Stadium Blvd, Singapore 397800',storeImg:kfcImage,},
//     {index:45,storeName:'KFC',latitude:1.2999914734724,longitude:103.855764895367,address:'Address',storeImg:kfcImage,},
//     {index:46,storeName:'KFC',latitude:1.28545434904288,longitude:103.845237751201,address:'Address',storeImg:kfcImage,},
//     {index:47,storeName:'KFC',latitude:1.30054800116768,longitude:103.845237281893,address:'Address',storeImg:kfcImage,},
//     {index:48,storeName:'KFC',latitude:1.31139967408112,longitude:103.856589183196,address:'Address',storeImg:kfcImage,},
//     {index:49,storeName:'KFC',latitude:1.31996608186906,longitude:103.843894958417,address:'Address',storeImg:kfcImage,},
//     {index:50,storeName:'KFC',latitude:1.30708213743535,longitude:103.833305789312,address:'Address',storeImg:kfcImage,},
//     {index:51,storeName:'KFC',latitude:1.37085532863792,longitude:103.845913094632,address:'Address',storeImg:kfcImage,},
//     {index:52,storeName:'KFC',latitude:1.32362509559733,longitude:103.810266717731,address:'Address',storeImg:kfcImage,},
//     {index:53,storeName:'KFC',latitude:1.4179122956715,longitude:103.841447651292,address:'Address',storeImg:kfcImage,},
//     {index:54,storeName:'KFC',latitude:1.42868058394946,longitude:103.835738177076,address:'Address',storeImg:kfcImage,},
//     {index:55,storeName:'KFC',latitude:1.4291812494621,longitude:103.781075366097,address:'Address',storeImg:kfcImage,},
//     {index:56,storeName:'KFC',latitude:1.30837578332511,longitude:103.762236850434,address:'Address',storeImg:kfcImage,},
//     {index:57,storeName:'KFC',latitude:1.34717293595304,longitude:103.729312308231,address:'Address',storeImg:kfcImage,},
//     {index:58,storeName:'NUS Co-op',latitude:1.29675879570558,longitude:103.773690497037,address:'12 Kent Ridge Crescent, Central Library Building, CLB01-02, Singapore 119275',storeImg:coopImage,},
//     {index:59,storeName:'NUS Co-op',latitude:1.29701792541992,longitude:103.780995208314,address:'27 Science Drive 1, Lecture Theatre, LT27, Singapore 117541',storeImg:coopImage,},
// ];

const LocationMarkers = [
  {
    index: 1,
    storeName: "Boost",
    latitude: 1.37995467139748,
    longitude: 103.764129602835,
    address: "Address",
    storeImg: boostImage,
  },
  {
    index: 2,
    storeName: "Boost",
    latitude: 1.33305015715937,
    longitude: 103.743538388947,
    address: "Address",
    storeImg: boostImage,
  },
  {
    index: 3,
    storeName: "Boost",
    latitude: 1.26405200900252,
    longitude: 103.822350315425,
    address: "Address",
    storeImg: boostImage,
  },
  {
    index: 4,
    storeName: "Boost",
    latitude: 1.31104862488131,
    longitude: 103.796148593384,
    address: "Address",
    storeImg: boostImage,
  },
  {
    index: 5,
    storeName: "Boost",
    latitude: 1.28644607418018,
    longitude: 103.826673418133,
    address: "Address",
    storeImg: boostImage,
  },
  {
    index: 6,
    storeName: "Don Don Donki",
    latitude: 1.33329905202402,
    longitude: 103.7398971928,
    address: "Address",
    storeImg: donkiImage,
  },
  {
    index: 7,
    storeName: "Don Don Donki",
    latitude: 1.33266325256339,
    longitude: 103.743208775363,
    address: "Address",
    storeImg: donkiImage,
  },
  {
    index: 8,
    storeName: "Don Don Donki",
    latitude: 1.26349910400559,
    longitude: 103.820194858127,
    address: "Address",
    storeImg: donkiImage,
  },
  {
    index: 9,
    storeName: "H&M",
    latitude: 1.33308098669627,
    longitude: 103.742938968144,
    address: "Address",
    storeImg: hmImage,
  },
  {
    index: 10,
    storeName: "H&M",
    latitude: 1.2647968044391,
    longitude: 103.822278656412,
    address: "Address",
    storeImg: hmImage,
  },
  {
    index: 11,
    storeName: "H&M",
    latitude: 1.3046438361612,
    longitude: 103.831900850149,
    address: "Address",
    storeImg: hmImage,
  },
  {
    index: 12,
    storeName: "H&M",
    latitude: 1.30145087477954,
    longitude: 103.837256771413,
    address: "Address",
    storeImg: hmImage,
  },
  {
    index: 13,
    storeName: "H&M",
    latitude: 1.31726404982937,
    longitude: 103.843579063621,
    address: "Address",
    storeImg: hmImage,
  },
  {
    index: 14,
    storeName: "KFC",
    latitude: 1.35296932720941,
    longitude: 103.94035590121,
    address: "1 Tampines Walk, #01-13/14 Our Tampines Hub, Singapore 528523",
    storeImg: kfcImage,
  },
  {
    index: 15,
    storeName: "KFC",
    latitude: 1.39226369006231,
    longitude: 103.904448132254,
    address: "11 Rivervale Crescent, #01-36, Rivervale Mall, Singapore 545082",
    storeImg: kfcImage,
  },
  {
    index: 16,
    storeName: "KFC",
    latitude: 1.31755503361536,
    longitude: 103.892790989953,
    address: "10 Paya Lebar Rd, #B1-14 PLQ Mall, Singapore 409057",
    storeImg: kfcImage,
  },
  {
    index: 17,
    storeName: "KFC",
    latitude: 1.30500448703393,
    longitude: 103.881370181751,
    address: "190 Stadium Blvd, Singapore 397800",
    storeImg: kfcImage,
  },
  {
    index: 18,
    storeName: "KFC",
    latitude: 1.2999914734724,
    longitude: 103.855764895367,
    address: "Address",
    storeImg: kfcImage,
  },
  {
    index: 19,
    storeName: "NUS Co-op",
    latitude: 1.29675879570558,
    longitude: 103.773690497037,
    address:
      "12 Kent Ridge Crescent, Central Library Building, CLB01-02, Singapore 119275",
    storeImg: coopImage,
  },
  {
    index: 20,
    storeName: "NUS Co-op",
    latitude: 1.29701792541992,
    longitude: 103.780995208314,
    address: "27 Science Drive 1, Lecture Theatre, LT27, Singapore 117541",
    storeImg: coopImage,
  },
];

export default LocationMarkers;
