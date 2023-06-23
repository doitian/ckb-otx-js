/** @module otxm */
import { molecule, number } from "@ckb-lumos/codec";
import { BI } from "@ckb-lumos/bi";
import { blockchain } from "@ckb-lumos/base";

const { table, vector } = molecule;
export const { BytesOpt, Bytes, Byte32, Script, ScriptOpt, OutPoint } =
  blockchain;
export const { Uint32LE, Uint64LE, Uint128LE } = number;

/**
 * Numbers that can be converted into BI, examples:
 * - Number in hex string: `"0x1"`
 * - JavaScript Number: `1`
 * - Number in decimal string: `"1"`
 * @typedef {import("@ckb-lumos/bi").BIish} BIish
 */

/**
 * Bytes like data, examples:
 * - Hex string: `"0x68656c6c6f"`
 * - Uint8Array: `[0x68, 0x65, 0x6c, 0x6c, 0x6f]`
 * @typedef {import("@ckb-lumos/codec").BytesLike} BytesLike
 */

/**
 * @typedef {Object} OtxKeyPairPOJO
 * @property {BIish} keyType
 * @property {BytesLike=} keyData
 * @property {BytesLike} valueData
 */

/**
 * @callback packOtxKeyPair
 * @param {OtxKeyPairPOJO} pojo
 * @returns {Uint8Array}
 */

/**
 * @typedef {Object} OtxKeyPair
 * @property {function(OtxKeyPairPOJO): Uint8Array} pack `(pojo: [OtxKeyPairPOJO]{@link module:otxm~OtxKeyPairPOJO}) => Uint8Array` packs OtxKeyPairPojo into molecule buffer.
 * @property {function(BytesLike): OtxKeyPairPOJO} unpack `(buf: [BytesLike]{@link module:otxm~BytesLike}) => [OtxKeyPairPOJO]{@link module:otxm~OtxKeyPairPOJO}` unpacks molecule buffer into OtxKeyPairPOJO.
 */

/**
 * Molecule packer for tye type OtxKeyPair.
 *
 * ```
 * table OtxKeyPair {
 *   keyType: Uint32,
 *   keyData: BytesOpt,
 *   valueData: Bytes,
 * }
 * ```
 *
 * @type {OtxKeyPair}
 */
export const OtxKeyPair = table(
  {
    keyType: Uint32LE,
    keyData: BytesOpt,
    valueData: Bytes,
  },
  ["keyType", "keyData", "valueData"]
);

/**
 * @typedef {Object} OtxMap
 * @property {function(OtxKeyPairPOJO[]): Uint8Array} pack `(pojo: [OtxKeyPairPOJO]{@link module:otxm~OtxKeyPairPOJO}[]) => Uint8Array` packs OtxKeyPairPojo[] into molecule buffer.
 * @property {function(BytesLike): OtxKeyPairPOJO[]} unpack `(buf: [BytesLike]{@link module:otxm~BytesLike}) => [OtxKeyPairPOJO]{@link module:otxm~OtxKeyPairPOJO}[]` unpacks molecule buffer into OtxKeyPairPOJO[].
 */

/**
 * Molecule packer for tye type OtxMap.
 *
 * ```
 * vector OtxMap <OtxKeyPair>;
 * ```
 *
 * @type {OtxMap}
 */
export const OtxMap = vector(OtxKeyPair);

/**
 * @typedef {Object} OtxMapVec
 * @property {function(OtxKeyPairPOJO[][]): Uint8Array} pack `(pojo: [OtxKeyPairPOJO]{@link module:otxm~OtxKeyPairPOJO}[][]) => Uint8Array` packs OtxKeyPairPojo[][] into molecule buffer.
 * @property {function(BytesLike): OtxKeyPairPOJO[][]} unpack `(buf: [BytesLike]{@link module:otxm~BytesLike}) => [OtxKeyPairPOJO]{@link module:otxm~OtxKeyPairPOJO}[][]` unpacks molecule buffer into OtxKeyPairPOJO[][].
 */

/**
 * Molecule packer for tye type OtxMap.
 *
 * ```
 * vector OtxMapVec <OtxMap>;
 * ```
 *
 * @type {OtxMapVec}
 */
export const OtxMapVec = vector(OtxMap);

/**
 * @typedef {Object} OpenTransactionPOJO
 * @property {OtxKeyPairPOJO[]} meta
 * @property {OtxKeyPairPOJO[][]} cellDeps
 * @property {OtxKeyPairPOJO[][]} headerDeps
 * @property {OtxKeyPairPOJO[][]} inputs
 * @property {OtxKeyPairPOJO[][]} witnesses
 * @property {OtxKeyPairPOJO[][]} outputs
 */

/**
 * @typedef {Object} OpenTransaction
 * @property {function(OpenTransactionPOJO): Uint8Array} pack `(pojo: [OpenTransactionPOJO]{@link module:otxm~OpenTransactionPOJO}) => Uint8Array` packs OpenTransactionPOJO into molecule buffer.
 * @property {function(BytesLike): OpenTransactionPOJO} unpack `(buf: [BytesLike]{@link module:otxm~BytesLike}) => [OpenTransactionPOJO]{@link module:otxm~OpenTransactionPOJO}` unpacks molecule buffer into OpenTransactionPOJO.
 */

/**
 * Molecule packer for tye type OpenTransaction.
 *
 * ```
 * table OpenTransaction {
 *   meta: OtxMap,
 *   cell_deps: OtxMapVec,
 *   header_deps: OtxMapVec,
 *   inputs: OtxMapVec,
 *   witnesses: OtxMapVec,
 *   outputs: OtxMapVec,
 * }
 * ```
 *
 * @type {OpenTransaction}
 */
export const OpenTransaction = table(
  {
    meta: OtxMap,
    cellDeps: OtxMapVec,
    headerDeps: OtxMapVec,
    inputs: OtxMapVec,
    witnesses: OtxMapVec,
    outputs: OtxMapVec,
  },
  ["meta", "cellDeps", "headerDeps", "inputs", "witnesses", "outputs"]
);
