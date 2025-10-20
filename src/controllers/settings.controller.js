
// Import functions created in settings.model.js
import { 
    checkSamePassword,
    updateUser,
} from "$models/settings.model.js";
import { findByEmail, findByUsername } from "$models/user.model";

// javascript
// regex101.com
// Reusable email validator helper
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
/**
 * 
 * @param {string} newValue 
 * @returns {boolean}
 */
function isValidEmail(newValue) {
    if (typeof newValue !== "string") return false;
    return EMAIL_REGEX.test(newValue.trim());
}

/**
 * 
 * @param {string} newValue 
 * @returns {boolean}
 */
function isValidPassword(newValue) {
    if (typeof newValue !== "string") return false;
    return newValue.length >= 6;
}

/**
 * 
 * @param {number} userID 
 * @param {string} attribute 
 * @param {string} newValue 
 * @returns 
 */
export function update(userID, attribute, newValue) {
    try {
        switch (attribute) {
            case 'Email':
                if (!isValidEmail(newValue)) {
                    throw new Error('Invalid email format.');
                }
                // Soft duplicate check
                if (findByEmail(newValue)) {
                    throw new Error('Email is already registered.');
                }
                break;
            case 'Username':
                // Soft duplicate check
                if (findByUsername(newValue)) {
                    throw new Error('Username is already taken.');
                }
                break;
            case 'password':
                if (!isValidPassword(newValue)) {
                    throw new Error('Password must be at least 6 characters long.');
                }

                if (!checkSamePassword(userID, newValue)) {
                    throw new Error('New password is the same as the old password.');
                }
                break;
            default:
                throw new Error("Invalid input");
        }

        updateUser(userID, attribute, newValue);
        return {
            success: true,
            error: null
        };
    } catch (e) {
        return {
            success: false,
            error: e?.message || 'Failed to update user info.'
        };
    }
}