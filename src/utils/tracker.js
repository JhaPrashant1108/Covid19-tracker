const request = require("request");

const world = (callback) => {
    const url_W = "https://covid19.mathdro.id/api";
    request({ url: url_W, json: true }, (error, response) => {
        if (error) {
            callback("Unable to connect with the service provider", undefined);
        } else {
            callback(undefined, {
                message: "World",
                confirmed: response.body.confirmed.value,
                recovered: response.body.recovered.value,
                deaths: response.body.deaths.value,
            });
        }
    });
};

const country = (address, callback) => {
    const url_C =
        "https://covid19.mathdro.id/api/countries/" +
        encodeURIComponent(address);
    request({ url: url_C, json: true }, (error, response) => {
        if (error) {
            callback("Unable to connect with the service provider", undefined);
        } else {
            if (!response.body.error) {
                callback(undefined, {
                    message: address.toUpperCase(),
                    confirmed: response.body.confirmed.value,
                    recovered: response.body.recovered.value,
                    deaths: response.body.deaths.value,
                });
            } else {
                callback(undefined, {
                    message: "Data Unavailable for " + address.toUpperCase(),
                    confirmed: undefined,
                    recovered: undefined,
                    deaths: undefined,
                });
            }
        }
    });
};

const state = (address, callback) => {
    // const url_s =
    //     "https://api.apify.com/v2/key-value-stores/toDWvRj1JpTXiM8FF/records/LATEST?disableRedirect=true";
    const url_s = 'http://covid19-india-adhikansh.herokuapp.com/states'
    let Address = address.split("+").join(" ").split(" ")
    console.log(Address)
    for (var i = 0, x = Address.length; i < x; i++) {
        if(Address[i] === 'and'){
            continue
        }else{
            Address[i] = Address[i][0].toUpperCase() + Address[i].substr(1);
        }
    }
    // console.log(Address)
    Address = Address.join(" ")
    // console.log(Address)
    request({ url: url_s, json: true }, (error, response) => {
        if (error) {
            callback("unable to connect with service Provider", undefined);
        } else {
            const Data = {
                message:
                    "Data Unavailable for " +
                    address.split("+").join(" ").toUpperCase(),
                confirmed: undefined,
                recovered: undefined,
                deaths: undefined,
            };
            const res = response.body.state;
            res.forEach((res) => {
                if (res.name == Address) {
                    Data.message = res.name.toUpperCase();
                    Data.confirmed = res.total;
                    Data.recovered = res.cured;
                    Data.deaths = res.death;
                } else {
                }
            });
            callback(undefined, Data);
        }
    });
};

module.exports = {
    country,
    world,
    state,
};
