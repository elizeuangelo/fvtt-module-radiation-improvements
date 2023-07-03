import { FalloutTokenDocument } from './module/token-document.js';
import { FalloutToken } from './module/token.js';

Hooks.once('setup', async () => {
	CONFIG.FALLOUT.tokenHPColors = {
		damage: 0xff0000,
		radiation: 0x550000,
	};
	CONFIG.Token.documentClass = FalloutTokenDocument;
	CONFIG.Token.objectClass = FalloutToken;

	const { FalloutActorIncremented } = await import('./module/actor.js');
	CONFIG.Actor.documentClass = FalloutActorIncremented;
});
