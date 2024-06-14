import { createWeb3Modal, defaultConfig } from '@web3modal/ethers';
import MobileDetect from 'mobile-detect';

// 1. Get projectId at https://cloud.walletconnect.com
const projectId = '90b585be01a71e5c94a44efe5c097c64';

// 2. Set chains
const mainnet = {
	chainId: 1,
	name: 'Ethereum',
	currency: 'ETH',
	explorerUrl: 'https://etherscan.io',
	rpcUrl: 'https://cloudflare-eth.com',
};

// 3. Create your application's metadata object
const metadata = {
	name: 'Kidsuper Labs',
	description: '',
	url: 'https://labs.kidsuper.com', // url must match your domain & subdomain
	icons: ['https://avatars.mywebsite.com/'],
};

// 4. Create Ethers config
const ethersConfig = defaultConfig({
	/*Required*/
	metadata,

	/*Optional*/
	// enableEIP6963: true, // true by default
	// enableInjected: true, // true by default
	// enableCoinbase: true, // true by default
	// rpcUrl: '...', // used for the Coinbase SDK
	// defaultChainId: 1, // used for the Coinbase SDK
});

// 5. Create a Web3Modal instance
const modal = createWeb3Modal({
	allWallets: 'HIDE',
	featuredWalletIds: [
		'c03dfee351b6fcc421b4494ea33b9d4b92a984f87aa76d1663bb28705e95034a',
		// '4622a2b2d6af1c9844944291e5e7351a6aa24cd7b23099efac1b2fd875da31a0',
	],
	includeWalletIds: [
		'c03dfee351b6fcc421b4494ea33b9d4b92a984f87aa76d1663bb28705e95034a',
	],
	ethersConfig,
	chains: [mainnet],
	projectId,
	enableAnalytics: true, // Optional - defaults to your Cloud configuration
	enableOnramp: true, // Optional - false as default
	themeVariables: {
		'--w3m-accent': '#fc74fe',
	},
	termsConditionsUrl: 'https://uniswap.org/terms-of-service',
	privacyPolicyUrl: 'https://uniswap.org/privacy-policy',
});

const btn = document.querySelector('#connectedToWalletBtn');
const disconnectBtn = document.querySelector(
	'.header__disconnect-btn-container'
);
const md = new MobileDetect(navigator.userAgent);

if (md.mobile() || md.is('iPhone')) {
	btn.addEventListener('click', () => {
		modal.open();
		console.log('CLICKED');

		const checkConnection = setInterval(() => {
			const isConnected = modal.getIsConnected();
			if (isConnected) {
				clearInterval(checkConnection);
				localStorage.setItem('wallet-address', modal.getAddress());
				window.location.reload();
			}
		}, 1000);
	});

	disconnectBtn.addEventListener('click', () => {
		modal.disconnect();
		console.log('Disconnected');
	});
}
