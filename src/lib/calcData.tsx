// Calculator question definitions, state list, scoring, and option-builder logic.
// Pure data + pure functions — no React state inside.

import * as React from 'react';
import {
  CarIcon, MedicalIcon, HouseIcon, BoltIcon, BriefcaseIcon, DocIcon,
  ClockIcon, CalendarIcon, TargetIcon, CashIcon, TrendUpIcon, StarIcon,
  NoneCircleIcon, QuestionIcon, BankIcon, CardIcon, ReceiptIcon,
  ContractorIcon, BenefitsIcon, XCircleIcon,
} from '../components/icons';

export type IconComp = React.ComponentType<React.SVGProps<SVGSVGElement>>;

export type SingleOpt = {
  value: string;
  title: string;
  sub?: string;
  Icon: IconComp;
  urgent?: boolean;
};

export type GridOpt = {
  value: string;
  label: React.ReactNode;
  Icon: IconComp;
};

export type Answers = {
  situation: string | null;
  urgency: string | null;
  amount: string | null;
  income: string | null;
  credit: string | null;
  resources: string[];
  employment: string | null;
  state: string | null;
};

export const stepKeys = ['', 'situation', 'urgency', 'amount', 'income', 'credit', 'resources', 'employment', 'state'] as const;

// Step 1
export const situationOpts: SingleOpt[] = [
  { value: 'car_repair', title: 'Car repair emergency', sub: 'Vehicle breakdown, mechanic bill, towing', Icon: CarIcon },
  { value: 'medical', title: 'Medical or dental bill', sub: 'Unexpected health expense', Icon: MedicalIcon },
  { value: 'rent', title: 'Behind on rent or mortgage', sub: 'Risk of late fees or eviction', Icon: HouseIcon },
  { value: 'utility', title: 'Utility about to be shut off', sub: 'Electric, gas, or water shutoff notice', Icon: BoltIcon },
  { value: 'income_loss', title: 'Lost income recently', sub: 'Job loss, hours cut, gig work dried up', Icon: BriefcaseIcon },
  { value: 'multiple', title: 'Multiple things at once', sub: 'More than one financial pressure', Icon: DocIcon },
];

// Step 2
const CalendarDot: IconComp = (p) => <CalendarIcon dot {...p} />;
export const urgencyOpts: SingleOpt[] = [
  { value: 'today', title: 'Today or tomorrow', sub: 'Critical — I need a solution immediately', Icon: ClockIcon, urgent: true },
  { value: 'this_week', title: 'Within the next week', sub: 'Urgent but I have a few days', Icon: CalendarIcon },
  { value: 'this_month', title: 'Within the next month', sub: 'I have some time to explore options', Icon: CalendarDot },
  { value: 'planning', title: 'Just planning ahead', sub: 'Building an emergency fund strategy', Icon: TargetIcon },
];

// Step 3
export const amountOpts: SingleOpt[] = [
  { value: 'under_500', title: 'Under $500', sub: 'Small emergency or bill gap', Icon: CashIcon },
  { value: '500_1500', title: '$500 — $1,500', sub: 'Common for car repair or medical copays', Icon: CashIcon },
  { value: '1500_3500', title: '$1,500 — $3,500', sub: 'Mid-range emergency', Icon: CashIcon },
  { value: '3500_7500', title: '$3,500 — $7,500', sub: 'Larger expense or multiple bills', Icon: CashIcon },
  { value: '7500_15000', title: '$7,500 — $15,000', sub: 'Significant financial gap', Icon: CashIcon },
  { value: 'over_15000', title: 'Over $15,000', sub: 'Major emergency or debt consolidation', Icon: CashIcon },
];

// Step 4
export const incomeOpts: SingleOpt[] = [
  { value: 'under_1500', title: 'Under $1,500 / month', Icon: TrendUpIcon },
  { value: '1500_2500', title: '$1,500 — $2,500 / month', Icon: TrendUpIcon },
  { value: '2500_4000', title: '$2,500 — $4,000 / month', Icon: TrendUpIcon },
  { value: '4000_6000', title: '$4,000 — $6,000 / month', Icon: TrendUpIcon },
  { value: 'over_6000', title: 'Over $6,000 / month', Icon: TrendUpIcon },
];

// Step 5
export const creditOpts: SingleOpt[] = [
  { value: 'good', title: 'Good — approved for credit recently', sub: 'Around 680 or higher', Icon: StarIcon },
  { value: 'fair', title: 'Fair — some issues, working on it', sub: 'Around 580 – 679', Icon: StarIcon },
  { value: 'difficult', title: 'Difficult — late payments or collections', sub: 'Below 580', Icon: StarIcon },
  { value: 'none', title: 'No credit history', sub: 'Never had a loan or credit card', Icon: NoneCircleIcon },
  { value: 'unsure', title: 'Not sure', sub: "I haven't checked recently", Icon: QuestionIcon },
];

// Step 6 (multi-select)
export const resourceOpts: GridOpt[] = [
  { value: 'checking', label: 'Checking account open 3+ months', Icon: BankIcon },
  { value: 'credit_card', label: 'Credit card with available balance', Icon: CardIcon },
  { value: 'employer', label: 'Regular employer (not self-employed)', Icon: BriefcaseIcon },
  { value: 'paycheck', label: 'Received paycheck in last 30 days', Icon: ReceiptIcon },
  { value: 'car', label: 'Own a car outright (no loan)', Icon: CarIcon },
  { value: 'home', label: 'Own a home (even with mortgage)', Icon: HouseIcon },
];

