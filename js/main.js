
/* QLNV


CHỨC NĂNG thêm nhân viên staff :
+ phân rã staff
- Tài khoản (account)
- tên (fullName)
- email
- mật khẩu (password)
- ngày làm (datepicker)
- chức vụ (office)
- lươnng(wage)
- xếp loại (rating)
-giở làm (workTime)

**/
// 1. DOM lấy input
var staffList = [];

function createStaff() {
  var account = document.getElementById("tknv").value;
  var fullName = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  var datepicker = document.getElementById("datepicker").value;
  var wage = document.getElementById("luongCB").value;
  var office = document.getElementById("chucvu").value;
  var workTime = document.getElementById("gioLam").value;

  // check account

  if (account === "") {
    document.getElementById("tbTKNV").innerHTML =
      "Tài Khoản không được để trống";
    document.getElementById("tbTKNV").style.display = "inline-block";
    return;
  }

  var accountNumber = account * 1;
  if (
    accountNumber < 1000 ||
    accountNumber > 999999 ||
    accountNumber % 1 !== 0
  ) {
    document.getElementById("tbTKNV").innerHTML = "Tài Khoản không hợp lệ";
    document.getElementById("tbTKNV").style.display = "inline-block";
  } else {
    for (var i = 0; (i = staffList.length); i++)
      if (staffList.length[i] === account) {
        document.getElementById("tbTKNV").innerHTML = "Tài Khoản đã bị trùng";
      } else {
        return account;
      }
  }

  //  check fullName

  if (fullName === "") {
    document.getElementById("tbTen").innerHTML = "Tên không được để trống";
    document.getElementById("tbTen").style.display = "inline-block";
    return;
  }
  // check fullName đúng định dạng và có thể viết tiếng việt

  var fullNameLower = fullName.toLowerCase();
  var isFullName =
    /^([a-vxyỳọáầảấờễàạằệếýộậốũứĩõúữịỗìềểẩớặòùồợãụủíỹắẫựỉỏừỷởóéửỵẳẹèẽổẵẻỡơôưăêâđ]+)((\s{1}[a-vxyỳọáầảấờễàạằệếýộậốũứĩõúữịỗìềểẩớặòùồợãụủíỹắẫựỉỏừỷởóéửỵẳẹèẽổẵẻỡơôưăêâđ]+){1,})$/;
  if (isFullName.test(fullNameLower) === true) {
    return fullName;
  } else {
    document.getElementById("tbTen").innerHTML = "Tên không đúng định dạng";
    document.getElementById("tbTen").style.display = "inline-block";
  }

  //   check email

  //   check email không để trông
  if (email === "") {
    document.getElementById("tbEmail").innerHTML = "Email không được để trống";
    document.getElementById("tbEmail").style.display = "inline-block";
    return;
  }

  // check email không đúng địng dạng

  var isEmail =
    /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i;
  if (isEmail.test(email) === true) {
    return email;
  } else {
    document.getElementById("tbEmail").innerHTML = "Email không đúng địng dạng";
    document.getElementById("tbEmail").style.display = "inline-block";
  }

  // check password

  // check mật khẩu không được để trống
  if (password === "") {
    document.getElementById("tbMatKhau").innerHTML =
      "Mật Khẩu không được để trống";
    document.getElementById("tbMatKhau").style.display = "inline-block";
    return;
  }

  //   check mật khẩu đúng định dạng
  var isPassword =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{6,10}$/;
  if (isPassword.test(password) === true) {
    return password;
  } else {
    document.getElementById("tbMatKhau").innerHTML =
      "Mật Khẩu không đúng định dạng";
    document.getElementById("tbMatKhau").style.display = "inline-block";
  }

  //   check lương cơ bản

  // check ngày lương cơ bản không đc để trống
  if (wage === "") {
    document.getElementById("tbLuongCB").innerHTML =
      "Lương cơ bản không được để trống";
    document.getElementById("tbLuongCB").style.display = "inline-block";
    return;
  }
  // check lương cơ bản

  if (wage * 1 < 1000000 || wage * 1 > 20000000) {
    document.getElementById("tbLuongCB").innerHTML = "Lương không đúng ";
    document.getElementById("tbLuongCB").style.display = "inline-block";
  } else {
    return wage;
  }

  // check office

  if (office === "Chọn chức vụ") {
    document.getElementById("tbChucVu").innerHTML = "Chức vụ không đúng";
    document.getElementById("tbChucVu").style.display = "inline-block";
    return;
  } 

  // check workTime

  // check giờ làm không được để trống
  if (workTime === "") {
    document.getElementById("tbGiolam").innerHTML =
      "Giờ Làm không được để trống";
    document.getElementById("tbGiolam").style.display = "inline-block";
    return;
  }
  //  check giờ làm

  if (workTime * 1 < 80) {
    document.getElementById("tbGiolam").innerHTML = "Giờ làm không đạt";
    document.getElementById("tbGiolam").style.display = "inline-block";
  } else if (workTime * 1 > 200) {
    document.getElementById("tbGiolam").innerHTML = "Giờ làm không không đúng";
    document.getElementById("tbGiolam").style.display = "inline-block";
  } else {
    return workTime;
  }

  //Tạo đối tượng
  var staff = new Staff(
    account,
    fullName,
    email,
    password,
    datepicker,
    wage,
    office,
    workTime
  );

  //   thêm đối tượng vào danh sách
  staffList.push(staff);
  console.log(staffList);
  //   in ra Html
  renderStaff();
  //lưu danh sách nhân viên
  // saveStaffList();
}

