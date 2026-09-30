# Ocean Physical Design - Quiz Practice System Master Specification

**Document Version**: 2.0  
**Project**: VLSI Physical Design Ocean  
**Target Module Count**: 18 Modules (16,200+ Total Questions)  
**Storage Architecture**: Google Sheets (Master Source) ➔ Supabase Database (Production Engine)

---

## 1. Objective & Core Vision

Build a **High-Performance Quiz Practice Platform** designed for unlimited student practice and knowledge reinforcement.

- **Practice-First Model**: Students can take unlimited practice quizzes across 18 modules.
- **Permanent Attempt Storage**: Every single attempt, selected answer, score, and timing detail is stored permanently in Supabase.
- **Answer & Solution Review**: Full post-exam review with technical explanations for every question.
- **No Certification Lock**: Focus is purely on skill mastery, speed, and conceptual precision.

---

## 2. Quiz Levels & Scoring Rules

Each module contains **3 distinct quiz difficulty levels**:

| Level | Questions | Time Limit | Pass % | Correct Mark | Negative Mark | Question Pool |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Easy** | 30 | 30 Mins | 70% | +1 | 0.00 | 300 Questions |
| **Medium** | 30 | 30 Mins | 70% | +1 | -0.25 | 300 Questions |
| **Advanced** | 30 | 30 Mins | 80% | +1 | -0.25 | 300 Questions |

- **Module Pool Total**: 900 Questions per Module (300 Easy + 300 Medium + 300 Advanced).
- **Total Master Bank**: 18 Modules × 900 Questions = **16,200+ Questions**.

---

## 3. Master Question Bank & Google Sheets Sync

- **Master Source**: Google Sheets (1 Sheet per Module).
- **Automated Sync Engine**: The website synchronizes all questions from Google Sheets into Supabase database tables (`modules` and `questions`).
- **Zero-Code Future Expansion**: Whenever a new module sheet is added to the Master Google Sheet, the system automatically detects it, creates the module entry, and makes it available in the UI without requiring code changes.
- **High-Speed Execution**: During exams, questions are fetched **strictly from Supabase PostgreSQL**, enabling sub-50ms load times and handling thousands of concurrent students.

### 3.1. Master Question Excel / Google Sheets Column Schema

| Column Name | Data Type | Example Value | Description |
| :--- | :--- | :--- | :--- |
| `Question_ID` | String (Unique) | `ELE001` | Unique ID across entire bank |
| `Module_ID` | String | `PD-M01` | Module Identifier (`PD-M01` to `PD-M18`) |
| `Difficulty` | Enum | `Easy` | `Easy`, `Medium`, or `Advanced` |
| `Type` | Enum | `SCQ` | Single Choice Question |
| `Topic` | String | `Basic Electronics` | Main Topic |
| `Sub_Topic` | String | `Atom` | Sub-topic area |
| `Question` | Text | `The smallest unit of an element is called:` | Question stem |
| `Option_A` | Text | `Compound` | First Option |
| `Option_B` | Text | `Atom` | Second Option |
| `Option_C` | Text | `Molecule` | Third Option |
| `Option_D` | Text | `Crystal` | Fourth Option |
| `Correct_Answer` | Enum | `B` | Correct option letter (`A`, `B`, `C`, or `D`) |
| `Explanation` | Text | `An atom is the smallest unit of an element...` | Technical rationale |
| `Marks` | Number | `1` | Marks awarded for correct answer |
| `Negative` | Number | `0` (Easy) / `-0.25` | Negative deduction for wrong answer |

---

## 4. Random Question Generation & Exam Paper Engine

Before an exam starts, the engine generates a completely unique paper:

1. **Selection**: Randomly selects 30 unique `Question_IDs` matching the selected `Module_ID` and `Difficulty`.
2. **Duplication Guard**: 0 duplicate questions per paper.
3. **Balanced Topic Distribution**: Algorithm ensures questions are sampled across multiple sub-topics rather than clustering on a single topic.
4. **Question Shuffling**: Fisher-Yates shuffle algorithm (`shuffleArray`) randomizes the question order for every exam paper session.
5. **Option Shuffling & A, B, C, D Re-labeling**:
   - Randomizes the 4 option texts (`optionA`, `optionB`, `optionC`, `optionD`) for every question.
   - Cleanly re-labels the shuffled options sequentially as `A`, `B`, `C`, and `D` (`String.fromCharCode(65 + i)`).
6. **Dynamic Correct Key Re-Mapping**:
   - Preserves the true correct answer text (`correctText`) before shuffling.
   - Finds which new option letter (`A`, `B`, `C`, or `D`) holds `correctText` after shuffling.
   - Dynamically re-maps `correctKey` to match the newly assigned option letter, ensuring 100% accurate grading (`selected === q.correctKey`).
7. **Persistence**: Saves the generated question paper structure into `quiz_attempts` in Supabase **before** starting the countdown timer.

---

## 5. Student Metadata & Exam Interface

