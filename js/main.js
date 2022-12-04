var staffList = [];

function createStaff() {
  if (!validateForm()) {
    return;
  }

  var account = document.getElementById("tknv").value;
  var fullName = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  var datepicker = document.getElementById("datepicker").value;
  var wage = document.getElementById("luongCB").value;
  var office = document.getElementById("chucvu").value;
  var workTime = document.getElementById("gioLam").value;

  //  check trùng id
  for (var i = 0; i < staffList.length; i++) {
    if (staffList[i].account === account) {
      alert("Tài khoản đã tồn tại");
      return;
    }
  }

  // Tạo đối tượng
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

  staffList.push(staff);
  renderStaff();
  saveStaffList();
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
                        <td>
                            <button onclick="deleteStaff('${staffList[i].account}')" 
                                    class="btn btn-danger">Xoá
                            </button>
                            <button onclick="getUpdateStaff('${staffList[i].account}')"  
                                    class="btn btn-info">Cập nhật
                            </button>

                       </td>
                        
                  </tr>`;
  }
  document.getElementById("tableDanhSach").innerHTML = html;
  return;
}

//------------ VALIDATION-----------
// required (không để trống)

// val: string (giá trị cần kiểm tra)
// config : ojb (kết quả trả về)
function required(val, config) {
  if (val.length > 0) {
    document.getElementById(config.errorId).innerHTML = "";
    return true;
  }
  document.getElementById(config.errorId).innerHTML = "Vui lòng nhập giá trị";
  document.getElementById(config.errorId).style.display = "inline-block";
  return false;
}

// min length, max length ( dộ dài)

// val: string (giá trị cần kiểm tra)
// // config : ojb (kết quả trả về)
// min
// max

function length(val, config) {
  if (val.length < config.min || val.length > config.max) {
    document.getElementById(
      config.errorId
    ).innerHTML = `Độ dài phải từ ${config.min} đến ${config.max} kí tự`;
    document.getElementById(config.errorId).style.display = "inline-block";
    return false;
  }
  document.getElementById(config.errorId).innerHTML = "";
  return true;
}

//  regular expression
// val: string (giá trị cần kiểm tra)
// // config : ojb (kết quả trả về)
//  regexp: ọjb

function pattern(val, config) {
  if (config.regexp.test(val)) {
    document.getElementById(
      config.errorId
    ).innerHTML = "";
    return true;
  }
  document.getElementById(config.errorId).innerHTML =
    "Giá trị không đúng định dạng";
  document.getElementById(config.errorId).style.display = "inline-block";
  return false;
}

// check lương
function checkWage() {
  var wage = document.getElementById("luongCB").value;
  if (wage * 1 < 1000000 || wage * 1 > 20000000) {
    document.getElementById("tbLuongCB").innerHTML = "Lương không đúng ";
    document.getElementById("tbLuongCB").style.display = "inline-block";
    return false;
  } else {
    return true;
  }
}

// check office

function checkOffice() {
  var office = document.getElementById("chucvu").value;
  if (office === "Chọn chức vụ") {
    document.getElementById("tbChucVu").innerHTML = "Chọn chức vụ";
    document.getElementById("tbChucVu").style.display = "inline-block";
    return false;
  } else {
    document.getElementById("tbChucVu").innerHTML = "";
    return true;
  }
}
// check workTime
function checkWorkTime() {
  var workTime = document.getElementById("gioLam").value;
  if (workTime * 1 < 80) {
    document.getElementById("tbGiolam").innerHTML = "Giờ làm không đạt";
    document.getElementById("tbGiolam").style.display = "inline-block";
    return false;
  } else if (workTime * 1 > 200) {
    document.getElementById("tbGiolam").innerHTML = "Giờ làm không không đúng";
    document.getElementById("tbGiolam").style.display = "inline-block";
    return false;
  } else {
    return true;
  }
}

function validateForm() {
  var account = document.getElementById("tknv").value;

  var accountValid =
    required(account, { errorId: "tbTKNV" }) &&
    length(account, { errorId: "tbTKNV", min: 4, max: 6 });

  var fullName = document.getElementById("name").value;
  var fullNameLower = fullName.toLowerCase();
  var isFullName =
    /^([a-vxyỳọáầảấờễàạằệếýộậốũứĩõúữịỗìềểẩớặòùồợãụủíỹắẫựỉỏừỷởóéửỵẳẹèẽổẵẻỡơôưăêâđ]+)((\s{1}[a-vxyỳọáầảấờễàạằệếýộậốũứĩõúữịỗìềểẩớặòùồợãụủíỹắẫựỉỏừỷởóéửỵẳẹèẽổẵẻỡơôưăêâđ]+){1,})$/;

  var fullNameValid =
    required(fullName, { errorId: "tbTen" }) &&
    pattern(fullNameLower, { errorId: "tbTen", regexp: isFullName });

  var email = document.getElementById("email").value;
  var emailLower = email.toLowerCase();
  var isEmail =
    /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i;
  var emailValid =
    required(email, { errorId: "tbEmail" }) &&
    pattern(emailLower, { errorId: "tbEmail", regexp: isEmail });

  var password = document.getElementById("password").value;
  var isPassword =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{6,10}$/;
  var passwordValid =
    required(password, { errorId: "tbMatKhau" }) &&
    length(password, { errorId: "tbMatKhau", min: 6, max: 10 }) &&
    pattern(password, { errorId: "tbMatKhau", regexp: isPassword });

  var datepicker = document.getElementById("datepicker").value;
  var isDatepicker = /^[0-1]?[0-9]\/[0-3]?[0-9]\/[1-2]?[0-9]?[0-9]?[0-9]$/;
  var datepickerValid =
    required(datepicker, { errorId: "tbNgay" }) &&
    pattern(datepicker, { errorId: "datepicker", regexp: isDatepicker });

  var wage = document.getElementById("luongCB").value;
  var wageValid = required(wage, { errorId: "tbLuongCB" }) && checkWage();

  var officeValid = checkOffice();

  var workTime = document.getElementById("gioLam").value;
  var workTimeValid =
    required(workTime, { errorId: "tbGiolam" }) && checkWorkTime();

  // kiểm tra điều kiện đúng
  var isFormValid =
    accountValid &&
    fullNameValid &&
    emailValid &&
    passwordValid &&
    datepickerValid &&
    wageValid &&
    workTimeValid;
  return isFormValid;
}

// chức năng
// lưu dữ liệu dươi local
function saveStaffList() {
  // chuyển stafftList thành chuỗi JSON
  var staffListJson = JSON.stringify(staffList);
  localStorage.setItem("SL", staffListJson);
}

// lấy dữ liệu dưới local
function getStaffList() {
  var staffListJson = localStorage.getItem("SL");
  // kiểm tra nếu dưới local ko có dữ liệu staffListJson = null => return
  if (!staffListJson) return [];
  // chuyển lại từ json về object
  return JSON.parse(staffListJson);
}

// đẩy dữ liệu lên giao diện
// input: dataLocal => output: data mới
function mapStaffList(local) {
  var result = [];

  for (var i = 0; i < local.length; i++) {
    var oldStaff = local[i];
    var newStaff = new Staff(
      oldStaff.account,
      oldStaff.fullName,
      oldStaff.email,
      oldStaff.password,
      oldStaff.datepicker,
      oldStaff.wage,
      oldStaff.office,
      oldStaff.workTime
    );
    result.push(newStaff);
  }

  return result;
}

window.onload = function () {
  var staffListFromLocal = getStaffList();
  staffList = mapStaffList(staffListFromLocal);
  renderStaff();
};

// xóa nhân viên

function deleteStaff(account) {
  var index = findByAccount(account);
  if (index === -1) return alert("Tài khoản không tồn tại ");
  staffList.splice(index, 1);
  renderStaff();
  saveStaffList();
}

//  cập nhật nhân viên
// B1: chọn nhân viên muốn cập nhật & đẩy thông tin lên form

function getUpdateStaff(account){
  var index = findByAccount(account)
  if(index === -1) return alert("Tài khoản không tồn tại ")

// hiện lại form
  var formActive = document.getElementById("myModal")
  formActive.classList = "modal fade show"
  formActive.style.display = "block"

  
  

// dom ngược lại thông tin nhân viên lên form
  var staff = staffList[index]
  document.getElementById("tknv").value = staff.account;
  document.getElementById("name").value = staff.fullName;
  document.getElementById("email").value = staff.email;
  document.getElementById("password").value = staff.password;
  document.getElementById("datepicker").value = staff.datepicker;
  document.getElementById("luongCB").value = staff.wage;
  document.getElementById("chucvu").value = staff.office;
  document.getElementById("gioLam").value = staff.workTime;
  // disable input nhân viên
  document.getElementById("tknv").disable = true

}

// hàm tim account nhân viên
function findByAccount(account) {
  for (i = 0; i < staffList.length; i++) {
    if (staffList[i].account === account) {
      return i;
    }
  }
  return -1;
}

