/**
 * Authorizes username against the gams project abbreviation.
 * Username is derived from the http Basic Auth header - 
 * the GAMS project abbreviation from the URL being targeted.
 * Skips authorization if GET.  
 * @param {*} r request object passed in from nginx
 * @returns {number} 403 | 200 - Being authorized or not.
 */
function authorizeForProjectAbbr(r) {
  // r.log("Calling custom js script on nginx request");
  // r.log("Incoming request's method - " + r.method);
  // r.log(JSON.stringify(r.headersIn));
  // r.log(JSON.stringify(r.headersOut));

  if(r.method === 'GET'){
    return 200;
  } else {
    // read out http Basic Authentication header.
    var basicAuthHeader = r.headersIn['Authorization'];
    // let request pass if not authorization header was provided. 
    // (otherwise the redirect mechanism from the basic_auth module would fail - asking unknown users to authenticate)
    if(!basicAuthHeader)return 200;

    // reading out username
    var encryptedCreds = basicAuthHeader.replace("Basic ", "");
    var basicAuthCredsDecrypted = atob(encryptedCreds);
    var username = basicAuthCredsDecrypted.split(":")[0];

    // read out original url -> projectAbbrevation.
    var targetUrl = r.uri;
    var subString = targetUrl.split("projects/")[1];
    var projectAbbr = subString.split("/")[0];

    // check
    if(username !== projectAbbr){
      //r.log("User ist not authorized for the project. Username: " + username + " For project: " + projectAbbr);
      var errMsg = "User ist not authorized for the project. Username: " + username + " For project: " + projectAbbr
      r.return(403, errMsg);
      return 403;
    }
  }
  return 200;
}

export default {authorizeForProjectAbbr}