### 5.1. Pre-Exam Student Intake
Collected before test launch:
- Full Name
- Email Address
- Phone Number
- Country

### 5.2. Automated Session Metadata
Recorded automatically on test launch:
- Timestamp (Date & Time)
- Selected Module & Difficulty
- User Agent / Browser Details
- IP Address

### 5.3. Exam Interface Controls
- **Countdown Timer**: 30:00 countdown with auto-submit on `00:00`.
- **Live Progress Bar**: Percentage of completed questions.
- **Interactive Question Palette**:
  - 🟩 Answered
  - 🟨 Marked for Review
  - ⬜ Unanswered / Skipped
- **Anti-Cheating Guard**:
  - Disables Right Click, Copy, Paste (`Ctrl+C`, `Ctrl+V`).
  - Intercepts Tab Switching / Blur events (`visibilitychange`) and DevTools inspect.
  - Automatic force-submit after 3 warning violations.

---

## 6. Result Engine & Complete Solution Review

### 6.1. Immediate Result Summary
Displayed instantly upon submission:
- Total Questions (30)
- Attempted / Wrong / Skipped Counts
- Final Marks & Percentage
- **PASS / FAIL** Badge (70% for Easy/Medium, 80% for Advanced)
- Total Time Taken

### 6.2. Full Solution Review (Color Coded)
Students can review all 30 questions post-exam:
- 🟢 **Correct Answer**: Green highlight with +1 mark.
- 🔴 **Wrong Answer**: Red highlight showing student selection vs correct choice with negative deduction (-0.25).
- ⚪ **Skipped**: Neutral gray indicator.
- **Detailed Explanation**: Full industrial rationale shown for every question.

---

## 7. Permanent Attempt History & Analytics Dashboards

### 7.1. Permanent Attempt Review
Every attempt is saved in `quiz_attempts` & `quiz_answers`. Students can revisit any past attempt from their history list at any time to review exact questions, student choices, and correct solutions.

### 7.2. Student Dashboard
- Breakdown by Difficulty (**Easy / Medium / Advanced**):
  - Total Attempts, Best Score, Latest Score, Average Score, Pass %
- Overall Summary: Total quizzes taken, pass/fail ratio, overall accuracy.

### 7.3. Admin & Question Intelligence Analytics
- Total Registered Students & Overall Quiz Attempts.
- **Question Statistics Table (`question_statistics`)**:
  - Total Attempts per `Question_ID`
  - Accuracy % per Question
  - Most Incorrect Questions & Most Correct Questions
  - Topic-wise & Sub-topic-wise Accuracy Trends
  - Average Time Spent per Question

---

## 8. Supabase Database Schema

```sql
-- 1. Users Table
CREATE TABLE public.quiz_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  phone TEXT,
  country TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Modules Table
CREATE TABLE public.quiz_modules (
  id INT PRIMARY KEY,
  module_code TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  sheet_name TEXT,
  total_questions INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Master Questions Table (16,200+ Capacity)
CREATE TABLE public.quiz_questions (
  id TEXT PRIMARY KEY, -- Question_ID e.g. ELE001
  module_id INT REFERENCES public.quiz_modules(id),
  difficulty TEXT NOT NULL, -- Easy, Medium, Advanced
  question_type TEXT DEFAULT 'SCQ',
  topic TEXT NOT NULL,
  sub_topic TEXT,
  question TEXT NOT NULL,
  option_a TEXT NOT NULL,
  option_b TEXT NOT NULL,
  option_c TEXT NOT NULL,
  option_d TEXT NOT NULL,
  correct_answer CHAR(1) NOT NULL, -- A, B, C, or D
  explanation TEXT,
  marks NUMERIC DEFAULT 1,
  negative_marks NUMERIC DEFAULT 0
);

-- 4. Quiz Attempts Table
CREATE TABLE public.quiz_attempts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.quiz_users(id),
  module_id INT REFERENCES public.quiz_modules(id),
  difficulty TEXT NOT NULL,
  status TEXT DEFAULT 'IN_PROGRESS', -- IN_PROGRESS, COMPLETED, AUTO_SUBMITTED
  total_questions INT DEFAULT 30,
  attempted_count INT DEFAULT 0,
  correct_count INT DEFAULT 0,
  wrong_count INT DEFAULT 0,
  skipped_count INT DEFAULT 0,
  final_marks NUMERIC DEFAULT 0,
  percentage NUMERIC DEFAULT 0,
  is_pass BOOLEAN DEFAULT FALSE,
  time_taken_seconds INT DEFAULT 0,
  browser_info TEXT,
  ip_address TEXT,
  paper_json JSONB, -- Generated 30 questions with shuffled options
  started_at TIMESTAMPTZ DEFAULT NOW(),
  submitted_at TIMESTAMPTZ
);

-- 5. Quiz Answers Table
CREATE TABLE public.quiz_answers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  attempt_id UUID REFERENCES public.quiz_attempts(id) ON DELETE CASCADE,
  question_id TEXT REFERENCES public.quiz_questions(id),
  selected_option CHAR(1),
  is_correct BOOLEAN,
  marks_awarded NUMERIC,
  time_spent_seconds INT
);

-- 6. Question Intelligence Statistics
CREATE TABLE public.question_statistics (
  question_id TEXT PRIMARY KEY REFERENCES public.quiz_questions(id),
  total_attempts INT DEFAULT 0,
  correct_attempts INT DEFAULT 0,
  wrong_attempts INT DEFAULT 0,
  accuracy_percentage NUMERIC DEFAULT 0,
  avg_time_seconds NUMERIC DEFAULT 0
);
```

