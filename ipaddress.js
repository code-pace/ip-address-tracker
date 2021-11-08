const textForm = document.querySelector(".textform");
const textInput = document.querySelector(".textbox");
const btn = document.querySelector(".btn");
const apiKey = "at_FoAa1An0Vg7cvqxLjsvoVrbtRwH6c";
const _ip_address = document.getElementById("ip-address");
const _location = document.getElementById("location");
const _timezone = document.getElementById("timezone");
const _isp = document.getElementById("isp");
let domain = "";
let ipText = '';
let ipDetail;

// instantiating a map object
let ipMap = L.map("map", {
    center: [0, 0],
    zoom: 13,
    layers: [
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a>contributors"
        }
        )
    ]
})

//get the input from the text box
textInput.addEventListener("change",(e)=> {
    ipText = e.target.value;
});

// load map data
const load_map_resource =(lat, lng)=> {
    ipMap.setView([lat, lng], 13);
    let mapIcon = L.icon({
        iconUrl: 'images/icon-location.svg',
    })
    L.marker([lat, lng], {icon: mapIcon}).addTo(ipMap);
    }
// create ipify url for api call

const getApiUrl =()=> {
    let url = `https://geo.ipify.org/api/v1?apiKey=${apiKey}&domain=${domain}`;
    return url;
}

// get ip address and show map information
const getIpData = async ()=> {
    try {
        let request = await fetch(getApiUrl());
        let response = await request.json();
        console.log(response);
        const {ip, location : {region, city,lat, lng, timezone, postalCode}, isp } = response;
        load_map_resource(lat, lng);
        _ip_address.innerText = `${ip}`;
        _location.innerText = `${city} ${region} ${postalCode}`;
        _timezone.innerText = `UTC ${timezone}`;
        _isp.innerText = `${isp}`;
    } catch (error) {
        console.log(error);
        alert("whoops something went wrong!!!\ncheck your domain name again")
    }
};
textForm.addEventListener("submit", (e)=> {
    e.preventDefault();
    if(ipText == "") {
        alert("enter a valid domain name or ip address");
        return;
    }
    else {
        domain = ipText;
    };
    getIpData();
});
document.addEventListener("load", getIpData())

