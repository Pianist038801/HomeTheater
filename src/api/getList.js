export const getList = function getList(type, userid) {
  return fetch(`http://mypatchv3.com/MyOutlet/OutletServices.svc/GetOutletList/${type}/${userid}`,
  {
    method: 'GET'
  }
  )
  .then((response) => response.json())
  .then( function(dat){
    console.log(dat.GetOutletListResult);
    console.log('_____________');
    return dat.GetOutletListResult;
  });
}
export const getVersion = (os, version) => {
  return fetch(`http://mypatchv3.com/MyOutlet/OutletServices.svc/CheckUpdate/1002/${os}/${version}`,
  {
    method: 'GET'
  }
  )
  .then((response) => response.json())
  .then( function(dat){
    return dat.CheckUpdateResult;
  });
}
export const getLogin = (email, password,  os = 'ios', push_token='push_token') => {
  const params = {
    email: email,
    password: password,
    push_token: push_token,
    os: os
  };
  const searchParams = Object.keys(params).map((key) => {
    return encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
  }).join('&');
  
  return fetch('http://hometheaterproz.com/api-v2/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    },
    body: searchParams
  })
  .then((response) => {
    console.log(response)
    return response.json()
  })
  .then( function(dat){    
    console.log(dat);
    return dat;
  })
  .catch(e => {
    console.log(e)
  })
}
export const acceptConfirm = (message, requestid,  userid) => { 
  const params = {
    requestID: requestid,
    userID: userid,
    msg: message
  };
  const searchParams = Object.keys(params).map((key) => {
    return encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
  }).join('&');
  
  return fetch('http://hometheaterproz.com/api-v2/acceptRequest', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    },
    body: searchParams
  })
  .then((response) => {
    console.log(response)
    return response.json()
  })
  .then( function(dat){    
    console.log(dat);
    return dat;
  })
  .catch(e => {
    console.log(e)
  })
}

export const rejectConfirm = (message, requestid,  userid) => {      
  const params = {
    requestID: requestid,
    userID: userid,
    msg: message
  };
  const searchParams = Object.keys(params).map((key) => {
    return encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
  }).join('&');
  
  return fetch('http://hometheaterproz.com/api-v2/rejectRequest', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    },
    body: searchParams
  })
  .then((response) => {
    console.log(response)
    return response.json()
  })
  .then( function(dat){    
    console.log(dat);
    return dat;
  })
  .catch(e => {
    console.log(e)
  })
}
export const getAnother = (userid) =>
{
  const params = { 
    userID: userid, 
  };
  const searchParams = Object.keys(params).map((key) => {
    return encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
  }).join('&');
  
  return fetch('http://hometheaterproz.com/api-v2/getAnother', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    },
    body: searchParams
  })
  .then((response) => {
    console.log(response)
    return response.json()
  })
  .then( function(dat){    
    console.log(dat);
    return dat;
  })
  .catch(e => {
    console.log(e)
  })
}
export const sendAnother = (userid,receiverid, requestid) =>
{
  const params = { 
    userID: userid,
    receiverID: receiverid,
    requestID: requestid
  };
  const searchParams = Object.keys(params).map((key) => {
    return encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
  }).join('&');
  
  return fetch('http://hometheaterproz.com/api-v2/transferRequest', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    },
    body: searchParams
  })
  .then((response) => {
    console.log(response)
    return response.json()
  })
  .then( function(dat){    
    console.log(dat);
    return dat;
  })
  .catch(e => {
    console.log(e)
  })
}