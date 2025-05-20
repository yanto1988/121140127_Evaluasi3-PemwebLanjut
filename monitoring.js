window.addEventListener("load", () => {
  const performanceEntries = performance.getEntriesByType("navigation")[0];
  const paintEntries = performance.getEntriesByType("paint");

  const metrics = {
    pageLoadTime: performanceEntries.loadEventEnd - performanceEntries.startTime,
    firstContentfulPaint: paintEntries.find(p => p.name === "first-contentful-paint")?.startTime || 0,
    domContentLoaded: performanceEntries.domContentLoadedEventEnd,
    totalDOMNodes: document.getElementsByTagName("*").length,
    interactions: 0,
  };

  document.body.addEventListener("click", () => {
    metrics.interactions += 1;
  });

  window.addEventListener("beforeunload", () => {
    navigator.sendBeacon("/log", JSON.stringify(metrics));
  });

  console.log("Performance Metrics:", metrics);
});
