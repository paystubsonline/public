

    
    let debounceTimer;
    function debounce(func, delay) {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(func, delay);
    }

    function debouncedCalculate() {
      debounce(calculatePayments, 300);
    }

    function toggleTable() {
      const table = document.getElementById('detailsTable');
      const button = document.querySelector('.toggle-btn');
      if (table.classList.contains('hidden')) {
        table.classList.remove('hidden');
        button.classList.add('hidden');
      } else {
        table.classList.add('hidden');
        button.classList.remove('hidden');
      }
    }

    function calculatePayments() {
      const autocalc = document.getElementById('autocalc').value;
      if (autocalc === '0') return;
      updatePayPeriodsOptions();
      calculatePayPeriod();
      calculatePaycheck();
  
    }

  document.addEventListener('DOMContentLoaded', function () {
    updateIds();
  });


// © 2025 PayStubsOnline.net – Proprietary. https://paystubsonline.net

    function calculatePayPeriodsFromDate(payDate, howpaid) {
      const startOfYear = new Date(2025, 0, 1);
      const endDate = new Date(payDate);
      if (!payDate || isNaN(endDate)) return 1;
      let periods;
      switch (howpaid) {
        case '1':
          const weeks = Math.floor((endDate - startOfYear) / (7 * 24 * 60 * 60 * 1000)) + 1;
          periods = Math.max(1, Math.min(weeks, 52));
          break;
        case '2':
          const biWeeks = Math.floor((endDate - startOfYear) / (14 * 24 * 60 * 60 * 1000)) + 1;
          periods = Math.max(1, Math.min(biWeeks, 26));
          break;
        case '3':
          periods = endDate.getMonth() + 1;
          periods = Math.max(1, Math.min(periods, 12));
          break;
        case '4':
          const days = Math.floor((endDate - startOfYear) / (24 * 60 * 60 * 1000));
          periods = Math.floor(days / 15) + (endDate.getDate() > 15 ? 2 : 1);
          periods = Math.max(1, Math.min(periods, 24));
          break;
        case '5':
          periods = 1;
          break;
        default:
          periods = 1;
      }
      return periods;
    }
// © 2025 PayStubsOnline.net – Proprietary. https://paystubsonline.net

    function updatePayPeriodsOptions() {
      const howpaid = document.getElementById('howpaid').value;
      const payDate = document.getElementById('txtPayDate').value;
      let maxPeriods;
      switch (howpaid) {
        case '1': maxPeriods = 52; break;
        case '2': maxPeriods = 26; break;
        case '3': maxPeriods = 12; break;
        case '4': maxPeriods = 24; break;
        case '5': maxPeriods = 1; break;
        default: maxPeriods = 1;
      }
      const taxRateSelect = document.getElementById('taxRate');
      taxRateSelect.innerHTML = '';
      for (let i = 1; i <= maxPeriods; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.text = i;
        taxRateSelect.appendChild(option);
      }
      const calculatedPeriods = calculatePayPeriodsFromDate(payDate, howpaid);
      taxRateSelect.value = calculatedPeriods;
    }
