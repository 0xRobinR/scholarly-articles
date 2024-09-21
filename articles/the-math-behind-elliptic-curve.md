---
title: the math behind - elliptic curve
author: robin
date: 2024-09-21 17:18:09
tags: math,cryptography,ecc
index: 10
label: find the point!
image: ecc.png
description: ecc is a public key cryptography method based on algebraic structure of elliptic curves
oneLiner: 
---

## the math behind elliptic curve

elliptic curve cryptography (ecc) is a public key cryptography method based on the algebraic structure of elliptic curves over finite fields. it offers strong security with smaller keys compared to other systems like rsa, making it efficient for use in devices with limited processing power.

![ecc-gen-image](/ecc.png)

### elliptic curves over finite fields

an elliptic curve is defined by an equation of the form:

```
y² = x³ + ax + b
```

here, *a* and *b* are constants that define the specific shape and properties of the curve. the curve consists of all the points (*x*, *y*) that satisfy this equation, where:

```
4a³ + 27b² ≠ 0
```

this ensures no singular points exist. when we work over a finite field *fₚ* (where *p* is a prime number), the variables and coefficients are within the set {0, 1, ..., p-1}.

### group law on elliptic curves

points on an elliptic curve form a group with an addition operation defined as follows:

**point addition (p ≠ q)**
draw a line connecting points *p* and *q*. this line intersects the curve at a third point *r*. reflect *r* over the x-axis to get the result *p + q*.

**point doubling (p = q)**
draw the tangent line at point *p*. this line intersects the curve at point *r*. reflect *r* over the x-axis to get *2p*.

**identity element**
the point at infinity serves as the identity element, so *p + o = p*.

### the elliptic curve discrete logarithm problem (ecdlp)

the security of ecc relies on the difficulty of the elliptic curve discrete logarithm problem. given two points *p* and *q = kp*, it's computationally hard to find the scalar *k*, especially when working with large finite fields.

### key generation in ecc

1. **choose a private key**: select a random integer *d* from the interval [1, n-1], where *n* is the order of the curve.
2. **compute the public key**: calculate *q = dp*, where *p* is a publicly known base point on the curve.

### encryption and decryption

ecc is often used with algorithms like elgamal for encryption or ecdsa for digital signatures. here's how encryption works in simple terms:

**1. encryption:**

the sender uses the recipient's public key *q* and a random integer *k* to compute:

- a shared point: *s = kq*
- an ephemeral public key: *r = kp*

the plaintext message *m* is then combined with *s* to produce the ciphertext *c*.

**2. decryption:**

the recipient uses their private key *d* to compute:

- *s = dr*

since *s* is the same shared point, they can retrieve *m* from *c*.

### simple example

let's consider a small finite field *f₁₇* (integers modulo 17) and the elliptic curve:

```
y² ≡ x³ + 2x + 2 \, (\text{mod} \, 17)
```

the points on this curve include (5, 1), (6, 3), etc.

suppose:

- **base point p**: (5, 1)
- **alice's private key**: *a = 5*
- **alice's public key**: *a = ap*
- **bob's private key**: *b = 7*
- **bob's public key**: *b = bp*

they can compute a shared secret:

- alice computes: *s = ab = 5 \cdot (7p) = 35p*
- bob computes: *s = ba = 7 \cdot (5p) = 35p*

both get the same point *s = 35p*, which can be used as a shared secret.

### advantages of ecc

- **strong security with smaller keys**: a 256-bit key in ecc provides comparable security to a 3072-bit rsa key.
- **efficiency**: smaller keys mean faster computations and reduced storage requirements. 

a practical implementation of ecc - [blockchain-stack-asymmetric-key](https://github.com/0xRobinR/blockchain-stack/blob/main/python/crypto_lib/asymmetric.py)