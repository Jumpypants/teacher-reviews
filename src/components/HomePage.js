import React, { useState, useCallback } from "react";
import Header from "./Header";
import TeachersGrid from "./TeachersGrid";
import SearchBar from "./SearchBar";
import { usePendingCounts } from "../hooks/usePendingCounts";

const HomePage = ({
  user,
  userRole,
  userData,
  teachers,
  reviews,
  getAverageRating,
  onViewTeacher,
  onNavigateToAddTeacher,
  onNavigateToAdmin,
  onSignOut
}) => {
  const [filteredTeachers, setFilteredTeachers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const { totalPending, pendingTeachersCount, pendingReviewsCount } = usePendingCounts(userRole);

  // Sort teachers by review count (most reviews first)
  const sortTeachersByReviewCount = useCallback((teachersToSort) => {
    return [...teachersToSort].sort((a, b) => {
      const aReviewCount = reviews.filter(r => r.teacherId === a.id && r.status === "approved").length;
      const bReviewCount = reviews.filter(r => r.teacherId === b.id && r.status === "approved").length;
      return bReviewCount - aReviewCount; // Descending order (most reviews first)
    });
  }, [reviews]);

  // Handle search results
  const handleSearchResults = (results, query) => {
    const sortedResults = sortTeachersByReviewCount(results);
    setFilteredTeachers(sortedResults);
    setSearchQuery(query);
  };

  // Handle clear search
  const handleClearSearch = () => {
    const sortedTeachers = sortTeachersByReviewCount(teachers);
    setFilteredTeachers(sortedTeachers);
    setSearchQuery("");
  };

  // Update filtered teachers when teachers prop changes
  React.useEffect(() => {
    if (!searchQuery) {
      const sortedTeachers = sortTeachersByReviewCount(teachers);
      setFilteredTeachers(sortedTeachers);
    }
  }, [teachers, searchQuery, sortTeachersByReviewCount]);
  return (
    <div>
      <Header user={user} userData={userData} />

      {user && (
        <>
          <div className="add-teacher-left-button">
            <button onClick={onNavigateToAddTeacher} className="btn-primary">
              + Add New Teacher
            </button>
          </div>
          <div className="top-right-buttons">
            {userRole === "admin" && (
              <button 
                onClick={onNavigateToAdmin} 
                className="btn-admin admin-button-with-badge"
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
            <button 
              onClick={onSignOut} 
              className="btn-secondary"
              style={{ marginLeft: userRole === "admin" ? "10px" : "0" }}
            >
              Sign Out
            </button>
          </div>
        </>
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
