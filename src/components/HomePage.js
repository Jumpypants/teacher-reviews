import React, { useState } from "react";
import Header from "./Header";
import TeachersGrid from "./TeachersGrid";
import SearchBar from "./SearchBar";
import { usePendingCounts } from "../hooks/usePendingCounts";

const HomePage = ({
  user,
  userRole,
  teachers,
  reviews,
  getAverageRating,
  onViewTeacher,
  onNavigateToAddTeacher,
  onNavigateToAdmin
}) => {
  const [filteredTeachers, setFilteredTeachers] = useState(teachers);
  const [searchQuery, setSearchQuery] = useState("");
  const { totalPending, pendingTeachersCount, pendingReviewsCount } = usePendingCounts(userRole);

  // Handle search results
  const handleSearchResults = (results, query) => {
    setFilteredTeachers(results);
    setSearchQuery(query);
  };

  // Handle clear search
  const handleClearSearch = () => {
    setFilteredTeachers(teachers);
    setSearchQuery("");
  };

  // Update filtered teachers when teachers prop changes
  React.useEffect(() => {
    if (!searchQuery) {
      setFilteredTeachers(teachers);
    }
  }, [teachers, searchQuery]);
  return (
    <div>
      <Header user={user} />

      {user && (
        <div className="add-teacher-top-button">
          <button onClick={onNavigateToAddTeacher} className="btn-primary">
            + Add New Teacher
          </button>
          {userRole === "admin" && (
            <button 
              onClick={onNavigateToAdmin} 
              className="btn-admin admin-button-with-badge"
              style={{ marginLeft: "10px" }}
              title={totalPending > 0 ? `${pendingTeachersCount} pending teachers, ${pendingReviewsCount} pending reviews` : "Admin Dashboard"}
            >
              Admin Dashboard
              {totalPending > 0 && (
                <span className="notification-badge">
                  {totalPending > 99 ? '99+' : totalPending}
                </span>
              )}
            </button>
          )}
        </div>
      )}

      <SearchBar
        teachers={teachers}
        onSearchResults={handleSearchResults}
        onClearSearch={handleClearSearch}
      />

      {searchQuery && (
        <div className="search-results-header">
          Search Results for "{searchQuery}" 
          <span className="search-results-count">
            ({filteredTeachers.length} found)
          </span>
        </div>
      )}

      {filteredTeachers.length === 0 && searchQuery ? (
        <div className="no-search-results">
          <h3>No teachers found</h3>
          <p>Try searching with different keywords or check your spelling.</p>
          <div className="search-suggestions">
            <h4>Search tips:</h4>
            <ul>
              <li>Try searching by teacher name, school, or subject</li>
              <li>Use partial names (e.g., "John" instead of "John Smith")</li>
              <li>Check for typos in your search</li>
            </ul>
          </div>
        </div>
      ) : (
        <TeachersGrid
          teachers={filteredTeachers}
          reviews={reviews}
          user={user}
          getAverageRating={getAverageRating}
          onViewTeacher={onViewTeacher}
        />
      )}
    </div>
  );
};

export default HomePage;