const hoursonsalaryDiv = document.getElementById('hoursonsalary');

    function calculatePayPeriod() {
      const payDateInput = document.getElementById('txtPayDate').value;
      if (!payDateInput) return;
      const howpaid = document.getElementById('howpaid').value;
      let startDate = new Date(payDateInput);
      let periodStart;
      switch (howpaid) {
        case '1':
          periodStart = new Date(startDate.getTime() - 6 * 24 * 60 * 60 * 1000);
          break;
        case '2':
          periodStart = new Date(startDate.getTime() - 13 * 24 * 60 * 60 * 1000);
          break;
        case '3':
          periodStart = new Date(startDate.getFullYear(), startDate.getMonth(), 1);
          break;
        case '4':
          periodStart = new Date(startDate.getFullYear(), startDate.getDate() <= 15 ? startDate.getMonth() : startDate.getMonth() - 1, startDate.getDate() <= 15 ? 1 : 16);
          break;
        case '5':
          periodStart = new Date(startDate.getFullYear(), 0, 1);
          break;
        default:
          periodStart = startDate;
      }
      const formatDate = (date) => {
        return date.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });
      };
      const periodStartStr = formatDate(periodStart);
      const payDateStr = formatDate(startDate);
      document.getElementById('txtPayPeriod').value = `${periodStartStr} - ${payDateStr}`;
    }

    function calculateStateTax(taxableIncome, stateAbbr, maritalStatus) {
 console.log("🧾 Called calculateStateTax →", {
    taxableIncome,
    stateAbbr,
    maritalStatus
  });
      
      if (taxableIncome <= 0) return 0;
      const noTaxStates = ['0', '2', '10', '29', '30', '42', '43', '44', '48', '51'];
      if (noTaxStates.includes(stateAbbr)) return 0;
      const isMarried = maritalStatus === 'married';
      switch (document.getElementById('state').value) {
        case '1': return taxableIncome <= (isMarried ? 6000 : 3000) ? taxableIncome * 0.04 : taxableIncome * 0.05;
        case '3': return taxableIncome * 0.025;
        case '4':
          if (taxableIncome <= 5100) return taxableIncome * 0.02;
          if (taxableIncome <= 10200) return taxableIncome * 0.04;
          return taxableIncome * 0.049;
        case '5':
          if (taxableIncome <= (isMarried ? 20198 : 10099)) return taxableIncome * 0.01;
          if (taxableIncome <= (isMarried ? 47884 : 23942)) return taxableIncome * 0.02;
          if (taxableIncome <= (isMarried ? 75576 : 37788)) return taxableIncome * 0.04;
          if (taxableIncome <= (isMarried ? 104910 : 52455)) return taxableIncome * 0.06;
          if (taxableIncome <= (isMarried ? 132590 : 66295)) return taxableIncome * 0.08;
          if (taxableIncome <= (isMarried ? 677278 : 338639)) return taxableIncome * 0.093;
          if (taxableIncome <= (isMarried ? 812728 : 406364)) return taxableIncome * 0.103;
          if (taxableIncome <= (isMarried ? 1354550 : 677275)) return taxableIncome * 0.113;
          return taxableIncome * 0.123;
        case '6': return taxableIncome * 0.044;
        case '7':
          if (taxableIncome <= (isMarried ? 20000 : 10000)) return taxableIncome * 0.03;
          if (taxableIncome <= (isMarried ? 100000 : 50000)) return taxableIncome * 0.05;
          return taxableIncome * 0.055;
        case '8':
          if (taxableIncome <= 5000) return taxableIncome * 0.022;
          if (taxableIncome <= 10000) return taxableIncome * 0.039;
          if (taxableIncome <= 25000) return taxableIncome * 0.048;
          return taxableIncome * 0.066;
        case '9':
          if (taxableIncome <= 10000) return taxableIncome * 0.04;
          if (taxableIncome <= 40000) return taxableIncome * 0.06;
          if (taxableIncome <= 60000) return taxableIncome * 0.065;
          return taxableIncome * 0.085;
        case '11': return taxableIncome * 0.0575;
        case '12':
          if (taxableIncome <= (isMarried ? 9600 : 4800)) return taxableIncome * 0.032;
          if (taxableIncome <= (isMarried ? 19200 : 9600)) return taxableIncome * 0.055;
          if (taxableIncome <= (isMarried ? 38400 : 19200)) return taxableIncome * 0.068;
          return taxableIncome * 0.0825;
        case '13': return taxableIncome * 0.058;
        case '14': return taxableIncome * 0.0495;
        case '15': return taxableIncome * 0.0315;
        case '16':
          if (taxableIncome <= 6260) return taxableIncome * 0.044;
          if (taxableIncome <= 25040) return taxableIncome * 0.0482;
          return taxableIncome * 0.057;
        case '17':
          if (taxableIncome <= (isMarried ? 30000 : 15000)) return taxableIncome * 0.031;
          if (taxableIncome <= (isMarried ? 60000 : 30000)) return taxableIncome * 0.0525;
          return taxableIncome * 0.057;
        case '18': return taxableIncome * 0.045;
        case '19':
          if (taxableIncome <= (isMarried ? 25000 : 12500)) return taxableIncome * 0.0185;
          if (taxableIncome <= (isMarried ? 100000 : 50000)) return taxableIncome * 0.035;
          return taxableIncome * 0.0425;
        case '20':
          if (taxableIncome <= (isMarried ? 52100 : 26050)) return taxableIncome * 0.058;
          return taxableIncome * 0.0715;
        case '21':
          if (taxableIncome <= 1000) return taxableIncome * 0.02;
          if (taxableIncome <= 2000) return taxableIncome * 0.03;
          if (taxableIncome <= 3000) return taxableIncome * 0.04;
          return taxableIncome * 0.05;
        case '22': return taxableIncome * 0.05;
        case '23': return taxableIncome * 0.0425;
        case '24':
          if (taxableIncome <= (isMarried ? 63380 : 31690)) return taxableIncome * 0.0535;
          if (taxableIncome <= (isMarried ? 208180 : 104090)) return taxableIncome * 0.068;
          return taxableIncome * 0.0785;
        case '25': return taxableIncome > 10000 ? taxableIncome * 0.05 : 0;
        case '26':
          if (taxableIncome <= 1234) return taxableIncome * 0.015;
          if (taxableIncome <= 2468) return taxableIncome * 0.02;
          if (taxableIncome <= 3702) return taxableIncome * 0.025;
          return taxableIncome * 0.0495;
        case '27':
          if (taxableIncome <= 20400) return taxableIncome * 0.047;
          return taxableIncome * 0.059;
        case '28':
          if (taxableIncome <= (isMarried ? 16000 : 8000)) return taxableIncome * 0.0351;
          if (taxableIncome <= (isMarried ? 64000 : 32000)) return taxableIncome * 0.0501;
          return taxableIncome * 0.0658;
        case '31':
          if (taxableIncome <= 20000) return taxableIncome * 0.014;
          if (taxableIncome <= 35000) return taxableIncome * 0.0175;
          return taxableIncome * 0.035;
        case '32':
          if (taxableIncome <= (isMarried ? 16000 : 8000)) return taxableIncome * 0.017;
          if (taxableIncome <= (isMarried ? 32000 : 16000)) return taxableIncome * 0.032;
          return taxableIncome * 0.049;
        case '33':
          if (taxableIncome <= (isMarried ? 17150 : 8500)) return taxableIncome * 0.04;
          if (taxableIncome <= (isMarried ? 23400 : 11700)) return taxableIncome * 0.045;
          if (taxableIncome <= (isMarried ? 27800 : 13900)) return taxableIncome * 0.0525;
          if (taxableIncome <= (isMarried ? 161550 : 80650)) return taxableIncome * 0.059;
          return taxableIncome * 0.0649;
        case '34': return taxableIncome * 0.0475;
        case '35':
          if (taxableIncome <= (isMarried ? 89450 : 44725)) return taxableIncome * 0.011;
          return taxableIncome * 0.0204;
        case '36':
          if (taxableIncome <= 26050) return taxableIncome * 0.0196;
          return taxableIncome * 0.0333;
        case '37':
          if (taxableIncome <= (isMarried ? 14400 : 7200)) return taxableIncome * 0.0425;
          return taxableIncome * 0.0475;
        case '38':
          if (taxableIncome <= (isMarried ? 8100 : 4050)) return taxableIncome * 0.0475;
          if (taxableIncome <= (isMarried ? 20300 : 10150)) return taxableIncome * 0.0675;
          return taxableIncome * 0.0875;
        case '39': return taxableIncome * 0.0307;
        case '40':
          if (taxableIncome <= (isMarried ? 147500 : 73750)) return taxableIncome * 0.0375;
          return taxableIncome * 0.0499;
        case '41':
          if (taxableIncome <= 3460) return taxableIncome * 0.03;
          return taxableIncome * 0.064;
        case '45': return taxableIncome * 0.0485;
        case '46':
          if (taxableIncome <= (isMarried ? 85800 : 42900)) return taxableIncome * 0.0335;
          return taxableIncome * 0.066;
        case '47':
          if (taxableIncome <= 3000) return taxableIncome * 0.02;
          if (taxableIncome <= 5000) return taxableIncome * 0.03;
          if (taxableIncome <= 17000) return taxableIncome * 0.05;
          return taxableIncome * 0.0575;
        case '49':
          if (taxableIncome <= (isMarried ? 20000 : 10000)) return taxableIncome * 0.03;
          if (taxableIncome <= (isMarried ? 50000 : 25000)) return taxableIncome * 0.04;
          return taxableIncome * 0.06;
        case '50':
          if (taxableIncome <= (isMarried ? 29240 : 14620)) return taxableIncome * 0.035;
          if (taxableIncome <= (isMarried ? 58480 : 29240)) return taxableIncome * 0.0465;
          return taxableIncome * 0.053;
        default:
          return taxableIncome * 0.04;
      }
    }


  function calculatePaycheck() {
  const jobType = document.querySelector('button[name="yt3"]').classList.contains('bg-cyan-600') ? 'Salary' : 'Hourly';
  const salary = parseFloat(document.getElementById('salary').value) || 0;
  let payhours = parseFloat(document.getElementById('payhours').value) || 0;
  let payrate = parseFloat(document.getElementById('payrate').value) || 0;
  const maritalStatus = document.getElementById('maritalStatus').value;
  const standardDeduction = maritalStatus === 'single' ? 15000 : 30000;
  const dependents = parseInt(document.getElementById('dependents').value) || 0;
  const stateAbbr = document.getElementById('state').value;

  const howpaid = parseInt(document.getElementById('howpaid').value);
  const taxRate = parseInt(document.getElementById('taxRate').value) || 1;

  let periodsPerYear;
  switch (howpaid) {
    case 1: periodsPerYear = 52; break;
    case 2: periodsPerYear = 26; break;
    case 3: periodsPerYear = 12; break;
    case 4: periodsPerYear = 24; break;
    case 5: periodsPerYear = 1; break;
    default: periodsPerYear = 1;
  }

  let grossPay;
  if (jobType === 'Salary' && salary > 0) {
    grossPay = salary / periodsPerYear;
    payrate = salary / 2080;
    payhours = payhours || 40;
    document.getElementById('payhours').value = payhours;
    hoursonsalaryDiv.classList.add('hidden');
  } else {
    grossPay = payhours * payrate;
   // hoursonsalaryDiv.classList.remove('hidden');
  }

  const periodDeduction = standardDeduction / periodsPerYear;
  const periodCredit = (2000 * dependents) / periodsPerYear;

  const currenttotal = grossPay;

  const taxBrackets = maritalStatus === 'single' ? [
    { min: 0, max: 11925, rate: 0.10 },
    { min: 11926, max: 48475, rate: 0.12 },
    { min: 48476, max: 103350, rate: 0.22 },
    { min: 103351, max: 197300, rate: 0.24 },
    { min: 197301, max: 250525, rate: 0.32 },
    { min: 250526, max: 626350, rate: 0.35 },
    { min: 626351, max: Infinity, rate: 0.37 }
  ] : [
    { min: 0, max: 23850, rate: 0.10 },
    { min: 23851, max: 96950, rate: 0.12 },
    { min: 96951, max: 206700, rate: 0.22 },
    { min: 206701, max: 394600, rate: 0.24 },
    { min: 394601, max: 501050, rate: 0.32 },
    { min: 501051, max: 751600, rate: 0.35 },
    { min: 751601, max: Infinity, rate: 0.37 }
  ];

  // Medicare tax calculation with Additional Medicare Tax
  const annualGrossPay = grossPay * periodsPerYear;
  const medicareThreshold = maritalStatus === 'married' ? 250000 : (maritalStatus === 'married-separately' ? 125000 : 200000);
  let ficamedtax;
  if (annualGrossPay <= medicareThreshold) {
    ficamedtax = currenttotal * 0.0145;
  } else {
    const periodThreshold = medicareThreshold / periodsPerYear;
    const baseMedicare = currenttotal * 0.0145;
    const additionalMedicare = currenttotal > periodThreshold ? (currenttotal - periodThreshold) * 0.009 : 0;
    ficamedtax = baseMedicare + additionalMedicare;
  }

  const ficasstax = Math.min(currenttotal * 0.062, (168600 / periodsPerYear) * 0.062);
  let taxableIncome = currenttotal - periodDeduction;
  taxableIncome = taxableIncome < 0 ? 0 : taxableIncome;

  let fedtax = 0;
  for (const bracket of taxBrackets) {
    if (taxableIncome > bracket.min) {
      const taxableInBracket = Math.min(taxableIncome, bracket.max) - bracket.min;
      fedtax += taxableInBracket * bracket.rate;
    }
  }
  fedtax = Math.max(0, fedtax - periodCredit);

  const sttax = calculateStateTax(taxableIncome, stateAbbr, maritalStatus);
  const currentdeductions = ficamedtax + ficasstax + fedtax + sttax;
  const netpay = currenttotal - currentdeductions;

  document.getElementById('grosspay').value = grossPay.toFixed(2);
  document.getElementById('currenttotal').value = grossPay.toFixed(2);
  document.getElementById('ytdgross1').value = (grossPay * taxRate).toFixed(2);
  document.getElementById('ficamedtax').value = ficamedtax.toFixed(2);
  document.getElementById('ytdficamedtax').value = (ficamedtax * taxRate).toFixed(2);
  document.getElementById('ficasstax').value = ficasstax.toFixed(2);
  document.getElementById('ytdficasstax').value = (ficasstax * taxRate).toFixed(2);
  document.getElementById('fedtax').value = fedtax.toFixed(2);
  document.getElementById('ytdfedtax').value = (fedtax * taxRate).toFixed(2);
  document.getElementById('sttax').value = sttax.toFixed(2);
  document.getElementById('ytdsttax').value = (sttax * taxRate).toFixed(2);
  document.getElementById('currentdeductions').value = currentdeductions.toFixed(2);
  document.getElementById('ytddeductions1').value = (currentdeductions * taxRate).toFixed(2);
  document.getElementById('netpay').value = netpay.toFixed(2);
  document.getElementById('ytdnetpay1').value = (netpay * taxRate).toFixed(2);
}









