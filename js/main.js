var bookmarkName = document.getElementById("name");
var bookmarkurl = document.getElementById("url");
var mainIndex;
var container;

var bookmarkcontainer;
if (localStorage.getItem("youssef") != null) {
  bookmarkcontainer = JSON.parse(localStorage.getItem("youssef"));
  displayData(bookmarkcontainer);
} else {
  bookmarkcontainer = [];
}

function addData() {
  var bookmark = {
    name: bookmarkName.value,
    url: bookmarkurl.value,
  };
  if (bookmark.name == "" && bookmark.url == "") {
    document.getElementById("alert").classList.replace("d-none", "d-block");
  } else {
    if (document.getElementById("addBtn").innerHTML == "Submit") {
      bookmarkcontainer.push(bookmark);
    } else {
      var found = 0;
      bookmarkcontainer.splice(mainIndex, 1, bookmark);
      document.getElementById("addBtn").innerHTML = "Submit";
    }

    localStorage.setItem("youssef", JSON.stringify(bookmarkcontainer));
    displayData(bookmarkcontainer);
    clearForm();
    document.getElementById("alert").classList.replace("d-block", "d-none");
  }
}

function displayData(index) {
  container = index;
  var temp = ``;
  for (var i = 0; i < index.length; i++) {
    temp += `<tr>
        <td>${container[i].name}</td>
        <td>
          <a href="${container[i].url}" target="_blank" class="btn btn-primary"
            >Visit</a
          >
        </td>
        <td>
          <button onclick="updateBook(${i})" class="btn btn-info">
            Update
          </button>
        </td>
        <td>
          <button onclick="deleteData(${i})" class="btn btn-danger">
            Delete
          </button>
        </td>
      </tr>`;
  }
  document.getElementById("tableBody").innerHTML = temp;
}

function clearForm() {
  bookmarkName.value = "";
  bookmarkurl.value = "";
}

function deleteData(index) {
  console.log(index);
  bookmarkcontainer.splice(index, 1);
  localStorage.setItem("youssef", JSON.stringify(bookmarkcontainer));
  displayData(bookmarkcontainer);
}
function updateBook(index) {
  bookmarkName.value = container[index].name;
  bookmarkurl.value = container[index].url;
  mainIndex = index;

  document.getElementById("addBtn").innerHTML = "update";
}

function search(letter) {
  var searchContainer = [];
  for (var i = 0; i < bookmarkcontainer.length; i++) {
    if (
      bookmarkcontainer[i].name.toLowerCase().includes(letter.toLowerCase())
    ) {
      searchContainer.push(bookmarkcontainer[i]);
    }
    displayData(searchContainer);
  }
}
