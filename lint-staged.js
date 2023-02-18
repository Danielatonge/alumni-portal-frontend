module.exports = {
    '*.{js,jsx,ts,tsx,json,css,js,scss}': ['prettier --write'],
    '*.{js,jsx,ts,tsx}': [
        'eslint --max-warnings=0',
        'react-scripts test --bail --watchAll=false --findRelatedTests --passWithNoTests',
        () => 'tsc-files --noEmit',
    ],
}
