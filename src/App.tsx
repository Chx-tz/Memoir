import { VaultProvider, useVault } from "./context/VaultContext";
import { Header } from "./components/layout/Header";
import { DesktopSidebar, MobileSidebar } from "./components/layout/Sidebar";
import { VaultLockedScreen } from "./components/layout/VaultLockedScreen";
import { ActivityLog } from "./components/pages/ActivityLog";
import { Documents } from "./components/pages/Documents";
import { Overview } from "./components/pages/Overview";
import { Profile } from "./components/pages/Profile";
import { SocialRecovery } from "./components/pages/SocialRecovery";
import { VerifierMode } from "./components/pages/VerifierMode";
import { LandingPage } from "./components/pages/LandingPage";
import { CreateWallet } from "./components/pages/CreateWallet";
import { ToastContainer } from "./components/shared/ToastContainer";
import { GenerateProofModal } from "./components/documents/GenerateProofModal";
import { AnchorModal } from "./components/documents/AnchorModal";
import { IssueCredentialModal } from "./components/documents/IssueCredentialModal";

function PageContent() {
  const { currentPage, isVaultLocked } = useVault();

  if (currentPage === "create_wallet") {
    return <CreateWallet />;
  }

  if (isVaultLocked) {
    return <VaultLockedScreen />;
  }

  switch (currentPage) {
    case "landing":
      return <LandingPage />;
    case "overview":
      return <Overview />;
    case "documents":
      return <Documents />;
    case "recovery":
      return <SocialRecovery />;
    case "verifier":
      return <VerifierMode />;
    case "activity":
      return <ActivityLog />;
    case "profile":
      return <Profile />;
    default:
      return <Overview />;
  }
}

function Shell() {
  const { currentPage } = useVault();

  if (currentPage === "landing") {
    return (
      <div className="min-h-screen bg-graphite-950">
        <LandingPage />
        <ToastContainer />
      </div>
    );
  }

  if (currentPage === "create_wallet") {
    return (
      <div className="min-h-screen bg-graphite-950">
        <CreateWallet />
        <ToastContainer />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-graphite-950">
      <DesktopSidebar />
      <MobileSidebar />
      <div className="flex min-h-screen flex-1 flex-col">
        <Header />
        <main className="flex flex-1 flex-col px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col">
            <PageContent />
          </div>
        </main>
      </div>
      <GenerateProofModal />
      <AnchorModal />
      <IssueCredentialModal />
      <ToastContainer />
    </div>
  );
}

export default function App() {
  return (
    <VaultProvider>
      <Shell />
    </VaultProvider>
  );
}