function renderStaff() {
  var html = "";
  for (var i = 0; i < staffList.length; i++) {
    html += `<tr>
                        <td>${staffList[i].account}</td>
                        <td>${staffList[i].fullName}</td>
                        <td>${staffList[i].email}</td>
                        <td>${staffList[i].datepicker}</td>
                        <td>${staffList[i].office}</td>
                        <td>${staffList[i].totalSalary()}</td>
                        <td>${staffList[i].rating()}</td>
                        
                  </tr>`;
  }
  document.getElementById("tableDanhSach").innerHTML = html;
  return;
}

// function saveStaffList() {
//   // chuyển staff list thàng chuỗi JSon
//   var staffListJSON = JSON.stringify(staffList);

//   localStorage.setItem("StaffList", staffListJSON);
// }

// function getStaffList() {
//   var staffListJSON = localStorage.getItem("StaffList");
//   // kiểm tra nếu dưới local không có dữ kiệu ( staffList = null) => return
//   if (!staffListJSON) return [];
//   // chuyển lại từ json về ojb
//   return JSON.parse(staffListJSON);
// }

// // map staffList
// // inpuut local => output data mới
// function mapStaffList(local) {
//   var mapData = [];
//   for (var i = 0; i < local.length; i++) {
//     var oldStaff = local[i];
//     var newStaff = new Staff(
//       oldStaff.account,
//       oldStaff.fullName,
//       oldStaff.email,
//       oldStaff.password,
//       oldStaff.datepicker,
//       oldStaff.wage,
//       oldStaff.office,
//       oldStaff.workTime
//     );
//     mapData.push(newStaff);
//   }
//   return mapData;
// }

// // delete staff
// function deleteStaff(account) {
//   var index = findByAccount(account);
//   if (index === -1) {
//     alert("Tài khoản không tồn tại");
//     return;
//   }
//   staffList.splice(index, 1);
//   // câp nhập lại danh sách
//   renderStaff();
//   // lưu lại danh sách
//   saveStaffList()
// }
// // nhận vào account và tìm vụ trí account
// function findByAccount(account) {
//   for (var i = 0; i < staffList.length; i++) {
//     if (staffList[i].account === account) {
//       return i;
//     }
//   }
//   return -1;
// }

// window.onload = function () {
//   // hàm sử dụng khi load trang
//   var StaffListFromLocal = getStaffList();
//   staffList = mapStaffList(StaffListFromLocal);
//   renderStaff();
// };
