// Shared SVG icon helpers — server-renderable React components.
import * as React from 'react';

type SVGProps = React.SVGProps<SVGSVGElement>;

export const ArrowRight = (props: SVGProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M5 12h14M13 5l7 7-7 7" />
  </svg>
);

export const Check = (props: SVGProps) => (
  <svg viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M4 12l5 5L20 6" />
  </svg>
);

export const Shield = (props: SVGProps) => (
  <svg viewBox="0 0 24 24" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 2l8 4v6c0 5-3.5 9-8 10-4.5-1-8-5-8-10V6l8-4z" />
  </svg>
);

export const ArrowOutCorner = (props: SVGProps) => (
  <svg viewBox="0 0 24 24" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H9M17 7v8" />
  </svg>
);

export const CarIcon = (props: SVGProps) => (
  <svg viewBox="0 0 32 32" {...props}>
    <path d="M5 20v-4l2-6h18l2 6v4" />
    <path d="M5 20h22v5H5z" />
    <circle cx="10" cy="25" r="2" />
    <circle cx="22" cy="25" r="2" />
  </svg>
);

export const MedicalIcon = (props: SVGProps) => (
  <svg viewBox="0 0 32 32" {...props}>
    <rect x="6" y="9" width="20" height="18" rx="2" />
    <path d="M11 9V6a2 2 0 012-2h6a2 2 0 012 2v3" />
    <path d="M16 14v8M12 18h8" />
  </svg>
);

export const HouseIcon = (props: SVGProps) => (
  <svg viewBox="0 0 32 32" {...props}>
    <path d="M4 14L16 5l12 9" />
    <path d="M7 13v14h18V13" />
    <path d="M13 27v-7h6v7" />
  </svg>
);

export const BoltIcon = (props: SVGProps) => (
  <svg viewBox="0 0 32 32" {...props}>
    <path d="M18 4L8 18h6l-2 10 10-14h-6l2-10z" />
  </svg>
);

export const BriefcaseIcon = (props: SVGProps) => (
  <svg viewBox="0 0 32 32" {...props}>
    <rect x="4" y="10" width="24" height="16" rx="2" />
    <path d="M11 10V7a2 2 0 012-2h6a2 2 0 012 2v3" />
    <path d="M4 16h24" />
  </svg>
);

export const DocIcon = (props: SVGProps) => (
  <svg viewBox="0 0 32 32" {...props}>
    <rect x="6" y="4" width="20" height="24" rx="2" />
    <path d="M11 10h10M11 15h10M11 20h6" />
  </svg>
);

export const ClockIcon = (props: SVGProps) => (
  <svg viewBox="0 0 32 32" {...props}>
    <circle cx="16" cy="16" r="11" />
    <path d="M16 10v7l4 3" />
  </svg>
);

type CalProps = SVGProps & { dot?: boolean };
export const CalendarIcon = ({ dot, ...props }: CalProps) => (
  <svg viewBox="0 0 32 32" {...props}>
    <rect x="5" y="7" width="22" height="20" rx="2" />
    <path d="M10 5v4M22 5v4M5 13h22" />
    {dot && <circle cx="12" cy="20" r="1.5" fill="currentColor" />}
  </svg>
);

export const TargetIcon = (props: SVGProps) => (
  <svg viewBox="0 0 32 32" {...props}>
    <path d="M16 4v24M4 16h24" />
    <circle cx="16" cy="16" r="12" />
  </svg>
);

export const CashIcon = (props: SVGProps) => (
  <svg viewBox="0 0 32 32" {...props}>
    <rect x="5" y="10" width="22" height="14" rx="2" />
    <circle cx="16" cy="17" r="3" />
  </svg>
);

export const TrendUpIcon = (props: SVGProps) => (
  <svg viewBox="0 0 32 32" {...props}>
    <path d="M4 24L12 16l6 6 10-12" />
    <path d="M22 10h6v6" />
  </svg>
);

export const StarIcon = (props: SVGProps) => (
  <svg viewBox="0 0 32 32" {...props}>
    <path d="M16 4l3.5 8 8.5 1-6.5 6 2 9L16 23l-7.5 5 2-9-6.5-6 8.5-1z" />
  </svg>
);

export const NoneCircleIcon = (props: SVGProps) => (
  <svg viewBox="0 0 32 32" {...props}>
    <circle cx="16" cy="16" r="12" />
    <path d="M11 16h10" />
  </svg>
);

export const QuestionIcon = (props: SVGProps) => (
  <svg viewBox="0 0 32 32" {...props}>
    <circle cx="16" cy="16" r="12" />
    <path d="M13 12a3 3 0 016 0c0 3-3 3-3 5M16 22v1" />
  </svg>
);

export const BankIcon = (props: SVGProps) => (
  <svg viewBox="0 0 32 32" {...props}>
    <rect x="4" y="11" width="24" height="14" rx="2" />
    <path d="M4 15h24" />
  </svg>
);

export const CardIcon = (props: SVGProps) => (
  <svg viewBox="0 0 32 32" {...props}>
    <rect x="4" y="8" width="24" height="16" rx="2" />
    <path d="M4 13h24M8 19h6" />
  </svg>
);

export const ReceiptIcon = (props: SVGProps) => (
  <svg viewBox="0 0 32 32" {...props}>
    <rect x="6" y="5" width="20" height="22" rx="2" />
    <path d="M10 11h12M10 15h12M10 19h8" />
  </svg>
);

export const ContractorIcon = (props: SVGProps) => (
  <svg viewBox="0 0 32 32" {...props}>
    <rect x="4" y="8" width="24" height="18" rx="2" />
    <path d="M4 14h24M12 20h8" />
  </svg>
);

export const BenefitsIcon = (props: SVGProps) => (
  <svg viewBox="0 0 32 32" {...props}>
    <path d="M4 26V14l12-8 12 8v12" />
    <path d="M4 26h24M10 26v-6h12v6" />
  </svg>
);

export const XCircleIcon = (props: SVGProps) => (
  <svg viewBox="0 0 32 32" {...props}>
    <circle cx="16" cy="16" r="11" />
    <path d="M12 12l8 8M20 12l-8 8" />
  </svg>
);

export const PhoneIcon = (props: SVGProps) => (
  <svg viewBox="0 0 24 24" {...props}>
    <path d="M20 15.5c-1.2 0-2.4-.2-3.6-.6-.3-.1-.7 0-1 .2l-2.2 2.2c-2.8-1.4-5.1-3.8-6.6-6.6l2.2-2.2c.3-.3.4-.7.2-1-.4-1.2-.6-2.4-.6-3.6 0-.6-.4-1-1-1H4c-.6 0-1 .4-1 1 0 9.4 7.6 17 17 17 .6 0 1-.4 1-1v-3.5c0-.6-.4-.9-1-.9z" />
  </svg>
);

export const HamburgerIcon = (props: SVGProps) => (
  <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" {...props}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </svg>
);
