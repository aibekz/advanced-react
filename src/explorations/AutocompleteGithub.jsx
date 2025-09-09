import { useEffect, useMemo, useState } from "react";
import _ from "lodash";
import axios from "axios";
import { FaSpinner } from "react-icons/fa";

const ITEMS_API_URL = "https://api.github.com/search/users";
const DEBOUNCE_DELAY = 500;

export default function AutocompleteGithub({ onSelectItem }) {
  const [query, setQuery] = useState("");
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchItems = async (q) => {
    if (!q.trim()) {
      setItems([]);
      return;
    }
    try {
      setIsLoading(true);
      const { data } = await axios.get(ITEMS_API_URL, {
        params: { q, per_page: 10 },
        headers: {
          Accept: "application/vnd.github+json",
        },
      });

      const names = Array.isArray(data?.items)
        ? data.items.map((u) => u.login).filter(Boolean)
        : [];

      setItems(names);
    } catch (e) {
      console.error("GitHub search failed:", e);
      setItems([]);
    } finally {
      setIsLoading(false);
    }
  };

  const debouncedFetch = useMemo(
    () => _.debounce(fetchItems, DEBOUNCE_DELAY),
    []
  );

  useEffect(() => {
    debouncedFetch(query);
    return () => debouncedFetch.cancel();
  }, [query, debouncedFetch]);

  return (
    <div className="w-full">
      <div className="relative">
        <input
          type="text"
          className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search GitHub username"
          aria-label="Search GitHub username"
        />

        {isLoading && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <FaSpinner
              className="animate-spin h-5 w-5 text-gray-500"
              aria-hidden="true"
            />
          </div>
        )}
      </div>

      {!isLoading && items.length > 0 && (
        <ul className="mt-2 bg-white border border-gray-100 rounded-md shadow-sm divide-y">
          {items.map((item, idx) => (
            <li key={`${item}-${idx}`}>
              <button
                type="button"
                className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 focus:outline-none"
                onClick={() => onSelectItem && onSelectItem(item)}
              >
                {item}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
