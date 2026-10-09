// A locally defined HTML fixture keeps these examples independent of a live website.
const markup = `<!doctype html>
<html lang="en">
<head><meta charset="utf-8"><title>Example sign in</title></head>
<body>
  <main>
    <h1>Example sign in</h1>
    <form id="login-form">
      <label for="username">Username</label>
      <input id="username" name="username" autocomplete="off">
      <label for="password">Password</label>
      <input id="password" name="password" type="password" autocomplete="off">
      <button type="submit">Sign in</button>
    </form>
    <p id="message" role="status" aria-live="polite"></p>
  </main>
  <script>
    document.querySelector('#login-form').addEventListener('submit', function (event) {
      event.preventDefault();
      const username = document.querySelector('#username').value.trim();
      const password = document.querySelector('#password').value;
      const message = !username || !password
        ? 'Both fields are required'
        : username === 'demo' && password === 'example-password'
          ? 'Signed in successfully'
          : 'Invalid credentials';
      document.querySelector('#message').textContent = message;
    });
  </script>
</body>
</html>`;

function fixtureUrl() {
  return 'data:text/html;charset=utf-8,' + encodeURIComponent(markup);
}

module.exports = { fixtureUrl };
