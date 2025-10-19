import { db } from '$lib/db.js';
import bcrypt from "bcryptjs";

/**
 * Check if the provided password matches the user's stored password
 * @param {number} userID 
 * @param {string} password 
 * @returns {boolean}
 */
export function checkSamePassword(userID, password) {
    const row = db
        .prepare('SELECT Password FROM User WHERE userID = ?')
        .get(userID);
    if(!row) {
        throw new Error('User not found.');
    }
    return row.Password === password;
}

/**
 * Update user's password
 * @param {number} userID
 * @param {string} newPassword
 * @returns
 */
export function updatePassword(userID, newPassword) {
    const pwdHash = bcrypt.hashSync(newPassword, 10);
    const v = db
        .prepare('UPDATE User Set Password = ? WHERE userID = ?')
        .run(pwdHash, userID);
    return v;
}

/**
  * Update user's settings.
  * @param {number} userID
  * @param {string} attribute
  * @param {string} newValue
*/
export function updateUser(userID, attribute, newValue) {
    const row = db  
        .prepare('Update User Set ? = ? WHERE userID =?')
        .run(attribute, newValue, userID);
    return row;
}