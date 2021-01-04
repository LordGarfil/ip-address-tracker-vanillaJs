import {renderMap, mapOnClick, movePositionMark} from "./map.js" 

async function getMyCurrentIp(){
    const res = await fetch('http://ip-api.com/json')
    const resp = await res.json()
  console.log(resp);
            document.getElementById('ip-search-input').value = resp.query

        document.getElementById('info-response-area').innerHTML = renderCurrentIpResponse(resp)

        mymap   = L.map("map-area").setView([resp.lat, resp.lon], 10);
        const location = resp.city + ", " + resp.regionName
        renderMap(mymap, resp.lat, resp.lon, location)
        mapOnClick(mymap, location)
}

function renderCurrentIpResponse(res){
    const response = `
    <div class="">
        <span>IP ADDRESS</span>
        <p>${res.query}</p>
      </div>
      <div class="">
        <span>Location</span>
        <p>${res.country}</p>
      </div>
      <div class="">
        <span>City</span>
        <p>${res.city}</p>
      </div>
      <div class="">
        <span>ISP</span>
        <p>${res.org}</p>
      </div>
    `

    return response
}

function renderSearchIpResponse(res){
    const response = `
    <div class="">
        <span>IP ADDRESS</span>
        <p>${res.ip}</p>
      </div>
      <div class="">
        <span>Country</span>
        <p>${res.country_name}</p>
      </div>
      <div class="">
        <span>Region</span>
        <p>${res.region_name}</p>
      </div>
      <div class="">
        <span>City</span>
        <p>${res.city}</p>
      </div>
    `

    return response
}

function renderLocationResponse(res){
    const response = `
    <div class="">
        <span>Country</span>
        <p>${res.adminArea1}</p>
      </div>
      <div class="">
        <span>Region</span>
        <p>${res.adminArea3}</p>
      </div>
      <div class="">
        <span>Lat</span>
        <p>${res.displayLatLng.lat}</p>
      </div>
      <div class="">
        <span>Long</span>
        <p>${res.displayLatLng.lng}</p>
      </div>
    `

    return response
}


function searchIp(ip){
    const url = `${'http://api.ipstack.com/'+ip}`
    $.ajax(url, {
        type: "get",
        data: {
            access_key: '480bea8ffc16b96bbd5846ecefa75090'
        },
        success: function (res) {
          console.log(res);
          document.getElementById('info-response-area').innerHTML = renderSearchIpResponse(res)
        const location = res.city + ", " + res.region_name
        movePositionMark(mymap, res.latitude, res.longitude, location);
        mapOnClick(mymap, location)
        },
        error: function (err) {
          alert(err);
        },
      })
}

function searchLocation(lat, lng){
    $.ajax('http://open.mapquestapi.com/geocoding/v1/reverse?', {
        type: "get",
        data: {
            key: 'WmK76FGS4FJQj9eksrHpl60qcSBGrmlt',
            location: lat+","+lng
        },
        success: function (res) {
          console.log(res);
          const formattedRes = res.results[0].locations[0]
            document.getElementById('info-response-area').innerHTML = renderLocationResponse(formattedRes)
            const location = formattedRes.adminArea5
            movePositionMark(mymap, res.latitude, res.longitude, location);
         mapOnClick(mymap, location)
        },
        error: function (err) {
          alert(err);
        },
      })
}

document.getElementById('ip-form').onsubmit = function(e){
    e.preventDefault()
    const ip = document.getElementById('ip-search-input').value
    searchIp(ip)
}


window.onload = function(){
  let mymap;
  getMyCurrentIp()

  mymap.on("click", function(e){
    console.log('ee');
  });

}

