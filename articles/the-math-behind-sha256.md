---
title: the math behind - sha256
author: robin
date: 2024-09-11 00:00:00
tags: research
index: 9
label: hash it
image: sha_256.png
description: a new series called "the math behind - x", starting with - SHA256, a cryptographic hash function
oneLiner: math, math and math!!!
---

sha-256 is a complex cryptographic hash function that relies on several mathematical principles to ensure security and efficiency. here's a more in-depth look at the math behind this algorithm:

### bitwise operations

at its core, sha-256 heavily utilizes bitwise operations, which are fundamental to its design:

1. **and (∧)**: performs a logical and operation on each bit pair.
2. **or (∨)**: performs a logical or operation on each bit pair.
3. **xor (⊕)**: performs an exclusive or operation on each bit pair.
4. **not (¬)**: inverts each bit.

these operations are used extensively in the algorithm's logical functions and message schedule.

### modular arithmetic

sha-256 performs all its calculations modulo 2^32. this means that after each operation, the result is taken modulo 2^32, effectively limiting all values to 32-bit words. this property is crucial for maintaining consistent word sizes throughout the algorithm.

### logical functions

sha-256 employs six logical functions that operate on 32-bit words:

1. **ch(x, y, z) = (x ∧ y) ⊕ (¬x ∧ z)**
2. **maj(x, y, z) = (x ∧ y) ⊕ (x ∧ z) ⊕ (y ∧ z)**
3. **σ0(x) = rotr^2(x) ⊕ rotr^13(x) ⊕ rotr^22(x)**
4. **σ1(x) = rotr^6(x) ⊕ rotr^11(x) ⊕ rotr^25(x)**
5. **σ0(x) = rotr^7(x) ⊕ rotr^18(x) ⊕ shr^3(x)**
6. **σ1(x) = rotr^17(x) ⊕ rotr^19(x) ⊕ shr^10(x)**

where rotr^n(x) is the circular right shift operation by n bits, and shr^n(x) is the right shift operation by n bits.

### message schedule

the message schedule is a crucial part of sha-256. it expands the 512-bit input block into 64 32-bit words:

1. for i from 0 to 15: w[i] = m[i]
2. for i from 16 to 63: w[i] = σ1(w[i-2]) + w[i-7] + σ0(w[i-15]) + w[i-16]

this expansion ensures that each bit of the input influences many parts of the compression function, enhancing the avalanche effect.

### compression function

the compression function is the heart of sha-256. it processes the expanded message schedule and updates the hash state:

1. initialize working variables a, b, c, d, e, f, g, h with the current hash values.
2. for i from 0 to 63:
   - t1 = h + σ1(e) + ch(e, f, g) + k[i] + w[i]
   - t2 = σ0(a) + maj(a, b, c)
   - h = g
   - g = f
   - f = e
   - e = d + t1
   - d = c
   - c = b
   - b = a
   - a = t1 + t2
3. update the hash values: h += a, h[1] += b, ..., h[7] += h

where k[i] are the round constants, derived from the first 32 bits of the fractional parts of the cube roots of the first 64 prime numbers.

## security properties

the mathematical design of sha-256 contributes to several important security properties:

1. **preimage resistance**: given a hash value h, it's computationally infeasible to find any message m such that hash(m) = h. this property is due to the one-way nature of the compression function.

2. **second preimage resistance**: given an input m1, it's computationally infeasible to find a different input m2 such that hash(m1) = hash(m2). this is ensured by the complexity of the message schedule and compression function.

3. **collision resistance**: it's computationally infeasible to find two different messages m1 and m2 such that hash(m1) = hash(m2). the best-known attacks on sha-256 still require approximately 2^128 operations, far beyond current computational capabilities.

4. **avalanche effect**: a small change in the input results in a significantly different hash output. this is achieved through the complex interplay of bitwise operations and the message schedule.

## enhancements and variations

researchers continue to explore ways to improve upon the sha-256 algorithm. for instance, the esha-256 (enhanced secure hash algorithm) proposes modifications to the compression function and reduces the number of rounds from 64 to 32, aiming to decrease computation time while maintaining security.

understanding the mathematical intricacies of sha-256 is crucial for cryptographers and security experts. it allows them to analyze potential vulnerabilities, propose improvements, and develop more robust cryptographic systems for the ever-evolving landscape of information security.

a practical implementation of sha-256 hash - [blockchain-stack](https://github.com/0xRobinR/blockchain-stack/blob/main/python/crypto_lib/sha256.py)
