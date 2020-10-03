// Main script file for jQuery Salary Calculator assignment
let employeeData = [];
let yearlyTotal = 0;
let monthlyTotal = 0;

$(document).ready(onReady);

function onReady() {
    $('#submitBtn').on('click', submitBtnFunction);
    // adds event listener to buttons in deleteBtn class once they exist
    $('#output').on('click', ".deleteBtn", deleteBtnFunction);
    //$('#monthlyTotal').hide();
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
    
    $('#fName').val('');
    $('#lName').val('');
    $('#number').val('');
    $('#title').val('');
    $('#salary').val('');


    appendToDom();
    // append monthly value to dom
    yearlyTotal += newEmployee.annualSalary;
    $('#monthlyTotal').text(`Monthly Salary Total: $${yearlyTotal/12}`);
    
}

function appendToDom() {
    $('#output').empty();
    $('#output').append(`<table id="bestTableEver">
    
    <tr>
        <th>First Name</th>
        <th>Last Name</th>
        <th>ID</th>
        <th>Title</th>
        <th>Annual Salary</th>
        <th></th>
    </tr>`);
    for (let i = 0; i < employeeData.length; i++) {
        $('#bestTableEver').append(`
        <tr>
            <td>${employeeData[i].firstName}</td>
            <td>${employeeData[i].lastName}</td>
            <td>${employeeData[i].idNumber}</td>
            <td>${employeeData[i].title}</td>
            <td>${employeeData[i].annualSalary}</td>
            <td class="deleteColumn"><button class="deleteBtn">Delete</button></td>
        </tr>`);
    }
    
}

function deleteBtnFunction() {
 console.log('delete button clicked');
    $(this).parent().parent().remove();
}