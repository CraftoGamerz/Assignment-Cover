'use client';

import { useEffect, useMemo, useState, type CSSProperties } from 'react';

type Subject = {
  id: string;
  name: string;
  code: string;
};

type CoverTheme = 'minimal' | 'editorial' | 'frame' | 'ribbon' | 'ledger';
type SortMode = 'student' | 'subject';

type Settings = {
  names: string;
  collegeIds: string;
  rolls: string;
  sections: string;
  groups: string;
  stream: string;
  year: string;
  academicYear: string;
  collegeName: string;
  assignmentLabel: string;
  submissionNote: string;
  submittedByLabel: string;
  leftMargin: number;
  subjects: Subject[];
  assignments: number[];
  theme: CoverTheme;
  accent: string;
  sortMode: SortMode;
};

type Cover = {
  key: string;
  name: string;
  collegeId: string;
  roll: string;
  section: string;
  group: string;
  subject: Subject;
  assignment: number;
};

const STORAGE_KEY = 'jis-assignment-cover-settings-v1';

const DEFAULTS: Settings = {
  names: 'Abusina Hossain',
  collegeIds: 'JIS/2025/0611',
  rolls: '05',
  sections: '',
  groups: '',
  stream: 'CSE (AIML)',
  year: '2nd Year',
  academicYear: '2025–26',
  collegeName: 'JIS College of Engineering',
  assignmentLabel: 'Assignment',
  submissionNote: 'Prepared for academic submission',
  submittedByLabel: 'Submitted by',
  leftMargin: 0,
  subjects: [{ id: 'physics', name: 'Physics', code: 'PH101' }],
  assignments: [1, 2],
  theme: 'minimal',
  accent: '#10A37F',
  sortMode: 'student',
};

const COLORS = ['#10A37F', '#202D63', '#6D4AFF', '#C76818', '#B13E55'];

