const USER = 'sportifyUser';
const SESSION = 'sportifySession';
const REQUESTS = 'sportifyTeamRequests';

const read = (key) => {
  try { return JSON.parse(localStorage.getItem(key) || 'null'); } catch { return null; }
};

export const getAccount = () => read(USER);
export const getSession = () => read(SESSION);

export function createAccount({ name, email }) {
  const account = { name, email };
  localStorage.setItem(USER, JSON.stringify(account));
  localStorage.setItem(SESSION, JSON.stringify(account));
}

export function signIn(email) {
  const account = getAccount();
  if (!account || account.email.toLowerCase() !== String(email).toLowerCase()) return false;
  localStorage.setItem(SESSION, JSON.stringify(account));
  return true;
}

export const signOut = () => localStorage.removeItem(SESSION);

// Only allow in-app redirects ("/teams/3"), never "//evil.com" or full URLs.
export function safeNext(params, fallback = '/') {
  const next = params.get('next');
  return next && next.startsWith('/') && !next.startsWith('//') ? next : fallback;
}

export function hasRequested(teamId) {
  const s = getSession();
  return !!s && (read(REQUESTS) || []).some((r) => r.teamId === teamId && r.email === s.email);
}

export function requestToJoin(teamId) {
  const s = getSession();
  if (!s) return false;
  const list = read(REQUESTS) || [];
  if (!list.some((r) => r.teamId === teamId && r.email === s.email)) {
    list.push({ teamId, email: s.email, at: Date.now() });
    localStorage.setItem(REQUESTS, JSON.stringify(list));
  }
  return true;
}
