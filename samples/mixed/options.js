  var google = new OAuth2('google', {
    client_id: '952993494713-h12m6utvq8g8d8et8n2i68plbrr6cr4d.apps.googleusercontent.com',
    client_secret: 'IZ4hBSbosuhoWAX4lyAomm-R',
    api_scope: 'https://www.googleapis.com/auth/tasks'
  });

  var facebook = new OAuth2('facebook', {
    client_id: '177955888930840',
    client_secret: 'b42a5741bd3d6de6ac591c7b0e279c9f',
    api_scope: 'read_stream,user_likes'
  });

  var github = new OAuth2('github', {
    client_id: '09450dfdc3ae76768b08',
    client_secret: '8ecfc23e0dba1ce1a295fbabc01fa71db4b80261',
  });

  var hubspot = new OAuth2('hubspot', {
    client_id: 'f8a6d478-5fca-4ec6-868c-347e3963af7e',
    client_secret: '-',
    api_scope: 'contacts'
  });

  function authorize(providerName) {
    var provider = window[providerName];
    provider.authorize(checkAuthorized);
  }

  function clearAuthorized() {
    console.log('clear');
    ['google', 'facebook', 'github', 'hubspot'].forEach(function(providerName) {
      var provider = window[providerName];
      provider.clearAccessToken();
    });
    checkAuthorized();
  }

  function checkAuthorized() {
    console.log('checkAuthorized');
    ['google', 'facebook', 'github', 'hubspot'].forEach(function(providerName) {
      var provider = window[providerName];
      var button = document.querySelector('#' + providerName);
      if (provider.hasAccessToken()) {
        button.classList.add('authorized');
      } else {
        button.classList.remove('authorized');
      }
    });
  }

document.addEventListener('DOMContentLoaded', function () {
  document.querySelector('button#google').addEventListener('click', function() { authorize('google'); });
  document.querySelector('button#github').addEventListener('click', function() { authorize('github'); });
  document.querySelector('button#facebook').addEventListener('click', function() { authorize('facebook'); });
  document.querySelector('button#hubspot').addEventListener('click', function() { authorize('hubspot'); });

  document.querySelector('button#clear').addEventListener('click', function() { clearAuthorized() });

  checkAuthorized();
});

  