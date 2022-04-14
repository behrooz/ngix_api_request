var headers;
function hello(r) {
  r.headersOut["Content-Type"] = "application/json";

  r.subrequest(
    "/validation",
    { method: "POST" },

    function (res) {
      if (res.status == 200) {
        var json = JSON.parse(res.responseText);
        //r.return(200, JSON.stringify(json));
        //r.headersIn["accountId"] = "asas";

        r.return(200, JSON.stringify(r.uri));

        // r.subrequest(
        //   r.uri,
        //   { method: r.method },

        //   function (res) {
        //     r.return(200, JSON.stringify(res));
        //     //r.return(200, JSON.stringify(r));
        //     //return;
        //     if (res.status == 200) {
        //       var json = JSON.parse(res.responseText);
        //       r.return(res.status, JSON.stringify(json));
        //       //return;
        //     }
        //   }
        // );

        // r.return(res.status, JSON.stringify(json));
        //return;
      }
    }
  );
}

async function chain(r) {
  r.headersOut["Content-Type"] = "application/json";
  var result = await r.subrequest("/validation", { method: "POST" });
  var json = JSON.parse(result.responseText);

  //   headers = json.fullName;

  //r.headersOut["test_a"] = "test_a";

  var result1 = await r.subrequest(
    "/persistance",
    `UserID=${json.Username}&AccountID=${json.AccountID}&Username=${json.Username}&System=${json.System}`
  );

  //   r.return(200, JSON.stringify(result1));
  r.return(result1.status, result1.responseBody);
  //   r.subrequest("/validation", { method: "POST" })
  // .then((response) => {
  //   //headers = response;
  //   headers = response["accountId"];
  //   r.return(200, headers);
  //   return response;
  // })
  // .then((response) => {
  //   r.subrequest("/persistance").then((reply) => {
  //     r.log("hello from foo() handler");
  //     r.return(reply.status, reply.responseBody);
  //   });
  // })
  // .catch((e) => r.return(500, e));
}

function getHeaders() {
  return headers;
}

export default { hello, chain, getHeaders };
