import React, { useState, useMemo } from 'react';
import { INTERVIEW_QUESTIONS } from '../../data/interviewQuestionsData';
import styles from './Module19Content.module.css';

const CATEGORIES = [
  'All',
  'Basic Electronics',
  'MOSFET & CMOS',
  'Digital Electronics',
  'Linux Commands',
  'TCL Scripting'
];

const Module19Content = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedQnas, setExpandedQnas] = useState({});

  const toggleQna = (index) => {
    setExpandedQnas(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const preventCopy = (e) => {
    e.preventDefault();
  };

  // Filter questions based on active tab and search query
  const filteredQuestions = useMemo(() => {
    return INTERVIEW_QUESTIONS.map((q, originalIndex) => ({
      ...q,
      originalIndex
    })).filter(q => {
      const matchesTab = activeTab === 'All' || q.category === activeTab;
      const matchesSearch = searchQuery.trim() === '' || 
        q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.subCategory.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchesTab && matchesSearch;
    });
  }, [activeTab, searchQuery]);

  // Group filtered questions by subCategory
  const groupedQuestions = useMemo(() => {
    const groups = {};
    filteredQuestions.forEach(q => {
      const sub = q.subCategory;
      if (!groups[sub]) {
        groups[sub] = [];
      }
      groups[sub].push(q);
    });
    return groups;
  }, [filteredQuestions]);

  // Get question counts per category for stats
  const categoryCounts = useMemo(() => {
    const counts = { All: INTERVIEW_QUESTIONS.length };
    INTERVIEW_QUESTIONS.forEach(q => {
      counts[q.category] = (counts[q.category] || 0) + 1;
    });
    return counts;
  }, []);

  return (
    <div className={styles.moduleLayout} onCopy={preventCopy}>
      <div className={styles.header}>
        <h1 className={styles.title}>Module 19 - Core Interview Questions</h1>
        <p className={styles.subtitle}>
          Master VLSI physical design interviews with our comprehensive database of 350+ core Q&As covering semiconductor devices, logic gates, PnR flows, scripting, and system commands.
        </p>
      </div>

      {/* Stats Bar */}
      <div className={styles.statsBar}>
        <div className={styles.statBox}>
          <span className={styles.statLabel}>Total Q&As</span>
          <span className={styles.statValue}>{INTERVIEW_QUESTIONS.length}</span>
        </div>
        <div className={styles.statBox}>
          <span className={styles.statLabel}>Found Matches</span>
          <span className={styles.statValue}>{filteredQuestions.length}</span>
        </div>
      </div>

      {/* Toolbar (Search & Filter) */}
      <div className={styles.toolbar}>
        <div className={styles.searchWrapper}>
          <span className={styles.searchIcon}>🔍</span>
          <input
            type="text"
            placeholder="Search keywords, topics, or questions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchInput}
          />
          {searchQuery && (
            <button className={styles.clearSearch} onClick={() => setSearchQuery('')} title="Clear search">
              ✕
            </button>
          )}
        </div>

        {/* Tab Filters */}
        <div className={styles.tabsWrapper}>
          {CATEGORIES.map(category => (
            <button
              key={category}
              className={`${styles.tabBtn} ${activeTab === category ? styles.activeTab : ''}`}
              onClick={() => setActiveTab(category)}
            >
              {category}
              <span className={styles.tabCount}>({categoryCounts[category] || 0})</span>
            </button>
          ))}
        </div>
      </div>

      {/* Questions Flow */}
      <div className={styles.mainContent}>
        {filteredQuestions.length === 0 ? (
          <div className={styles.emptyState}>
            <span>🔍</span>
            <h3>No Questions Found</h3>
            <p>Try refining your search query or choosing a different category filter.</p>
          </div>
        ) : (
          Object.keys(groupedQuestions).map(subCat => (
            <div key={subCat} className={styles.subCatSection}>
              <h2 className={styles.subCatTitle}>
                <span className={styles.subCatIcon}>🏷️</span> {subCat}
              </h2>
              <div className={styles.questionsList}>
                {groupedQuestions[subCat].map((q) => {
                  const isExpanded = !!expandedQnas[q.originalIndex];
                  return (
                    <div 
                      key={q.originalIndex} 
                      className={`${styles.qnaCard} ${isExpanded ? styles.qnaCardActive : ''}`}
                    >
                      <button 
                        className={styles.qnaHeader} 
                        onClick={() => toggleQna(q.originalIndex)}
                        aria-expanded={isExpanded}
                      >
                        <span className={styles.questionText}>{q.question}</span>
                        <span className={styles.qnaIcon}>
                          <svg 
                            width="18" 
                            height="18" 
                            viewBox="0 0 24 24" 
                            fill="none" 
                            stroke="currentColor" 
                            strokeWidth="2.5" 
                            strokeLinecap="round" 
                            strokeLinejoin="round"
                            style={{ transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s ease' }}
                          >
                            <polyline points="6 9 12 15 18 9"></polyline>
                          </svg>
                        </span>
                      </button>
                      
                      {isExpanded && (
                        <div 
                          className={styles.qnaBody} 
                          dangerouslySetInnerHTML={{ __html: q.answer }} 
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Module19Content;
