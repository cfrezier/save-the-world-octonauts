const staticPaths = new Set(["/favicon.svg","/images/bdxio.png","/images/cake-kelp.webp","/images/fish-biscuit.webp","/images/icon.jpeg","/images/onepoint-white.png","/images/peluche-barnacle.webp","/images/peluche-twick.webp","/images/pirate-pie.webp","/manifest.json","/q-manifest.json","/robots.txt","/service-worker.js"]);
function isStaticPath(method, url) {
  if (method.toUpperCase() !== 'GET') {
    return false;
  }
  const p = url.pathname;
  if (p.startsWith("/build/")) {
    return true;
  }
  if (p.startsWith("/assets/")) {
    return true;
  }
  if (staticPaths.has(p)) {
    return true;
  }
  if (p.endsWith('/q-data.json')) {
    const pWithoutQdata = p.replace(/\/q-data.json$/, '');
    if (staticPaths.has(pWithoutQdata + '/')) {
      return true;
    }
    if (staticPaths.has(pWithoutQdata)) {
      return true;
    }
  }
  return false;
}
export { isStaticPath };