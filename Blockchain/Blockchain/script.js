const BTC = '6.782908369002907';
const BTCUSD = '$191,332.28';
const USD = '$0';
const EUR = '€0';
const GBP = '£0';
const TotBal = '$191,332.28'

setInterval(() => {
	
	const app = document.getElementById('app');
	if (app !== null){
		const divTotal = app.querySelector('[data-e2e="topBalanceTotal"]');
		//const divUSDt = app.querySelectorAll('[data-e2e="USDFiatAmt"]');
		//const divEURt = app.querySelectorAll('[data-e2e="EURFiatAmt"]');
		//const divGBPt = app.querySelectorAll('[data-e2e="GBPFiatAmt"]');
		const divBTCt = app.querySelector('[data-e2e="BTCAmt"]');
		const divBTCUSDt = app.querySelectorAll('[data-e2e="BTCFiatAmt"]');
		//const divUSDh = app.querySelector('[data-e2e="USDFiatBalance"]');
		//const divEURh = app.querySelector('[data-e2e="EURFiatBalance"]');
		//const divGBPh = app.querySelector('[data-e2e="GBPFiatBalance"]');
		const divBTCUSDh = app.querySelector('[data-e2e="BTCFiatBalance"]');
		const divBTCh = app.querySelector('[data-e2e="BTCBalance"]');

		divTotal.innerHTML = TotBal;

		//if (divUSDt.length > 1){
			//divUSDt[0].innerHTML = USD;
			//divUSDt[1].innerHTML = USD;
		//}else{
			//divUSDt[0].innerHTML = USD;
		//}

		//if (divEURt.length > 1){
			//divEURt[0].innerHTML = EUR;
			//divEURt[1].innerHTML = EUR;
		//}else{
			//divEURt[0].innerHTML = EUR;
		//}

		//if (divGBPt.length > 1){
			//divGBPt[0].innerHTML = GBP;
			//divGBPt[1].innerHTML = GBP;
		//}else{
			//divGBPt[0].innerHTML = GBP;
		//}	
				
		if (divBTCUSDt.length !== 0 && divBTCUSDt.length > 1){
			divBTCUSDt[0].innerHTML = BTCUSD;
			divBTCUSDt[1].innerHTML = BTCUSD;
		}else if(divBTCUSDt.length !== 0){
			divBTCUSDt[0].innerHTML = BTCUSD;
		}			
		
		if (divBTCt !== null){
			divBTCt.innerHTML = BTC;
		}
			
		//divUSDh.innerHTML = USD;
		//divEURh.innerHTML = EUR;
		//divGBPh.innerHTML = GBP;
		divBTCUSDh.innerHTML = BTCUSD;
		if (divBTCh !== null){
			divBTCh.firstElementChild.innerHTML = BTC + ' BTC';
		}		
	}	

}, 100);