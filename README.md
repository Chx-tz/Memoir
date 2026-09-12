# ResilienceID: Self-Sovereign Digital Identity Framework for Displaced Populations

> **Smart India Hackathon (Problem Statement #26125)**  
> **Core Design Principle:** *"Personal data lives with the person, not the platform. The blockchain anchors trust — it never anchors identity."*

---

## Overview

**ResilienceID** is an offline-ready, privacy-preserving Self-Sovereign Identity (SSI) prototype purpose-built for refugees, asylum seekers, and displaced populations in disaster and humanitarian relief operations.

Displaced persons frequently lose physical paper documents during flight, fires, or floods. Conventional centralized registries create single points of failure, cross-border access friction, and weaponization risks (surveillance or forced repatriation). ResilienceID solves this using:

1. **Decentralized Identifiers (W3C DID)** controlled directly by the individual via on-device cryptographic key pairs.
2. **Zero-Knowledge Selective Disclosure (ZKP)**: Holders prove specific claims (e.g. *Age >= 18* or *Camp Registration Valid*) without disclosing raw dates of birth, national ID numbers, or biometrics.
3. **100% Offline-First Aid Distribution**: Border checkpoints, triage clinics, and food distribution counters verify proofs locally against cached issuer public keys with zero internet required.
4. **Duress-Resistant Authentication**: Coercion-resistant dual-PIN system (`1234` for genuine vault; `9999` for a silent decoy vault with expired passes).
5. **Shamir's 2-of-3 Social Key Recovery**: If a physical device is destroyed or lost during evacuation, access is reconstructed via a community quorum of trusted guardians (e.g., NGO medical officer, community elder, family member), eliminating reliance on any central gatekeeper.

---

## 6-Step Hackathon Live Demo Flow

| Step | Feature | Description |
| :--- | :--- | :--- |
| **1** | **Camp Kiosk Issuance** | Camp operator (UNHCR / SDMA) issues a tamper-evident Verifiable Credential directly to the holder's DID wallet. |
| **2** | **On-Chain Anchor Inspection** | Inspect the Hyperledger Besu state anchor: Merkle leaves, block numbers, and cryptographic revocation accumulators. Zero PII on-chain. |
| **3** | **Zero-Knowledge Proof (QR)** | Holder generates a selective disclosure proof QR code certifying eligibility without leaking raw dates of birth. |
| **4** | **Offline Aid Station Terminal** | Switch to the Verifier view: scan the proof offline, validate against local cache, and authorize emergency aid distribution. |
| **5** | **Duress Authentication** | Lock the vault and enter PIN `9999` to demonstrate coercion defense with a silent decoy interface and warning trigger. |
| **6** | **Social Key Recovery** | Simulate a lost device: collect 2 of 3 guardian signatures to reconstruct master private keys via Shamir's Secret Sharing. |

---

## Getting Started

### Prerequisites
- Node.js 18+
- npm 9+

### Installation & Development
```bash
# Install dependencies
npm install

# Start local development server
npm run dev
```

Open `http://localhost:5173` in your browser.

### Verification & Production Build
```bash
npm run lint      # Type check with TypeScript (tsc --noEmit)
npm run build     # Production build in dist/
npm run preview   # Preview the production build locally
```

---

## Demo Credentials & Shortcuts

- **Master PIN (Genuine Vault)**: `1234`
- **Duress PIN (Decoy Vault)**: `9999`
- **Pre-Registered Guardians**:
  - Dr. Sarah Thomas (*NGO Medical Officer, MSF/Red Cross*)
  - Father Joseph (*Community Elder, Relief Liaison*)
  - Aarti Devi (*Family Member / Sister*)

---

## Architecture & Technology Stack

- **Frontend & App Shell**: Vite + React 18 + TypeScript
- **Styling & Tokens**: Tailwind CSS with custom graphite/lime dark mode design system
- **Icons**: Lucide React
- **State Management**: React Context (`VaultProvider`) supporting offline simulation, zero-knowledge proofs, and Shamir key recovery
- **Identity Standards**: W3C DID Core, Verifiable Credentials (VC) Data Model, DIDComm-compatible proof formats
- **Ledger Model**: Anchored on permissioned consortium network (Hyperledger Besu / Indy architecture)

---

## Security & Ethics Note

This application is a functional front-end simulation for the Smart India Hackathon. Cryptographic operations (ZKP generation, Merkle tree commitments, and Shamir's threshold recovery) are modeled in the browser to evaluate interaction design, threat resistance, and usability for humanitarian deployments before backend ledger integrations.

