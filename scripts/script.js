// Main script file for jQuery Salary Calculator assignment - week 7 of Primce Digital Academy
// Adam Boerhave 10/2/2020 - 10/4/2020

let employeeData = [];  // empty array to store employee information
let yearlyTotal = 0;    // variable to store yearly salary total
let monthlyTotal = 0;   // variable to store monthly salaray total
let monthlyTotalString;  // variable to save string to display

$(document).ready(onReady);

// function to be ran when page loaded
function onReady() {
    // adds event listener to button associated with submitBtn id
    $('#submitBtn').on('click', submitBtnFunction);
    // adds event listener to buttons in deleteBtn class once they exist
    $('#output').on('click', ".deleteBtn", deleteBtnFunction);
}

// function to ran when the submit button is clicked.  It takes the values from the dom and checks
// them and then adds them to the employeeData array if ok.  No return
function submitBtnFunction() {
    console.log('submit button clicked');
    // changes text above table
    $('#sectionHeading').text('Employee Information:')
    // checkAllFields returns true if all boxes filled in
    if (checkAllFields()) {

        // Collect data from input boxes here 
        firstNameData = $('#fName').val();
        lastNameData = $('#lName').val();
        numberData = Number($('#number').val());
        titleData = $('#title').val();
        salaryData = Number($('#salary').val());

        // checkId function returns true if the identification # entered in the box
        // does not already exist
        if (checkId(numberData)) {

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
    
            // empty input fields
            $('#fName').val('');
            $('#lName').val('');
            $('#number').val('');
            $('#title').val('');
            $('#salary').val('');

            // creates table with values that were put in boxes
            appendToDom();

            // add new person's salary to existing value of yearlyTotal
            yearlyTotal += newEmployee.annualSalary;
            monthlyTotal = yearlyTotal / 12;
            // converts number to string with $ and , with 2 dec places
            monthlyTotalString = monthlyTotal.toLocaleString('en-US', {maximumFractionDigits:2});
            // update monthly value on dom
            $('#monthlyTotal').text(`Monthly Salary Total: $${monthlyTotalString}`);
            // checkColor function will turn monthlyTotal text to red of over 20, white if <= 20k
            checkColor();
        }
        else { // if id # entered is already in the array
            alert('That ID Number already exists.  Please try another entry');
        }
    }   
    else { // if a box is empty when submit clicked
        alert('Please fill in all of the input boxes')
    }   
} // end submitBtn fn

// checkAllFields checks to see if any boxes are empty and returns true if they all
// have values and 
function checkAllFields() {
    // all boxes filled in
    if($('#fName').val() && $('#lName').val() && $('#number').val() && 
    $('#title').val() && $('#salary').val()) {
        return true;
    }
    else { // any boxes empty
        return false;
    }
}   // end checkAllFields fn

// checkId goes through idNumber property of employeeData array and looks for a match with the
// new id number entered.
// It returns true if there is not a match and false if there is a match.  This is important, 
// since the id number is later used to remove entries from the array if deleted
function checkId(identification) {
    for (let i = 0; i < employeeData.length; i++) {
        if(identification == employeeData[i].idNumber) {
            return false;
        }
    }
    return true;
}   // end checkId fn

// appendToDom function creates a new table every time the submit button is clicked
function appendToDom() {
    // output id is div in html file
    $('#output').empty();
    // Table Header Section
    $('#output').append(`
    <table id="bestTableEver">
        <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>ID</th>
            <th>Title</th>
            <th>Annual Salary</th>
            <th></th>
        </tr>
    </table>`);
    // loop will add a new row for every employee object in the employeeData array
    for (let i = 0; i < employeeData.length; i++) {
        // changes salary number to a string to use on the screen with $ and , with 2 dec places
        let salaryNumber = employeeData[i].annualSalary;
        let salaryString = salaryNumber.toLocaleString('en-US', {maximumFractionDigits:2});
        // adding new row
        $('#bestTableEver').append(`
        <tr>
            <td>${employeeData[i].firstName}</td>
            <td>${employeeData[i].lastName}</td>
            <td>${employeeData[i].idNumber}</td>
            <td>${employeeData[i].title}</td>
            <td>$${salaryString}</td>
            <td class="deleteColumn">
                <button class="deleteBtn">Delete</button>
            </td>
        </tr>`);    // end append stmt
    }   // end for loop
    $('#bestTableEver').append(`
        <tr id="lastRow">
            <td colspan="6"></td>
        </tr>
    `);
}   // end appendToDom fn


