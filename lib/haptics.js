/**
 * Utility for triggering haptic feedback on supported mobile devices.
 * Uses the Vibration API: https://developer.mozilla.org/en-US/docs/Web/API/Vibration_API
 */

export const HapticPatterns = {
    light: 10,        // Subtle tap for buttons/clicks
    medium: 20,       // More noticeable tap for selection changes
    success: [10, 50, 10], // Double tap for success confirmation
    error: [50, 50, 50],   // Longer buzz for errors
};

export const triggerHaptic = (pattern = 'light') => {
    if (typeof window === 'undefined' || !navigator.vibrate) return;

    const vibratePattern = typeof pattern === 'string' ? HapticPatterns[pattern] : pattern;

    try {
        navigator.vibrate(vibratePattern);
    } catch (e) {
        console.warn('Haptic feedback failed:', e);
    }
};
