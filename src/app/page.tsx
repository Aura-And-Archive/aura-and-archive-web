/* Baseline dark canvas forced BEFORE standard CSS evaluates to prevent white flash */
html,
body {
  background-color: #070709 !important;
  color: #f3f3f7 !important;
  color-scheme: dark !important;
  min-height: 100vh;
  margin: 0;
  padding: 0;
}

body {
  background-image: radial-gradient(
    circle at 50% 30%,
    #2a220d 0%,
    #0c0b07 50%,
    #070709 100%
  ) !important;
  background-repeat: no-repeat !important;
  background-attachment: fixed !important;
  background-size: cover !important;
}

:root {
  color-scheme: dark !important;
  --background: #070709;
  --foreground: #f3f3f7;
  --accent-gold: #d4af37;
  --accent-gold-hover: #c59f2c;
  --text-gold-light: #f4e6b0;
}

/* Standard Button Utility Classes */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.25rem;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  border-radius: 0.375rem;
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  text-decoration: none;
  user-select: none;
}

.btn-gold {
  background-color: var(--accent-gold);
  color: #000000;
  border: 1px solid var(--accent-gold);
}

.btn-gold:hover {
  background-color: var(--accent-gold-hover);
  border-color: var(--accent-gold-hover);
}

.btn-outline {
  background-color: transparent;
  color: var(--text-gold-light);
  border: 1px solid rgba(212, 175, 55, 0.35);
}

.btn-outline:hover {
  border-color: var(--accent-gold);
  color: #ffffff;
  background-color: rgba(212, 175, 55, 0.1);
}