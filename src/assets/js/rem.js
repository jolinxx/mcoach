/*设置rem*/
(function(d, w) {
  const doc = d.documentElement;
  function rem() {
    const width = Math.min(doc.getBoundingClientRect().width, 768);
    doc.style.fontSize = width / 25 + 'px';
  }
  rem();
  w.addEventListener('resize', rem);
})(document, window);