// deleteBtnFunction 
function deleteBtnFunction() {
console.log('delete button clicked');
    // this line traverses the DOM to find the ID number for the entry to be deleted
    let removeId = $(this).parent().prev().prev().prev().text();
    // this line traverses the DOM to find the value for salary to be removed
    let removeSalary = $(this).parent().prev().text();
    // takes out symbols from string to use as a number
    let removeSalaryNumber = removeSalary.replace(",", "").replace('$',"");
    // removeEntry called here.  It adjusts yearly and monthly salary values, 
    // and removes the employee object from the employeeData array
    removeEntry(removeId, removeSalaryNumber);
    // rest of table removed if only one entry remains
    if ($('table tr').length == 3) {
        $('#monthlyTotal').empty();
        $('#output').empty();
        $('#sectionHeading').text(`Employee Data Will Be Displayed Here Once Entered`);
    }
    else {  // one line is removed if there are multiple lines to the table
        $(this).parent().parent().remove();    
        // monthyly total value changed on DOM
        $('#monthlyTotal').text(`Monthly Salary Total: $${monthlyTotalString}`);
    }
    // changes color of background of text if needed
    checkColor();
}   // end deleteBtnFunction fn

// removeEntry function accepts id number and salary for object to remove, and recalculates 
// the yearlyTotal and monthlyTotal
function removeEntry(removeId, removeSalary) {
    // adjusts yearly and monthly salary values
    yearlyTotal -= removeSalary;
    monthlyTotal = yearlyTotal / 12;
    // string to display with $ and , to 2 dec places
    monthlyTotalString = monthlyTotal.toLocaleString('en-US', {maximumFractionDigits:2});
    // searches array for entry to remove
    for (let i = 0; i < employeeData.length; i++) {
        // find index of entry to remove
        if (removeId == employeeData[i].idNumber) {
            employeeData.splice(i, 1);
        }
    }
}// end removeEntry fn

// checkColor function reads value of monthlyTotal and changes the background of the text to 
// red if it's higher than 20k, otherwise white
function checkColor() {
    // the output line with monthly total is id=monthlyTotal
    // it checks the new value and the class it currently has to see if it needs to change
    console.log($('#monthlyTotal').hasClass("highMonthlySalary")); 
    // new monthly total lower than 20k and previous assignment was to low class
    
    if (monthlyTotal <= 20000 && $('#monthlyTotal').hasClass("lowMonthlySalary")) {
        // leave same
    }
    // new monthly total <= 20k and previous assignment was to high class
    else if (monthlyTotal <= 20000 && $('#monthlyTotal').hasClass("highMonthlySalary")) {
        // change class to low
        $('#monthlyTotal').removeClass("highMonthlySalary");
        $('#monthlyTotal').addClass("lowMonthlySalary");
    }
    // new monthly total > 20k and previous assignment was to low class
    else if (monthlyTotal > 20000 && $('#monthlyTotal').hasClass("lowMonthlySalary")) {
        $('#monthlyTotal').removeClass("lowMonthlySalary");
        $('#monthlyTotal').addClass("highMonthlySalary");
    }
    // new monthly total > 20k and previous assignment was to high class
    else if (monthlyTotal > 20000 && $('#monthlyTotal').hasClass("highMonthlySalary")){
        // leave same
    }
}   // end checkColor fn


