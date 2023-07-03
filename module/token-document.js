/**
 * Extend the base Token document by defining a custom roll data structure which is ideal for the Simple system.
 * @extends {TokenDocument}
 */
export class FalloutTokenDocument extends TokenDocument {
	/** @inheritdoc */
	getBarAttribute(...args) {
		const data = super.getBarAttribute(...args);
		if (data && data.attribute === 'health') {
			data.max += this.actor.system.radiation || 0;
		}
		return data;
	}
}
