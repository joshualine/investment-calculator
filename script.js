//SELECTORS
const amount = document.getElementById('amount');
const rate = document.getElementById('rate');
const valueDate = document.getElementById('value-date');
const tenor = document.getElementById('tenor');
const maturityDate = document.getElementById('maturity-date');
const grossInterest = document.getElementById('gross-interest');
const wInterest = document.getElementById('W-interest');
const netInterest = document.getElementById('net-interest');
const netInterestRate = document.getElementById('net-interest-rate');
const interestRate = document.getElementById('interest-rate');
const maturityAmount = document.getElementById('maturity-amount');
const calculateBtn = document.getElementById('calculate');
const form = document.getElementById('formCheck');

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

    grossInterest.textContent = grossInterestEl;
    wInterest.textContent = wInterestEl;
    netInterest.textContent = netInterestEl;
    netInterestRate.textContent = netInterestRateEl;
    maturityAmount.textContent = maturityAmountEl;

    Date.prototype.addDays = function (days) {
        const date = new Date(this.valueOf());
        date.setDate(date.getDate() + days);
        return date;
    };
    
    const date = new Date(valueDateEl);     //Get input date; format: YYYY-M-D
    const options = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' };

    let maturityDateEl = date.addDays(parseInt(tenorEl)).toLocaleDateString(options);
    maturityDate.textContent = maturityDateEl;
}


//ADD EVENT LISTENER
calculateBtn.addEventListener('click',
    calculate
)


// calculate();