---

## 9. Google Sheets Tab Naming & Future Module Expansion Rules

To add questions for new modules or maintain existing sheets in the Master Google Sheet (`https://docs.google.com/spreadsheets/d/1CDqC3mfqraxK28wAO_zF8wC-V3bBLUKwivNvV0wcSO4/edit`), follow these mandatory rules:

1. **Standard Tab Names**: Name individual module sheets as `PD-M01` through `PD-M19`.
2. **Combined Sheet Rule for Modules 9, 10 & 11 (STA Modules)**:
   - All 3 Static Timing Analysis modules (Module 9, Module 10, and Module 11) can be placed together inside a single combined sheet (tab).
   - **Critical Requirement**: Every row must have its exact module code in **Column B (`Module_ID`)**:
     - `PD-M09` for Module 9 (STA - 1)
     - `PD-M10` for Module 10 (STA - 2)
     - `PD-M11` for Module 11 (STA - 3)
   - The engine automatically filters questions by Column B `Module_ID` when a student selects Module 9, 10, or 11.
3. **Routing & OptRoute Breakdown (Modules 16 to 19)**:
   - **Module 16 (CTS 2)**: Tab `PD-M16` or `CTS2`
   - **Module 17 (Route)**: Tab `PD-M17` or `Route`
   - **Module 18 (OptRoute)**: Tab `PD-M18` or `OptRoute`
   - **Module 19 (PV & Signoff)**: Tab `PD-M19` or `PV`

---

- **Strict Access Enforcement**: Practice Quiz Exams across ALL modules (Modules 1 through 18) are **strictly reserved for Paid (Premium) Course Members** (`hasPremiumAccess` / `profile.course_active`).
- **Zero-Bypass Security Layers**:
  1. **Quiz Module Dashboard (`TestQuizModulesList.jsx`)**: Checks `hasPremiumAccess`. Unpaid users see a prominent `🔒 Premium Access Required` warning banner. Clicking any module alerts the user and redirects to enrollment (`/paid-modules` / `/login`).
  2. **Level Selection View (`TestQuizPlaylist.jsx`)**: Renders a dedicated `🔒 Premium Quiz Access Required` lock container blocking exam launch buttons for unpaid/guest sessions.
  3. **Exam Engine (`QuizEngine.jsx`)**: Enforces server/client session verification before generating test papers. Blocks question rendering for unpaid sessions and shows an instant lock overlay.

---

## 11. 3-Way Cross-Module Navigation System (`ModuleQuickNav`)

To maximize student learning efficiency, every module page across the platform features a unified top navigation bar (`ModuleQuickNav.jsx`):

### 11.1. Core Navigation Components
1. **📂 Main Section Directory Button**: Dynamically adapts to the current feature context:
   - On Video pages: `← Recorded Videos Main Page` (`/test-videos`)
   - On Study Material pages: `← Study Materials Main Page` (`/modules`)
   - On Quiz pages: `← Quiz Practice Main Page` (`/test-quiz-modules`)
2. **🎯 Module 1 → 18 Quick Switcher**:
   - **`◀ Prev` & `Next ▶` Step Buttons**: Instant sequential navigation between modules.
   - **Module Dropdown Selector**: `<select>` dropdown listing all 18 Modules (`Module 1: Intro to Electronics` through `Module 18: Physical Verification & Signoff`). Allows instant jumping to any module while preserving the current active view mode.
3. **🔀 3-Way Content Mode Switcher**:
   - 🎥 **Recorded Videos**: Links directly to `/test-video-playlist/:id`
   - 📖 **Study Material**: Links directly to `/modules/:id`
   - 📝 **Quiz Test**: Links directly to `/test-quiz-playlist/:id`
4. **🗺️ Platform Flow Graph Shortcut**: Direct link to the visual learning flow (`/platform-flow`).

---

## 12. Summary of Master Expansion Guidelines for Future Updates

1. **Sheet Tab Names**: Name tabs strictly as `PD-M01` through `PD-M18`.
2. **Column B Identifier**: Ensure Column B (`Module_ID`) contains matching codes (`PD-M01` to `PD-M18`).
3. **Paid User Gatekeeping**: All practice quiz endpoints automatically inherit `hasPremiumAccess` validation.
4. **Navigation Integration**: All new module pages must include `<ModuleQuickNav moduleId={id} activeTab="..." />` for consistent UX.


