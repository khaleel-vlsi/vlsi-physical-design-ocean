// src/pages/modules/Module59Content.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import { SCRAPER_LOGS_TEMPLATE, CRAWLER_STATS } from '../../data/jobsData';
import { supabase } from '../../services/supabase';
import styles from './Module59Content.module.css';

const Module59Content = () => {
  const { profile } = useAuth();
  const isPremium = profile?.course_active || profile?.role === 'admin';

  // Tabs: 'jobs' | 'admin' | 'notifications'
  const [activeTab, setActiveTab] = useState('jobs');

  // Search & Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedExperience, setSelectedExperience] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [selectedDomain, setSelectedDomain] = useState('All');

  // Scraper Simulation States
  const [isSyncing, setIsSyncing] = useState(false);
  const [isLoadingJobs, setIsLoadingJobs] = useState(true);
  const [syncLogs, setSyncLogs] = useState(SCRAPER_LOGS_TEMPLATE);
  const [stats, setStats] = useState(CRAWLER_STATS);
  const [jobs, setJobs] = useState([]);

  // Fetch Jobs from Supabase
  useEffect(() => {
    async function fetchJobs() {
      setIsLoadingJobs(true);
      const { data, error } = await supabase
        .from('physical_design_jobs')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching jobs:', error.message);
      } else if (data) {
        const formattedJobs = data.map(j => ({
          id: j.id,
          jobId: j.job_id,
          company: j.company,
          domain: j.domain,
          logoColor: j.logo_color,
          title: j.title,
          experience: j.experience,
          expRange: j.exp_range,
          location: j.location,
          type: j.type,
          skills: j.skills || [],
          tools: j.tools || [],
          date: j.date,
          description: j.description,
          applyUrl: j.apply_url,
          matchScore: j.match_score
        }));
        setJobs(formattedJobs);
      }
      setIsLoadingJobs(false);
    }
    fetchJobs();
  }, []);

  // Settings Configurations
  const [confidenceThreshold, setConfidenceThreshold] = useState(75);
  const [crawlInterval, setCrawlInterval] = useState(60);

  // Notifications State
  const [pushEnabled, setPushEnabled] = useState(true);
  const [emailEnabled, setEmailEnabled] = useState(true);
  const [telegramEnabled, setTelegramEnabled] = useState(false);
  const [copiedId, setCopiedId] = useState(null);

  const handleCopyJobId = (jobId) => {
    if (!jobId) return;
    navigator.clipboard.writeText(jobId);
    setCopiedId(jobId);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const logsEndRef = useRef(null);

  // Automatically scroll console to bottom on new logs
  useEffect(() => {
    if (logsEndRef.current) {
      logsEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [syncLogs]);

  // Scraper simulation execution
  const handleForceSync = () => {
    setIsSyncing(true);
    setSyncLogs([]);

    const steps = [
      { time: "08:15:00", type: "info", message: "Force sync triggered by administrator." },
      { time: "08:15:01", type: "info", message: "Connecting to 102 target career websites..." },
      { time: "08:15:02", type: "info", message: "Scraping official feeds for Cadence, Synopsys, and Siemens EDA..." },
      { time: "08:15:03", type: "success", message: "EDA Scraping Success: 18 jobs scanned." },
      { time: "08:15:04", type: "info", message: "Scraping Hyperscaler career pages (Google Custom Silicon, Microsoft hardware)..." },
      { time: "08:15:05", type: "success", message: "Hyperscalers Scraping Success: 6 custom chip engineering roles found." },
      { time: "08:15:06", type: "info", message: "Executing keyword scoring algorithms using Innovus, PrimeTime, CTS parameters..." },
      { time: "08:15:07", type: "info", message: "Filtering out irrelevant roles based on domain validation checks..." },
      { time: "08:15:08", type: "info", message: "Deduplicating entries against local PostgreSQL database..." },
      { time: "08:15:09", type: "success", message: "Database update complete: 2 new Physical Design roles added, 1 expired role removed." },
      { time: "08:15:10", type: "success", message: "Scraper execution finished successfully. Web view cache refreshed." }
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < steps.length) {
        setSyncLogs(prev => [...prev, steps[currentStep]]);
        currentStep++;
      } else {
        clearInterval(interval);
        setIsSyncing(false);
        setStats(prev => ({
          ...prev,
          lastSync: "Just now",
          activeJobsCount: prev.activeJobsCount + 2
        }));

        // Add 2 fresh mock jobs on sync completion
        const hasAdded = jobs.some(j => j.id === "job_added_1");
        if (!hasAdded) {
          const freshJobs = [
            {
              id: "job_added_1",
              jobId: "CBR-92815",
              company: "Cerebras Systems",
              domain: "CPU/GPU/AI",
              logoColor: "linear-gradient(135deg, #ff3366 0%, #990033 100%)",
              title: "Physical Design Architect - Wafer Scale Engine",
              experience: "Experienced",
              expRange: "8+ Years",
              location: "Sunnyvale, CA, USA",
              type: "Onsite",
              skills: ["Wafer Scale Design", "Clock Routing", "Power Delivery Mesh", "Floorplanning"],
              tools: ["Fusion Compiler", "RedHawk-SC", "PrimeTime"],
              date: "Just now",
              description: "Work on the largest chips in the world. Lead clock mesh routing, thermal grid modeling, and voltage drop optimization for Cerebras' massive AI wafer processors.",
              applyUrl: "https://www.cerebras.net/careers/",
              matchScore: 98
            },
            {
              id: "job_added_2",
              jobId: "MRVL-33924",
              company: "Marvell",
              domain: "Networking Silicon",
              logoColor: "linear-gradient(135deg, #00b0f0 0%, #005a8b 100%)",
              title: "Physical Design Engineer - PAM4 SerDes",
              experience: "Experienced",
              expRange: "3-5 Years",
              location: "Bengaluru, India",
              type: "Hybrid",
              skills: ["Block Implementation", "STA Signoff", "High Speed Routing"],
              tools: ["Innovus", "PrimeTime", "Tempus"],
              date: "Just now",
              description: "Deliver physical implementation for Marvell's networking SerDes IP blocks. Manage layout generation, constraint files integration, and multi-mode clock tree synthesis.",
              applyUrl: "https://marvell.wd1.myworkdayjobs.com/MarvellCareers",
              matchScore: 95
            }
          ];
          setJobs(prev => [...freshJobs, ...prev]);
        }
      }
    }, 400);
  };

  // Filter Logic
  const filteredJobs = jobs.filter(job => {
    const matchesSearch =
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
      job.tools.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesExperience = selectedExperience === 'All' || job.experience === selectedExperience;
    const matchesType = selectedType === 'All' || job.type === selectedType;
    const matchesDomain = selectedDomain === 'All' || job.domain === selectedDomain;

    let matchesLocation = true;
    if (selectedLocation !== 'All') {
      matchesLocation = job.location.toLowerCase().includes(selectedLocation.toLowerCase());
    }

    return matchesSearch && matchesExperience && matchesType && matchesLocation && matchesDomain;
  });

  // Dynamically extract unique locations from actual job data
  const uniqueLocations = [...new Set(
    jobs.flatMap(j => {
      const loc = j.location || '';
      // Extract city names from location strings like "Bengaluru, India" or "Austin, TX, USA"
      const parts = loc.split(',').map(p => p.trim());
      return parts.length > 0 ? [parts[0]] : [];
    }).filter(Boolean)
  )].sort();

  // Dynamically extract unique company domains from actual job data
  const uniqueDomains = [...new Set(jobs.map(j => j.domain).filter(Boolean))].sort();

  const renderJobsTab = () => {
    if (!isPremium) {
      // Non-Premium blurred view
      const previewJobs = jobs.slice(0, 3);
      return (
        <div className={styles.jobsContainer}>
          <div className={styles.blurContainer}>
            <div className={styles.jobsGrid}>
              {previewJobs.map(job => (
                <div key={job.id} className={styles.jobCard}>
                  <div className={styles.cardHeader}>
                    <div className={styles.companySection}>
                      <div className={styles.companyLogo} style={{ background: '#475569' }}>
                        {job.company.substring(0, 2)}
                      </div>
                      <div className={styles.companyMeta}>
                        <span className={styles.companyName}>{job.company}</span>
                        <h3 className={styles.jobTitle}>{job.title}</h3>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.lockOverlay}>
            <div className={styles.upgradeCard}>
              <div className={styles.lockHeader}>🔒</div>
              <h2 className={styles.lockTitle}>Premium Job Aggregator Locked</h2>
              <p className={styles.lockDesc}>
                Upgrade your subscription to unlock the full 24/7 Physical Design Job Hub tracking 100+ semiconductor careers pages.
              </p>
              <div className={styles.upgradePoints}>
                <div className={styles.pointItem}>
                  <span className={styles.pointCheck}>✓</span> Unrestricted access to 1,200+ active VLSI vacancies
                </div>
                <div className={styles.pointItem}>
                  <span className={styles.pointCheck}>✓</span> Multi-Mode search & filter tools for immediate matching
                </div>
                <div className={styles.pointItem}>
                  <span className={styles.pointCheck}>✓</span> Confidence match scores based on Innovus/STA skill requirements
                </div>
                <div className={styles.pointItem}>
                  <span className={styles.pointCheck}>✓</span> Automatic Telegram, Email, and Push alerts for new openings
                </div>
              </div>
              <button 
                onClick={() => window.location.href = '/dashboard'}
                className={styles.upgradeBtn}
              >
                Upgrade Subscription to Unlock
              </button>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className={styles.jobsContainer}>
        {/* Search & Filter Panel */}
        <div className={styles.controlPanel}>
          <div className={styles.searchWrapper}>
            <span className={styles.searchIcon}>🔍</span>
            <input
              type="text"
              placeholder="Search by company, job title, locations, tools (Innovus, PrimeTime) or skills..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
            />
          </div>

          <div className={styles.filterGrid}>
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className={styles.filterSelect}
            >
              <option value="All">All Locations</option>
              {uniqueLocations.map(loc => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>

            <select
              value={selectedDomain}
              onChange={(e) => setSelectedDomain(e.target.value)}
              className={styles.filterSelect}
            >
              <option value="All">All Company Domains</option>
              {uniqueDomains.map(dom => (
                <option key={dom} value={dom}>{dom}</option>
              ))}
            </select>

            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className={styles.filterSelect}
            >
              <option value="All">All Job Types</option>
              <option value="Onsite">On-site / Office</option>
              <option value="Hybrid">Hybrid</option>
              <option value="Remote">Remote</option>
            </select>
          </div>

          <div className={styles.filterPills}>
            <span className={styles.pillLabel}>Experience:</span>
            {['All', 'Freshers', 'Experienced', 'Internship'].map((exp) => (
              <button
                key={exp}
                onClick={() => setSelectedExperience(exp)}
                className={`${styles.pillBtn} ${selectedExperience === exp ? styles.activePill : ''}`}
              >
                {exp}
              </button>
            ))}
          </div>
        </div>

        {/* Job Listings Grid */}
        <div className={styles.jobsGrid}>
          {isLoadingJobs ? (
            <div style={{ textAlign: 'center', padding: '4rem', color: '#64748b' }}>
              <span className={styles.statusPulse} style={{ display: 'inline-block', marginRight: '10px' }}></span>
              <h3>Loading live jobs from database...</h3>
            </div>
          ) : filteredJobs.length > 0 ? (
            <>
              {(isPremium ? filteredJobs : filteredJobs.slice(0, 3)).map((job) => (
              <article key={job.id} className={styles.jobCard}>
                <div className={styles.cardHeader}>
                  <div className={styles.companySection}>
                    <div
                      className={styles.companyLogo}
                      style={{ background: job.logoColor }}
                    >
                      {job.company.substring(0, 2)}
                    </div>
                    <div className={styles.companyMeta}>
                      <span className={styles.companyName}>{job.company}</span>
                      <h3 className={styles.jobTitle}>{job.title}</h3>
                    </div>
                  </div>
                  <div className={styles.matchBadge}>
                    <span className={styles.badgePulse}></span>
                    {job.matchScore}% Match
                  </div>
                </div>

                <div className={styles.infoRow}>
                  <div 
                    className={`${styles.infoItem} ${styles.copyableId}`} 
                    onClick={() => handleCopyJobId(job.jobId)}
                    title="Click to copy Job ID"
                    style={{ color: '#fbbf24', fontWeight: '600' }}
                  >
                    <span>🆔</span> {job.jobId}
                    {copiedId === job.jobId && <span className={styles.copiedTooltip}>Copied!</span>}
                  </div>
                  <div className={styles.infoItem}>
                    <span>📍</span> {job.location}
                  </div>
                  <div className={styles.infoItem}>
                    <span>💼</span> {job.type}
                  </div>
                  <div className={styles.infoItem}>
                    <span>🎓</span> {job.expRange}
                  </div>
                </div>

                <p className={styles.description}>{job.description}</p>

                <div className={styles.tagRow}>
                  {job.skills.map((skill) => (
                    <span key={skill} className={styles.tag}>
                      {skill}
                    </span>
                  ))}
                  {job.tools.map((tool) => (
                    <span key={tool} className={`${styles.tag} ${styles.toolTag}`}>
                      {tool}
                    </span>
                  ))}
                </div>

                <div className={styles.cardFooter}>
                  <span className={styles.postingDate}>
                    <span>📅</span> Scraped {job.date}
                  </span>
                  <button
                    onClick={() => window.open(job.applyUrl, '_blank')}
                    className={styles.applyBtn}
                  >
                    Apply on Company Site ↗
                  </button>
                </div>
              </article>
              ))}
              {!isPremium && (
                <div className={styles.lockBanner} style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '3rem', background: 'linear-gradient(to right, rgba(15, 23, 42, 0.8), rgba(30, 41, 59, 0.9))', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', marginTop: '2rem' }}>
                  <h3 style={{ color: '#fff', fontSize: '1.5rem', marginBottom: '1rem' }}>🔒 Unlock Full Access to 90+ Company Portals</h3>
                  <p style={{ color: '#94a3b8', marginBottom: '2rem', maxWidth: '600px', margin: '0 auto 2rem' }}>
                    You are currently viewing a limited preview. Upgrade your account to see all live job postings, get real-time email alerts, and instantly apply to unlisted roles.
                  </p>
                  <button 
                    onClick={() => window.location.href = '/course'} 
                    style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)', color: 'white', padding: '12px 24px', borderRadius: '8px', border: 'none', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)' }}
                  >
                    Upgrade Now ↗
                  </button>
                </div>
              )}
            </>
          ) : (
            <div style={{ textAlign: 'center', padding: '3rem', color: '#64748b' }}>
              <h3>No jobs found matching your criteria.</h3>
              <p>Try clearing your search query or modifying filters.</p>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderAdminTab = () => {
    return (
      <div className={styles.adminGrid}>
        {/* Scraper Stats Row */}
        <div className={styles.statsRow}>
          <div className={styles.statCard}>
            <div className={styles.statVal} style={{ color: stats.status === 'Healthy' ? '#4ade80' : '#f87171' }}>
              {stats.status}
            </div>
            <div className={styles.statLabel}>Automation Status</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statVal}>{stats.crawlersActive}</div>
            <div className={styles.statLabel}>Active Crawlers</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statVal}>{stats.activeJobsCount}</div>
            <div className={styles.statLabel}>Total Jobs Indexed</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statVal}>{stats.lastSync}</div>
            <div className={styles.statLabel}>Last Scrape Cycle</div>
          </div>
        </div>

        {/* Scraper Console Logs */}
        <div className={styles.adminCard}>
          <div className={styles.adminHeader}>
            <div className={styles.adminTitle}>🤖 Live Crawl Logs</div>
            <button
              onClick={handleForceSync}
              disabled={isSyncing}
              className={styles.syncBtn}
            >
              {isSyncing ? (
                <>
                  <span className={`${styles.spinning} ${styles.syncIcon}`}>🔄</span>
                  Scraping Feeds...
                </>
              ) : (
                <>
                  <span>⚡</span>
                  Force Scraper Run
                </>
              )}
            </button>
          </div>

          <div className={styles.terminal}>
            <div className={styles.terminalHeader}>
              <div className={styles.terminalDots}>
                <span className={`${styles.terminalDot} ${styles.dotRed}`}></span>
                <span className={`${styles.terminalDot} ${styles.dotYellow}`}></span>
                <span className={`${styles.terminalDot} ${styles.dotGreen}`}></span>
              </div>
              <span className={styles.terminalTitle}>anti_gravity_scraper.log</span>
            </div>
            <div className={styles.terminalBody}>
              {syncLogs.map((log, idx) => (
                <div key={idx} className={styles.logLine}>
                  <span className={styles.logTime}>[{log.time}]</span>
                  <span className={`${styles.logText} ${
                    log.type === 'success' ? styles.logSuccess :
                    log.type === 'warning' ? styles.logWarning : styles.logInfo
                  }`}>
                    {log.message}
                  </span>
                </div>
              ))}
              <div ref={logsEndRef} />
            </div>
          </div>
        </div>

        {/* Scraper Control Settings */}
        <div className={styles.adminCard}>
          <div className={styles.adminTitle}>⚙️ Crawling Parameters</div>
          <div className={styles.settingsGrid}>
            <div className={styles.settingItem}>
              <label className={styles.settingLabel}>Crawl Interval (minutes)</label>
              <input
                type="number"
                value={crawlInterval}
                onChange={(e) => setCrawlInterval(parseInt(e.target.value))}
                className={styles.settingInput}
              />
            </div>
            <div className={styles.settingItem}>
              <label className={styles.settingLabel}>Confidence Match Threshold (%)</label>
              <input
                type="number"
                value={confidenceThreshold}
                onChange={(e) => setConfidenceThreshold(parseInt(e.target.value))}
                className={styles.settingInput}
              />
            </div>
          </div>
          <div className={styles.settingItem}>
            <label className={styles.settingLabel}>Monitored Target URLs (102 Companies)</label>
            <textarea
              readOnly
              value="https://nvidia.com/careers, https://intel.com/jobs, https://apple.com/jobs, https://qualcomm.com/careers, https://synopsys.com/careers, https://cadence.com/careers, https://google.com/about/careers, https://tsmc.com/careers, https://moschip.com/careers, https://tataelectronics.co.in/careers, https://broadcom.com/careers, https://micron.com/careers..."
              rows={2}
              style={{
                background: 'rgba(15, 23, 42, 0.6)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                color: '#64748b',
                padding: '10px',
                borderRadius: '8px',
                fontSize: '0.85rem',
                outline: 'none',
                resize: 'none',
                fontFamily: 'monospace'
              }}
            />
          </div>
        </div>
      </div>
    );
  };

  const renderNotificationsTab = () => {
    return (
      <div className={styles.notifyCard}>
        <div className={styles.adminTitle} style={{ marginBottom: '5px' }}>🔔 Real-time Alerts Settings</div>
        <p style={{ fontSize: '0.85rem', color: '#64748b', marginTop: 0 }}>
          Receive automated alerts the instant our scrapers index jobs fitting your Physical Design match threshold.
        </p>

        <div className={styles.notifyItem}>
          <div className={styles.notifyMeta}>
            <span className={styles.notifyTitle}>Email Notifications</span>
            <span className={styles.notifyDesc}>Send direct emails when high confidence match jobs are indexed.</span>
          </div>
          <label className={styles.toggleSwitch}>
            <input
              type="checkbox"
              checked={emailEnabled}
              onChange={() => setEmailEnabled(!emailEnabled)}
            />
            <span className={styles.slider}></span>
          </label>
        </div>

        <div className={styles.notifyItem}>
          <div className={styles.notifyMeta}>
            <span className={styles.notifyTitle}>Browser Web Push Alerts</span>
            <span className={styles.notifyDesc}>Show instant desktop notifications for recently scraped vacancies.</span>
          </div>
          <label className={styles.toggleSwitch}>
            <input
              type="checkbox"
              checked={pushEnabled}
              onChange={() => setPushEnabled(!pushEnabled)}
            />
            <span className={styles.slider}></span>
          </label>
        </div>

        <div className={styles.notifyItem}>
          <div className={styles.notifyMeta}>
            <span className={styles.notifyTitle}>Telegram Bot Channel Integrations</span>
            <span className={styles.notifyDesc}>Deliver alerts directly to your personal Telegram chat or channel.</span>
          </div>
          <label className={styles.toggleSwitch}>
            <input
              type="checkbox"
              checked={telegramEnabled}
              onChange={() => setTelegramEnabled(!telegramEnabled)}
            />
            <span className={styles.slider}></span>
          </label>
        </div>

        {telegramEnabled && (
          <div
            style={{
              background: 'rgba(56, 189, 248, 0.06)',
              border: '1px solid rgba(56, 189, 248, 0.2)',
              borderRadius: '8px',
              padding: '12px',
              fontSize: '0.85rem',
              color: '#94a3b8',
              animation: 'floatIn 0.3s ease-out'
            }}
          >
            <strong>Setup Telegram Bot Alerting:</strong>
            <ol style={{ margin: '8px 0 0 16px', padding: 0 }}>
              <li>Open Telegram and search for <code>@AntiGravityJobsBot</code></li>
              <li>Click <code>/start</code> and copy your unique Chat ID</li>
              <li>Paste the Chat ID in the setting field to establish secure alerts forwarding</li>
            </ol>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={styles.moduleLayout}>
      {/* Header */}
      <div className={styles.header}>
        <h1 className={styles.title}>Ocean Physical Design Job Finder</h1>
        <p className={styles.subtitle}>
          Premium 24x7 scraper index aggregating and tool-matching backend VLSI opportunities globally.
        </p>

        {isPremium && (
          <div className={styles.statusBar}>
            <div className={styles.statusIndicator}>
              <span className={styles.statusPulse}></span>
              Live Crawler Running
            </div>
            <span className={styles.statsText}>
              • 102 career sites monitored • Last sync: {stats.lastSync}
            </span>
          </div>
        )}
      </div>

      {/* Active Tab Panel Render */}
      <main>
        {renderJobsTab()}
      </main>
    </div>
  );
};

export default Module59Content;
