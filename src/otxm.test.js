import { OtxKeyPair, OtxMap, OtxMapVec, OpenTransaction } from "./otxm.js";

test("OtxKeyPair without keyData", () => {
  const pojo = { keyType: 1, valueData: "0x0f" };
  const buf = OtxKeyPair.pack(pojo);
  expect(buf).toMatchSnapshot();
  expect(OtxKeyPair.unpack(buf)).toEqual(pojo);
});

test("OtxKeyPair with keyData", () => {
  const pojo = { keyType: 1, keyData: "0x0a", valueData: "0x0f" };
  const buf = OtxKeyPair.pack(pojo);
  expect(buf).toMatchSnapshot();
  expect(OtxKeyPair.unpack(buf)).toEqual(pojo);
});

test("OtxMap", () => {
  const pojo = [
    { keyType: 1, keyData: "0x0a", valueData: "0x0e" },
    { keyType: 2, valueData: "0x0f" },
  ];
  const buf = OtxMap.pack(pojo);
  expect(buf).toMatchSnapshot();
  expect(OtxMap.unpack(buf)).toEqual(pojo);
});

test("OtxMapVec", () => {
  const pojo = [
    [
      { keyType: 1, keyData: "0x0a", valueData: "0x0e" },
      { keyType: 2, valueData: "0x0f" },
    ],
    [
      { keyType: 3, keyData: "0xfa", valueData: "0xfe" },
      { keyType: 4, valueData: "0xff" },
    ],
  ];
  const buf = OtxMapVec.pack(pojo);
  expect(buf).toMatchSnapshot();
  expect(OtxMapVec.unpack(buf)).toEqual(pojo);
});

test("OpenTransaction", () => {
  const pojo = {
    meta: [
      { keyType: 1, keyData: "0x0a", valueData: "0x0e" },
      { keyType: 2, valueData: "0x0f" },
    ],
    cellDeps: [[{ keyType: 3, valueData: "0xff03" }]],
    headerDeps: [[{ keyType: 4, valueData: "0xff04" }]],
    inputs: [[{ keyType: 5, valueData: "0xff05" }]],
    witnesses: [[{ keyType: 6, keyData: "0x06", valueData: "0xff06" }]],
    outputs: [[{ keyType: 7, keyData: "0x07", valueData: "0xff07" }]],
  };

  const buf = OpenTransaction.pack(pojo);
  expect(buf).toMatchSnapshot();
  expect(OpenTransaction.unpack(buf)).toEqual(pojo);
});
