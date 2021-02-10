(function () {
  var $usernameFld, $passwordFld;
  var $firstNameFld, $lastNameFld, $roleFld;
  var $removeBtn, $updateBtn, $createBtn;
  var $userRowTemplate, $tbody;
  var userService = new AdminUserServiceClient();
  var users;
  $(main);

  function createUser(user) {
    userService.createUser(user)
      .then(function (actualUser) {
        users.push(actualUser)
        renderUsers(users)
      })
  }

  function deleteUser(event) {
    var deleteBtn = $(event.target)
    var theIndex = deleteBtn.attr("id")
    var theId = users[theIndex]._id
    userService.deleteUser(theId)
      .then(function (status) {
        users.splice(theIndex, 1);
        renderUsers(users)
      })
  }

  var selectedUser = null;
  function selectUser(event) {
    var selectBtn = $(event.target)
    var theId = selectBtn.attr("id")
    selectedUser = users.find(user => user._id == theId)
    $usernameFld.val(selectedUser.username)
    $passwordFld.val(selectedUser.password)
    $firstNameFld.val(selectedUser.firstName)
    $lastNameFld.val(selectedUser.lastName)
    $roleFld.val(selectedUser.role)
  }

  function updateUser() {
    selectedUser.username = $usernameFld.val()
    selectedUser.password = $passwordFld.val()
    selectedUser.firstName = $firstNameFld.val()
    selectedUser.lastName = $lastNameFld.val()
    selectedUser.role = $roleFld.val()
    userService.updateUser(selectedUser._id, selectedUser)
      .then(function (status) {
        var index = users.findIndex(user => user._id == selectedUser._id)
        users[index] = selectedUser
        renderUsers(users)
      })
  }

  function renderUsers(users) {
    $tbody.empty();
    for (var i = 0; i < users.length; i++) {
      var user = users[i];
      $tbody.append(`
         <tr class="wbdv-form">
              <td>${user.username}</td>
              <td>*********</td>
              <td>${user.firstName}</td>
              <td>${user.lastName}</td>
              <td>${user.role}</td>
              <td><span class="pull-right" style="white-space: nowrap">
                  <i id="${i}" class="fa-2x fa fa-times wbdv-remove"></i>
                  <i id="${user._id}" class="fa-2x fa fa-pencil wbdv-select"></i>
              </span></td>
         </tr>
      `);
    }
    $(".wbdv-remove").click(deleteUser);
    $(".wbdv-select").click(selectUser);
  }

  function main() {
    $usernameFld = $("#usernameFld");
    $passwordFld = $("#passwordFld");
    $firstNameFld = $("#firstNameFld");
    $lastNameFld = $("#lastNameFld");
    $roleFld = $("#roleFld");
    $createBtn = $(".wbdv-create");
    $updateBtn = $(".wbdv-update");
    $tbody = $("tbody");
    userService = new AdminUserServiceClient();

    $createBtn.click(function() {
      var newUser = {
        username: $usernameFld.val(),
        password: $passwordFld.val(),
        firstName: $firstNameFld.val(),
        lastName: $lastNameFld.val(),
        role: $roleFld.val(),
      };
      createUser(newUser);
      // Clear the fields after creating.
      $usernameFld.val("");
      $passwordFld.val("");
      $firstNameFld.val("");
      $lastNameFld.val("");
    });

    $updateBtn.click(updateUser);

    userService.findAllUsers().then(function (actualUserFromServer) {
      users = actualUserFromServer;
      renderUsers(users);
    });
  }
})();
