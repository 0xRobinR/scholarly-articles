---
title: create upgradeable contract from a contract
author: robin
date: 2023-08-01 00:00:00
tags: research
index: 4
label: create
image: upgradeable_contract.png
description: using proxy pattern to create upgradeable contracts from smart contracts, a practical guide
oneLiner: proxy contract from a contract?
---

in this article, we will learn how to create upgradeable contracts from smart contracts, using *diamond* proxy pattern. its an essential requirement for a contract that requires a deployed logic that can be upgraded in the future, without affecting the state of the contract.

a proxy contract is a contract that delegates all the calls to the logic contract, and the logic contract is the contract that contains the actual implementation of the contract.

### diamond proxy pattern

[diamond proxy pattern](https://eips.ethereum.org/EIPS/eip-2535), as the name suggests, is a pattern implementation in a shape of diamond. the diamond shape is formed by the proxy contract, and the logic contract, where the proxy contract is the top of the diamond, and the logic contract is the bottom of the diamond. the diamond shape is formed by the inheritance of the logic contract in the proxy contract, and the inheritance of the proxy contract in the logic contract.

More technically, a **diamond** is a contract with external functions that are supplied by contracts called **facets**. Facets are separate, independent contracts that can share internal functions, libraries, and state variables.

![diamond proxy pattern](https://eips.ethereum.org/assets/eip-2535/facetreuse.png)

Diamonds offer several compelling reasons for their utilization in the blockchain ecosystem:

- Streamlined Contract Functionality: Utilizing a single address for contract functionality simplifies deployment, testing, and integration with other smart contracts, software, and user interfaces.

- No Size Limitation: Unlike traditional contracts, diamonds do not face a 24KB maximum size constraint. This allows for incorporating related functionality within a single contract or address efficiently.

- Organized Code and Data: Diamonds provide a systematic approach to segregating different functionalities, facilitating seamless connections and data sharing in a gas-efficient manner within a contract system with extensive capabilities.

- Upgradability: Upgradeable diamonds can evolve over time by adding, replacing, or removing functionalities. Since there's no limit to the amount of functionality added to diamonds, existing contracts can be upgraded without necessitating the redeployment of previous features.

- Immutability Option: Diamonds can be deployed as immutable from the outset or made immutable after being initially upgradeable, offering flexibility in the development and governance of smart contracts.

- Reusing Deployed Contracts: By leveraging existing on-chain contracts, developers can create custom diamonds. This feature enables the creation of on-chain smart contract platforms and libraries without the need for redundant contract deployments.


### can upgradeable contract be created from another upgradeable contract?

yes, it can be done, by using the same diamond pattern, but with a different approach. the diamond pattern is the same, but the implementation is different. first, an _oracle contract_ (**contractA**) deployed using the diamond proxy pattern, which will contain the logic of creating upgradeable contract. on the time of creation, the logic contract of **contractB** will be deployed using `create2` and the deployed address will be stored.

---
for the oracle logic contract:

```solidity
// oracle_logic.sol

...
function createContractB() external {
    // deploying the proxy contract
    new ContractBProxy( _logicContract ); // passing the logic contract address to the contract B's proxy contract
}

```
---

the proxy for oracle contract A:

```solidity
// oracle_contractA.sol

...
address _logicContract;
address _oracleFallback;

constructor(address _oracleImplementation) {
    // deploy logic contract
    address logicContract = address(new ContractB());
    // store the address of the logic contract
    _logicContract = logicContract;

    _oracleFallback = _oracleImplementation;
}

fallback() external payable {
    // get oracle logic
    address facet = _oracleFallback;
    require(facet != address(0));
    // Execute external function from facet using delegatecall and return any value.
    assembly {
        // copy function selector and any arguments
        calldatacopy(0, 0, calldatasize())
        // execute function call using the facet
        let result := delegatecall(gas(), facet, 0, calldatasize(), 0, 0)
        // get any return value
        returndatacopy(0, 0, returndatasize())
        // return any return value or error back to the caller
        switch result
        case 0 { revert(0, returndatasize()) }
        default { return (0, returndatasize()) }
    }
}
```

---
the logic contract for contract B

```solidity
// logic_contractB.sol

...
// your logic here
function addTwoValues(uint a, uint b) external pure returns(uint) {
    return a + b;
}
```

---

the proxy contract for contract B

```solidity
// proxy_contractB.sol

...
address _logicContract;

constructor(address _logicContract) {
    _logicContract = _logicContract;
}

fallback() external payable {
    // get logic contract
    address facet = _logicContract;
    require(facet != address(0));
    // Execute external function from facet using delegatecall and return any value.
    assembly {
        // copy function selector and any arguments
        calldatacopy(0, 0, calldatasize())
        // execute function call using the facet
        let result := delegatecall(gas(), facet, 0, calldatasize(), 0, 0)
        // get any return value
        returndatacopy(0, 0, returndatasize())
        // return any return value or error back to the caller
        switch result
        case 0 { revert(0, returndatasize()) }
        default { return (0, returndatasize()) }
    }
}
```

---

### its a wrap!

in this article, we learned how to create upgradeable contracts from smart contracts, using diamond proxy pattern. we also learned how to create upgradeable contracts from another upgradeable contract. this is a practical guide, and you can use this guide to create your own upgradeable contracts from an upgradeable contract.

## contributions
feel free to contribute in this `scholarly article`, quick links given below