<html>
	<head>
		<title>Robot Runner</title>
		<style type="text/css">
			* {
				padding: 0px;
				border: 0px;
				margin: 0px;
			}

			body {
				background-color:blue;
			}
		</style>
	</head>
	<body>
		<span id="signinButton">
		  <script type="text/javascript">
		  function signinCallback(authResult) {
			  if (authResult['access_token']) {
				// Update the app to reflect a signed in user
				// Hide the sign-in button now that the user is authorized, for example:
				document.getElementById('signinButton').setAttribute('style', 'display: none');
			  } else if (authResult['error']) {
				// Update the app to reflect a signed out user
				// Possible error values:
				//   "user_signed_out" - User is signed-out
				//   "access_denied" - User denied access to your app
				//   "immediate_failed" - Could not automatically log in the user
				console.log('Sign-in state: ' + authResult['error']);
			  }
			}
			</script>
		  <span
			class="g-signin"
			data-callback="signinCallback"
			data-clientid="707544650829-cqvi1kmov77j73go7iqhmm0lqt29lfmp.apps.googleusercontent.com"
			data-cookiepolicy="single_host_origin"
			data-requestvisibleactions="http://schemas.google.com/AddActivity"
			data-scope="https://www.googleapis.com/auth/plus.login">
		  </span>
		</span>
		
		
		
		<script type="text/javascript">
		  (function() {
		   var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
		   po.src = 'https://apis.google.com/js/client:plusone.js';
		   var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
		 })();
		</script>
		
		<script src="https://apis.google.com/js/plusone.js"></script>
		<g:plus action="share"></g:plus>
		
		<script type="text/javascript">
		  (function() {
			var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
			po.src = 'https://apis.google.com/js/plusone.js';
			var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
		  })();
		</script>
	</body>
	<script src="js/easeljs-0.4.2.min.js"></script>
	<script src="js/utils.js"></script>
	<script src="js/hero.js"></script>
	<script src="js/jumpy.js"></script>
</html>