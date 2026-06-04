import "./top-bar.css";

function GlobeIcon() {
  return (
    <svg className="top-bar__icon" viewBox="0 0 16 16" fill="none" aria-hidden>
      <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.2" />
      <path
        d="M1.5 8h13M8 1.5c2 2 2 11 0 13M8 1.5c-2 2-2 11 0 13"
        stroke="currentColor"
        strokeWidth="1.2"
      />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg className="top-bar__icon" viewBox="0 0 16 16" fill="none" aria-hidden>
      <rect x="1.5" y="3.5" width="13" height="9" rx="1" stroke="currentColor" strokeWidth="1.2" />
      <path d="M1.5 4.5 8 9.5l6.5-5" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg className="top-bar__icon" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M3.5 1.5h2l1 3.5-1.3.8a8 8 0 004.5 4.5l.8-1.3 3.5 1v2a1.5 1.5 0 01-1.6 1.5A11.5 11.5 0 012 3.1a1.5 1.5 0 011.5-1.6z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg className="top-bar__icon" viewBox="0 0 16 16" fill="none" aria-hidden>
      <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.2" />
      <rect x="5.5" y="5.5" width="5" height="5" rx="1.2" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="11.5" cy="4.5" r="0.75" fill="currentColor" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg className="top-bar__icon" viewBox="0 0 16 16" fill="none" aria-hidden>
      <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.2" />
      <path
        d="M9 4.5H7.5a1.5 1.5 0 00-1.5 1.5V7H5v2h1v4h2.5V9H10l.5-2H8.5V6a.5.5 0 01.5-.5H9V4.5z"
        fill="currentColor"
      />
    </svg>
  );
}

export function TopBar() {
  return (
    <div className="top-bar">
      <div className="container top-bar__inner">
        <p className="top-bar__badge">
          <GlobeIcon />
          <span>Distribuidor oficial Quooker en Las Palmas</span>
        </p>

        <div className="top-bar__contact">
          <a href="mailto:info@gruponogal.com" className="top-bar__link">
            <EmailIcon />
            <span>info@gruponogal.com</span>
          </a>
          <a href="tel:+34928123456" className="top-bar__link">
            <PhoneIcon />
            <span>928 123 456</span>
          </a>
          <a
            href="https://www.instagram.com/"
            className="top-bar__social"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <InstagramIcon />
          </a>
          <a
            href="https://www.facebook.com/"
            className="top-bar__social"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
          >
            <FacebookIcon />
          </a>
        </div>
      </div>
    </div>
  );
}
