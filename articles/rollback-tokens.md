---
title: rollback tokens
author: robin
date: 2023-05-21 00:00:00
tags: erc, rollback, tokens
index: 1
label: how?
image: rbt_token.png
description: a new standard for erc20 tokens, which allows address/contracts to rollback erc20 transactions
oneLiner: an extended erc20 standard
---

# what?
a rollback token gives an address or a contract a time period to roll back an erc20 transaction, if the transaction is not rolled back within the time period, the transaction is considered valid and cannot be rolled back.

---

# why?
in recent times, there have been many cases of people losing their tokens [due to a mistake](https://support.metamask.io/hc/en-us/articles/4404062349979-Accidentally-sending-funds-to-the-wrong-address) in the transaction, [due to a scam](https://www.cnbc.com/2022/01/06/crypto-scammers-took-a-record-14-billion-in-2021-chainalysis.html), or [due to a hack](https://www.reuters.com/technology/hackers-steal-around-100-million-cryptocurrency-binance-linked-blockchain-2022-10-07/).
for a blockchain to handle this type of scams, large amount of hacks, it needs to be rolled back to the previous state to accumulate/reverse all the funds, as it was with ethereum that created ETC after [hackers stole around $50 million from DAO](https://www.forbes.com/advisor/investing/cryptocurrency/what-is-ethereum-classic/)

now the point is, after that, billions of dollars in crypto has been hacked and scammed from various blockchains. and many of them didn't rolled back, causing users and organizations to suffer great losses.

the rollback token standard proposes, **_instead of rolling back the entire blockchain, one can just undo the transfer transaction within a time period, safeguarding the assets that were compromised._**

with rbts,
- anyone can reverse their compromised token transfers
- crypto hacks can be minimized to 0
- new layer of security will be added on-chain
- no losses to anyone

---
# how?
rollback token standardizes an existing erc20 token with a rollback feature. behind the curtains, the process starts with
assigning an helper address Y (`sahayak`) to the address X, when the latter is compromised or hacked, rbt tokens transferred
to the exploiter can be reversed back using the helper address.

using zero-knowledge proofs, one can assign its helper in a way without exposing its details. only the sahayak will have the proof to prove its ownership
over reversing transfers.



hold on, wouldn't the exploiter transfer to another address again? no! that's the catch (and a security level check),
for the tokens to be reflected in the balance, the same time period will be considered.

```solidity
struct TransferStruct {
    address sender;
    uint256 amount;
    uint256 timestamp;
    bool isValid;
}

/**
    @dev get specific transfer details for the address
    @return TransferStruct
**/
mapping( address => mapping( uint => TransferStruct )) public transfers;
mapping( address => uint ) public transferCount;

... getAmount( address account, uint tid ) internal view returns ( uint256 amount ) {
    uint lockPeriod = IOracle(oracle).getLockPeriod();
    uint timestamp = transfers[msg.sender][tid].timestamp;

    amount = (timestamp + lockPeriod) < block.timestamp ? transfers[msg.sender][tid].amount : 0;
}

... balanceOf( address account ) {
    uint256 balances = 0
    for ( uint i = 0; i < transferCount[account] i ++ ) {
        balances = transfers[account][i].isValid ? getAmount(account, i) : 0; 
    }
}
```

rbt will work using these components, `rbtOracle`, `rbtWrapper`, `rbtToken`, `rbtSahayak`

### rbtSahayak
**_"sahayak" signifies a role of support and assistance in different contexts, where one person helps another in their tasks or responsibilities_**

a normal EOA address, or a contract address, that can be assigned to an EOA or a contract address.

### rbtToken
logical token for rolling back the transaction, implementing all the existing methods of the ERC20 standard, with the below added methods
```solidity
function rollBack(uint tid) external;
function getTransfer(uint tid) external view returns (TransferStruct memory);
```

`rollBack(uint tid)` will rollback the `tid` transfer happened

`getTransfer(uint tid)` will return the transfer details of `tid` transfer

### rbtWrapper
to wrap an existing erc20 token to rbt

### rbtOracle
this will be the captain of our ship, handling the core part of managing `rbtSahayak` (the helper) to an address. an EOA can assign its sahayak by giving their ownership proof using signature,
and contract address can issue by verifying its owner() or contract creator ownership.

```solidity
rbtOracle.register( bytes memory signature, address sahayak ) // for EOA
rbtOracle.assign( bytes memory signature, address contractAddress, address sahayak) // for contract address
```

once it's registered to the oracle, the `sahayak` will be able to reverse the rbt token transfers within the time period set by the oracle.

for verifying the `sahayak` address, we will be using zkSNARK's PLONK verifier, which will receive the proof given at the time of assigning
the sahayak, and verify the proof with the public inputs, and return the result.

```solidity
function verify( bytes memory proof, Commitment memory publicInputs ) public view returns ( bool ) {
    return verifier.verify( proof, publicInputs );
}
```

extended features
- one address can only have one sahayak
- the sahayak can have its own sahayak ( long chain layered can be created )
- incase of updating the sahayak, [ discussion required ]

*note: functions defined may vary (just for overview purpose)

---

# if?
for now, i'm unable to get any `ifs` (any loopholes), but if you have any, feel free to raise an issue below.

---
# for?
using rbt tokens, the crypto community will be in a more secured environment than ever! `the endgame for most of the hacks`

---

# now?
there are many more questions that arises in using the rbt tokens, `how will be a contract checks for the tokens transferred?`,
`how will be the transfer event will be implemented?` and `is this compatible same with native token transfers?`.

some questions needs dev community to engage in building a protocol that will be the most secured way of storing assets.

for this standard to be considered, we'll require a great response on this article, to be heard by the [ethereum magicians](https://ethereum-magicians.org/).

with great feature, comes great responsibility, and with great responsibility, comes great security.
the rbt tokens will be the most secured way of storing assets, and will be the most secured way of transferring assets.

---

## contributions
feel free to contribute in this `scholarly article`, quick links given below