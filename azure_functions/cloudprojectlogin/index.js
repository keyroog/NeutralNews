const { TableClient, AzureNamedKeyCredential } = require("@azure/data-tables");

// Enter your storage account name and shared key
const account = "cloudprojectloginstorage";
const accountKey = "cVf/x6BIzL4HPm1j0bJ8WGtzVkk1XIhmMXqATupo0V0lEfceLKwjyU8nQ+u0Zwf2EcGaLWP/XKWE+AStYWCOyg==";
const tableName = "login";

// Use AzureNamedKeyCredential with storage account and account key
// AzureNamedKeyCredential is only available in Node.js runtime, not in browsers
const credential = new AzureNamedKeyCredential(account, accountKey);
const client = new TableClient(`https://${account}.table.core.windows.net`, tableName, credential);

module.exports = async function (context, req) {
    console.log(context);
    console.log(req);
    let responseMessage= "";
    let username = context.req.body.username;
    let password = context.req.body.password;
    let user;
    try {
        user = await client.getEntity(username, password);
    } catch (error) {
        responseMessage = "false";
    }
    if(user!=null){
        responseMessage = user.preferiti
    }

    context.res = {
        body: responseMessage
    };
}