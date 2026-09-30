import React from 'react';
import StudentReviewsSection from '../components/StudentReviewsSection';
import GoogleReviewsWidget from '../components/GoogleReviewsWidget';
import AdUnit from '../components/AdUnit';

const StudentReviews = () => {
  return (
    <div style={{ background: '#050b14', minHeight: '100vh', paddingTop: '2rem', paddingBottom: '4rem' }}>
      <GoogleReviewsWidget limit={4} />
      <StudentReviewsSection
        title="Student Reviews & Course Ratings"
        subtitle="Explore authentic reviews, ratings, and course experiences shared by VLSI Physical Design Ocean students."
      />
      <AdUnit slotId="slot_studentreviews_bottom" />
    </div>
  );
};

export default StudentReviews;
