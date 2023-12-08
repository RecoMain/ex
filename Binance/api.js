



function getBtcCurrency() {
	if (btcCurrencys === null) {
		fetch(`https://blockchain.info/ticker`)
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				btcCurrencys = data
				setToLocalStorage(data, 'btcCurrencys')
			});
	}
}




let symbols = [
	{ valute: 'AUD', symbol: ' ≈ A$' },
	{ valute: 'ARS', symbol: ' ≈ ARS$' },
	{ valute: 'AED', symbol: ' ≈ د.إ' },
	{ valute: 'BRL', symbol: ' ≈ R$' },
	{ valute: 'BGN', symbol: ' ≈ лв' },
	{ valute: 'BOB', symbol: ' ≈ $b' },
	{ valute: 'BHD', symbol: ' ≈ .د.ب' },
	{ valute: 'BDT', symbol: ' ≈ ৳' },
	{ valute: 'CHF', symbol: ' ≈ CHF' },
	{ valute: 'CNY', symbol: ' ≈ ¥' },
	{ valute: 'COP', symbol: ' ≈ COL$' },
	{ valute: 'CAD', symbol: ' ≈ C$' },
	{ valute: 'CZK', symbol: ' ≈ Kč' },
	{ valute: 'DKK', symbol: ' ≈ KR' },
	{ valute: 'EUR', symbol: ' ≈ €' },
	{ valute: 'EGP', symbol: ' ≈ £' },
	{ valute: 'GBP', symbol: ' ≈ £' },
	{ valute: 'HUF', symbol: ' ≈ Ft' },
	{ valute: 'HRK', symbol: ' ≈ kn' },
	{ valute: 'HKD', symbol: ' ≈ HKD' },
	{ valute: 'INR', symbol: ' ≈ ₹' },
	{ valute: 'IDR', symbol: ' ≈ Rp' },
	{ valute: 'JPY', symbol: ' ≈ ¥' },
	{ valute: 'KES', symbol: ' ≈ KSh' },
	{ valute: 'KWD', symbol: ' ≈ ب.د' },
	{ valute: 'KZT', symbol: ' ≈ ₸' },
	{ valute: 'MAD', symbol: ' ≈ م.د.' },
	{ valute: 'MXN', symbol: ' ≈ Mex$' },
	{ valute: 'MNT', symbol: ' ≈ ₮' },
	{ valute: 'NGN', symbol: ' ≈ ₦' },
	{ valute: 'NZD', symbol: ' ≈ NZ$' },
	{ valute: 'OMR', symbol: ' ≈ ر.ع.' },
	{ valute: 'PEN', symbol: ' ≈ S/.' },
	{ valute: 'PHP', symbol: ' ≈ ₱' },
	{ valute: 'PKR', symbol: ' ≈ ₨' },
	{ valute: 'PLN', symbol: ' ≈ zł' },
	{ valute: 'QAR', symbol: ' ≈ ر.ق' },
	{ valute: 'RUB', symbol: ' ≈ ₽' },
	{ valute: 'RON', symbol: ' ≈ lei' },
	{ valute: 'SAR', symbol: ' ≈ ر.س' },
	{ valute: 'SEK', symbol: ' ≈ kr' },
	{ valute: 'TWD', symbol: ' ≈ NT$' },
	{ valute: 'THB', symbol: ' ≈ ฿' },
	{ valute: 'TRY', symbol: ' ≈ ₺' },
	{ valute: 'UAH', symbol: ' ≈ ₴' },
	{ valute: 'UGX', symbol: ' ≈ USh' },
	{ valute: 'USD', symbol: ' ≈ $' },
	{ valute: 'VND', symbol: ' ≈ ₫' },
	{ valute: 'VES', symbol: ' ≈ Bs' },
	{ valute: 'ZAR', symbol: ' ≈ R' },
]

let btcCurrencys = null
let currencyType = null