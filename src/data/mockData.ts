import type { ActivityEntry, Guardian, VaultDocument } from "../types";

// NOTE: All values below are placeholder/mock data for prototype purposes only.

export const initialDocuments: VaultDocument[] = [
  {
    id: "doc-relief",
    type: "relief-registration",
    title: "State Relief Camp ID",
    subtitle: "Issued by SDMA Kerala",
    maskedNumber: "•••• •••• 4812",
    status: "verified",
    updatedAt: "Issued 3 days ago",
    claims: {
      "Displaced Person ID": "DID-DISP-2026-4812",
      "Camp Sector": "Camp Kiosk #4 (Wayanad Sector)",
      "Age Threshold": ">= 18 (Cryptographically Verified)",
      "Ration Quota": "Category A (Family Head / Daily Ration)",
      "Status": "Active & Anchored on Hyperledger",
    },
    anchor: {
      txHash: "0x7c49b1a82e9d3012fa619d84e5b61c920f4812aa",
      blockNumber: 18492041,
      timestamp: "2026-09-09 11:02 UTC",
      schemaId: "schema:sih:relief:v1",
      revocationStatus: "active",
    },
  },
  {
    id: "doc-health",
    type: "health-record",
    title: "Medical Triage Record",
    subtitle: "Red Cross Camp Clinic #4",
    maskedNumber: "TETANUS, BP NORMAL",
    status: "verified",
    updatedAt: "Updated 2 days ago",
    claims: {
      "Blood Group": "O+",
      "Tetanus Toxoid": "Administered (Valid until 2031)",
      "Chronic Allergies": "None Recorded",
      "Triage Clearance": "Fit for general shelter assignment",
    },
    anchor: {
      txHash: "0x3f12a9d8012bb45e908127394cf982e019283f66",
      blockNumber: 18493120,
      timestamp: "2026-09-10 08:15 UTC",
      schemaId: "schema:sih:health:v2",
      revocationStatus: "active",
    },
  },
  {
    id: "doc-family",
    type: "family-registry",
    title: "Family Linkage & Reunification",
    subtitle: "Red Cross Tracer Service",
    maskedNumber: null,
    status: "empty",
    updatedAt: null,
  },
];

export const decoyDocuments: VaultDocument[] = [
  {
    id: "doc-decoy-relief",
    type: "relief-registration",
    title: "Temporary Transit Pass",
    subtitle: "Expired / Inactive",
    maskedNumber: "•••• •••• 0000",
    status: "empty",
    updatedAt: "Expired 2 years ago",
  },
];

export const initialGuardians: Guardian[] = [
  {
    id: "g1",
    name: "Dr. Sarah Thomas",
    role: "NGO Medical Officer (MSF/Red Cross)",
    status: "active",
    phoneOrContact: "+91 98470 11223",
  },
  {
    id: "g2",
    name: "Father Joseph",
    role: "Camp Community Elder",
    status: "active",
    phoneOrContact: "+91 94471 44556",
  },
  {
    id: "g3",
    name: "Aarti Devi",
    role: "Family Member (Sister)",
    status: "active",
    phoneOrContact: "+91 97452 77889",
  },
];

export const initialActivity: ActivityEntry[] = [
  {
    id: "act-1",
    action: "Relief ration collected (ZK proof verified)",
    device: "Camp Kiosk #4 • Offline sync",
    timestamp: "Today, 9:42 AM",
    status: "success",
  },
  {
    id: "act-2",
    action: "Medical clearance proof generated",
    device: "Red Cross Mobile Clinic",
    timestamp: "Today, 8:15 AM",
    status: "info",
  },
  {
    id: "act-3",
    action: "Guardian threshold recovery test approved",
    device: "Dr. Sarah's Device",
    timestamp: "Yesterday, 6:30 PM",
    status: "success",
  },
  {
    id: "act-4",
    action: "State Relief ID credential anchored on-chain",
    device: "SDMA Registration Desk",
    timestamp: "3 days ago, 11:02 AM",
    status: "success",
  },
];
