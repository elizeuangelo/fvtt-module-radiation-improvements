/* -------------------------------------------- */
/*  Gameplay Mechanics                          */
/* -------------------------------------------- */

export default class FalloutActorIncremented extends CONFIG.Actor.documentClass {
	/** @override */
	async modifyTokenAttribute(attribute, value, isDelta, isBar) {
		if (attribute === 'health') {
			const hp = this.system.health;
			const maxHP = hp.max - (this.system.radiation ?? 0);
			if (value > 0) {
				if (isDelta) {
					const maxDelta = maxHP - hp.value;
					value = Math.min(value, maxDelta);
				} else {
					value = Math.min(value, maxHP);
				}
			}
		}
		return super.modifyTokenAttribute(attribute, value, isDelta, isBar);
	}

	/** @inheritdoc */
	async _preUpdate(changed, options, user) {
		await super._preUpdate(changed, options, user);

		// Apply changes to health decurrent to radiation decay.
		if (changed.system?.radiation) {
			const hp = changed.system.health?.value ?? this.system.health.value;
			const hpMax = changed.system.health?.max ?? this.system.health.max;
			const hpDiff = hpMax - hp;
			if (changed.system.radiation > hpDiff) {
				foundry.utils.setProperty(changed, 'system.health.value', hpMax - changed.system.radiation);
				options.diff = true;
			}
		}
	}
}
