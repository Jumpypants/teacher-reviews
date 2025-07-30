import React, { useState } from "react";

const ImageModerationPreview = ({ imageUrl, teacherName }) => {
  const [imageError, setImageError] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  if (!imageUrl || imageError) {
    return (
      <div className="image-moderation-empty">
        <p className="no-image-text">No image provided</p>
      </div>
    );
  }

  return (
    <div className="image-moderation-preview">
      <div className="image-warning-header">
        <span className="warning-icon">⚠️</span>
        <span className="warning-text">User-uploaded image</span>
      </div>
      
      <div className="image-preview-container">
        <img
          src={imageUrl}
          alt={`${teacherName} profile preview`}
          className={`preview-image ${isExpanded ? 'expanded' : ''}`}
          onError={handleImageError}
          onClick={toggleExpanded}
        />
        <div className="image-actions">
          <button 
            onClick={toggleExpanded}
            className="toggle-size-btn"
          >
            {isExpanded ? "Collapse" : "Expand"}
          </button>
          <a 
            href={imageUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="view-full-link"
          >
            Full Size →
          </a>
        </div>
      </div>
    </div>
  );
};

export default ImageModerationPreview;
