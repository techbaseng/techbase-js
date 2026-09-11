/* Techbase STEM Academy — landing page interactivity
   Fades sections in as they scroll into view. */
const io = new IntersectionObserver(
  (entries) => entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add('in');
  }),
  { threshold: .07 }
);
document.querySelectorAll('.sr').forEach((el) => io.observe(el));
