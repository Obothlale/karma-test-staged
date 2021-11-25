var {spawn} = require('child_process');
var git = spawn('git diff --name-only --cached', {shell: true});

export function karmaTestStagedFiles(){
	console.log('Running @coderunscode/karma-test-staged in directory', process.cwd());
	git.stdout.on('data', function(data){
		var stagedFiles = getStagedFiles(data);
		console.log('Found staged files to test(',stagedFiles.length,'):',stagedFiles);
		var specsToTest = getSpecFiles(stagedFiles);
		if(specsToTest.length > 0){
			runNgTests(specsToTest);
		}
	});
	git.stderr.on('data', function(data){
		console.log('git failed', `${data}`);
	});
	git.on('close', function(code){
		console.log('git process finished with exit code', code);
	});
}

function getStagedFiles(data){
	return `${data}`
	.split('\n')
	.map(value => value.replace(/^\s+|\s+$/gm,''))
	.filter(value => value.length > 0 && value.includes('src/app') && value.includes('.ts') && !(value.includes('app.config.ts') || value.includes('app.module.ts'))   );
}

function getSpecFiles(stagedFiles){
	var specs = stagedFiles.filter(value => value.includes('spec'));
	var possibleSpecs = stagedFiles.filter(value => !value.includes('.spec.ts')).map(value => value.replace('.ts', '.spec.ts'));
	return [...new Set([...specs,...possibleSpecs])];
}

function runNgTests(specsToTest){
	console.log('Starting to run tests:', specsToTest)
	var ngCommand = 'ng test --watch=false --code-coverage=false';
	specsToTest.forEach(spec => command = command + ' --include=' + spec);
	var ng = spawn(ngCommand, {shell: true});
	ng.stdout.pipe(process.stdout);
	ng.stderr.pipe(process.stdout);
	ng.on('close', function(code){
		console.log('ng test process finished with exit code', code);
		if(code > 0){
			process.exit(code);
		}
	});
}