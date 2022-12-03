
function Staff(
  account,
  fullName,
  email,
  password,
  datepicker,
  wage,
  office,
  workTime
) {
  this.account = account;
  this.fullName = fullName;
  this.email = email;
  this.password = password;
  this.datepicker = datepicker;
  this.wage = wage;
  this.office = office;
  this.workTime = workTime;

  this.totalSalary = function () {
    if (this.office === "Sếp") {
      return this.wage * 3;
    } else if (this.office === "Trưởng phòng") {
      return this.wage * 2;
    } else {
      return this.wage;
    }
  };

  this.rating = function(){
    if((workTime * 1) >= 192){
        return "Nhân viên xuất sắc"
    }else if((workTime * 1) < 192 || (workTime * 1) >= 176){
        return "Nhân viên giỏi"
    }else if((workTime * 1) < 176 || (workTime * 1) >= 160){
        return "Nhân viên khá"
    }else{
        return "Nhân viên hơi lười"
    }
  }


}
