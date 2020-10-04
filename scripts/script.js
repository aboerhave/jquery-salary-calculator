// Main script file for jQuery Salary Calculator assignment - week 7 of Primce Digital Academy
// Adam Boerhave 10/2/2020 - 10/4/2020

let employeeData = [];  // empty array to store employee information
let yearlyTotal = 0;    // variable to store yearly salary total
let monthlyTotal = 0;   // variable to store monthly salaray total
//let monthlytotal;  I think extra line to be removed

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
    let removeId = $(this).parent().prev().prev().prev().text();
    console.log('removeId', removeId);
    let removeSalary = $(this).parent().prev().text();
    console.log('removeSalary', removeSalary);
    let removeSalaryNumber = removeSalary.replace(",", "").replace('$',"");
    removeEntry(removeId, removeSalaryNumber);
    if ($('table tr').length == 3) {
        $('#monthlyTotal').empty();
        $('#output').empty();
        $('#sectionHeading').text(`Employee Data Will Be Displayed Here Once Entered`);
    }
    else {
        $(this).parent().parent().remove();    
        $('#monthlyTotal').text(`Monthly Salary Total: $${monthlyTotalString}`);
    }
    checkColor();
}

function removeEntry(removeId, removeSalary) {
    console.log('yearlyTotal', yearlyTotal);
    yearlyTotal -= removeSalary;
    console.log('new yearlyTotal');
    
    monthlyTotal = yearlyTotal / 12;
    monthlyTotalString = monthlyTotal.toLocaleString('en-US', {maximumFractionDigits:2});
    console.log('yearlyTotal', yearlyTotal);
    console.log('montylyTotal', monthlyTotal);
    for (let i = 0; i < employeeData.length; i++) {
        // find index of entry to remove
        if (removeId == employeeData[i].idNumber) {
            employeeData.splice(i, 1);
        }
    }
    
}

// may have been thinking about this wrong.  I think it's more than needed for regular,
// but should chanbe properly if I get the remove to work
function checkColor() {
    // the output line with monthly total is id=monthlyTotal
    console.log($('#monthlyTotal').hasClass("highMonthlySalary")); 
    // new monthly total lower than 20k and previous assignment was to low class
    
    if (monthlyTotal <= 20000 && $('#monthlyTotal').hasClass("lowMonthlySalary")) {
        // leave same
        console.log('case 1');
        
    }
    // new monthly total <= 20k and previous assignment was to high class
    else if (monthlyTotal <= 20000 && $('#monthlyTotal').hasClass("highMonthlySalary")) {
        // change class to low
        console.log('case 2');
        $('#monthlyTotal').removeClass("highMonthlySalary");
        $('#monthlyTotal').addClass("lowMonthlySalary");
    }
    // new monthly total > 20k and previous assignment was to low class
    else if (monthlyTotal > 20000 && $('#monthlyTotal').hasClass("lowMonthlySalary")) {
        console.log('case 3');
        $('#monthlyTotal').removeClass("lowMonthlySalary");
        $('#monthlyTotal').addClass("highMonthlySalary");
    }
    // new monthly total > 20k and previous assignment was to high class
    else if (monthlyTotal > 20000 && $('#monthlyTotal').hasClass("highMonthlySalary")){
        // leave same
        console.log('case 4');
        
    }
    

}   // end checkColor fn

















/* extra
can use data function
$.data("#myDiv").get(0),"key", "arbitrary value";

data method:
let myObj = {};
$(myObj).data("city","Springfield");*/