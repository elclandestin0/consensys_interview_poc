/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import BN from "bn.js";
import { EventData, PastEventOptions } from "web3-eth-contract";

export interface CollateralTokenContract
  extends Truffle.Contract<CollateralTokenInstance> {
  "new"(
    initialOwner: string,
    meta?: Truffle.TransactionDetails
  ): Promise<CollateralTokenInstance>;
}

export interface Approval {
  name: "Approval";
  args: {
    owner: string;
    approved: string;
    tokenId: BN;
    0: string;
    1: string;
    2: BN;
  };
}

export interface ApprovalForAll {
  name: "ApprovalForAll";
  args: {
    owner: string;
    operator: string;
    approved: boolean;
    0: string;
    1: string;
    2: boolean;
  };
}

export interface OwnershipTransferred {
  name: "OwnershipTransferred";
  args: {
    previousOwner: string;
    newOwner: string;
    0: string;
    1: string;
  };
}

export interface Transfer {
  name: "Transfer";
  args: {
    from: string;
    to: string;
    tokenId: BN;
    0: string;
    1: string;
    2: BN;
  };
}

type AllEvents = Approval | ApprovalForAll | OwnershipTransferred | Transfer;

export interface CollateralTokenInstance extends Truffle.ContractInstance {
  /**
   * See {IERC721-approve}.
   */
  approve: {
    (
      to: string,
      tokenId: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<Truffle.TransactionResponse<AllEvents>>;
    call(
      to: string,
      tokenId: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<void>;
    sendTransaction(
      to: string,
      tokenId: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      to: string,
      tokenId: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  /**
   * See {IERC721-balanceOf}.
   */
  balanceOf(owner: string, txDetails?: Truffle.TransactionDetails): Promise<BN>;

  /**
   * See {IERC721-getApproved}.
   */
  getApproved(
    tokenId: number | BN | string,
    txDetails?: Truffle.TransactionDetails
  ): Promise<string>;

  /**
   * See {IERC721-isApprovedForAll}.
   */
  isApprovedForAll(
    owner: string,
    operator: string,
    txDetails?: Truffle.TransactionDetails
  ): Promise<boolean>;

  /**
   * See {IERC721Metadata-name}.
   */
  name(txDetails?: Truffle.TransactionDetails): Promise<string>;

  /**
   * Returns the address of the current owner.
   */
  owner(txDetails?: Truffle.TransactionDetails): Promise<string>;

  /**
   * See {IERC721-ownerOf}.
   */
  ownerOf(
    tokenId: number | BN | string,
    txDetails?: Truffle.TransactionDetails
  ): Promise<string>;

  /**
   * Leaves the contract without owner. It will not be possible to call `onlyOwner` functions. Can only be called by the current owner. NOTE: Renouncing ownership will leave the contract without an owner, thereby disabling any functionality that is only available to the owner.
   */
  renounceOwnership: {
    (txDetails?: Truffle.TransactionDetails): Promise<
      Truffle.TransactionResponse<AllEvents>
    >;
    call(txDetails?: Truffle.TransactionDetails): Promise<void>;
    sendTransaction(txDetails?: Truffle.TransactionDetails): Promise<string>;
    estimateGas(txDetails?: Truffle.TransactionDetails): Promise<number>;
  };

  /**
   * See {IERC721-setApprovalForAll}.
   */
  setApprovalForAll: {
    (
      operator: string,
      approved: boolean,
      txDetails?: Truffle.TransactionDetails
    ): Promise<Truffle.TransactionResponse<AllEvents>>;
    call(
      operator: string,
      approved: boolean,
      txDetails?: Truffle.TransactionDetails
    ): Promise<void>;
    sendTransaction(
      operator: string,
      approved: boolean,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      operator: string,
      approved: boolean,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  /**
   * See {IERC165-supportsInterface}.
   */
  supportsInterface(
    interfaceId: string,
    txDetails?: Truffle.TransactionDetails
  ): Promise<boolean>;

  /**
   * See {IERC721Metadata-symbol}.
   */
  symbol(txDetails?: Truffle.TransactionDetails): Promise<string>;

  /**
   * See {IERC721Metadata-tokenURI}.
   */
  tokenURI(
    tokenId: number | BN | string,
    txDetails?: Truffle.TransactionDetails
  ): Promise<string>;

  /**
   * See {IERC721-transferFrom}.
   */
  transferFrom: {
    (
      from: string,
      to: string,
      tokenId: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<Truffle.TransactionResponse<AllEvents>>;
    call(
      from: string,
      to: string,
      tokenId: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<void>;
    sendTransaction(
      from: string,
      to: string,
      tokenId: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      from: string,
      to: string,
      tokenId: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  /**
   * Transfers ownership of the contract to a new account (`newOwner`). Can only be called by the current owner.
   */
  transferOwnership: {
    (newOwner: string, txDetails?: Truffle.TransactionDetails): Promise<
      Truffle.TransactionResponse<AllEvents>
    >;
    call(
      newOwner: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<void>;
    sendTransaction(
      newOwner: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      newOwner: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  mint: {
    (to: string, txDetails?: Truffle.TransactionDetails): Promise<
      Truffle.TransactionResponse<AllEvents>
    >;
    call(to: string, txDetails?: Truffle.TransactionDetails): Promise<void>;
    sendTransaction(
      to: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      to: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  methods: {
    /**
     * See {IERC721-approve}.
     */
    approve: {
      (
        to: string,
        tokenId: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<Truffle.TransactionResponse<AllEvents>>;
      call(
        to: string,
        tokenId: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<void>;
      sendTransaction(
        to: string,
        tokenId: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        to: string,
        tokenId: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

    /**
     * See {IERC721-balanceOf}.
     */
    balanceOf(
      owner: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<BN>;

    /**
     * See {IERC721-getApproved}.
     */
    getApproved(
      tokenId: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;

    /**
     * See {IERC721-isApprovedForAll}.
     */
    isApprovedForAll(
      owner: string,
      operator: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<boolean>;

    /**
     * See {IERC721Metadata-name}.
     */
    name(txDetails?: Truffle.TransactionDetails): Promise<string>;

    /**
     * Returns the address of the current owner.
     */
    owner(txDetails?: Truffle.TransactionDetails): Promise<string>;

    /**
     * See {IERC721-ownerOf}.
     */
    ownerOf(
      tokenId: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;

    /**
     * Leaves the contract without owner. It will not be possible to call `onlyOwner` functions. Can only be called by the current owner. NOTE: Renouncing ownership will leave the contract without an owner, thereby disabling any functionality that is only available to the owner.
     */
    renounceOwnership: {
      (txDetails?: Truffle.TransactionDetails): Promise<
        Truffle.TransactionResponse<AllEvents>
      >;
      call(txDetails?: Truffle.TransactionDetails): Promise<void>;
      sendTransaction(txDetails?: Truffle.TransactionDetails): Promise<string>;
      estimateGas(txDetails?: Truffle.TransactionDetails): Promise<number>;
    };

    /**
     * See {IERC721-setApprovalForAll}.
     */
    setApprovalForAll: {
      (
        operator: string,
        approved: boolean,
        txDetails?: Truffle.TransactionDetails
      ): Promise<Truffle.TransactionResponse<AllEvents>>;
      call(
        operator: string,
        approved: boolean,
        txDetails?: Truffle.TransactionDetails
      ): Promise<void>;
      sendTransaction(
        operator: string,
        approved: boolean,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        operator: string,
        approved: boolean,
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

    /**
     * See {IERC165-supportsInterface}.
     */
    supportsInterface(
      interfaceId: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<boolean>;

    /**
     * See {IERC721Metadata-symbol}.
     */
    symbol(txDetails?: Truffle.TransactionDetails): Promise<string>;

    /**
     * See {IERC721Metadata-tokenURI}.
     */
    tokenURI(
      tokenId: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;

    /**
     * See {IERC721-transferFrom}.
     */
    transferFrom: {
      (
        from: string,
        to: string,
        tokenId: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<Truffle.TransactionResponse<AllEvents>>;
      call(
        from: string,
        to: string,
        tokenId: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<void>;
      sendTransaction(
        from: string,
        to: string,
        tokenId: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        from: string,
        to: string,
        tokenId: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

    /**
     * Transfers ownership of the contract to a new account (`newOwner`). Can only be called by the current owner.
     */
    transferOwnership: {
      (newOwner: string, txDetails?: Truffle.TransactionDetails): Promise<
        Truffle.TransactionResponse<AllEvents>
      >;
      call(
        newOwner: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<void>;
      sendTransaction(
        newOwner: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        newOwner: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

    mint: {
      (to: string, txDetails?: Truffle.TransactionDetails): Promise<
        Truffle.TransactionResponse<AllEvents>
      >;
      call(to: string, txDetails?: Truffle.TransactionDetails): Promise<void>;
      sendTransaction(
        to: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        to: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

    /**
     * See {IERC721-safeTransferFrom}.
     */
    "safeTransferFrom(address,address,uint256)": {
      (
        from: string,
        to: string,
        tokenId: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<Truffle.TransactionResponse<AllEvents>>;
      call(
        from: string,
        to: string,
        tokenId: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<void>;
      sendTransaction(
        from: string,
        to: string,
        tokenId: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        from: string,
        to: string,
        tokenId: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

    /**
     * See {IERC721-safeTransferFrom}.
     */
    "safeTransferFrom(address,address,uint256,bytes)": {
      (
        from: string,
        to: string,
        tokenId: number | BN | string,
        data: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<Truffle.TransactionResponse<AllEvents>>;
      call(
        from: string,
        to: string,
        tokenId: number | BN | string,
        data: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<void>;
      sendTransaction(
        from: string,
        to: string,
        tokenId: number | BN | string,
        data: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        from: string,
        to: string,
        tokenId: number | BN | string,
        data: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };
  };

  getPastEvents(event: string): Promise<EventData[]>;
  getPastEvents(
    event: string,
    options: PastEventOptions,
    callback: (error: Error, event: EventData) => void
  ): Promise<EventData[]>;
  getPastEvents(event: string, options: PastEventOptions): Promise<EventData[]>;
  getPastEvents(
    event: string,
    callback: (error: Error, event: EventData) => void
  ): Promise<EventData[]>;
}
