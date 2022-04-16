var headers;

async function chain(r) {
  var engine_uri = r.uri;
  r.headersOut["Content-Type"] = "application/json";
  r.subrequest("/validation", { method: "POST" })
    .then((Response) => {
      return Response;
    })
    .then((Response) => {
      r.subrequest(
        "/persistance" + engine_uri,
        `UserID=${Response.UserID}&AccountID=${Response.AccountID}&Username=${Response.Username}&System=${Response.System}`
      ).then((resp) => {
        ngx.log(ngx.WARN, "----------------------------------");
        ngx.log(ngx.WARN, "\n" + JSON.stringify(resp));
        ngx.log(ngx.WARN, "----------------------------------");
        r.return(200, resp.responseText);
      });
    })
    .catch((e) => r.return(500, e));
}

export default { chain };
