'use client';

import * as React from 'react';
import { useState, useEffect, useRef, useCallback } from 'react';
import { ArrowRight, Shield, Check, PhoneIcon } from './icons';
import {
  stepKeys, situationOpts, urgencyOpts, amountOpts, incomeOpts,
  creditOpts, resourceOpts, employmentOpts, states,
  labels, scoreLeadTotal, buildOptions, preselectMap,
} from '@/lib/calcData';
import type { Answers, SingleOpt, GridOpt, RankedOption } from '@/lib/calcData';

const TOTAL_STEPS = 8;

const initialAnswers: Answers = {
  situation: null,
  urgency: null,
  amount: null,
  income: null,
  credit: null,
  resources: [],
  employment: null,
  state: null,
};

type View = 'questions' | 'results' | 'success';

export default function Calculator() {
  const [step, setStep] = useState<number>(1);
  const [answers, setAnswers] = useState<Answers>(initialAnswers);
  const [view, setView] = useState<View>('questions');

  // Form fields
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [comment, setComment] = useState('');
  const [tcpa, setTcpa] = useState(false);
  const [emailError, setEmailError] = useState(false);

  const successRef = useRef<HTMLDivElement | null>(null);

  const scrollToCalc = useCallback(() => {
    const el = document.getElementById('calculator');
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.pageYOffset - 80;
    window.scrollTo({ top: y, behavior: 'smooth' });
  }, []);

  // Listen for "preselect" events from <Situations /> on the homepage.
  useEffect(() => {
    function onPreselect(e: Event) {
      const detail = (e as CustomEvent).detail || {};
      const type = detail.type as string | undefined;
      if (!type) return;
      const value = preselectMap[type] || null;
      if (!value) return;
      setAnswers((a) => ({ ...a, situation: value }));
      setStep(2);
      // Wait for layout to update before scrolling.
      setTimeout(scrollToCalc, 50);
    }
    window.addEventListener('efg:preselect', onPreselect);
    return () => window.removeEventListener('efg:preselect', onPreselect);
  }, [scrollToCalc]);

  function setSingle<K extends keyof Answers>(key: K, value: Answers[K]) {
    setAnswers((a) => ({ ...a, [key]: value }));
  }

  function selectAndAdvance<K extends keyof Answers>(key: K, value: Answers[K], currentStep: number) {
    setSingle(key, value);
    if (currentStep < TOTAL_STEPS) {
      setTimeout(() => {
        setStep(currentStep + 1);
        scrollToCalc();
      }, 280);
    }
  }

  function toggleResource(value: string) {
    setAnswers((a) => {
      const has = a.resources.includes(value);
      return { ...a, resources: has ? a.resources.filter((v) => v !== value) : [...a.resources, value] };
    });
  }

  function goNext() {
    if (step < TOTAL_STEPS) {
      setStep(step + 1);
      scrollToCalc();
    } else {
      setView('results');
      scrollToCalc();
    }
  }
  function goBack() {
    if (step > 1) {
      setStep(step - 1);
      scrollToCalc();
    }
  }

  function submitLead() {
    if (!email) {
      setEmailError(true);
      document.getElementById('emailInput')?.focus();
      return;
    }
    if (!tcpa) {
      alert('Please agree to the terms to receive your free plan.');
      return;
    }
    // Production hook would POST { ...answers, firstName, email, phone, comment, score: scoreLeadTotal(answers) }
    setView('success');
    setTimeout(() => {
      const node = successRef.current;
      if (!node) return;
      const rect = node.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      const inView = rect.top >= 0 && rect.top < vh * 0.6;
      if (!inView) {
        const y = rect.top + window.pageYOffset - 100;
        if (y > 0) window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }, 50);
  }

  const pct = view === 'questions' ? Math.round(((step - 1) / TOTAL_STEPS) * 100) : 100;
  const score = scoreLeadTotal(answers);
  const showCallButton =
    view === 'results' && score >= 55 && (answers.urgency === 'today' || answers.urgency === 'this_week');

  return (
    <section className="calc" id="calculator">
      <div className="calc-inner">
        <div className="section-head">
          <span className="eyebrow eyebrow-dot">Free analysis</span>
          <h2>What are your <em>real</em> options?</h2>
          <p>Eight questions. Ninety seconds. Your personalized emergency action plan.</p>
        </div>

        {view === 'questions' && (
          <div className="progress-wrap">
            <div className="progress-labels">
              <span className="step-label">Step {step} of {TOTAL_STEPS}</span>
              <span className="step-percent">{pct}% complete</span>
            </div>
            <div className="progress-track">
              <div className="progress-fill" style={{ width: `${pct}%` }} />
            </div>
          </div>
        )}

        <div className="calc-card">
          {view === 'questions' && (
            <>
              {step === 1 && (
                <Step n={1} q="What brought you here today?" hint="Choose the option that best describes your situation.">
                  <div className="opt-list">
                    {situationOpts.map((o) => (
                      <OptionButton
                        key={o.value}
                        option={o}
                        selected={answers.situation === o.value}
                        onClick={() => selectAndAdvance('situation', o.value, 1)}
                      />
                    ))}
                  </div>
                  <CalcNav onNext={goNext} nextDisabled={!answers.situation} />
                </Step>
              )}

              {step === 2 && (
                <Step n={2} q="How soon do you need to resolve this?" hint="This narrows down the options that work on your timeline.">
                  <div className="opt-list">
                    {urgencyOpts.map((o) => (
                      <OptionButton
                        key={o.value}
                        option={o}
                        selected={answers.urgency === o.value}
                        onClick={() => selectAndAdvance('urgency', o.value, 2)}
                      />
                    ))}
                  </div>
                  <CalcNav onBack={goBack} onNext={goNext} nextDisabled={!answers.urgency} />
                </Step>
              )}

              {step === 3 && (
                <Step n={3} q="How much do you need?" hint="An approximate range is fine — we use this to match loan types.">
                  <div className="opt-list">
                    {amountOpts.map((o) => (
                      <OptionButton
                        key={o.value}
                        option={o}
                        selected={answers.amount === o.value}
                        onClick={() => selectAndAdvance('amount', o.value, 3)}
                      />
                    ))}
                  </div>
                  <CalcNav onBack={goBack} onNext={goNext} nextDisabled={!answers.amount} />
                </Step>
              )}

              {step === 4 && (
                <Step n={4} q="What's your monthly take-home pay?" hint="All income sources — job, gig work, benefits. After taxes.">
                  <div className="opt-list">
                    {incomeOpts.map((o) => (
                      <OptionButton
                        key={o.value}
                        option={o}
                        selected={answers.income === o.value}
                        onClick={() => selectAndAdvance('income', o.value, 4)}
                      />
                    ))}
                  </div>
                  <CalcNav onBack={goBack} onNext={goNext} nextDisabled={!answers.income} />
                </Step>
              )}

              {step === 5 && (
                <Step n={5} q="How would you describe your credit?" hint="Approximate is fine — you don't need your exact score.">
                  <div className="opt-list">
                    {creditOpts.map((o) => (
                      <OptionButton
                        key={o.value}
                        option={o}
                        selected={answers.credit === o.value}
                        onClick={() => selectAndAdvance('credit', o.value, 5)}
                      />
                    ))}
                  </div>
                  <CalcNav onBack={goBack} onNext={goNext} nextDisabled={!answers.credit} />
                </Step>
              )}

              {step === 6 && (
                <Step n={6} q="What do you currently have?" hint="Select all that apply — this reveals options you might not know about.">
                  <div className="opt-grid-wrap">
                    {resourceOpts.map((o) => (
                      <GridOption
                        key={o.value}
                        option={o}
                        selected={answers.resources.includes(o.value)}
                        onClick={() => toggleResource(o.value)}
                      />
                    ))}
                  </div>
                  <CalcNav onBack={goBack} onNext={goNext} />
                </Step>
              )}

              {step === 7 && (
                <Step n={7} q="What's your employment situation?" hint="One of the most important factors lenders consider.">
                  <div className="opt-list">
                    {employmentOpts.map((o) => (
                      <OptionButton
                        key={o.value}
                        option={o}
                        selected={answers.employment === o.value}
                        onClick={() => selectAndAdvance('employment', o.value, 7)}
                      />
                    ))}
                  </div>
                  <CalcNav onBack={goBack} onNext={goNext} nextDisabled={!answers.employment} />
                </Step>
              )}

              {step === 8 && (
                <Step n={8} qNum="Question 8 · Final" q="What state are you in?" hint="Lending laws and assistance programs vary significantly by state.">
                  <select
                    className="state-select"
                    value={answers.state || ''}
                    onChange={(e) => setSingle('state', e.target.value || null)}
                  >
                    <option value="">Choose your state…</option>
                    {states.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                  <CalcNav onBack={goBack} onNext={goNext} nextDisabled={!answers.state} nextLabel="See my options" />
                </Step>
              )}
            </>
          )}

          {view === 'results' && (
            <ResultsPanel
              answers={answers}
              firstName={firstName} setFirstName={setFirstName}
              email={email} setEmail={setEmail}
              phone={phone} setPhone={setPhone}
              comment={comment} setComment={setComment}
              tcpa={tcpa} setTcpa={setTcpa}
              emailError={emailError}
              onSubmit={submitLead}
              showCallButton={showCallButton}
            />
          )}

          {view === 'success' && (
            <div ref={successRef} style={{ display: 'block', textAlign: 'center', padding: '32px 16px' }}>
              <div className="success-icon">
                <Check stroke="currentColor" fill="none" strokeWidth="2.2" />
              </div>
              <div className="success-title">Your plan is <em>on its way.</em></div>
              <p className="success-sub">
                Check your inbox in the next 30 seconds for your personalized emergency action plan. If you don&apos;t see it, check your spam folder.
              </p>
            </div>
          )}
        </div>

        <div className="calc-reassure">
          <span><Shield fill="none" strokeWidth="2" /> Your answers are private</span>
          <span><Check fill="none" strokeWidth="2" /> No credit check</span>
          <span><ArrowRight /> 100% free</span>
        </div>
      </div>
    </section>
  );
}

// --- Sub-components ---------------------------------------------------------

function Step({
  n, qNum, q, hint, children,
}: {
  n: number; qNum?: string; q: string; hint: string; children: React.ReactNode;
}) {
  // n is intentionally unused here — kept in signature for future analytics hooks.
  void n;
  return (
    <div className="calc-step active">
      <div className="q-meta">
        <span className="q-num">{qNum || `Question ${n}`}</span>
      </div>
      <div className="calc-q">{q}</div>
      <div className="calc-hint">{hint}</div>
      {children}
    </div>
  );
}

function OptionButton({
  option, selected, onClick,
}: { option: SingleOpt; selected: boolean; onClick: () => void }) {
  const { Icon, title, sub } = option;
  return (
    <button type="button" className={`opt-btn${selected ? ' selected' : ''}`} onClick={onClick}>
      <Icon className="opt-icon" />
      <span className="opt-text">
        <span className="opt-title">{title}</span>
        {sub && <span className="opt-sub">{sub}</span>}
      </span>
      <span className="opt-check"><Check stroke="currentColor" fill="none" strokeWidth="2.5" /></span>
    </button>
  );
}

function GridOption({
  option, selected, onClick,
}: { option: GridOpt; selected: boolean; onClick: () => void }) {
  const { Icon, label } = option;
  return (
    <button type="button" className={`opt-grid${selected ? ' selected' : ''}`} onClick={onClick}>
      <Icon className="opt-grid-icon" />
      <span className="opt-grid-label">{label}</span>
      <span className="opt-grid-check"><Check stroke="currentColor" fill="none" strokeWidth="2.5" /></span>
    </button>
  );
}

function CalcNav({
  onBack, onNext, nextDisabled, nextLabel,
}: { onBack?: () => void; onNext: () => void; nextDisabled?: boolean; nextLabel?: string }) {
  return (
    <div className="calc-nav">
      {onBack ? (
        <button className="btn-back" type="button" onClick={onBack}>← Back</button>
      ) : <span />}
      <button className="btn-next" type="button" onClick={onNext} disabled={nextDisabled}>
        {nextLabel || 'Next'}
        <ArrowRight />
      </button>
    </div>
  );
}

function ResultsPanel({
  answers, firstName, setFirstName, email, setEmail, phone, setPhone,
  comment, setComment,
  tcpa, setTcpa, emailError, onSubmit, showCallButton,
}: {
  answers: Answers;
  firstName: string; setFirstName: (v: string) => void;
  email: string; setEmail: (v: string) => void;
  phone: string; setPhone: (v: string) => void;
  comment: string; setComment: (v: string) => void;
  tcpa: boolean; setTcpa: (v: boolean) => void;
  emailError: boolean;
  onSubmit: () => void;
  showCallButton: boolean;
}) {
  const opts: RankedOption[] = buildOptions(answers);

  return (
    <div style={{ display: 'block' }}>
      <div className="results-summary">
        <h3>Your profile summary</h3>
        <div className="summary-grid">
          <SummaryItem label="Emergency" value={(answers.situation && labels.situation[answers.situation]) || answers.situation || '—'} />
          <SummaryItem label="Urgency" value={(answers.urgency && labels.urgency[answers.urgency]) || '—'} />
          <SummaryItem label="Amount needed" value={(answers.amount && labels.amount[answers.amount]) || '—'} />
          <SummaryItem label="Credit range" value={(answers.credit && labels.credit[answers.credit]) || '—'} />
        </div>
      </div>

      <div className="options-ranked">
        <div className="options-ranked-head">Your options, ranked for <em>your</em> situation.</div>
        {opts.map((o, i) => (
          <div key={i} className={`result-option${o.top ? ' top' : ''}`}>
            <div className="result-opt-title">{o.title}</div>
            <div className="result-opt-desc">{o.desc}</div>
          </div>
        ))}
      </div>

      <div className="email-capture">
        <h3>Get your full <em>personalized</em> action plan.</h3>
        <p>Step-by-step instructions for each option, state-specific resources, and scripts for calling lenders or creditors — emailed to you in under 30 seconds.</p>
        <div className="form-row">
          <input
            className="form-input"
            type="text"
            placeholder="First name"
            autoComplete="given-name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            id="emailInput"
            className="form-input"
            type="email"
            placeholder="Email address"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={emailError && !email ? { borderColor: '#e07a5f' } : undefined}
          />
        </div>
        <input
          className="form-input"
          type="tel"
          placeholder="Phone (optional — unlocks faster options)"
          autoComplete="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <textarea
          className="form-input form-textarea"
          rows={3}
          placeholder="Anything else you'd like to share? (optional)"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <div className="tcpa-consent">
          <input
            type="checkbox"
            id="tcpaCheck"
            checked={tcpa}
            onChange={(e) => setTcpa(e.target.checked)}
          />
          <label className="tcpa-text" htmlFor="tcpaCheck">
            By submitting, I agree to receive my free emergency action plan and related financial guidance by email. I understand that EmergencyFundGuides and its financial partners may contact me regarding loan options. I may opt out at any time.{' '}
            <a href="/privacy">Privacy Policy</a> · <a href="/terms">Terms</a>
          </label>
        </div>
        <button className="btn-submit" onClick={onSubmit} type="button">
          Send my free action plan
          <ArrowRight />
        </button>

        <div className={`call-wrap${showCallButton ? ' visible' : ''}`}>
          <a href="tel:+18005551234" className="btn-call">
            <PhoneIcon />
            Speak with a loan specialist now — free
          </a>
          <div className="call-dis">
            Free service. No obligation. Mon–Fri, 8am–9pm EST. By calling you agree to be connected with a licensed loan specialist.
          </div>
        </div>
      </div>
    </div>
  );
}

function SummaryItem({ label, value }: { label: string; value: string | null | undefined }) {
  return (
    <div className="summary-item">
      <span className="summary-label">{label}</span>
      <span className="summary-value">{value || '—'}</span>
    </div>
  );
}

// stepKeys is exported from calcData; re-import suppress unused warning at file scope.
void stepKeys;
