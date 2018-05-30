console.log('Ayyyooo');


var country;
var alphaCodes = ["AF","AX","AL","DZ","AS","AD","AO","AI","AQ","AG","AR","AM","AW","AU","AT","AZ","BS","BH","BD","BB","BY","BE","BZ","BJ","BM",
"BT","BO","BA","BW","BV","BR","VG","IO","BN","BG","BF","BI","KH","CM","CA","CV","KY","CF","TD","CL","CN","HK","MO","CX","CC", "CO","KM","CG","CD","CK","CR","CI","HR","CU","CY","CZ","DK","DJ","DM","DO","EC","EG","SV","GQ","ER","EE","ET","FK","FO","FJ",
"FI","FR","GF","PF","TF","GA","GM","GE","DE","GH","GI","GR","GL","GD","GP","GU","GT","GG","GN","GW","GY","HT","HM","VA","HN",
"HU","IS","IN","ID","IR","IQ","IE","IM","IL","IT","JM","JP","JE","JO","KZ","KE","KI","KP","KR","KW","KG","LA","LV","LB","LS",
"LR","LY","LI","LT","LU","MK","MG","MW","MY","MV","ML","MT","MH","MQ","MR","MU","YT","MX","FM","MD","MC","MN","ME","MS","MA",
"MZ","MM","NA","NR","NP","NL","AN","NC","NZ","NI","NE","NG","NU","NF","MP","NO","OM","PK","PW","PS","PA","PG","PY","PE","PH",
"PN","PL","PT","PR","QA","RE","RO","RU","RW","BL","SH","KN","LC","MF","PM","VC","WS","SM","ST","SA","SN","RS","SC","SL","SG",
"SK","SI","SB","SO","ZA","GS","SS","ES","LK","SD","SR","SJ","SZ","SE","CH","SY","TW","TJ","TZ","TH","TL","TG","TK","TO","TT",
"TN","TR","TM","TC","TV","UG","UA","AE","GB","US","UM","UY","UZ","VU","VE","VN","VI","WF","EH","YE","ZM","ZW"];

var characterArray = ["a","b","c","d","e","f","g","h","i","j","k","l",
                      "m","n","o","p","q","r","s","t","u","v","w","x",
                      "y","z","'","-"];

function generateSelectors() {
    mySelectors = document.getElementById('selectors');
    charList = document.createElement('ul');
    charList.id = 'charList';
    for (let i = 0; i < characterArray.length; i++) {
        char = document.createElement('li');
        char.classList.add('char');
        char.innerHTML = characterArray[i];
        charList.appendChild(char);
    }
    mySelectors.appendChild(charList);
}

function getRandomCountry() {
    var alphaCode = alphaCodes[Math.floor(Math.random() * alphaCodes.length)].toLowerCase();
    console.log(alphaCode);
    return alphaCode;
}

function countrySelector(alphaCode) {
    var urlString = "https://restcountries.eu/rest/v2/alpha/" + alphaCode;
    console.log(urlString);
    var request = new XMLHttpRequest();
    request.open('GET', urlString, true);
    request.onload = function() {
        var res = JSON.parse(this.response);

        if (request.status === 200) {
            country = res;
            var lat = parseFloat(country.latlng[0]);
            var lng = parseFloat(country.latlng[1]);
            var coords = {lat: lat, lng: lng};
            var map = new google.maps.Map(document.getElementById('map'), {
                center: coords,
                zoom: 5
            });
            var marker = new google.maps.Marker({position: coords, map: map});
        } else {
            console.log('error');
        }
    }
    
    request.send();
}

generateSelectors();
// countrySelector(getRandomCountry());
