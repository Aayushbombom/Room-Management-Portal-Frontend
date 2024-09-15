

export async function fetchData(type, endpoint, body){
    const BASE_URL = "http://localhost:5000"
    let data;
    let res;
    if(type == 'GET'){
        res = await fetch(`${BASE_URL}${endpoint}`,{
            method:'GET',
            credentials: 'include'
        });
    }
    else if(type === 'POST' || type == 'PATCH'){
        res = await fetch(`${BASE_URL}${endpoint}`, {
            method: type,
            headers: {"Content-Type": "application/json"},
            credentials: 'include',
            body: JSON.stringify(body)
        });
        
    }
    else if(type == 'DELETE'){
        res = await fetch(`${BASE_URL}${endpoint}`,{
            method:'DELETE',
            credentials: 'include'
        });
    }
    
    return res;
}

export const fixTimeZone = (dateString) => {
    const localDate = new Date(dateString);
    const timezoneOffset = localDate.getTimezoneOffset() * 60 * 1000;
    const utcDate = new Date(localDate.getTime() - timezoneOffset);

    return utcDate.toISOString();
}

