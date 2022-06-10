//SELECTORS
const amount = document.getElementById('amount');
const rate = document.getElementById('rate');
// const valueDate = document.getElementById('value-date');    //MM-DD-YYYY
const tenor = document.getElementById('tenor');
const maturityDate = document.getElementById('maturity-date');
const grossInterest = document.getElementById('gross-interest');
const wInterest = document.getElementById('W-interest');
const netInterest = document.getElementById('net-interest');
const netInterestRate = document.getElementById('net-interest-rate');
const interestRate = document.getElementById('interest-rate');
const maturityAmount = document.getElementById('maturity-amount');
const calculateBtn = document.getElementById('calculate');
let container = document.getElementsByClassName("formField")[0]; //select form field

const first = document.getElementById('first');
const second = document.getElementById('second');
const third = document.getElementById('third');




//FUNCTIONS

// ADDING COMMA TO NUMBER
function updateTextView(_obj) {
    var num = getNumber(_obj.val());
    if (num == 0) {
        _obj.val('');
    } else {
        _obj.val(num.toLocaleString());
    }
}

function getNumber(_str) {
    var arr = _str.split('');
    var out = new Array();
    for (var cnt = 0; cnt < arr.length; cnt++) {
        if (isNaN(arr[cnt]) == false) {
            out.push(arr[cnt]);
        }
    }
    return Number(out.join(''));
}
$(document).ready(function () {
    $('input[type=text]').on('keyup', function () {
        updateTextView($(this));
    });
});

// DATE: Form is separated into sub fields with auto focus at max input.
container.onkeyup = function(e) {
    let target = e.srcElement || e.target;
    let maxLength = parseInt(target.attributes["maxlength"].value, 10);
    let myLength = target.value.length;
    if (myLength >= maxLength) {
        let next = target;
        while (next = next.nextElementSibling) {
            if (next == null)
                break;
            if (next.tagName.toLowerCase() === "input") {
                next.focus();
                break;
            }
        }
    }
    // Move to previous field if empty (user pressed backspace)
    else if (myLength === 0) {
        let previous = target;
        while (previous = previous.previousElementSibling) {
            if (previous == null)
                break;
            if (previous.tagName.toLowerCase() === "input") {
                previous.focus();
                break;
            }
        }
    }
}







function calculate() {
    // Convert the Date input to number
    let dateDay = first.value;
    let dateMonth = second.value;
    let dateYear = third.value;

    let dateDayNum = parseFloat(dateDay);
    let dateMonthNum = parseInt(dateMonth);
    let dateYearNum = parseInt(dateYear);

    let calender = `${dateMonthNum}/${dateDayNum}/${dateYearNum}`
    console.log(calender)

    let amountEl = amount.value;

    amountEl = amountEl.replace(/\,/g,''); // use a regular expression
    amountEl = parseFloat(amountEl,10); //...and convert to a float

    let rateEl = rate.value/100;
    // let valueDateEl = valueDate.value;
    let valueDateEl = calender;

    let tenorEl = tenor.value;

    let grossInterestEl = ((amountEl*rateEl*tenorEl)/365).toFixed(2);
    let wInterestEl = (grossInterestEl*0.1).toFixed(2);
    let netInterestEl = (grossInterestEl - wInterestEl).toFixed(2);
    let netInterestRateEl = rate.value - (rate.value * 0.1);
    let maturityAmountEl = (parseFloat(amountEl) + parseFloat(netInterestEl)).toFixed(2);

    grossInterest.textContent = parseFloat(grossInterestEl).toLocaleString("en-US");
    wInterest.textContent = parseFloat(wInterestEl).toLocaleString("en-US");
    netInterest.textContent = parseFloat(netInterestEl).toLocaleString("en-US");
    netInterestRate.textContent = netInterestRateEl;
    maturityAmount.textContent = parseFloat(maturityAmountEl).toLocaleString("en-US");

    Date.prototype.addDays = function (days) {
        const date = new Date(this.valueOf());
        date.setDate(date.getDate() + days);
        return date;
    };
    
    const date = new Date(valueDateEl);

    // const date = new Date('2020-12-02');

    const options = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' };

    let maturityDateEl = date.addDays(parseInt(tenorEl)).toLocaleDateString(options);

    const outputDate = maturityDateEl.split('/'); //Split the date & get their indexes
    let month = outputDate[0]
    let day = outputDate[1]
    let year = outputDate[2]
    const finalDateOutput = `${day}-${month}-${year}`; // format the date to output DD/MM/YYYY

    maturityDate.textContent = finalDateOutput;
}


//ADD EVENT LISTENER
calculateBtn.addEventListener('click',
    calculate
)


// calculate();