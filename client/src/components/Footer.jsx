// Simple footer shown on every page; the year updates automatically
export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <p>© {currentYear} Mark Perez. Built with React.</p>
        <p>
          <a href="https://github.com/immaculatecapper" target="_blank" rel="noreferrer">GitHub</a>
          {' · '}
          <a href="https://linkedin.com/in/mark-perez-43023121a" target="_blank" rel="noreferrer">LinkedIn</a>
        </p>
      </div>
    </footer>
  );
}
