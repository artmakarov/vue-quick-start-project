export default function (route) {
  return !route.meta
    || !route.meta.authRules
    || route.meta.authRules.every(rule => rule());
}
