module.exports = function ({ models }) {
	const Currencies = models.use('Currencies');

	async function getAll(...data) {
		let where = {}, attributes = null;

		for (const item of data) {
			if (typeof item !== 'object') throw new Error("Currencies: object বা array দিতে হবে।");
			if (Array.isArray(item)) attributes = item;
			else where = item;
		}

		try {
			const results = await Currencies.findAll({ where, attributes });
			return results.map(e => e.get({ plain: true }));
		} catch (error) {
			console.error("getAll Error:", error);
			throw new Error("getAll() failed");
		}
	}

	async function getData(userID) {
		try {
			const data = await Currencies.findOne({ where: { userID } });
			return data ? data.get({ plain: true }) : null;
		} catch (error) {
			console.error("getData Error:", error);
			throw new Error("getData() failed");
		}
	}

	async function setData(userID, options = {}) {
		if (typeof options !== 'object') throw new Error("Currencies: object হতে হবে।");

		try {
			const user = await Currencies.findOne({ where: { userID } });
			if (!user) throw new Error(`User ${userID} not found`);
			await user.update(options);
			return true;
		} catch (error) {
			console.error("setData Error:", error);
			throw new Error("setData() failed");
		}
	}

	async function delData(userID) {
		try {
			const user = await Currencies.findOne({ where: { userID } });
			if (!user) return false;
			await user.destroy();
			return true;
		} catch (error) {
			console.error("delData Error:", error);
			throw new Error("delData() failed");
		}
	}

	async function createData(userID, defaults = {}) {
		if (typeof defaults !== 'object') throw new Error("Currencies: object হতে হবে।");

		try {
			await Currencies.findOrCreate({ where: { userID }, defaults });
			return true;
