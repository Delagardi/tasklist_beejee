import md5 from 'js-md5';

export default class ServiceBeeJeeAPI {
  _apiBase = 'https://uxcandy.com/~shapoval/test-task-backend/';
  _userRole = 'developer';
  userName = 'delagardi';
  
  getResourse = async(...getParams) => {
    const myHeaders = new Headers();

    const requestInfo = { 
      method: 'GET',
      headers: myHeaders,
      cache: 'default' 
    };

    const url = new URL(this._apiBase);

    const params = [
      ...getParams,
      [this._userRole, this.userName]
    ]

    url.search = new URLSearchParams(params);

    const response = await fetch(url, requestInfo);

    if (!response.ok === "ok") {
      throw new Error(`We couldn't FETCH ${url} . We get error: ${response.status}`);
    }

    return await response.json();
  }

  getTasks = async(page = 1) => {
    const response = await this.getResourse(["page", `${page}`]);
    
    return response.message;
  }

  getSort = (isAsc) => {
    let sortParams = ["sort_direction"];

    if (isAsc) {
      return sortParams = sortParams.concat("asc");
    }
    
    return sortParams = sortParams.concat("desc");
  }

  getSortField = async(isAsc, field) => {
    let fieldParams = ["sort_field"];
    fieldParams = fieldParams.concat(field);

    const response = await this.getResourse(fieldParams, this.getSort(isAsc));
    
    return response.message;
  }

  createTask = async(text, email, name) => {
    let form = new FormData();
    form.append("text", text);
    form.append("username", name);
    form.append("email", email);

    const url = new URL("create", this._apiBase);

    const params = [
      [this._userRole, this.userName]
    ]

    url.search = new URLSearchParams(params);

    const data = {
      body: form,
      method: "POST"
    }

    const response = await fetch(url, data);

    if (!response.ok === "ok") {
      throw new Error(`We couldn't FETCH ${url} . We get error: ${response.status}`);      
    }

    return await response.json();
  }

  fixedEncodeURIComponent = (str) => {
    return encodeURIComponent(str)
      .replace(/[!'()*]/g, (c) => '%' + c.charCodeAt(0).toString(16)
      );
  }

  updateTask = async(newData) => {
    const { id, text, status } = newData;
    const query = `https://uxcandy.com/~shapoval/test-task-backend/edit/${id}?${this._userRole}=${this.userName}`;

    let formData = new FormData();
    
    const TOKEN = "beejee";
    const STATUS_DONE = 10;
    const STATUS_UNDONE = 0;

    formData.append("status", status ? STATUS_DONE : STATUS_UNDONE);
    formData.append("text", text);
    formData.append("token", TOKEN);

    let paramsWithoutSignature = 
    "status=" + this.fixedEncodeURIComponent(status) +
    "&text=" + this.fixedEncodeURIComponent(text) +
    "&token=" + this.fixedEncodeURIComponent(TOKEN);
    
    formData.append("signature", md5(paramsWithoutSignature));

    const requestInfo = {
      method: "POST",
      body: formData
    }
    
    const response = fetch(query, requestInfo).then( (response) => response.json() );

    if (!response.ok === "ok") {
      throw new Error(`We couldn't POST to ${query}. We get error: ${response.status}`);
    }

    const result = await response;

    return result;
  }
}