// Step 7
export const employmentOpts: SingleOpt[] = [
  { value: 'fulltime', title: 'Full-time employed', sub: 'Regular paycheck, W-2', Icon: BriefcaseIcon },
  { value: 'parttime', title: 'Part-time employed', sub: 'Regular employer, fewer hours', Icon: ClockIcon },
  { value: 'selfemployed', title: 'Self-employed or freelance', sub: 'Independent contractor, business owner', Icon: ContractorIcon },
  { value: 'gig', title: 'Gig work', sub: 'Uber, DoorDash, Instacart, and others', Icon: CarIcon },
  { value: 'benefits', title: 'Receiving benefits', sub: 'Social Security, disability, pension', Icon: BenefitsIcon },
  { value: 'between_jobs', title: 'Between jobs', sub: 'Currently looking for work', Icon: XCircleIcon },
];

export const states = [
  'Alabama','Alaska','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','Florida',
  'Georgia','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine',
  'Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska',
  'Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota',
  'Ohio','Oklahoma','Oregon','Pennsylvania','Rhode Island','South Carolina','South Dakota',
  'Tennessee','Texas','Utah','Vermont','Virginia','Washington','West Virginia','Wisconsin','Wyoming',
];

export const labels: Record<string, Record<string, string>> = {
  situation: { car_repair: 'Car repair', medical: 'Medical bill', rent: 'Behind on rent', utility: 'Utility shutoff', income_loss: 'Income loss', multiple: 'Multiple issues', other: 'Other' },
  urgency: { today: 'Today / tomorrow', this_week: 'This week', this_month: 'This month', planning: 'Planning ahead' },
  amount: { under_500: 'Under $500', '500_1500': '$500–$1,500', '1500_3500': '$1,500–$3,500', '3500_7500': '$3,500–$7,500', '7500_15000': '$7,500–$15,000', over_15000: '$15,000+' },
  credit: { good: 'Good (680+)', fair: 'Fair (580–679)', difficult: 'Difficult (<580)', none: 'No history', unsure: 'Not sure' },
  employment: { fulltime: 'Full-time', parttime: 'Part-time', selfemployed: 'Self-employed', gig: 'Gig work', benefits: 'Benefits', between_jobs: 'Between jobs' },
};

export const preselectMap: Record<string, string> = {
  car: 'car_repair', medical: 'medical', rent: 'rent', utility: 'utility', job: 'income_loss', other: 'multiple',
};

export function scoreLeadTotal(answers: Answers): number {
  let score = 0;
  const creditScore: Record<string, number> = { good: 30, fair: 20, difficult: 8, none: 5, unsure: 10 };
  score += (answers.credit && creditScore[answers.credit]) || 0;
  const incomeScore: Record<string, number> = { under_1500: 5, '1500_2500': 12, '2500_4000': 20, '4000_6000': 25, over_6000: 25 };
  score += (answers.income && incomeScore[answers.income]) || 0;
  const empScore: Record<string, number> = { fulltime: 20, parttime: 14, selfemployed: 12, gig: 10, benefits: 8, between_jobs: 2 };
  score += (answers.employment && empScore[answers.employment]) || 0;
  const urgScore: Record<string, number> = { today: 15, this_week: 12, this_month: 8, planning: 3 };
  score += (answers.urgency && urgScore[answers.urgency]) || 0;
  if (answers.resources.includes('checking')) score += 5;
  if (answers.resources.includes('employer') || answers.resources.includes('paycheck')) score += 5;
  return score;
}

export type RankedOption = { top: boolean; title: string; desc: string };

export function buildOptions(answers: Answers): RankedOption[] {
  const isUrgent = answers.urgency === 'today' || answers.urgency === 'this_week';
  const hasCreditCard = answers.resources.includes('credit_card');
  const hasHome = answers.resources.includes('home');
  const hasCar = answers.resources.includes('car');
  const hasEmployer = answers.resources.includes('employer') || answers.resources.includes('paycheck');
  const goodCredit = answers.credit === 'good';
  const fairCredit = answers.credit === 'fair';
  const opts: RankedOption[] = [];

  if (hasCreditCard && (answers.amount === 'under_500' || answers.amount === '500_1500')) {
    opts.push({ top: true, title: 'Use your existing credit card', desc: 'You have a credit card with available balance. For amounts under $1,500 this is often your fastest and cheapest option — no application, no approval needed, available today.' });
  }
  if (hasEmployer && isUrgent && (answers.amount === 'under_500' || answers.amount === '500_1500')) {
    opts.push({ top: opts.length === 0, title: 'Ask your employer for a pay advance', desc: 'Many employers offer emergency pay advances that most employees never ask for. Zero interest. One conversation with HR could resolve this today.' });
  }
  if (goodCredit || fairCredit) {
    opts.push({ top: opts.length === 0, title: 'Personal installment loan', desc: 'Based on your income and credit range, you likely qualify for a personal installment loan. Fixed monthly payments — not payday loans. Funds often available within 24 hours of approval.' });
  } else {
    opts.push({ top: opts.length === 0, title: 'Bad-credit personal loan', desc: 'Specialist lenders work with scores below 580. Income and employment matter more than credit score for these products. Approval rates are higher than you might expect.' });
  }
  if (hasHome) {
    opts.push({ top: false, title: 'Home equity option (HELOC)', desc: 'Because you own a home, you may have access to a home equity line of credit at significantly lower interest rates than personal loans. Best for larger amounts.' });
  }
  if (hasCar) {
    opts.push({ top: false, title: 'Car title loan option', desc: 'Your vehicle is an asset. Title loans use your car as collateral for quick access to funds. Rates are higher but approval is fast and credit score matters less.' });
  }
  opts.push({
    top: false,
    title: 'State & federal assistance programs',
    desc: `${answers.state || 'Your state'} has emergency assistance programs for utility bills, rent, and basic needs. Many people don't know these exist. A complete list will be included in your email plan — free and no repayment required.`,
  });
  return opts;
}
