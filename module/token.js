/**
 * Extend the base Token class to implement additional system-specific logic.
 */
export class FalloutToken extends Token {
	/** @inheritdoc */
	_drawBar(number, bar, data) {
		if (data.attribute === 'health') return this._drawHPBar(number, bar, data);
		return super._drawBar(number, bar, data);
	}

	/* -------------------------------------------- */

	/**
	 * Specialized drawing function for HP bars.
	 * @param {number} number      The Bar number
	 * @param {PIXI.Graphics} bar  The Bar container
	 * @param {object} data        Resource data for this bar
	 * @private
	 */
	_drawHPBar(number, bar, data) {
		// Extract health data
		const rad = this.actor.system.radiation ?? 0;
		let { value, max } = this.actor.system.health;

		// Differentiate between effective maximum and displayed maximum
		const effectiveMax = Math.max(0, max - rad);

		// Allocate percentages of the total
		const colorPct = Math.clamped(value, 0, effectiveMax) / max;

		// Determine colors to use
		const blk = 0x000000;
		const hpColor = PIXI.utils.rgb2hex([1 - colorPct / 2, colorPct, 0]);
		const c = CONFIG.FALLOUT.tokenHPColors;

		// Determine the container size (logic borrowed from core)
		const w = this.w;
		let h = Math.max(canvas.dimensions.size / 12, 8);
		if (this.height >= 2) h *= 1.6;
		const bs = Math.clamped(h / 8, 1, 2);

		// Overall bar container
		bar.clear();
		bar.beginFill(blk, 0.5).lineStyle(bs, blk, 1.0).drawRoundedRect(0, 0, w, h, 3);

		// Maximum HP penalty
		if (rad) {
			const pct = (max - rad) / max;
			bar.beginFill(c.radiation, 1.0)
				.lineStyle(1, blk, 1.0)
				.drawRoundedRect(pct * w, 0, (1 - pct) * w, h, 2);
		}

		// Health bar
		bar.beginFill(hpColor, 1.0)
			.lineStyle(bs, blk, 1.0)
			.drawRoundedRect(0, 0, colorPct * w, h, 2);

		// Set position
		let posY = number === 0 ? this.h - h : 0;
		bar.position.set(0, posY);
	}
}
