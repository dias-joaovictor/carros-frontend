import Cookies from "js-cookie";

/**
 * Utility class for managing cookies
 */
export class CookieManager {
  /**
   * Retrieve the value of a specific cookie
   *
   * @param cookieName - The name of the cookie to retrieve
   * @returns The value of the cookie if it exists, otherwise null
   */
  static getCookie(cookieName: string): string | null {
    const cookieValue = Cookies.get(cookieName);
    return cookieValue || null; // Return null if undefined
  }

  /**
   * Set a cookie with a specified name, value, and options
   *
   * @param cookieName - The name of the cookie to set
   * @param value - The value of the cookie
   * @param options - Optional configuration for the cookie (e.g., expiration, path)
   */
  static setCookie(cookieName: string, value: string, options?: Cookies.CookieAttributes): void {
    Cookies.set(cookieName, value, options);
  }

  /**
   * Remove a specific cookie by name
   *
   * @param cookieName - The name of the cookie to remove
   * @param options - Optional configuration for the cookie (e.g., path)
   */
  static removeCookie(cookieName: string, options?: Cookies.CookieAttributes): void {
    Cookies.remove(cookieName, options);
  }
}