function updateIds() {
  const now1 = new Date(); // for employeeId
  const now2 = new Date(new Date().getTime() + 7); // for paystubNo, offset by few ms

  // --- Generate employeeId ---
  const year1 = now1.getFullYear().toString().slice(-2);
  const startOfYear = new Date(now1.getFullYear(), 0, 0);
  const dayOfYear = Math.floor((now1 - startOfYear) / (1000 * 60 * 60 * 24)).toString().padStart(3, '0');
  const hourMinute = now1.getHours().toString().padStart(2, '0') + now1.getMinutes().toString().padStart(2, '0');
  const millis1 = now1.getMilliseconds().toString().padStart(3, '0').slice(-2);
  const employeeId = `EMP${dayOfYear}${hourMinute}${millis1}`;

  // --- Generate paystubNo ---
  const year2 = now2.getFullYear().toString().slice(-2);
  const month = (now2.getMonth() + 1).toString().padStart(2, '0');
  const day = now2.getDate().toString().padStart(2, '0');
  const seconds = now2.getSeconds().toString().padStart(2, '0');
  const millis2 = now2.getMilliseconds().toString().padStart(3, '0').slice(-2);
  const paystubNo = `#PAY${year2}${month}${day}${seconds}${millis2}`;

  // --- Set field values only if empty ---
  const employeeField = document.getElementById('employeeid2');
  const stubField = document.getElementById('stubnumber');

  if (employeeField && !employeeField.value.trim()) {
    employeeField.value = employeeId;
  }

  if (stubField && !stubField.value.trim()) {
    stubField.value = paystubNo;
  }
}


    document.addEventListener("DOMContentLoaded", function () {
      const now = new Date();
      const year = now.getFullYear().toString().slice(-2);
      const month = (now.getMonth() + 1).toString().padStart(2, '0');
      const day = now.getDate().toString().padStart(2, '0');
      const seconds = now.getSeconds().toString().padStart(2, '0');
      const millis = now.getMilliseconds().toString().padStart(3, '0').slice(-2);
      const paystubNumber = `#PAY${year}${month}${day}${seconds}${millis}`;
      const stubField = document.getElementById("stubnumber");
      if (stubField && !stubField.value.trim()) {
        stubField.value = paystubNumber;
      }

      const startOfYear = new Date(now.getFullYear(), 0, 0);
      const diff = now - startOfYear;
      const oneDay = 1000 * 60 * 60 * 24;
      const dayOfYear = Math.floor(diff / oneDay).toString().padStart(3, '0');
      const hourMinute = now.getHours().toString().padStart(2, '0') + now.getMinutes().toString().padStart(2, '0');
      const employeeId = `EMP${year}${dayOfYear}${hourMinute}${millis}`;
      const inputField = document.querySelector('input[name="employeeid2"]');
      if (inputField && !inputField.value.trim()) {
        inputField.value = employeeId;
      }

      const hourlyBtn = document.querySelector('button[name="yt2"]');
      const salaryBtn = document.querySelector('button[name="yt3"]');
      const salarySpan = document.getElementById('salary2');

      hourlyBtn.classList.add('bg-cyan-600');
      salarySpan.style.display = 'none';

      function updateButtonStyles(activeButton, inactiveButton) {
        activeButton.classList.add('bg-cyan-600');
        activeButton.classList.remove('bg-gray-300');
        inactiveButton.classList.add('bg-gray-300');
        inactiveButton.classList.remove('bg-cyan-600');
      }

      hourlyBtn.addEventListener('click', function () {
      
      
      hoursonsalaryDiv.classList.remove('hidden');

      
        salarySpan.style.display = 'none';
        document.getElementById('payhours').value = '40';
        document.getElementById('payrate').value = '11.47';
        updateButtonStyles(hourlyBtn, salaryBtn);
        debouncedCalculate();
      });

      salaryBtn.addEventListener('click', function () {
        salarySpan.style.display = 'block';
   hoursonsalaryDiv.classList.add('hidden');
        document.getElementById('salary').value = '';
        document.getElementById('payrate').value = 'Salary';
        updateButtonStyles(salaryBtn, hourlyBtn);
        debouncedCalculate();
  


      });

      document.getElementById('salary').addEventListener('input', function () {
        const salary = parseFloat(this.value) || 0;
        const hourlyRate = salary / 2080;
        debouncedCalculate();
      });

      document.querySelectorAll('.refreshable').forEach(el => {
        el.addEventListener('change', debouncedCalculate);
          el.addEventListener('input', debouncedCalculate);  // triggers while typing

      });

      calculatePayments();
    });

    function toggleHelper() {
      const popup = document.getElementById("helperPopup");
      popup.classList.toggle("hidden");
      if (!popup.classList.contains("hidden")) {
        setTimeout(() => {
          popup.classList.add("hidden");
        }, 5000);
      }
    }

    function toggleDependentsHelper() {
      const popup = document.getElementById("dependentsHelperPopup");
      popup.classList.toggle("hidden");
      if (!popup.classList.contains("hidden")) {
        setTimeout(() => {
          popup.classList.add("hidden");
        }, 5000);
      }
    }

    function setMaxDate() {
      const today = new Date("2025-07-17");
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, '0');
      const day = String(today.getDate()).padStart(2, '0');
      const maxDate = `${year}-${month}-${day}`;
      document.getElementById("startDate").setAttribute("max", maxDate);
    }

 