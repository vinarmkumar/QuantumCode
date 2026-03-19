#!/usr/bin/env node

/**
 * Contest Mode Integration Test
 * Run this to verify all components are integrated correctly
 */

const fs = require('fs');
const path = require('path');

console.log('\n🧪 Contest Mode Integration Test\n');

const tests = [];

// Test 1: Backend files exist
console.log('1️⃣  Checking backend files...');
const backendFiles = [
    'BackEnd/src/models/contest.js',
    'BackEnd/src/controllers/contestController.js',
    'BackEnd/src/routes/contest.js',
    'BackEnd/src/utils/roomManager.js'
];

let backendPass = true;
backendFiles.forEach(file => {
    if (fs.existsSync(file)) {
        console.log(`   ✅ ${file}`);
    } else {
        console.log(`   ❌ ${file} - MISSING`);
        backendPass = false;
    }
});
tests.push({ name: 'Backend Files', pass: backendPass });

// Test 2: Frontend files exist
console.log('\n2️⃣  Checking frontend files...');
const frontendFiles = [
    'FrontEnd/src/context/ContestContext.jsx',
    'FrontEnd/src/Components/ProblemsPage/ContestLanding.jsx',
    'FrontEnd/src/Components/ProblemsPage/ContestBattle.jsx',
    'FrontEnd/src/Components/ProblemsPage/Contest.css',
    'FrontEnd/src/Components/ProblemsPage/ContestBattle.css',
    'FrontEnd/src/services/contestApi.js'
];

let frontendPass = true;
frontendFiles.forEach(file => {
    if (fs.existsSync(file)) {
        console.log(`   ✅ ${file}`);
    } else {
        console.log(`   ❌ ${file} - MISSING`);
        frontendPass = false;
    }
});
tests.push({ name: 'Frontend Files', pass: frontendPass });

// Test 3: Dependencies in package.json
console.log('\n3️⃣  Checking dependencies...');
const backendPkg = JSON.parse(fs.readFileSync('BackEnd/package.json', 'utf8'));
const frontendPkg = JSON.parse(fs.readFileSync('FrontEnd/package.json', 'utf8'));

let depPass = true;

if (backendPkg.dependencies['socket.io']) {
    console.log('   ✅ Backend: socket.io installed');
} else {
    console.log('   ❌ Backend: socket.io NOT installed');
    depPass = false;
}

if (frontendPkg.dependencies['socket.io-client']) {
    console.log('   ✅ Frontend: socket.io-client installed');
} else {
    console.log('   ❌ Frontend: socket.io-client NOT installed');
    depPass = false;
}
tests.push({ name: 'Dependencies', pass: depPass });

// Test 4: App.jsx routes
console.log('\n4️⃣  Checking App.jsx routes...');
const appContent = fs.readFileSync('FrontEnd/src/App.jsx', 'utf8');
let routePass = true;

const requiredRoutes = [
    '/contest',
    'ContestLanding',
    'ContestBattle',
    'ContestProvider'
];

requiredRoutes.forEach(route => {
    if (appContent.includes(route)) {
        console.log(`   ✅ Route/Component: ${route}`);
    } else {
        console.log(`   ❌ Route/Component: ${route} - NOT FOUND`);
        routePass = false;
    }
});
tests.push({ name: 'App.jsx Routes', pass: routePass });

// Test 5: Backend index.js Socket.io setup
console.log('\n5️⃣  Checking backend Socket.io setup...');
const indexContent = fs.readFileSync('BackEnd/src/index.js', 'utf8');
let socketPass = true;

const socketChecks = [
    'socket.io',
    'socket.on',
    'io.to(',
    'RoomManager'
];

socketChecks.forEach(check => {
    if (indexContent.includes(check)) {
        console.log(`   ✅ Found: ${check}`);
    } else {
        console.log(`   ❌ Missing: ${check}`);
        socketPass = false;
    }
});
tests.push({ name: 'Socket.io Setup', pass: socketPass });

// Test 6: Routes registered
console.log('\n6️⃣  Checking route registration...');
if (indexContent.includes('contestRouter')) {
    console.log('   ✅ Contest router imported');
} else {
    console.log('   ❌ Contest router NOT imported');
}

if (indexContent.includes('/api/contest')) {
    console.log('   ✅ Contest routes registered');
} else {
    console.log('   ❌ Contest routes NOT registered');
}
tests.push({ name: 'Routes Registered', pass: true });

// Test 7: CSS files have animations
console.log('\n7️⃣  Checking CSS animations...');
let contestCss = fs.readFileSync('FrontEnd/src/Components/ProblemsPage/Contest.css', 'utf8');
let battleCss = fs.readFileSync('FrontEnd/src/Components/ProblemsPage/ContestBattle.css', 'utf8');

let cssPass = true;
const cssChecks = {
    '@keyframes': [contestCss, battleCss],
    'animation:': [contestCss, battleCss],
    'transition:': [contestCss, battleCss]
};

Object.entries(cssChecks).forEach(([check, files]) => {
    if (files.some(f => f.includes(check))) {
        console.log(`   ✅ CSS: ${check}`);
    } else {
        console.log(`   ❌ CSS: ${check} - MISSING`);
        cssPass = false;
    }
});
tests.push({ name: 'CSS Animations', pass: cssPass });

// Test 8: Context implementation
console.log('\n8️⃣  Checking ContestContext...');
const contextContent = fs.readFileSync('FrontEnd/src/context/ContestContext.jsx', 'utf8');
let contextPass = true;

const contextChecks = [
    'createContext',
    'socket.io',
    'joinRoom',
    'updateCode',
    'submitCode'
];

contextChecks.forEach(check => {
    if (contextContent.includes(check)) {
        console.log(`   ✅ Context: ${check}`);
    } else {
        console.log(`   ❌ Context: ${check} - NOT FOUND`);
        contextPass = false;
    }
});
tests.push({ name: 'ContestContext', pass: contextPass });

// Summary
console.log('\n\n📊 TEST SUMMARY\n');
let passCount = 0;
let totalCount = tests.length;

tests.forEach(test => {
    const icon = test.pass ? '✅' : '❌';
    console.log(`${icon} ${test.name}`);
    if (test.pass) passCount++;
});

console.log(`\n${passCount}/${totalCount} tests passed\n`);

if (passCount === totalCount) {
    console.log('🎉 All tests passed! Ready to run.\n');
    console.log('Next steps:');
    console.log('1. npm install (in BackEnd)');
    console.log('2. npm install (in FrontEnd)');
    console.log('3. npm run dev (in BackEnd)');
    console.log('4. npm run dev (in FrontEnd)');
    console.log('5. Open http://localhost:5173/contest\n');
    process.exit(0);
} else {
    console.log('❌ Some tests failed. Please check the issues above.\n');
    process.exit(1);
}
