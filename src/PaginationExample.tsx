import React, { useState, useEffect } from "react";
import { AccountsService } from "./generated/services/AccountsService";
import type { IAccount } from "./generated/models/AccountModel";

const PAGE_SIZE = 20;

export const ServerPagedGrid: React.FC<{ searchTerm: string }> = ({
  searchTerm,
}) => {
  const [records, setRecords] = useState<IAccount[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);

  // Fetch only 20 records from Dataverse whenever `page` or `searchTerm` changes
  useEffect(() => {
    const fetchPage = async () => {
      setLoading(true);

      const skipCount = (page - 1) * PAGE_SIZE;

      const response = await AccountsService.getAll({
        filter: searchTerm ? `contains(name, '${searchTerm}')` : undefined,
        top: PAGE_SIZE, // Fetch exactly 20
        skip: skipCount, // Server offset: 0 on page 1, 20 on page 2, 40 on page 3, etc.
      });

      const data = response.data || [];
      setRecords(data);

      // If server returned fewer items than requested, we're on the last page
      setHasMore(data.length === PAGE_SIZE);
      setLoading(false);
    };

    fetchPage();
  }, [page, searchTerm]);

  // Reset to page 1 whenever the search query changes
  useEffect(() => {
    setPage(1);
  }, [searchTerm]);

  return (
    <div>
      {loading ? (
        <div>Loading page {page}...</div>
      ) : (
        <ul>
          {records.map((acc) => (
            <li key={acc.accountid}>{acc.name}</li>
          ))}
        </ul>
      )}

      {/* Pagination Controls */}
      <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
        <button
          disabled={page === 1 || loading}
          onClick={() => setPage((p) => p - 1)}
        >
          Previous
        </button>

        <span>Page {page}</span>

        <button
          disabled={!hasMore || loading}
          onClick={() => setPage((p) => p + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};