function splitList(value: string) {
  return value
    .split(/[,\n]+/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function valueAt(values: string[], index: number) {
  if (!values.length) return '';
  if (values.length === 1) return values[0];
  return values[index] ?? '';
}

function makeCovers(settings: Settings): Cover[] {
  const names = splitList(settings.names);
  const ids = splitList(settings.collegeIds);
  const rolls = splitList(settings.rolls);
  const sections = splitList(settings.sections);
  const groups = splitList(settings.groups);
  const students = (names.length ? names : ['Student name']).map((name, index) => ({
    name,
    collegeId: valueAt(ids, index),
    roll: valueAt(rolls, index),
    section: valueAt(sections, index),
    group: valueAt(groups, index),
  }));
  const subjects = settings.subjects.filter((subject) => subject.name.trim() || subject.code.trim());
  const assignments = settings.assignments.length ? [...settings.assignments].sort() : [1];
  const covers: Cover[] = [];

  if (settings.sortMode === 'subject') {
    subjects.forEach((subject) => {
      assignments.forEach((assignment) => {
        students.forEach((student, studentIndex) => {
          covers.push({ ...student, subject, assignment, key: `${subject.id}-${assignment}-${studentIndex}` });
        });
      });
    });
  } else {
    students.forEach((student, studentIndex) => {
      subjects.forEach((subject) => {
        assignments.forEach((assignment) => {
          covers.push({ ...student, subject, assignment, key: `${studentIndex}-${subject.id}-${assignment}` });
        });
      });
    });
  }

  return covers;
}

function CoverPage({ cover, settings }: { cover: Cover; settings: Settings }) {
  const safeLeftMargin = Math.max(0, Math.min(settings.leftMargin || 0, 18));
  const pageStyle = {
    '--page-accent': settings.accent,
    '--binding-offset': `${(safeLeftMargin / 210) * 100}%`,
  } as CSSProperties;
  const subjectName = cover.subject.name.trim() || 'Untitled Subject';
  const paperCode = cover.subject.code.trim() || '—';

  return (
    <article className={`cover-page theme-${settings.theme}`} style={pageStyle}>
      <div className="cover-orbit" aria-hidden="true"><span /></div>
      <div className="cover-rule" aria-hidden="true" />
      <header className="cover-header">
        <img src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/jis-college-logo.svg`} alt={settings.collegeName || 'College logo'} />
        <div className="academic-chip">Academic year {settings.academicYear || '2025–26'}</div>
      </header>

      <section className="cover-hero">
        <div className="assignment-label">{settings.assignmentLabel || 'Assignment'}</div>
        <div className="assignment-index">{String(cover.assignment).padStart(2, '0')}</div>
        <h2>{subjectName}</h2>
        <div className="paper-chip">{paperCode}</div>
      </section>

      <section className="cover-centerpiece" aria-label="Academic submission details">
        <div className="center-mark" aria-hidden="true"><span>{(settings.collegeName.trim()[0] || 'J').toUpperCase()}</span><i /></div>
        <div className="center-copy">
          <span>{settings.submissionNote || 'Prepared for academic submission'}</span>
          <strong>{settings.year} · {settings.academicYear || '2025–26'}</strong>
          <small>{settings.stream || 'Stream'} · {settings.collegeName || 'College'}</small>
        </div>
        <div className="center-count" aria-label={`Assignment number ${cover.assignment}`}>{String(cover.assignment).padStart(2, '0')}</div>
      </section>

      <section className="identity-card" aria-label="Student details">
        <div className="identity-heading">
          <span>{settings.submittedByLabel || 'Submitted by'}</span>
          <small>{settings.year} · {settings.stream || 'Stream'}</small>
        </div>
        <dl>
          <div><dt>Name</dt><dd>{cover.name}</dd></div>
          <div><dt>Stream</dt><dd>{settings.stream || '—'}</dd></div>
          <div><dt>Section</dt><dd>{cover.section || '—'}</dd></div>
          <div><dt>Group number</dt><dd>{cover.group || '—'}</dd></div>
          <div><dt>College ID</dt><dd>{cover.collegeId || '—'}</dd></div>
          <div><dt>Roll number</dt><dd>{cover.roll || '—'}</dd></div>
          <div><dt>Paper code</dt><dd>{paperCode}</dd></div>
        </dl>
      </section>

      <footer className="cover-footer">
        <span>{settings.collegeName || 'College'}</span>
        <span>{settings.assignmentLabel || 'Assignment'} {cover.assignment}</span>
      </footer>
      <div className="cover-watermark" aria-label="COCFUN watermark"><strong>COCFUN</strong><span>cover craft</span></div>
    </article>
  );
}

export default function Home() {
  const [settings, setSettings] = useState<Settings>(DEFAULTS);
  const [hydrated, setHydrated] = useState(false);
  const [saved, setSaved] = useState(true);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as Partial<Settings>;
        setSettings({
          ...DEFAULTS,
          ...parsed,
          subjects: parsed.subjects?.length ? parsed.subjects : DEFAULTS.subjects,
        });
      }
    } catch {
      // Keep the reliable defaults if a browser has invalid saved data.
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    setSaved(false);
    const timer = window.setTimeout(() => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
      setSaved(true);
    }, 320);
    return () => window.clearTimeout(timer);
  }, [settings, hydrated]);

  const covers = useMemo(() => makeCovers(settings), [settings]);
  const studentCount = Math.max(splitList(settings.names).length, 1);

  function update<K extends keyof Settings>(key: K, value: Settings[K]) {
    setSettings((current) => ({ ...current, [key]: value }));
  }

  function updateSubject(id: string, field: 'name' | 'code', value: string) {
    update('subjects', settings.subjects.map((subject) => subject.id === id ? { ...subject, [field]: value } : subject));
  }

  function addSubject() {
    update('subjects', [...settings.subjects, { id: `subject-${Date.now()}`, name: '', code: '' }]);
  }

  function removeSubject(id: string) {
    if (settings.subjects.length === 1) {
      update('subjects', [{ ...settings.subjects[0], name: '', code: '' }]);
      return;
    }
    update('subjects', settings.subjects.filter((subject) => subject.id !== id));
  }

  function toggleAssignment(number: number) {
    const active = settings.assignments.includes(number);
    if (active && settings.assignments.length === 1) return;
    update('assignments', active
      ? settings.assignments.filter((item) => item !== number)
      : [...settings.assignments, number]);
  }

  function resetDraft() {
    if (window.confirm('Reset every field and style choice to the original defaults?')) {
      localStorage.removeItem(STORAGE_KEY);
      setSettings(DEFAULTS);
    }
  }

  return (
    <main className="app-shell">
      <header className="app-header">
        <div className="brand-lockup">
          <span className="brand-mark">J</span>
          <div>
            <p>JIS Assignment Studio</p>
            <span>{covers.length} print-ready {covers.length === 1 ? 'page' : 'pages'}</span>
          </div>
        </div>
        <div className="header-actions">
          <span className={`save-state ${saved ? 'is-saved' : ''}`} aria-live="polite">
            <i /> {saved ? 'Saved' : 'Saving…'}
          </span>
          <button className="export-button" type="button" onClick={() => window.print()}>
            <span>Export PDF</span><b aria-hidden="true">↗</b>
          </button>
        </div>
      </header>

      <section className="workspace">
        <aside className="editor-card">
          <div className="editor-heading">
            <div className="eyebrow">Cover generator</div>
            <h1>One form.<br />Every front page.</h1>
            <p>Add comma-separated student details, then combine them with every subject and assignment number automatically.</p>
          </div>

          <section className="form-section">
            <div className="section-title"><span>01</span><div><h2>Students</h2><p>Lists match in the same order.</p></div></div>
            <div className="field-grid">
              <label className="field field-wide">
                <span>Names <em>comma separated</em></span>
                <textarea value={settings.names} onChange={(event) => update('names', event.target.value)} rows={2} placeholder="Abusina Hossain, Student Two" />
              </label>
              <label className="field field-wide">
                <span>College IDs <em>comma separated</em></span>
                <input value={settings.collegeIds} onChange={(event) => update('collegeIds', event.target.value)} placeholder="JIS/2025/0611, JIS/2025/0612" />
              </label>
              <label className="field field-wide">
                <span>Roll numbers <em>comma separated</em></span>
                <input value={settings.rolls} onChange={(event) => update('rolls', event.target.value)} placeholder="05, 06" />
              </label>
              <label className="field">
                <span>Sections <em>in order</em></span>
                <input value={settings.sections} onChange={(event) => update('sections', event.target.value)} placeholder="A, B" />
              </label>
              <label className="field">
                <span>Group numbers <em>in order</em></span>
                <input value={settings.groups} onChange={(event) => update('groups', event.target.value)} placeholder="1, 2" />
              </label>
              <label className="field">
                <span>Stream</span>
                <input value={settings.stream} onChange={(event) => update('stream', event.target.value)} placeholder="CSE (AIML)" />
              </label>
              <label className="field">
                <span>Year</span>
                <select value={settings.year} onChange={(event) => update('year', event.target.value)}>
                  <option>1st Year</option><option>2nd Year</option><option>3rd Year</option><option>4th Year</option>
                </select>
              </label>
              <label className="field field-wide">
                <span>Academic year <em>default stays 2025–26</em></span>
                <input value={settings.academicYear} onChange={(event) => update('academicYear', event.target.value)} placeholder="2025–26" />
              </label>
            </div>
          </section>

          <section className="form-section">
            <div className="section-title"><span>02</span><div><h2>Subjects & assignments</h2><p>Every combination becomes a page.</p></div></div>
            <div className="subject-list">
              {settings.subjects.map((subject, index) => (
                <div className="subject-row" key={subject.id}>
                  <label><span>Subject {index + 1}</span><input value={subject.name} onChange={(event) => updateSubject(subject.id, 'name', event.target.value)} placeholder="Subject name" /></label>
                  <label><span>Paper code</span><input value={subject.code} onChange={(event) => updateSubject(subject.id, 'code', event.target.value)} placeholder="Code" /></label>
                  <button className="remove-button" type="button" onClick={() => removeSubject(subject.id)} aria-label={`Remove subject ${index + 1}`}>×</button>
                </div>
              ))}
            </div>
            <button className="add-button" type="button" onClick={addSubject}><span>＋</span> Add another subject</button>
            <div className="assignment-control">
              <div><strong>Assignment numbers</strong><small>Keep one or select both</small></div>
              <div className="assignment-toggles">
                {[1, 2].map((number) => (
                  <button key={number} type="button" aria-pressed={settings.assignments.includes(number)} onClick={() => toggleAssignment(number)}>{number}</button>
                ))}
              </div>
            </div>
          </section>

          <section className="form-section style-section">
            <div className="section-title"><span>03</span><div><h2>Look & output</h2><p>Make it yours, without the clutter.</p></div></div>
            <fieldset className="theme-picker">
              <legend>Page theme</legend>
              {([
                ['minimal', 'Minimal'],
                ['editorial', 'Editorial'],
                ['frame', 'Frame'],
                ['ribbon', 'Ribbon'],
                ['ledger', 'Ledger'],
              ] as [CoverTheme, string][]).map(([value, label]) => (
                <button key={value} type="button" aria-pressed={settings.theme === value} onClick={() => update('theme', value)}>
                  <i className={`theme-icon theme-icon-${value}`} /><span>{label}</span>
                </button>
              ))}
            </fieldset>

            <div className="style-grid">
              <div className="color-field">
                <span>Theme color</span>
                <div className="swatches">
                  {COLORS.map((color) => (
                    <button key={color} type="button" className={settings.accent.toUpperCase() === color ? 'selected' : ''} style={{ backgroundColor: color }} onClick={() => update('accent', color)} aria-label={`Use color ${color}`} />
                  ))}
                  <label className="custom-color" title="Choose custom color">
                    <input type="color" value={settings.accent} onChange={(event) => update('accent', event.target.value.toUpperCase())} aria-label="Custom theme color" />
                    <span>＋</span>
                  </label>
                </div>
              </div>
              <label className="field arrange-field">
                <span>Arrange PDF</span>
                <select value={settings.sortMode} onChange={(event) => update('sortMode', event.target.value as SortMode)}>
                  <option value="student">Group by student</option>
                  <option value="subject">Group by subject</option>
                </select>
              </label>
            </div>
          </section>

          <section className="form-section meta-section">
            <div className="section-title"><span>04</span><div><h2>Page text & margins</h2><p>Fine-tune institution labels and binding space.</p></div></div>
            <div className="field-grid">
              <label className="field field-wide">
                <span>College / institution name</span>
                <input value={settings.collegeName} onChange={(event) => update('collegeName', event.target.value)} placeholder="JIS College of Engineering" />
              </label>
              <label className="field">
                <span>Document label</span>
                <input value={settings.assignmentLabel} onChange={(event) => update('assignmentLabel', event.target.value)} placeholder="Assignment" />
              </label>
              <label className="field">
                <span>Student section label</span>
                <input value={settings.submittedByLabel} onChange={(event) => update('submittedByLabel', event.target.value)} placeholder="Submitted by" />
              </label>
              <label className="field field-wide">
                <span>Center note</span>
                <input value={settings.submissionNote} onChange={(event) => update('submissionNote', event.target.value)} placeholder="Prepared for academic submission" />
              </label>
              <label className="margin-control field-wide">
                <span><strong>Left binding margin</strong><output>{settings.leftMargin || 0} mm</output></span>
                <input type="range" min="0" max="18" step="1" value={settings.leftMargin || 0} onChange={(event) => update('leftMargin', Number(event.target.value))} />
                <small>Moves printed content right without changing the A4 page size.</small>
              </label>
            </div>
            <div className="watermark-note"><span>COCFUN</span><p>A tiny, low-contrast watermark is kept intentionally quiet on every page.</p></div>
          </section>

          <div className="editor-footer">
            <div><strong>{studentCount} × {settings.subjects.filter((subject) => subject.name || subject.code).length} × {settings.assignments.length}</strong><span>students × subjects × assignments</span></div>
            <button type="button" onClick={resetDraft}>Reset draft</button>
          </div>
        </aside>

        <section className="preview-pane" aria-label="Assignment cover previews">
          <div className="preview-toolbar">
            <div><strong>Live preview</strong><span>A4 · {covers.length} {covers.length === 1 ? 'page' : 'pages'}</span></div>
            <button type="button" onClick={() => window.print()}>Print / Save PDF <span aria-hidden="true">↗</span></button>
          </div>

          {covers.length ? (
            <div className="page-list">
              {covers.map((cover, index) => (
                <div className="page-item" key={cover.key}>
                  <div className="page-meta"><span>{String(index + 1).padStart(2, '0')}</span><p>{cover.name} · {cover.subject.name || 'Untitled subject'} · A{cover.assignment}</p></div>
                  <CoverPage cover={cover} settings={settings} />
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-preview"><span>＋</span><h2>Add a subject to begin</h2><p>Your A4 pages will appear here instantly.</p></div>
          )}
        </section>
      </section>
    </main>
  );
}
