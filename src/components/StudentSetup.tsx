import React, { useState, useEffect } from 'react';
import {
  GraduationCap,
  Sparkles,
  BookOpen,
  CheckCircle2,
  HelpCircle,
  Zap,
  ListOrdered,
  Languages,
  ChevronDown,
  Building2,
  School,
  Layers,
  Edit3,
  Calendar,
  Compass,
  AlertCircle,
} from 'lucide-react';
import {
  EducationLevel,
  ExplanationStyle,
  SecondarySubLevel,
  ExamTarget,
  PolyLevel,
  UniversityYear,
  SemesterOption,
  SubjectOption,
  StudentAcademicProfile,
} from '../types';
import { EDUCATION_LEVELS, EXPLANATION_STYLES } from '../constants/subjects';
import {
  JSS_SUBJECTS,
  SSS_SUBJECTS,
  WAEC_NECO_SUBJECTS,
  POLYTECHNIC_PROGRAMMES,
  UNIVERSITY_DISCIPLINES,
} from '../constants/educationData';

interface StudentSetupProps {
  profile: StudentAcademicProfile;
  onUpdateProfile: (updated: StudentAcademicProfile, selectedSubjectOption: SubjectOption) => void;
  isOpen: boolean;
  onClose: () => void;
}

export const StudentSetup: React.FC<StudentSetupProps> = ({
  profile,
  onUpdateProfile,
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  // Local working state for the drawer
  const [level, setLevel] = useState<EducationLevel>(profile.educationLevel);
  const [style, setStyle] = useState<ExplanationStyle>(profile.explanationStyle);

  // Secondary sub-state
  const [secondarySubLevel, setSecondarySubLevel] = useState<SecondarySubLevel>(
    profile.secondarySubLevel || 'SSS'
  );

  // WAEC/NECO sub-state
  const [examTarget, setExamTarget] = useState<ExamTarget>(profile.examTarget || 'WAEC');

  // Polytechnic sub-state
  const [polyLevel, setPolyLevel] = useState<PolyLevel>(profile.polyLevel || 'ND I');
  const [polyProgrammeId, setPolyProgrammeId] = useState<string>(
    POLYTECHNIC_PROGRAMMES.find((p) => p.name === profile.polyProgramme)?.id || 'cs'
  );
  const [polySemester, setPolySemester] = useState<SemesterOption>(
    profile.polySemester || 'First Semester'
  );

  // University sub-state
  const [uniDisciplineId, setUniDisciplineId] = useState<string>(
    UNIVERSITY_DISCIPLINES.find((d) => d.name === profile.universityDiscipline)?.id || 'uni-cs'
  );
  const [uniYear, setUniYear] = useState<UniversityYear>(profile.universityYear || '100 Level');
  const [uniSemester, setUniSemester] = useState<SemesterOption>(
    profile.universitySemester || 'First Semester'
  );

  // Subject selection & custom input
  const [selectedSubjectName, setSelectedSubjectName] = useState<string>(profile.subjectName);
  const [isCustomSubject, setIsCustomSubject] = useState<boolean>(Boolean(profile.isCustomSubject));
  const [customSubjectInput, setCustomSubjectInput] = useState<string>(
    profile.customSubjectInput || ''
  );

  // Compute active available subjects list based on current selections
  const getAvailableSubjects = (): SubjectOption[] => {
    if (level === 'Secondary School') {
      return secondarySubLevel === 'JSS' ? JSS_SUBJECTS : SSS_SUBJECTS;
    }
    if (level === 'WAEC/NECO Preparation') {
      return WAEC_NECO_SUBJECTS;
    }
    if (level === 'ND/HND') {
      const prog =
        POLYTECHNIC_PROGRAMMES.find((p) => p.id === polyProgrammeId) || POLYTECHNIC_PROGRAMMES[0];
      return polyLevel.startsWith('HND') ? prog.hndCourseUnits : prog.ndCourseUnits;
    }
    if (level === 'University') {
      const disc =
        UNIVERSITY_DISCIPLINES.find((d) => d.id === uniDisciplineId) || UNIVERSITY_DISCIPLINES[0];
      return uniYear === '100 Level' ? disc.year100Units : disc.seniorUnits;
    }
    return SSS_SUBJECTS;
  };

  const currentAvailableSubjects = getAvailableSubjects();

  // Handle top-level category change with mandatory reset of dependent choices!
  const handleCategoryChange = (newLevel: EducationLevel) => {
    if (newLevel === level) return;
    setLevel(newLevel);
    setIsCustomSubject(false);
    setCustomSubjectInput('');

    // Reset dependents and pick the first subject of the new category
    if (newLevel === 'Secondary School') {
      setSecondarySubLevel('SSS');
      setSelectedSubjectName(SSS_SUBJECTS[0].name);
    } else if (newLevel === 'WAEC/NECO Preparation') {
      setExamTarget('WAEC');
      setSelectedSubjectName(WAEC_NECO_SUBJECTS[0].name);
    } else if (newLevel === 'ND/HND') {
      setPolyLevel('ND I');
      setPolyProgrammeId('cs');
      setPolySemester('First Semester');
      setSelectedSubjectName(POLYTECHNIC_PROGRAMMES[0].ndCourseUnits[0].name);
    } else if (newLevel === 'University') {
      setUniDisciplineId('uni-cs');
      setUniYear('100 Level');
      setUniSemester('First Semester');
      setSelectedSubjectName(UNIVERSITY_DISCIPLINES[0].year100Units[0].name);
    }
  };

  // When secondary sublevel changes (JSS <-> SSS), reset subject to first valid item
  const handleSecondarySubLevelChange = (newSub: SecondarySubLevel) => {
    setSecondarySubLevel(newSub);
    setIsCustomSubject(false);
    const list = newSub === 'JSS' ? JSS_SUBJECTS : SSS_SUBJECTS;
    setSelectedSubjectName(list[0].name);
  };

  // When polytechnic programme or level changes, update available courses and reset selection
  const handlePolyProgrammeChange = (progId: string) => {
    setPolyProgrammeId(progId);
    setIsCustomSubject(false);
    const prog = POLYTECHNIC_PROGRAMMES.find((p) => p.id === progId) || POLYTECHNIC_PROGRAMMES[0];
    const units = polyLevel.startsWith('HND') ? prog.hndCourseUnits : prog.ndCourseUnits;
    setSelectedSubjectName(units[0]?.name || 'Introduction to Computing');
  };

  const handlePolyLevelChange = (lvl: PolyLevel) => {
    setPolyLevel(lvl);
    setIsCustomSubject(false);
    const prog =
      POLYTECHNIC_PROGRAMMES.find((p) => p.id === polyProgrammeId) || POLYTECHNIC_PROGRAMMES[0];
    const units = lvl.startsWith('HND') ? prog.hndCourseUnits : prog.ndCourseUnits;
    setSelectedSubjectName(units[0]?.name || 'Course Unit');
  };

  // When university discipline or year changes, reset selection
  const handleUniDisciplineChange = (discId: string) => {
    setUniDisciplineId(discId);
    setIsCustomSubject(false);
    const disc =
      UNIVERSITY_DISCIPLINES.find((d) => d.id === discId) || UNIVERSITY_DISCIPLINES[0];
    const units = uniYear === '100 Level' ? disc.year100Units : disc.seniorUnits;
    setSelectedSubjectName(units[0]?.name || 'Course Unit');
  };

  const handleUniYearChange = (yr: UniversityYear) => {
    setUniYear(yr);
    setIsCustomSubject(false);
    const disc =
      UNIVERSITY_DISCIPLINES.find((d) => d.id === uniDisciplineId) || UNIVERSITY_DISCIPLINES[0];
    const units = yr === '100 Level' ? disc.year100Units : disc.seniorUnits;
    setSelectedSubjectName(units[0]?.name || 'Course Unit');
  };

  const handleSaveAndApply = () => {
    const finalSubjectName = isCustomSubject
      ? customSubjectInput.trim() || 'General Studies'
      : selectedSubjectName;

    const matchedSubjectOption: SubjectOption = currentAvailableSubjects.find(
      (s) => s.name === finalSubjectName
    ) || {
      id: 'custom-sub',
      name: finalSubjectName,
      category: 'Custom',
      popularTopics: ['Key Concepts', 'Principles', 'Problem Solving', 'Exam Questions'],
    };

    const updatedProfile: StudentAcademicProfile = {
      educationLevel: level,
      explanationStyle: style,
      secondarySubLevel: level === 'Secondary School' ? secondarySubLevel : undefined,
      examTarget: level === 'WAEC/NECO Preparation' ? examTarget : undefined,
      polyLevel: level === 'ND/HND' ? polyLevel : undefined,
      polyProgramme:
        level === 'ND/HND'
          ? POLYTECHNIC_PROGRAMMES.find((p) => p.id === polyProgrammeId)?.name
          : undefined,
      polySemester: level === 'ND/HND' ? polySemester : undefined,
      universityDiscipline:
        level === 'University'
          ? UNIVERSITY_DISCIPLINES.find((d) => d.id === uniDisciplineId)?.name
          : undefined,
      universityYear: level === 'University' ? uniYear : undefined,
      universitySemester: level === 'University' ? uniSemester : undefined,
      subjectName: finalSubjectName,
      isCustomSubject,
      customSubjectInput: isCustomSubject ? customSubjectInput : '',
    };

    onUpdateProfile(updatedProfile, matchedSubjectOption);
    onClose();
  };

  return (
    <div className="bg-white border border-emerald-950/15 rounded-2xl p-5 sm:p-7 shadow-sm mb-6 transition-all">
      {/* Drawer Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-emerald-700" />
            Select Your Academic Level & Subject
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            EduBridge AI adjusts explanation depth, vocabulary, and exam orientation to your exact Nigerian level.
          </p>
        </div>
        <button
          onClick={handleSaveAndApply}
          className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs sm:text-sm font-semibold shadow-xs transition-colors cursor-pointer"
        >
          Apply Setup
        </button>
      </div>

      <div className="space-y-6">
        {/* Step 1: Education Level (Category) */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5">
            1. Education Category
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
            {EDUCATION_LEVELS.map((lvl) => {
              const isSelected = level === lvl.id;
              return (
                <button
                  key={lvl.id}
                  type="button"
                  onClick={() => handleCategoryChange(lvl.id)}
                  className={`text-left p-3.5 rounded-xl border transition-all cursor-pointer relative ${
                    isSelected
                      ? 'bg-emerald-50/90 border-emerald-600 ring-2 ring-emerald-500/20 shadow-xs'
                      : 'bg-slate-50/50 border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/20'
                  }`}
                >
                  <div className="flex items-start justify-between gap-1 mb-1">
                    <span className="font-bold text-slate-900 text-xs sm:text-sm">
                      {lvl.label}
                    </span>
                    {isSelected && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                    )}
                  </div>
                  <p className="text-[11px] text-slate-500 leading-snug">{lvl.desc}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 2: Conditional Sub-Level / Programme Selection */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-4">
          {/* A. Secondary School Details */}
          {level === 'Secondary School' && (
            <div>
              <div className="flex items-center gap-2 mb-2 text-xs font-bold uppercase tracking-wider text-slate-600">
                <School className="w-4 h-4 text-emerald-700" />
                <span>Select Class Level:</span>
              </div>
              <div className="flex flex-wrap gap-2.5">
                <button
                  type="button"
                  onClick={() => handleSecondarySubLevelChange('JSS')}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold border transition-all cursor-pointer ${
                    secondarySubLevel === 'JSS'
                      ? 'bg-emerald-700 text-white border-emerald-700 shadow-2xs'
                      : 'bg-white text-slate-700 border-slate-200 hover:border-emerald-300'
                  }`}
                >
                  Junior Secondary (JSS 1 - 3)
                </button>
                <button
                  type="button"
                  onClick={() => handleSecondarySubLevelChange('SSS')}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold border transition-all cursor-pointer ${
                    secondarySubLevel === 'SSS'
                      ? 'bg-emerald-700 text-white border-emerald-700 shadow-2xs'
                      : 'bg-white text-slate-700 border-slate-200 hover:border-emerald-300'
                  }`}
                >
                  Senior Secondary (SSS 1 - 3)
                </button>
              </div>
              <p className="text-[11px] text-slate-500 mt-2">
                {secondarySubLevel === 'JSS'
                  ? 'Showing Universal Basic Education subjects (Basic Science, Basic Tech, Business Studies, etc.)'
                  : 'Showing Senior Secondary core & departmental subjects (Sciences, Commercial, Arts).'}
              </p>
            </div>
          )}

          {/* B. WAEC / NECO Preparation Details */}
          {level === 'WAEC/NECO Preparation' && (
            <div>
              <div className="flex items-center gap-2 mb-2 text-xs font-bold uppercase tracking-wider text-slate-600">
                <BookOpen className="w-4 h-4 text-emerald-700" />
                <span>Target Examination:</span>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {(['WAEC', 'NECO', 'Both WAEC & NECO'] as ExamTarget[]).map((exam) => (
                  <button
                    key={exam}
                    type="button"
                    onClick={() => setExamTarget(exam)}
                    className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold border transition-all cursor-pointer ${
                      examTarget === exam
                        ? 'bg-emerald-700 text-white border-emerald-700 shadow-2xs'
                        : 'bg-white text-slate-700 border-slate-200 hover:border-emerald-300'
                    }`}
                  >
                    {exam === 'WAEC'
                      ? 'WAEC (WASSCE)'
                      : exam === 'NECO'
                      ? 'NECO (SSCE)'
                      : 'Both WAEC & NECO / GCE'}
                  </button>
                ))}
              </div>
              <p className="text-[11px] text-slate-500 mt-2">
                Lessons and quizzes will be structured around official WAEC / NECO syllabus mark schemes and past exam questions.
              </p>
            </div>
          )}

          {/* C. Polytechnic (ND / HND) Details */}
          {level === 'ND/HND' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* Level: ND I, ND II, HND I, HND II */}
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                    Polytechnic Level
                  </label>
                  <select
                    value={polyLevel}
                    onChange={(e) => handlePolyLevelChange(e.target.value as PolyLevel)}
                    className="w-full p-2.5 bg-white border border-slate-200 rounded-lg text-xs sm:text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  >
                    <option value="ND I">ND I (National Diploma 1)</option>
                    <option value="ND II">ND II (National Diploma 2)</option>
                    <option value="HND I">HND I (Higher National Diploma 1)</option>
                    <option value="HND II">HND II (Higher National Diploma 2)</option>
                  </select>
                </div>

                {/* Programme / Department */}
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                    Programme / Department
                  </label>
                  <select
                    value={polyProgrammeId}
                    onChange={(e) => handlePolyProgrammeChange(e.target.value)}
                    className="w-full p-2.5 bg-white border border-slate-200 rounded-lg text-xs sm:text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  >
                    {POLYTECHNIC_PROGRAMMES.map((prog) => (
                      <option key={prog.id} value={prog.id}>
                        {prog.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Semester */}
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                    Semester
                  </label>
                  <select
                    value={polySemester}
                    onChange={(e) => setPolySemester(e.target.value as SemesterOption)}
                    className="w-full p-2.5 bg-white border border-slate-200 rounded-lg text-xs sm:text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  >
                    <option value="First Semester">First Semester</option>
                    <option value="Second Semester">Second Semester</option>
                  </select>
                </div>
              </div>

              <div className="text-[11px] text-slate-500 bg-white/70 p-2.5 rounded-lg border border-slate-200 flex items-start gap-1.5">
                <AlertCircle className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                <span>
                  Course codes and unit structures follow standard NBTE polytechnic benchmarks (e.g. Akwa Ibom State Poly Ikot Osurua, Nekede, Yabatech). Select a suggested unit below or type your custom course unit.
                </span>
              </div>
            </div>
          )}

          {/* D. University Details */}
          {level === 'University' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* Course / Discipline */}
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                    Faculty & Discipline
                  </label>
                  <select
                    value={uniDisciplineId}
                    onChange={(e) => handleUniDisciplineChange(e.target.value)}
                    className="w-full p-2.5 bg-white border border-slate-200 rounded-lg text-xs sm:text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  >
                    {UNIVERSITY_DISCIPLINES.map((disc) => (
                      <option key={disc.id} value={disc.id}>
                        {disc.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Study Year / Level */}
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                    Study Year / Level
                  </label>
                  <select
                    value={uniYear}
                    onChange={(e) => handleUniYearChange(e.target.value as UniversityYear)}
                    className="w-full p-2.5 bg-white border border-slate-200 rounded-lg text-xs sm:text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  >
                    <option value="100 Level">100 Level (Year 1 / Freshman)</option>
                    <option value="200 Level">200 Level (Year 2)</option>
                    <option value="300 Level">300 Level (Year 3)</option>
                    <option value="400 Level">400 Level (Year 4)</option>
                    <option value="500 Level">500 Level (Year 5 / Professional)</option>
                  </select>
                </div>

                {/* Semester */}
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                    Semester
                  </label>
                  <select
                    value={uniSemester}
                    onChange={(e) => setUniSemester(e.target.value as SemesterOption)}
                    className="w-full p-2.5 bg-white border border-slate-200 rounded-lg text-xs sm:text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  >
                    <option value="First Semester">First Semester</option>
                    <option value="Second Semester">Second Semester</option>
                  </select>
                </div>
              </div>

              <div className="text-[11px] text-slate-500 bg-white/70 p-2.5 rounded-lg border border-slate-200 flex items-start gap-1.5">
                <AlertCircle className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                <span>
                  University curricula vary across institutions (e.g. University of Uyo, UNILAG, UNN, ABU). 100L presents general foundation courses (GST/MTH/PHY/CHM/BIO/COS). For senior levels or unlisted units, choose "Other / Enter Course Unit".
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Step 3: Dependent Subject / Course Unit Selection */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
              2. Available Subjects / Course Units
            </label>
            <span className="text-xs text-emerald-800 font-semibold">
              Selected:{' '}
              <strong className="text-slate-900">
                {isCustomSubject
                  ? customSubjectInput || '(Typing custom course...)'
                  : selectedSubjectName}
              </strong>
            </span>
          </div>

          {/* Subject pills */}
          <div className="flex flex-wrap gap-2 mb-3">
            {currentAvailableSubjects.map((sub) => {
              const isSelected = !isCustomSubject && selectedSubjectName === sub.name;
              return (
                <button
                  key={sub.id}
                  type="button"
                  onClick={() => {
                    setIsCustomSubject(false);
                    setSelectedSubjectName(sub.name);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium border transition-all cursor-pointer flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-emerald-700 text-white border-emerald-700 shadow-2xs font-semibold'
                      : 'bg-white text-slate-700 border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/50'
                  }`}
                >
                  <span>{sub.name}</span>
                </button>
              );
            })}

            {/* "Other / Enter subject" option */}
            <button
              type="button"
              onClick={() => {
                setIsCustomSubject(true);
                if (!customSubjectInput) {
                  setCustomSubjectInput('');
                }
              }}
              className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold border transition-all cursor-pointer flex items-center gap-1.5 ${
                isCustomSubject
                  ? 'bg-emerald-700 text-white border-emerald-700 shadow-2xs'
                  : 'bg-amber-50 text-amber-900 border-amber-200 hover:border-emerald-300 hover:bg-emerald-50'
              }`}
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>+ Other / Enter Custom Subject</span>
            </button>
          </div>

          {/* Custom Subject Text Input if selected */}
          {isCustomSubject && (
            <div className="p-3.5 bg-emerald-50/60 border border-emerald-200 rounded-xl space-y-1.5 animate-in fade-in duration-150">
              <label className="block text-xs font-bold text-slate-800">
                Enter your exact Subject / Course Unit title or course code:
              </label>
              <input
                type="text"
                value={customSubjectInput}
                onChange={(e) => setCustomSubjectInput(e.target.value)}
                placeholder="e.g. GNS 101 Use of English, CEC 204 Soil Mechanics, Further Math, Literature in English..."
                className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                autoFocus
              />
              <p className="text-[11px] text-slate-500">
                EduBridge AI will research this exact course and calibrate lessons to your education level.
              </p>
            </div>
          )}
        </div>

        {/* Step 4: Explanation Style */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
            3. Explanation Style
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {EXPLANATION_STYLES.map((st) => {
              const isSelected = style === st.id;
              return (
                <button
                  key={st.id}
                  type="button"
                  onClick={() => setStyle(st.id)}
                  className={`text-left p-3.5 rounded-xl border text-sm transition-all cursor-pointer relative ${
                    isSelected
                      ? 'bg-emerald-50/80 border-emerald-600 ring-2 ring-emerald-500/20'
                      : 'bg-slate-50/50 border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/20'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-semibold text-slate-900 text-xs sm:text-sm">
                      {st.label}
                    </span>
                    {isSelected && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                    )}
                  </div>
                  <span className="inline-block text-[11px] font-medium text-emerald-800 bg-emerald-100/60 px-2 py-0.5 rounded-md mb-1.5">
                    {st.tag}
                  </span>
                  <p className="text-xs text-slate-500 leading-relaxed">{st.description}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Action Button Footer */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-800 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSaveAndApply}
            className="px-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs sm:text-sm font-bold shadow-xs transition-colors cursor-pointer"
          >
            Save & Continue to Topics
          </button>
        </div>
      </div>
    </div>
  );
};
