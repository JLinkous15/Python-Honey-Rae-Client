export const fetchIt = (url, kwargs = { method: "GET", body: null, token: null }) => {
    const options = {
        headers: {}
    }
    //Assigning options.method equal to kwargs.method. If kwards.method is falsey, assigns "GET"
    options.method = kwargs.method ?? "GET"
    
    //Confirms "token" exists and is truthy?
    if ("token" in kwargs && kwargs.token) {
        //Assigns "Token <unique identifier>" to options.headers.Authorization
        options.headers.Authorization = `Token ${kwargs.token}`
    }
    else {
        try {
            //if the token is not provided by the client, the code attempts to grab the token from the DOM's localStorage object.
            const auth = localStorage.getItem("honeyrae")
            const token = JSON.parse(auth).token
            options.headers.Authorization = `Token ${token}`

        } catch (error) {
            //If an error occurs, assigns options.headers.Authorization to "Token none"
            options.headers.Authorization = `Token none`
        }
    }
    //Initialized theFetch variable as null
    let theFetch = null
    //switch statement that assigns headers and body to the options object based on the HTTP Request/options.method value
    switch (options.method) {
        //if options.method === "POST", assign the body and headers, invoke the fetch call, and parse the response from json.
        case "POST":
            options.body = kwargs.body
            options.headers["Content-Type"] = "application/json"
            theFetch = fetch(url, options).then(r => r.json())
            break;
        //if options.method === "PUT", assign the body and headers and invoke the fetch call. "PUT" methods do not expect a response.
        case "PUT":
            options.body = kwargs.body
            options.headers["Content-Type"] = "application/json"
            theFetch = fetch(url, options)
            break;
        //if options.method === "DELETE", it deletes the provided url. No response necessary
        case "DELETE":
            theFetch = fetch(url, options)
            break;
        //safety for other methods, which accomplishes the http request, regardless of what it is, and parses the response, whether there is or isn't one.
        default:
            theFetch = fetch(url, options).then(r => r.json())
            break;
    }
    //returns a promise
    return theFetch
}
