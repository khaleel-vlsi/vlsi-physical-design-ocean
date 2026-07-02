import React, { useState, useMemo } from 'react';
import { MODULE20_QUESTIONS } from '../../data/module20Data';
import styles from './Module20Content.module.css';

const CATEGORIES = [
  'All',
  'RTL Design',
  'Synthesis',
  'DFT',
  'STA'
];

const Module20Content = () => {
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
    return MODULE20_QUESTIONS.map((q, originalIndex) => ({
      ...q,
      originalIndex
    })).filter(q => {
      const matchesTab = activeTab === 'All' || q.category === activeTab;
      const matchesSearch = searchQuery.trim() === '' || 
        q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.subCategory.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.questionNumber.toLowerCase().includes(searchQuery.toLowerCase());
      
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
    const counts = { All: MODULE20_QUESTIONS.length };
    MODULE20_QUESTIONS.forEach(q => {
      counts[q.category] = (counts[q.category] || 0) + 1;
    });
    return counts;
  }, []);

  return (
    <div className={styles.moduleLayout} onCopy={preventCopy}>
      <div className={styles.header}>
        <h1 className={styles.title}>Module 20 - Core Interview Questions (RTL, Synth, DFT & STA)</h1>
        <p className={styles.subtitle}>
          Master high-level engineering interviews with 460 deep-dive Q&As covering advanced RTL coding constructs, logic synthesis optimizations, DFT scan compression, and sign-off STA closure.
        </p>
      </div>

      {/* Stats Bar */}
      <div className={styles.statsBar}>
        <div className={styles.statBox}>
          <span className={styles.statLabel}>Total Q&As</span>
          <span className={styles.statValue}>{MODULE20_QUESTIONS.length}</span>
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
            placeholder="Search keywords, categories, or questions..."
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
                        <span className={styles.questionText}>
                          <strong className={styles.qNumber}>{q.questionNumber}:</strong> {q.question}
                        </span>
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

export default Module20Content;
