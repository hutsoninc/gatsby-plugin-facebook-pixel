/**
 * Facebook pixel `fbq` function
 */
const fbq = typeof window !== 'undefined' && typeof window.fbq === 'function' ? window.fbq : () => {}

export { fbq }
