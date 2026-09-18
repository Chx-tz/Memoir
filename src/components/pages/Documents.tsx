import { Plus, Search } from "lucide-react";
import { useVault } from "../../context/VaultContext";
import { DocumentCard } from "../documents/DocumentCard";

export function Documents() {
  const { documents, documentSearch, setDocumentSearch, openIssueModal, t, uiMode } = useVault();

  const filteredDocuments = documents.filter((doc) =>
    doc.title.toLowerCase().includes(documentSearch.trim().toLowerCase()),
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-ink-primary">{t.nav.documents}</h1>
          <p className="mt-1 text-sm text-ink-secondary">
            {uiMode === "human"
              ? "Official relief camp records, health passes, and ration allotments."
              : "W3C Verifiable Credentials anchored on-chain. Protected by your DID."}
          </p>
        </div>
        <button
          type="button"
          onClick={() => openIssueModal()}
          className="flex items-center justify-center gap-2 self-start rounded-xl bg-lime px-4 py-2.5 text-sm font-medium text-graphite-950 shadow-glow transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98] sm:self-auto"
        >
          <Plus className="h-4 w-4" aria-hidden="true" />
          {t.common.requestIssuance}
        </button>
      </div>

      <div className="relative max-w-sm">
        <Search
          className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted"
          aria-hidden="true"
        />
        <input
          type="search"
          value={documentSearch}
          onChange={(event) => setDocumentSearch(event.target.value)}
          placeholder={uiMode === "human" ? "Search your passes..." : "Search credential schemas & claims..."}
          aria-label="Search credentials"
          className="w-full rounded-xl border border-graphite-700 bg-graphite-850 py-2.5 pl-9 pr-3 text-sm text-ink-primary placeholder:text-ink-muted focus:border-lime/40"
        />
      </div>

      {filteredDocuments.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filteredDocuments.map((doc) => (
            <DocumentCard key={doc.id} document={doc} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-graphite-600 py-16 text-center">
          <p className="text-sm text-ink-secondary">
            {documentSearch ? `No credentials match "${documentSearch}".` : "No credentials stored in this wallet yet."}
          </p>
          {!documentSearch && (
            <button
              type="button"
              onClick={() => openIssueModal()}
              className="mt-4 inline-flex items-center gap-1.5 rounded-xl bg-lime px-4 py-2 text-xs font-semibold text-graphite-950 shadow-glow hover:scale-[1.02] active:scale-[0.98] transition-transform"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>{t.common.requestIssuance}</span>
            </button>
          )}
        </div>
      )}

      {documents.length > 0 && (
        <button
          type="button"
          onClick={() => setDocumentSearch("")}
          className="text-sm text-ink-secondary underline-offset-4 transition-colors hover:text-lime hover:underline"
        >
          View all documents
        </button>
      )}
    </div>
  );
}
