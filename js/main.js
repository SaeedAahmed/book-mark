var siteNameInput =document.getElementById('siteNameInput');
var siteURLInput=document.getElementById('siteURLInput');


var bookMarks=[];

if(localStorage.getItem("book")!=null){
  bookMarks=JSON.parse(localStorage.getItem("book"));
  displayBook();
}
/*              add Book Mark               */
function addBookmark(){
   var books = {
        name:siteNameInput.value,
        url:siteURLInput.value,
    }
   if (isValidName(books.name) && isValidURL(books.url)){
      bookMarks.push(books);
      clearForm();
      localStorage.setItem("book",JSON.stringify(bookMarks));
      displayBook();
      console.log(bookMarks);
    }
    else {
      swal({
        title: "Site Name or Url is not valid!",
        text: `
                Please follow the rules below:
                > Site name must contain at least 3 characters
                > The URL must start with either http or https followed by :// 
                  it must contain www.
                  last part contains top level domain like
                  .com, .org etc.
              `,
      });
    }
   
}


/*              is valid name               */
function isValidName(name) {
  var validName = /^\w{3,}(\s+\w+)*$/;
  return validName.test(name);
}
/*             is valid url              */
function isValidURL(url) {
  var validUrl = /^(https?:\/\/)?(w{3}\.)?\w+\.\w{2,}\/?(:\d{2,5})?(\/\w+)*$/; 
  return validUrl.test(url);
}
/*              valid name               */
function validNameInput() {
  if (isValidName(siteNameInput.value)) {
    siteNameInput.classList.remove("is-invalid");
    siteNameInput.classList.add("is-valid");
  } else {
    siteNameInput.classList.remove("is-valid");
    siteNameInput.classList.add("is-invalid");
  }
}
/*              valid url               */
function validURLInput() {
  if (isValidURL(siteURLInput.value)) {
    siteURLInput.classList.remove("is-invalid");
    siteURLInput.classList.add("is-valid");
  } else {
    siteURLInput.classList.remove("is-valid");
    siteURLInput.classList.add("is-invalid");
  }
}
/*              clear               */
function clearForm(){
    siteNameInput.value="";
    siteURLInput.value="";
}

/*              displayBookMark               */
function displayBook(){
    var cartona='';
    for(var i=0;i<bookMarks.length;i++){
       var bookIndex=i+1;
        cartona+=`
        <tr>
        <td>${bookIndex}</td>
      <td>${bookMarks[i].name}</td>
      <td>
        <button class="btn btn-sm btn-main" onclick="visitWebsite(${i})">
          <i class="fa-solid fa-eye"></i>
          Visit
        </button>
      </td>
      <td>
        <button class="btn btn-sm btn-main" onclick="deleteBookMark(${i})">
          <i class="fa-solid fa-trash"></i>
          Delete
        </button>
      </td>
      </tr>
        `
    }
    document.getElementById("tableContent").innerHTML=cartona;
}

/*              visitWebsite                 */
function visitWebsite(i) {
  const httpRegEx = /^https?:\/\//;
  if (httpRegEx.test(bookMarks[i].url)) {
    window.open(bookMarks[i].url);
  } else {
    window.open(`https://${bookMarks[i].url}`);
  }
}
/*              deleteBookMark               */
function deleteBookMark(indexNum){
    bookMarks.splice(indexNum,1);
    localStorage.setItem("book",JSON.stringify(bookMarks));
    displayBook();
}




