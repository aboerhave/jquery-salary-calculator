// Main script file for jQuery Salary Calculator assignment
let employeeData = [];
let yearlyTotal = 0;
let monthlyTotal = 0;
let monthlytotal;

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
   
    if(checkAllFields()) {

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
        monthlyTotal = yearlyTotal /12;
        monthlyTotalString = monthlyTotal.toLocaleString('en-US', {maximumFractionDigits:2});
        $('#monthlyTotal').text(`Monthly Salary Total: $${monthlyTotalString}`);
        checkColor();
    }
    else {
        alert('Please fill in all of the input boxes')
    }   
} // end submitBtn fn

function checkAllFields() {

    if($('#fName').val() && $('#lName').val() && $('#number').val() && 
    $('#title').val() && $('#salary').val()) {
        console.log('all fields true');
        
        return true;
    }
    else { 
        console.log('all fields false');
        
        return false;
    }
}   // end checkAllFields fn

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
        let salaryNumber = employeeData[i].annualSalary;
        let salaryString = salaryNumber.toLocaleString('en-US', {maximumFractionDigits:2});
        
        $('#bestTableEver').append(`
        <tr>
            <td>${employeeData[i].firstName}</td>
            <td>${employeeData[i].lastName}</td>
            <td>${employeeData[i].idNumber}</td>
            <td>${employeeData[i].title}</td>
            <td>$${salaryString}</td>
            <td class="deleteColumn"><button class="deleteBtn">Delete</button></td>
        </tr>`);
    }
    
}

function deleteBtnFunction() {
console.log('delete button clicked');
    // Need to put ability to remove data from javascript here
    //$(this).css("background-color", "green");
    $(this).parent().prev().css("background-color", "red");
    let removeId = $(this).parent().prev().prev().prev().text();
    console.log('removeId', removeId);
    let removeSalary = $(this).parent().prev().text();
    console.log('removeSalary', removeSalary);
    removeEntry(removeId, removeSalary);
    if ($('table tr').length == 2) {
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
    yearlyTotal -= removeSalary;
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