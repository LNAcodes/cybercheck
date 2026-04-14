/**
 * In-memory rate limiter for login attempts.
 *
 * Note: resets on server restart and does not synchronise across multiple
 * Node.js processes / serverless instances. Sufficient for a single-process
 * dev or small-scale deployment; replace with Redis for multi-instance use.
 */

const WINDOW_MS = 15 * 60 * 1000 // 15-minute sliding window
const MAX_ATTEMPTS = 5            // max failed attempts before lockout

interface AttemptRecord {
  count: number
  windowStart: number
}

// Keyed by IP address
const store = new Map<string, AttemptRecord>()

function getRecord(ip: string): AttemptRecord {
  const now = Date.now()
  const existing = store.get(ip)

  if (!existing || now - existing.windowStart > WINDOW_MS) {
    const fresh: AttemptRecord = { count: 0, windowStart: now }
    store.set(ip, fresh)
    return fresh
  }

  return existing
}

/** Returns whether the IP is allowed to attempt a login. */
export function isRateLimited(ip: string): boolean {
  return getRecord(ip).count >= MAX_ATTEMPTS
}

/** Call after a failed login attempt. */
export function recordFailure(ip: string): void {
  const record = getRecord(ip)
  record.count++
}

/** Call after a successful login to clear the failure counter. */
export function resetFailures(ip: string): void {
  store.delete(ip)
}

/** How many attempts remain in the current window (0 = locked out). */
export function remainingAttempts(ip: string): number {
  return Math.max(0, MAX_ATTEMPTS - getRecord(ip).count)
}
