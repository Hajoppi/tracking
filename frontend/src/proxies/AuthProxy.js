import Proxy from './Proxy';

class AuthProxy extends Proxy {
  /**
   * The constructor for the ArtistProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor(parameters = {}) {
    super('/', parameters);
  }

  /**
   * Method used to login.
   *
   * @param {String} username The username.
   * @param {String} password The password.
   *
   * @returns {Promise} The result in a promise.
   */
  login({ email, password }) {
    const data = {
      email,
      password,
    };
    return this.submit('post', `/login`, data);
  }

  activate(hash) {
    return this.submit('post', '/activate', { hash });
  }

  recover(email) {
    return this.submit('post', '/recover', { email });
  }

  /**
   * Method used to register the user.
   *
   * @param {Object} data The register data.
   *
   * @returns {Promise} The result in a promise.
   */
  register(data) {
    return this.submit('post', `/register`, data);
  }
}

export default AuthProxy;
