// Main script file for jQuery Salary Calculator assignment
let employeeData = [];

$(document).ready(onReady);

function onReady() {
    $('#submitBtn').on('click', submitBtnFunction);
}

function submitBtnFunction() {
    console.log('submit button clicked');
    
    $('#sectionHeading').text('Employee Information:')
    // Collect data from input boxes here 
    firstNameData = $('#fName').val();
    lastNameData = $('#lName').val();
    numberData = Number($('#number').val());
    titleData = $('#title').val();
    salaryData = Number($('#salary').val());

    // create object with data collected
    let newEmployee = {
        firstName: firstNameData,
        lastName: lastNameData,
        idNumber: numberData,
        title: titleData,
        annualSalary: salaryData
    }
    console.log(newEmployee);
    employeeData.push(newEmployee);
    
}