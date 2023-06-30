import { molecule, number } from "@ckb-lumos/codec";
import { blockchain } from "@ckb-lumos/base";

const { table, vector } = molecule;
export const { BytesOpt, Bytes, Byte32, Script, ScriptOpt, OutPoint } =
  blockchain;
export const { Uint32LE, Uint64LE, Uint128LE } = number;

/**
 * @typedef {import("@ckb-lumos/bi").BIish} BIish
 */

/**
 * @typedef {import("@ckb-lumos/codec").BytesLike} BytesLike
 */

/**
 * @typedef {Object} OtxKeyPairPOJO
 * @property {BIish} keyType
 * @property {BytesLike=} keyData
 * @property {BytesLike} valueData
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
 * @typedef {Object} OtxKeyPair
 * @property {(pojo: OtxKeyPairPOJO) => Uint8Array} pack Packs `OtxKeyPairPOJO` into molecule buffer.
 * @property {(buf: BytesLike) => OtxKeyPairPOJO} unpack Unpacks molecule buffer into `OtxKeyPairPOJO`.
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
 * Molecule packer for tye type OtxMap.
 *
 * ```
 * vector OtxMap <OtxKeyPair>;
 * ```
 *
 * @typedef {Object} OtxMap
 * @property {(pojo: Array<OtxKeyPairPOJO>) => Uint8Array} pack Packs `Array<OtxKeyPairPojo>` into molecule buffer.
 * @property {(buf: BytesLike) => Array<OtxKeyPairPOJO>} unpack Unpacks molecule buffer into `Array<OtxKeyPairPOJO>`.
 */
export const OtxMap = vector(OtxKeyPair);

/**
 * Molecule packer for tye type OtxMap.
 *
 * ```
 * vector OtxMapVec <OtxMap>;
 * ```
 *
 * @typedef {Object} OtxMapVec
 * @property {(pojo: Array<Array<OtxKeyPairPOJO>>) => Uint8Array} pack Packs `Array<Array<OtxKeyPairPojo>>` into molecule buffer.
 * @property {(buf: BytesLike) => Array<Array<OtxKeyPairPOJO>>} unpack Unpacks molecule buffer into `Array<Array<OtxKeyPairPOJO>>`.
 */
export const OtxMapVec = vector(OtxMap);

/**
 * @typedef {Object} OpenTransactionPOJO
 * @property {Array<OtxKeyPairPOJO>} meta
 * @property {Array<Array<OtxKeyPairPOJO>>} cellDeps
 * @property {Array<Array<OtxKeyPairPOJO>>} headerDeps
 * @property {Array<Array<OtxKeyPairPOJO>>} inputs
 * @property {Array<Array<OtxKeyPairPOJO>>} witnesses
 * @property {Array<Array<OtxKeyPairPOJO>>} outputs
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
 * @typedef {Object} OpenTransaction
 * @property {(pojo: OpenTransactionPOJO) => Uint8Array} pack Packs `OpenTransactionPOJO` into molecule buffer.
 * @property {(buf: BytesLike) => OpenTransactionPOJO} unpack Unpacks molecule buffer into `OpenTransactionPOJO`.
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
