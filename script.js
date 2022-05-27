//SELECTORS
const amount = document.getElementById('amount');
const rate = document.getElementById('rate');
const valueDate = document.getElementById('value-date');    //MM-DD-YYYY
const tenor = document.getElementById('tenor');
const maturityDate = document.getElementById('maturity-date');
const grossInterest = document.getElementById('gross-interest');
const wInterest = document.getElementById('W-interest');
const netInterest = document.getElementById('net-interest');
const netInterestRate = document.getElementById('net-interest-rate');
const interestRate = document.getElementById('interest-rate');
const maturityAmount = document.getElementById('maturity-amount');
const calculateBtn = document.getElementById('calculate');

//FUNCTIONS
function calculate() {
    let amountEl = amount.value;
    let rateEl = rate.value/100;
    let valueDateEl = valueDate.value;

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