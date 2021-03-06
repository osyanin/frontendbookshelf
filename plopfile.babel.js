function isNotEmpty(name) {
	return (value) => {
		if (!value || value.trim() === '') return `${name} is required`;
		return true;
	};
}

const { assign } = Object;
const BLOCKS = './source/blocks';
const addStyle = {
	type: 'add',
	templateFile: 'plop-templates/block/block.css',
};
const addMarkup = {
	type: 'add',
	templateFile: 'plop-templates/block/block.pug',
};

function generateResourcePath(resourceType) {
	const resourcesNamesByType = {
		template: '{{lowerCase name}}.pug',
		style: '{{lowerCase name}}.css',
	};

	return `${BLOCKS}/{{lowerCase name}}/${resourcesNamesByType[resourceType]}`;
}

module.exports = (plop) => {
	plop.setGenerator('block', {
		description: 'Create a new block',
		prompts: [{
			type: 'input',
			name: 'name',
			message: 'What is your block name?',
			validate: isNotEmpty('name'),
		}],
		actions: [
			assign({}, addStyle, {
				path: generateResourcePath('style'),
			}),
			assign({}, addMarkup, {
				path: generateResourcePath('template'),
			}),
		],
	});
};
